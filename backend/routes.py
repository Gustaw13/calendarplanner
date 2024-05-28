import json
import bcrypt
from flask import app, request
from flask_login import current_user, login_user
from models import User
from app import login_manager, db, app


@login_manager.user_loader
def load_user(user_id):
    print(user_id)
    return User.query.get(int(user_id))


@app.route("/sign-up", methods=["POST"])
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
def login():

    request_body = json.loads(request.data)

    user = User.query.filter_by(email=request_body.get("email")).first()
    if user and bcrypt.check_password_hash(user.password, request_body.get("password")):
        login_user(user, remember=True, force=True)
        print("test")
        return json.dumps({"response": "success"})
    return json.dumps({"response": "error"})


@app.route("/get-current-user", methods=["GET"])
def get_current_user():
    # if current_user and current_user.is_authenticated:
    return json.dumps({"username": current_user.is_authenticated})
