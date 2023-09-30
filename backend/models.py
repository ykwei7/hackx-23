import uuid
from sqlalchemy import Column, String, Integer, ForeignKey, Text, DateTime
from sqlalchemy.orm import relationship

from db import db


class User(db.Model):
    id = Column(String(36), primary_key=True, default=uuid.uuid4)
    name = Column(String(64), nullable=False)
    email = Column(String(64), unique=True, nullable=False)
    hashed_password = Column(String(64), nullable=False)

    # Define a one-to-many relationship with bicycles
    bicycles = relationship("Bicycle", back_populates="user")
    reports = relationship("Report", back_populates="user")

    def __repr__(self) -> str:
        return f"User(id={self.id!r}, name={self.name!r}, email={self.email!r})"


class Bicycle(db.Model):
    id = Column(String(36), primary_key=True, default=uuid.uuid4)
    name = Column(String(64), nullable=False)
    brand = Column(String(64), nullable=False)
    model = Column(String(64), nullable=False)
    user_id = Column(String(36), ForeignKey("user.id"), nullable=False)
    description = Column(Text())

    # Define a many-to-one relationship with users
    user = relationship("User", back_populates="bicycles")
    reports = relationship("Report", back_populates="bicycle")

    # Add fields for latitude and longitude
    last_seen_lat = Column(Integer, nullable=True)
    last_seen_lon = Column(Integer, nullable=True)

    # You can add a field for the picture (if needed)

    def __repr__(self) -> str:
        return f"Bicycle(id={self.id!r}, name={self.name!r}, brand={self.brand!r})"


class Report(db.Model):
    id = Column(String(36), primary_key=True, default=uuid.uuid4)
    user_id = Column(String(36), ForeignKey("user.id"), nullable=False)
    bike_id = Column(String(36), ForeignKey("bicycle.id"), nullable=False)
    reported_time = Column(DateTime(timezone=True))
    description = Column(Text())

    # Define a many-to-one relationship with users
    user = relationship("User", back_populates="reports")

    # Define a many-to-one relationship with bicycles
    bicycle = relationship("Bicycle", back_populates="reports")
