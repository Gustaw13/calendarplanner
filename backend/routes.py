import json
from flask import app, request, session
import flask
from flask_cors import cross_origin
from flask_login import current_user, login_required, login_user
from models import User
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

    response = flask.jsonify({"response": "success"})
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response


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


@app.route("/get-current-user", methods=["GET"])
@cross_origin(supports_credentials=True)
def get_current_user():
    return json.dumps({"username": current_user.is_authenticated})
