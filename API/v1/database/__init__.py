from flask_sqlalchemy import SQLAlchemy
from flask_script import Command
db = SQLAlchemy()


class CreateUsersCommand(Command):
    def run(self):
        create_users()
        print('Users created.')


def create_users():
    """ Create users """
    # Create all tables if not exists
    db.create_all()
    db.session.commit()
