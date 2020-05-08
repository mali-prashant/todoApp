import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import CreateTodo from "./components/create-todo.component";
import EditTodo from "./components/edit-todo.component";
import TodosList from "./components/todos-list.component";
import DeleteTodo from './components/delete-todo.component';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';


import logo from "./logo.svg";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
        <Navbar bg="dark" variant="dark">
        <a class="navbar-brand" href="https://codingthesmartway.com" target="_blank">
              <img src={logo} width="30" height="30" alt="CodingTheSmartWay.com" />
            </a>
        <Navbar.Brand>
          TODO APP
        </Navbar.Brand>
            <div className="collpase navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/" className="nav-link">TodosList</Link>
                </li>
               
              </ul>
            </div>
            <div className="navbar-item">
                  <Link to="/create" className="nav-link"><Button variant="primary">Add</Button>{' '}</Link>
            </div>
      </Navbar>

          <br/>
          <Route path="/" exact component={TodosList} />
          <Route path="/edit/:id" component={EditTodo} />
          <Route path="/create" component={CreateTodo} />
          <Route path="/delete/:id" component={DeleteTodo} />
          <Route path="/todolist" component={TodosList} />
        </div>
      </Router>
    );
  }
}export default App;
