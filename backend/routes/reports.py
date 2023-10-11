from flask import Blueprint, request, jsonify
from models import Report, User, Bicycle
from db import db
from geopy.geocoders import Nominatim
import datetime

bp = Blueprint("reports", __name__, url_prefix="/reports")


def decode_coord(lat, long):
    if lat is None or long is None:
        return None
    geolocator = Nominatim(user_agent="MyApp")
    location = geolocator.reverse([lat, long])
    address = location.raw["address"]
    return f"{address['suburb']}, {address['road']}"


# Define a route to add a new report
@bp.route("/", methods=["POST"])
def add_report():
    data = request.json  # Assuming you're sending JSON data in the request
    user_id = data.get("user_id")
    bike_id = data.get("bike_id")
    description = data.get("description")
    lat = data.get("lat")
    long = data.get("long")

    reported_time = datetime.now()

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
    # if limit query param is not present or is of non-int type, default of 10 is used
    num_reports = request.args.get("limit", default=10, type=int)
    if num_reports <= 0:
        return jsonify({"error": "limit query parameter should be positive"}), 400
    try:
        # sort by reported_time desc
        reports = (
            Report.query.order_by(Report.reported_time.desc()).limit(num_reports).all()
        )

        # Convert reports to a list of dictionaries
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
            }
            for report in reports
        ]

        return jsonify(reports_data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
