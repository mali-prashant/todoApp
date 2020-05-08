from datetime import datetime
from v1.database import db


class ToDo(db.Model):
    __tablename__ = 'todoapp'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=False)
    due_date = db.Column(db.Date())
    priority = db.Column(db.String(255), nullable=False)
    current_state = db.Column(db.String(50), default='Pending')
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    def __init__(self, title, description, due_date, priority, current_state):

        self.title = title
        self.description = description
        self.due_date = due_date
        self.priority = priority
        self.current_state = current_state