import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Todo = props => (
    <tr>
        <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.title}</td>
        <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.description}</td>
        <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.priority}</td>
        <td>
            <Link to={"/edit/"+props.todo.id}>Edit</Link>
        </td>
        <td>
            <Link to={"/delete/"+props.todo.id}>Delete</Link>
            
        </td>
    </tr>
)

export default class TodosList extends Component {

    constructor(props) {
        super(props);
        this.state = {todos: []};
    }

    componentDidMount() {
        axios.get('http://localhost:9200/api/todos/')
            .then(response => {
                console.log(response.data)
                this.setState({ todos: response.data });
                // console.log(response.data)
            })
            .catch(function (error){
                console.log(error);
            })
    }

    todoList() {
        return this.state.todos.map(function(currentTodo, i){
            return <Todo todo={currentTodo} key={i} />;
        })
    }

    render() {
        return (
            <div>
                <h3>Todos List</h3>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th>Summary</th>
                            <th>Description</th>
                            <th>Priority</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.todoList() }
                    </tbody>
                </table>
            </div>
        )
    }
}
