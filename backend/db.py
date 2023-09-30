from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase
import urllib.parse

class Base(DeclarativeBase):
    pass

user = 'htx_admin'
password = '<redacted>'
host = 'htx-23.mysql.database.azure.com'
port = 3306
database = 'htx_23'

def get_db_uri():
    uri = "mysql+pymysql://{0}:{1}@{2}:{3}/{4}".format(
        urllib.parse.quote(user), 
        urllib.parse.quote(password), 
        urllib.parse.quote(host), 
        port, 
        urllib.parse.quote(database)
    )
    print(uri)
    return uri

db = SQLAlchemy(model_class=Base)
