import React from "react"
import "./Tasks.css"

const listStyles = {
    margin: '5px',
    flexWrap: 'wrap'

};

/*export function getById(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let tasks = localStorage.getItem("tasks");
        let jsontasks = JSON.parse(tasks);

        let result = jsontasks.find(r => r.user.id === id);

        resolve(result);
      }, 1000);
    });
  }*/

export default class Tasks extends React.Component {

    constructor(props) {
        super(props);
       
        
        this.state = {
            currentUser: JSON.parse(window.localStorage.getItem("currentUser")),
            tasks: JSON.parse(window.localStorage.getItem("tasks")),
            filtered: JSON.parse(window.localStorage.getItem("tasks")),
            bgColor: 'red'
        }
    }

    
     colorChangeStatus = () => {
       if(this.state.tasks.status==="Active"){
        this.setState({
            bgColor: 'green'
          })
       }else if(this.state.tasks.status==="Done"){
        this.setState({
            bgColor: 'brown'
          })
       }else if(this.state.tasks.status==="Pending"){
        this.setState({
            bgColor: 'yellow'
          })
       }
      };


    delete = (id) => {
        let tasks = [...this.state.tasks].filter(t => t.id !== id);
        
        this.setState({
            tasks: tasks
            
        })

        window.localStorage.setItem("tasks", JSON.stringify(tasks))
    }

    edit = (id) => {
        this.props.history.push({
            pathname: "/edittask",
            state: {
                task: this.state.tasks.find(t => t.id === id)
                
            }
        });
    }

    
    
    
  

    render() {
        
        return (

             <div className="tasks row" style={listStyles}>
              
           

              {
                  this.state.tasks.map((task,idx) =>
                  <div className="card m-3" style={{backgroundColor:this.state.bgColor}} task={task} key={task.id} onChange={this.colorChangeStatus}>
                
                  <div className="card-body">
                      <h5 className="card-title">{task.user.username}</h5>
                  </div>
                  <ul className="list-group list-group-flush">
                  <li className="list-group-item">Name: {task.name}</li>
                      <li className="list-group-item">Status: {task.status}</li>
                      <li className="list-group-item">Rating: {task.rating}</li>
                  </ul>
                  <div className="card-body">
                  { (this.state.currentUser.role==="admin" || this.state.currentUser.id === task.user_id) && <a href="/edittask" onClick={()  => this.edit(task.id)}>Edit</a>}
            { (this.state.currentUser.role==="admin" || this.state.currentUser.id === task.user_id) && <a href="/tasks" onClick={() => this.delete(task.id)}>Delete</a>}
                                 
                  </div>
              
                  </div>
                      
                    )
                }
            </div>
        )
    }
}