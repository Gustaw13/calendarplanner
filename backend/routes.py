from datetime import datetime
import json
from flask import app, request, session
import flask
from flask_cors import cross_origin
from flask_login import current_user, login_required, login_user, logout_user
from utils import Serializer
from models import User, Event
from app import login_manager, db, app, bcrypt


@login_manager.user_loader
def load_user(id):
    return User.query.get(int(id))


@app.route("/sign-up", methods=["POST"])
@cross_origin(supports_credentials=True)
def sign_up():
    request_body = json.loads(request.data)

    hashed_password = bcrypt.generate_password_hash(
        request_body.get("password")
    ).decode("utf-8")
    user = User(
        first_name=request_body.get("firstName"),
        last_name=request_body.get("lastName"),
        email=request_body.get("email"),
        password=hashed_password,
        user_type=request_body.get("userType"),
    )
    db.session.add(user)
    db.session.commit()
    return json.dumps({"response": "success"})


@app.route("/login", methods=["POST"])
@cross_origin(supports_credentials=True)
def login():

    request_body = json.loads(request.data)

    user = User.query.filter_by(email=request_body.get("email")).first()
    if user and bcrypt.check_password_hash(user.password, request_body.get("password")):
        login_user(user, remember=True, force=True)
        session["userId"] = user.id
        print("test")
        print(current_user.is_authenticated)
        return json.dumps({"response": "success"})
    print(user)
    return json.dumps({"response": "error"})


@app.route("/logout")
@cross_origin(supports_credentials=True)
def logout():
    logout_user()
    return json.dumps({"username": current_user.is_authenticated})


@app.route("/get-current-user", methods=["GET"])
@cross_origin(supports_credentials=True)
def get_current_user():
    return json.dumps(
        {"email": current_user.email if current_user.is_authenticated else ""}
    )


@app.route("/add-event", methods=["POST"])
@cross_origin(supports_credentials=True)
def add_event():
    request_body = json.loads(request.data)
    print(request_body.get("eventDate"))
    date = datetime.strptime(request_body.get("eventDate"), "%Y-%m-%d %H:%M:%S")
    event = Event(
        comment=request_body.get("comment"),
        event_date=date,
        created_date=datetime.now(),
        trainer_id=current_user.id,
        student_id=request_body.get("studentId"),
    )
    db.session.add(event)
    db.session.commit()
    return json.dumps({"response": "success"})


@app.route("/get-all-students", methods=["GET"])
@cross_origin(supports_credentials=True)
def get_all_students():
    students = Serializer.serialize_list(
        User.query.filter_by(user_type="Student").all()
    )

    return json.dumps({"students": students})


@app.route("/get-my-events", methods=["GET"])
@cross_origin(supports_credentials=True)
def get_my_events():
    my_events = Serializer.serialize_list(
        Event.query.filter_by(student_id=current_user.id).all()
    )

    return json.dumps({"events": my_events}, default=str)


@app.route("/get-all-events", methods=["GET"])
@cross_origin(supports_credentials=True)
def get_all_events():
    all_events = Serializer.serialize_list(Event.query.all())

    return json.dumps({"events": all_events}, default=str)
