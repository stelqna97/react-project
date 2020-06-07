import React from "react"
import "./Tasks.css"

const listStyles = {
    margin: '5px',
    flexWrap: 'wrap'
    
};

export async function getByUserId(id){
    let allTasks=JSON.parse(window.localStorage.getItem("tasks"))
    
    if (!allTasks) {
     allTasks = [];
   }
 
   let result = allTasks.filter(t => t.user_id === id);
 
   return result;
  }


export default class Tasks extends React.Component {


    constructor(props) {
        super(props);
        
        localStorage.removeItem('recipes');
        this.state = {
            currentUser: JSON.parse(window.localStorage.getItem("currentUser")),
            tasks: []
          
        }

       
    }


    
componentDidMount(){
   getByUserId(this.state.currentUser.id).then(db =>{
        this.setState({
            tasks:db
        })
    })
}
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
                  
                  this.state.tasks.map((task) =>
                  <div className="card m-3" task={task} key={task.id}>
                
                  <div className="card-body">
                      <h5 className="card-title">{task.user.username}</h5>
                  </div>
                  <ul className="list-group list-group-flush">
                  <li className="list-group-item">Name: {task.name}</li>
                      <li className="list-group-item">Status: {task.status}</li>
                      <li className="list-group-item">Rating: {task.rating}</li>
                  </ul>
                  <div className="card-body">
                  { (this.state.currentUser.role==="admin" || this.state.currentUser.id === task.user_id) && <a href="/edittasks" onClick={()  => this.edit(task.id)}>Edit</a>}
            { (this.state.currentUser.role==="admin" || this.state.currentUser.id === task.user_id) && <a href="/tasks" onClick={() => this.delete(task.id)}>Delete</a>}
                                 
                  </div>
              
                  </div>
                      
                    )
                }
            </div>
        )
    }
}