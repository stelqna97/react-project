import React from "react";
import "./Users.css";




const cardStyle = {
    width: '16rem'
};
    


export function deleteByUserId(userid)
{
    let tasks=JSON.parse(window.localStorage.getItem("tasks"));
    let result = tasks.filter(t => t.userid !== userid);
    result.forEach(task => {
        task.splice(userid, 1);
    });
    
    let jsonTask =JSON.stringify(result);
    localStorage.setItem("tasks",jsonTask);
}

export function getAllUsers(){
    let users = JSON.parse(localStorage.getItem("users"));
     return users;
}

export function deleteUser(id){
    let users = JSON.parse(localStorage.getItem("users"));
    let toDelete=users.find(u=>u.id===id);
    deleteByUserId(toDelete).then(()=>{
        users = users.filter(u => u.id !== toDelete.id);

          let usersJSON = JSON.stringify(users);
          localStorage.setItem("users", usersJSON);
    })
}


export default class Users extends React.Component {
    

    constructor(props) {
        super(props);
        this.state = {
            currentUser: JSON.parse(window.localStorage.getItem("currentUser")),
            tasks: JSON.parse(window.localStorage.getItem("tasks")),
            users: JSON.parse(window.localStorage.getItem("users")) ,
            allUsers:[]            
        }
    }

    delete = (id) =>{
        
      deleteByUserId(id).then(()=>{
         getAllUsers().then(users=>{
            this.setState({
                allUsers: users
              });
         });
        });
    }
    /*delete = (id) =>{
        let users = [...this.state.users];
        let index = users.findIndex(u => u.id === id);
        users.splice(index, 1);
        this.setState({
            users: users
        })

        window.localStorage.setItem("users", JSON.stringify(users))
    }*/

        
  

    edit = (id) =>{
        this.props.history.push({
            pathname: "/editUser",
            state: {
                user: this.state.users.find(u => u.id === id),
            }
        });
    }
    
    add = (id) =>{
        this.props.history.push({
            pathname: "/addUser",
            state: {
                user: this.state.users.find(u => u.id !== id),
            }
        });
    }
    

    render() {
       
        
        return (
            <div className="users row" >
              
                
                {
                    this.state.users.map((user,idx) =>
                    <div className="card m-3" style={cardStyle} user={user} key={user.id}>
                    <img src={user.photo} alt={user.username} className="photo"/>
                    <div className="card-body">
                        <h5 className="card-title">{user.username}</h5>
                    </div>
                    <ul className="list-group list-group-flush">
                    <li className="list-group-item">Name: {user.name}</li>
                        <li className="list-group-item">Role: {user.role}</li>
                    </ul>
                    <div className="card-body">
                    { (this.state.currentUser.role==="admin" ) &&<a href="/editUser" onClick={() => this.edit(user.id)} >Edit</a>}
                    { this.state.currentUser.role==="admin" &&<a href="/users" onClick={() => this.delete(user.id)}
                                    >Delete</a>}
                    </div>
                
                                    
                                   
                                    
                                </div>
                      
                    )
                }
            </div>
        )
    }
}