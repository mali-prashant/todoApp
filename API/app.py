"""
In this app file setup all the namespace or blueprint,
"""
import logging.config
from os import path
from flask import Flask, Blueprint
from flask_migrate import Migrate
from flask_cors import CORS
import settings
from v1.api.all_masters.todo.views import NS as too_namespace
from v1.api.restplus import api
from v1.database import db

# MG = Migrate()

# logging_conf_path = os.path.normpath(os.path.join(os.path.dirname(__file__), '../logging.conf'))
# logging.config.fileConfig(logging_conf_path)
# log = logging.getLogger(__name__)
#
LOG_FILE_PATH = path.join(path.dirname(path.abspath(__file__)), 'logging.conf')
logging.config.fileConfig(LOG_FILE_PATH)
LOG_FILE_PATH = logging.getLogger(__name__)


def create_app():
    """
    setup database URI and swagger namespace endpoints
    :param main:
    :return:
    """
    app = Flask(__name__)
    app.config['DEBUG'] = settings.FLASK_DEBUG
    app.config['SQLALCHEMY_DATABASE_URI'] = settings.SQLALCHEMY_DATABASE_URI
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = settings.SQLALCHEMY_TRACK_MODIFICATIONS
    app.config['SWAGGER_UI_DOC_EXPANSION'] = settings.REST_PLUS_SWAGGER_UI_DOC_EXPANSION
    app.config['REST_PLUS_VALIDATE'] = settings.REST_PLUS_VALIDATE
    app.config['REST_PLUS_MASK_SWAGGER'] = settings.REST_PLUS_MASK_SWAGGER
    app.config['ERROR_404_HELP'] = settings.REST_PLUS_ERROR_404_HELP
    CORS(app, supports_credentials=True)

    blueprint = Blueprint('api', __name__, url_prefix='/api')
    api.init_app(blueprint)
    api.add_namespace(too_namespace)
    app.register_blueprint(blueprint)
    db.init_app(app)
    # MG.init_app(app, db)
    return app
