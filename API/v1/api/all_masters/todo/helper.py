"""
    Helpers for technology module
"""

try:
    from v1.database import db
    from v1.database.models import ToDo
    # from sqlalchemy.exc import IntegrityError
except ImportError:
    print("Module not found")

def add_todo(data):
    """
        Add new task
    """
    priority = current_sate = None
    title = data.get('title')
    description = data.get('description')
    due_date = data.get('due_date')

    if data.get('priority'):
        priority = data.get('priority')
    if data.get('current_state'):
        current_sate = data.get('current_state')

    todo = ToDo(title, description, due_date, priority, current_sate)
    db.session.add(todo)
    db.session.commit()


def update_todo(_id, data):
    """
        Update existing task
    """

    todo = ToDo.query.get(_id)
    if data.get('title'):
        todo.title = data.get('title')
    if data.get('description'):
        todo.description = data.get('description')
    if data.get('due_date'):
        todo.due_date = data.get('due_date')
    if data.get('priority'):
        todo.priority = data.get('priority')
    if data.get('current_state'):
        todo.current_sate = data.get('current_state')
    db.session.add(todo)
    db.session.commit()


def delete_todo(_id):
    """
        Delete task
    """
    todo = ToDo.query.get(_id)
    db.session.delete(todo)
    db.session.commit()
