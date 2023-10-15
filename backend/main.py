from flask import Flask

from db import db, get_db_uri
from routes import users, bicycles, reports, devices

from models import *
from flask_cors import CORS

# from flask_migrate import Migrate

app = Flask(__name__)

# configure the database, relative to the app instance folder
CORS(app)
app.config["SQLALCHEMY_DATABASE_URI"] = get_db_uri()
# initialize the app with the extension
db.init_app(app)
# with app.app_context():
#     db.create_all()
# migrate = Migrate(app, db)


# Define a route and a view function
@app.route("/", methods=["GET"])
def get_api_health():
    return "API is working"


# Register the route blueprints
app.register_blueprint(users.bp)
app.register_blueprint(bicycles.bp)
app.register_blueprint(reports.bp)
app.register_blueprint(devices.bp)


def main():
    app.run(debug=True, port=1234)


# Run the app
if __name__ == "__main__":
    main()


# Users
# ID: uuid
# name: str
# email: str
# hashed_password: str

# Bicycles
# ID: uuid
# name: str
# brand: str
# model: str
# user_id: uuid
# description: str
# lat: float
# lon: float
# TODO:
# (picture)
# device_id

# Reports
# ID: uuid
# user_id: uuid
# bike_id: uuid = None
# reported_time: timestamp
# description: str
# is_active: [ongoing (1), closed (0)]


# Geolocation
# ID, name, user_id, description, (picture)

# location: {lat: , lon: }
