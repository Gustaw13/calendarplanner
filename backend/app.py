import os
from flask import Flask, redirect, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from datetime import datetime
from flask_session import Session
import json
from flask_bcrypt import Bcrypt
from flask_login import UserMixin, current_user, login_user, LoginManager
from sqlalchemy import true


app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///project.db"
CORS(app)
# create the extension
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = "users.login"
login_manager.login_message_category = "info"
app.secret_key = os.urandom(12)
app.config['SESSION_TYPE'] = 'filesystem'
app.config.update(SESSION_COOKIE_SAMESITE="None", SESSION_COOKIE_SECURE=True)
session = Session(app)

if __name__ == "__main__":
    from routes import *

    app.run(debug=True, port=8000)
