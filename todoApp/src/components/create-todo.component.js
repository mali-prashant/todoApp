import axios from 'axios';
import React, { Component } from 'react';
import swal from 'sweetalert';  

export default class CreateTodo extends Component {    constructor(props) {
        super(props);        
        this.onChangeTodoTitle = this.onChangeTodoTitle.bind(this)
        this.onChangeTodoDescription = this.onChangeTodoDescription.bind(this);
        // this.onChangeTodoResponsible = this.onChangeTodoResponsible.bind(this);
        this.onChangeTodoDate = this.onChangeTodoDate.bind(this);
        this.onChangeTodoPriority = this.onChangeTodoPriority.bind(this);
        this.onSubmit = this.onSubmit.bind(this);       
        this.state = {
            title:'',
            description: '',
            due_date: '',
            priority: '',
            current_state: false
        }
    }    
    onChangeTodoTitle(e) {
        this.setState({
            title: e.target.value
        });
    }
    onChangeTodoDescription(e) {
        this.setState({
            description: e.target.value
        });
    }   
    onChangeTodoDate(e) {
        this.setState({
            due_date: e.target.value
        });
    }  onChangeTodoPriority(e) {
        this.setState({
            priority: e.target.value
        });
    }    onSubmit(e) {
        e.preventDefault();
        const newTodo = {
                title: this.state.title,
                description: this.state.description,
                due_date: this.state.due_date,
                priority: this.state.priority
        };

        axios.post('http://localhost:9200/api/todos/', newTodo)
            .then(res => console.log(res.data));
          
        this.setState({
            title: '',
            description: '',
            due_date: '',
            priority: ''
        })
        alert("Record successfully inserted..")
        this.props.history.push('/');
        //swal("Good job!", "Record inserted successfully!", "success");
       
    }    render() {
        return (
            <div style={{marginTop: 10}}>
                <h3>Create Todo App</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Summary: </label>
                        <input
                                type="text"
                                className="form-control"
                                value={this.state.title}
                                onChange={this.onChangeTodoTitle} placeholder="Summary"
                                />
                    </div>
                    
                    <div className="form-group">
                        <label>Description: </label>
                        
                        <textarea rows="4" className="form-control" value={this.state.description} onChange={this.onChangeTodoDescription} cols="50" placeholder="Description" >
                        </textarea>        
                    </div>
                    <div className="form-group">
                        <label>Due Date: </label>
                        <input
                                type="date"
                                className="form-control"
                                value={this.state.due_date}
                                onChange={this.onChangeTodoDate}
                                />
                    </div>
                    <div className="form-group">
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
                    </div>                    <div className="form-group">
                        <input type="submit" value="Create Todo" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}
