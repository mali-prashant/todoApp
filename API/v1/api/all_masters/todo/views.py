"""
    APIs for technology module
"""


try:
    import sys
    import logging
    # from flask import request, Response
    from flask import request
    from flask_restplus import Resource, marshal
    from v1.api.all_masters.todo.serilizer import TODO
    # from v1.api.all_masters.parsers import pagination_arguments
    from v1.api.all_masters.todo.helper import add_todo, update_todo, \
        delete_todo
    from v1.api.restplus import api
    from v1.database.models import ToDo
    from v1.database import db
    from sqlalchemy.exc import SQLAlchemyError
    # import json
except ImportError:
    print("Module not found")

LOG = logging.getLogger(__name__)

NS = api.namespace('todos', description='All todos data')

@NS.route('/')
class ToDoCollection(Resource):
    """
        Show existing data of todos
    """

    @staticmethod
    @api.marshal_list_with(TODO)
    def get():
        """
        Returns list of all todos.
        """

        return ToDo.query.all()
    # @api.expect(pagination_arguments)

    @staticmethod
    @api.expect(ToDo)
    def post():
        """
            Creates a new task.
        """
        try:
            data = request.json
            if db.session.query(db.exists().where(ToDo.title == data['title'])).scalar():
                return {"error_message": "task is already exist"}

            else:
                add_todo(data)
                return "Task added", 201

        except SQLAlchemyError as _e:
            error = str(_e)
            return error

        except SystemError as _e:
            print("Oops!", sys.exc_info()[0], "occured.")
            return {"error_message": str(_e)}


@NS.route('/<int:_id>')
@api.response(404, 'task not found.')
class ToDoItem(Resource):
    """
        Get info of task by id
    """

    @staticmethod
    @api.marshal_with(TODO)
    def get(_id):
        """
        Returns a technologys.
        """
        try:
            todo_data = ToDo.query.get(_id)

            if not todo_data:
                return {"err_msg": "task id not valid"}
            return marshal(todo_data, TODO), 200

        except SQLAlchemyError as _e:
            error = str(_e)
            return error

        except SystemError as _e:
            print("Oops!", sys.exc_info()[0], "occured.")
            return {"error_message": str(_e)}

    @staticmethod
    @api.expect(TODO)
    @api.response(204, 'Todo successfully updated.')
    def put(_id):
        """
        Updates a todo information.
        """

        try:
            data = request.json
            todo = ToDo.query.get(_id)
            if not todo:
                return {"error_message": "todo does not exist"}
            update_todo(_id, data)
            return "Task updated"
        except SQLAlchemyError as _e:
            error = str(_e)
            return error

        except SystemError as _e:
            print("Oops!", sys.exc_info()[0], "occured.")
            return {"error_message": str(_e)}

    @staticmethod
    @api.response(204, 'task successfully deleted.')
    def delete(_id):
        """
        Deletes task.
        """
        todo = ToDo.query.get(_id)
        if not todo:
            return {"error_message": "todo id does not exist"}

        delete_todo(_id)
        return "task deleted", 204
