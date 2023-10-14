from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase
from dotenv import load_dotenv
import urllib.parse
import os


class Base(DeclarativeBase):
    pass


load_dotenv()


user = os.getenv("user")
password = os.getenv("password")
host = os.getenv("host")
port = os.getenv("port")
database = os.getenv("database")
sas_url = os.getenv("sas_url")
container_name = os.getenv("container_name")


def get_db_uri():
    uri = "mysql+pymysql://{0}:{1}@{2}:{3}/{4}".format(
        urllib.parse.quote(user),
        urllib.parse.quote(password),
        urllib.parse.quote(host),
        port,
        urllib.parse.quote(database),
    )
    print(uri)
    return uri


db = SQLAlchemy(model_class=Base)
