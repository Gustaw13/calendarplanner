import json
from flask import app, request, session
import flask
from flask_cors import cross_origin
from flask_login import current_user, login_required, login_user, logout_user
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

    event = Event(
        trainee=request_body.get("trainee"),
        comment=request_body.get("comment"),
        event_date=request_body.get("eventDate"),
        # trainee_id=request_body.get("traineeId"),
    )
    db.session.add(event)
    db.session.commit()
    return json.dumps({"response": "success"})
