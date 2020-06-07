import React from "react";


export default class AddTask extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            currentUser: JSON.parse(window.localStorage.getItem("currentUser")),
            tasks: JSON.parse(window.localStorage.getItem("tasks")),
            task:  {
                id: "",
                user: JSON.parse(window.localStorage.getItem("currentUser")),
                user_id: "",
                name: "",
                description: "",
                status:'Active',
                time_of_creation: "",
                rating:''
            }
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

    makeid = (length) => {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    createTask = () => {
        
        let task = {
            ...this.state.task,
            id: this.makeid(20),
            user_id: this.state.currentUser.id,
            time_of_creation: new Date().toString()
        }
        let tasks = [...this.state.tasks, task]
        this.setState({
            tasks: tasks
        })

        window.localStorage.setItem("tasks", JSON.stringify(tasks))
        this.props.history.push("/tasks");
    }

 

  

    render() {
        return (
            <div className="task-add-wrapper">            
            <form className="task-add-form" onSubmit={this.handleSubmit}>
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
                                    <input id="rating" type="number" className="form-control" onChange={this.handleChange} min="1" max="10" value={this.state.task.rating} />
                                    <label htmlFor="rating">Rating</label>
                                </div>
                           
                            <div className="form-group">
                         <label labelfor="status">Status: </label>
                    <select className="form-control" id="status" name="status" onChange={this.handleChange} value={this.state.task.status}>
                        <option value="Active">Active</option>
                        <option value="Pending">Pending</option>
                        <option value="Done">Done</option>
                    </select>
                </div>
                
                <button className="btn btn-success"> <a className="link" href="/tasks" onClick={this.createTask}>Save</a></button>
                  <button className="btn btn-cancell">  <a className="link" href="/tasks"  onClick={() => this.props.history.push("/users")}>Cancel</a></button>

            </form>
        </div>
           
        )
    }
}