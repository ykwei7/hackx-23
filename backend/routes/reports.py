from flask import Blueprint, request, jsonify
from models import Report, User, Bicycle
from db import db
from geopy.geocoders import Nominatim
import geopy.geocoders
from datetime import datetime
import certifi
import ssl

bp = Blueprint("reports", __name__, url_prefix="/reports")
ctx = ssl.create_default_context(cafile=certifi.where())
geopy.geocoders.options.default_ssl_context = ctx

def decode_coord(lat, long):
    if lat is None or long is None:
        return None
    geolocator = Nominatim(user_agent="MyApp")
    location = geolocator.reverse([lat, long])
    if "address" not in location.raw:
        return None
    address = location.raw["address"]

    if "suburb" not in address or "road" not in address:
        return None

    return f"{address['suburb']}, {address['road']}"


# Define a route to add a new report
@bp.route("/", methods=["POST"])
def add_report():
    # try:
    data = request.json  # Assuming you're sending JSON data in the request
    user_id = data.get("user_id")
    bike_id = data.get("bike_id")
    description = data.get("description")
    lat = data.get("lat")
    long = data.get("long")

    reported_time = datetime.now()
    # print(reported_time)

    # Check if the user and bicycle exist
    user = User.query.get(user_id)
    bicycle = Bicycle.query.get(bike_id)

    if not user or not bicycle:
        return jsonify({"message": "User or bicycle not found"}), 404

    # Create a new report
    new_report = Report(
        user_id=user_id,
        bike_id=bike_id,
        description=description,
        lat=lat,
        long=long,
        reported_time=reported_time,
    )

    db.session.add(new_report)
    db.session.commit()
    # except Exception as error:
    #     print("An exception occurred:", error)

    return jsonify({"message": "Report added successfully"}), 201


# Define a route to update a report by ID
@bp.route("/<string:report_id>", methods=["PUT"])
def update_report(report_id):
    report = Report.query.get(report_id)
    if not report:
        return jsonify({"message": "Report not found"}), 404

    data = request.json  # Assuming you're sending JSON data in the request

    # Update report properties
    report.description = data.get("description", report.description)
    report.lat = data.get("lat", report.lat)
    report.long = data.get("long", report.long)
    report.status = data.get("status", report.status)

    db.session.commit()

    return jsonify({"message": "Report updated successfully"}), 200


# Define a route to delete a report by ID
@bp.route("/<string:report_id>", methods=["DELETE"])
def delete_report(report_id):
    report = Report.query.get(report_id)
    if not report:
        return jsonify({"message": "Report not found"}), 404

    db.session.delete(report)
    db.session.commit()

    return jsonify({"message": "Report deleted successfully"}), 200


@bp.route("/", methods=["GET"])
def get_all_reports():
    num_reports = request.args.get("limit", default=10, type=int)
    if num_reports <= 0:
        return jsonify({"error": "limit query parameter should be positive"}), 400
    try:
        reports = (
            Report.query.join(
                Bicycle, Report.bike_id == Bicycle.id
            )  # Join Report and Bike tables
            .join(User, Report.user_id == User.id)  # Join Report and User tables
            .order_by(Report.reported_time.desc())
            .limit(num_reports)
            .all()
        )

        reports_data = [
            {
                "id": report.id,
                "user_id": report.user_id,
                "bike_id": report.bike_id,
                "reported_time": report.reported_time.isoformat()
                if report.reported_time
                else None,
                "description": report.description,
                "lat": report.lat,
                "long": report.long,
                "address": decode_coord(report.lat, report.long),
                "status": report.status,
                "bike_brand": report.bicycle.brand,  # Access the bike's brand
                "bike_model": report.bicycle.model,  # Access the bike's model
                "username": report.user.name,  # Access the user's phone number
            }
            for report in reports
        ]

        return jsonify(reports_data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# 2 endpoints

# endpoint to retrieve gpsData,
# unique device id, lat lon

# to notify user of theft (deviceId, boolean isStolen)

# 1. Endpoint to update bicycle coords (bikeId, lat,lon)

# Endpoint Two
# {
# deviceId,
# lat, lon, 
# isStolen (boolean)
# }
# if isStolen, relay it to frontend through push notification,
# 
#
#
# (Explore Push API)
# if !isStolen,
# 1. check bicycleStatus is stolen before, if so set back,
# notify user bicycle is not stolen
#
# 2. check reportStatus is ongoing before, if so set to resolved,
# notify user report has been resolved
#
#
