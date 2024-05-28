import os
from flask import Flask, redirect, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from datetime import datetime
import json
from flask_bcrypt import Bcrypt
from flask_login import UserMixin, current_user, login_user, LoginManager
from sqlalchemy import true


app = Flask(__name__)
CORS(app)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///project.db"
app.secret_key = os.urandom(12)
# create the extension
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = "users.login"
login_manager.login_message_category = "info"

if __name__ == "__main__":
    from routes import *

    app.run(debug=True)
