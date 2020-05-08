# Flask settings
# FLASK_SERVER_NAME = 'localhost:8888'
import os
FLASK_DEBUG = True  # Do not use debug mode in production

# Flask-Restplus settings
REST_PLUS_SWAGGER_UI_DOC_EXPANSION = 'list'
REST_PLUS_VALIDATE = True
REST_PLUS_MASK_SWAGGER = False
REST_PLUS_ERROR_404_HELP = False

# SQLAlchemy settings
# SQLALCHEMY_DATABASE_URI = 'postgresql://postgres:root@localhost:5432/pmo_portal'
# SQLALCHEMY_DATABASE_URI = 'postgresql://postgres:postgres@localhost:5432/pmo_ui2'
SQLALCHEMY_DATABASE_URI = 'postgresql://postgres:root@localhost:5432/todo'
# SQLALCHEMY_DATABASE_URI = 'sqlite:///pmo.db'
SQLALCHEMY_TRACK_MODIFICATIONS = False
