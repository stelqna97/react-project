import React from "react";


export default class EditTask extends React.Component {

    constructor(props){
        super(props);
        
        this.state = {
            task: props.location.state.task
    
            
            
            
        }
    }

  
    

     


    handleChange = (event) => {
        this.setState({
            task: {
                ...this.state.task,
                [event.target.id]: event.target.value
            }
        });
    }

    editTask = ()=>{
        let task = {
            ...this.state.task,
            time_of_modification: new Date().toString()
        }
        this.setState({
            task: task
        })

        let tasks = JSON.parse(window.localStorage.getItem("tasks"));
        let index = tasks.findIndex(t=> t.id === task.id);
        tasks[index] = task;
        window.localStorage.setItem("tasks", JSON.stringify(tasks));
        this.props.history.push("/tasks");
    }

    

    render() {
        return (

<div className="task-edit-wrapper">            
            <form className="task-edit-form" onSubmit={this.handleSubmit}>
          
                <div className="form-group">
                    <label labelfor="name">Name: </label>
                    <input type="text" name="name" id="name" className="form-control" onChange={this.handleChange} value={this.state.task.name} />
                </div>
                
                            <div className="form-group">
                                <textarea id="description"  className="form-control" data-length="256" onChange={this.handleChange}
                                    value={this.state.task.description}></textarea>
                                <label htmlFor="description"> Description</label>
                            </div>
                    
                    
                                <div className="form-group">
                                    <input id="rating" type="number" className="form-control" onChange={this.handleChange} min="1" max="10" defaultValue={this.state.task.rating} />
                                    <label htmlFor="rating">Rating</label>
                                </div>
                        <div className="form-group">
                <label labelfor="status">Status: </label>
                <select className="form-control" id="status" name="status" onChange={this.handleChange} value={this.state.status}>
                    <option value="Active">Active</option>
                    <option value="Pending">Pending</option>
                    <option value="Done">Done</option>
                </select>
            </div>
                
                <button className="btn btn-success"><a className="link" href="/tasks" onClick={this.editTask}>Save</a></button>
                
                <button className="btn btn-cancel"> <a className="link" href="/tasks"  onClick={() => this.props.history.push("/tasks")}>Cancel</a></button>
            </form>
        </div>

            
        )
    }
}