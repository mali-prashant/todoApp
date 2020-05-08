"""
    Serializers for todo module
"""

try:
    from flask_restplus import fields
    from v1.api.restplus import api, pagination
except ImportError:
    print("Module not found")

TODO = api.model('ToDo', {
    'id': fields.Integer(readOnly=True, description='Unique technology id'),
    'title': fields.String(required=True, description='TOdo title'),
    'description': fields.String(required=True, description='Description '),
    'due_date': fields.Date(required=True, description='Due date'),
    'priority': fields.String(required=True, description='Task priority'),
    'current_state': fields.String(required=False, description='Task current_state'),
})
