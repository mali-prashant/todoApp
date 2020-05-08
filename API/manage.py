"""
Entry point to the application
"""
from flask_script import Manager, Server
from flask_migrate import Migrate, MigrateCommand
from flask.cli import FlaskGroup
from v1.database import CreateUsersCommand, db
from app import create_app

CLI = FlaskGroup(create_app=create_app)

app = create_app()
Migrate(app, db)
MANAGER = Manager(app)
SERVER = Server(host="0.0.0.0", port=9200, threaded=True)
MANAGER.add_command('db', MigrateCommand)
MANAGER.add_command("runserver", SERVER)

if __name__ == "__main__":
    MANAGER.run()
