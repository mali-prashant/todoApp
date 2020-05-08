import React, { Component } from 'react';
import axios from 'axios';

export default class EditTodo extends Component {

    constructor(props) {
        super(props);

        this.onChangeTodoDescription = this.onChangeTodoDescription.bind(this);
        this.onChangeTodoTitle = this.onChangeTodoTitle.bind(this);
        this.onChangeTodoPriority = this.onChangeTodoPriority.bind(this);
        this.onChangeTodoCompleted = this.onChangeTodoCompleted.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            title:'',
            description: '',
            due_date: '',
            priority: '',
            current_state: ''
        }
    }
    componentDidMount() {
        axios.get('http://localhost:9200/api/todos/' + this.props.match.params.id)
            .then(response => {
                console.log(response)
                this.setState({
                    title: response.data.title,
                    description: response.data.description,
                    due_date: response.data.due_date,
                    priority: response.data.priority,
                    current_state: response.data.current_state
                })
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    onChangeTodoDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    onChangeTodoTitle(e) {
        this.setState({
            title: e.target.value
        });
    }
    onChangeTodoPriority(e){
        this.setState({
            priority: e.target.value
        })
    }

    onChangeTodoCompleted(e) {
        this.setState({
            current_state: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const obj = {
            description: this.state.description,
            title: this.state.title,
            priority: this.state.priority,
            current_state: this.state.current_state
        };
        console.log(obj);
        axios.put('http://localhost:9200/api/todos/'+this.props.match.params.id, obj)
            .then(res => console.log(res.data));
        this.props.history.push('/');
        this.props.history.push('/');
    }

    render() {
        return (
            <div>
                <h3 align="center">Update Todo</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Summary: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.title}
                                onChange={this.onChangeTodoTitle}
                                />
                    </div>
                    <div className="form-group">
                        <label>Description: </label>
                        <input
                                type="text"
                                className="form-control"
                                value={this.state.description}
                                onChange={this.onChangeTodoDescription}
                                />
                    </div>
                    <div className="form-group">
                        <div>
                            <label>Priority:</label></div>
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input"
                                    type="radio"
                                    name="priorityOptions"
                                    id="priorityLow"
                                    value="Low"
                                    checked={this.state.priority==='Low'}
                                    onChange={this.onChangeTodoPriority}
                                    />
                            <label className="form-check-label">Low</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input"
                                    type="radio"
                                    name="priorityOptions"
                                    id="priorityMedium"
                                    value="Medium"
                                    checked={this.state.priority==='Medium'}
                                    onChange={this.onChangeTodoPriority}
                                    />
                            <label className="form-check-label">Medium</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input"
                                    type="radio"
                                    name="priorityOptions"
                                    id="priorityHigh"
                                    value="High"
                                    checked={this.state.priority==='High'}
                                    onChange={this.onChangeTodoPriority}
                                    />
                            <label className="form-check-label">High</label>
                        </div>
                    </div>
                    <div className="form-check">
                        <input  className="form-check-input"
                                id="completedCheckbox"
                                type="checkbox"
                                name="completedCheckbox"
                                onChange={this.onChangeTodoCompleted}
                                checked={this.state.current_state}
                                value={this.state.current_state}
                                />
                        <label className="form-check-label" htmlFor="completedCheckbox">
                            Completed
                        </label>
                    </div>

                    <br />

                    <div className="form-group">
                        <input type="submit" value="Save" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}
