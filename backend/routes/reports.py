from flask import Blueprint, request, jsonify
from models import Report, User, Bicycle
from db import db

bp = Blueprint("reports", __name__, url_prefix="/reports")


# Define a route to add a new report
@bp.route("/", methods=["POST"])
def add_report():
    data = request.json  # Assuming you're sending JSON data in the request
    user_id = data.get("user_id")
    bike_id = data.get("bike_id")
    description = data.get("description")

    # Check if the user and bicycle exist
    user = User.query.get(user_id)
    bicycle = Bicycle.query.get(bike_id)

    if not user or not bicycle:
        return jsonify({"message": "User or bicycle not found"}), 404

    # Create a new report
    new_report = Report(user_id=user_id, bike_id=bike_id, description=description)

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
