import React, { Component } from 'react';
import axios from 'axios';
import swal from 'sweetalert';


export default class DeleteTodo extends Component {

    componentDidMount() {
            swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover this imaginary file!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
              })
              .then((willDelete) => {
                if (willDelete) {
                    axios.delete('http://localhost:9200/api/todos/'+this.props.match.params.id)
                    .then(res => console.log(res.data));
                  swal("Poof! Your task has been deleted!", {
                    icon: "success",
                  });
                } else {
                  swal("Your task is safe!");
                }
                this.props.history.push('/todolist')
              });
    }
    render() {
        return (
            <div>
                <p>Record delete successfully</p>
            </div>
        )
    }
}