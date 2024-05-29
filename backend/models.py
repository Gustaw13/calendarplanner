from datetime import datetime
from flask_login import UserMixin
from app import db, app


class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(60), nullable=False)
    user_type = db.Column(db.String(30), nullable=False)

    def __repr__(self):
        return f"User('{self.first_name}', '{self.last_name}', '{self.email}',)"


class Event(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    trainee = db.Column(db.String(50), nullable=False)
    comment = db.Column(db.String(100))
    event_date = db.Column(db.DateTime, nullable=False, default=datetime.now)
    created_date = db.Column(db.DateTime, nullable=False, default=datetime.now)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    trainee_id = db.Column(db.Integer, db.ForeignKey("trainee.id"), nullable=False)

    def __repr__(self):
        return f"Event('{self.title}', '{self.event_date}')"


if __name__ == "__main__":
    with app.app_context():
        db.create_all()
