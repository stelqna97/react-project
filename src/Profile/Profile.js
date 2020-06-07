import React from "react"
import "./Profile.css"

export default class Profile extends React.Component {

    constructor(props) {
        super(props);
        let currentUser = JSON.parse(window.localStorage.getItem("currentUser"))
        this.state = {
            currentUser: currentUser


        }
    }


    handleChange = (event) => {
        this.setState({
            user: {
                ...this.state.user,
                [event.target.id]: event.target.value
            }
        });
    }

    save = ()=>{
        let user = {
            ...this.state.user,
            dateOfModification: new Date().toString()
        }
        this.setState({
            currentUser: user,
            user: user
        })

        window.localStorage.setItem("currentUser", JSON.stringify(user))
        let users = JSON.parse(window.localStorage.getItem("users"));
        let index = users.findIndex(u => u.id === user.id);
        users[index] = user;
        window.localStorage.setItem("users", JSON.stringify(users));
    }

    
    render() {
        return (

            <div className="user row" >
              
           
                <div className="card m-3" >
                <img src={this.state.currentUser.photo} alt={this.state.currentUser.username} className="photo"/>
                <div className="card-body">
                    <h5 className="card-title">{this.state.currentUser.username}</h5>
                </div>
                <ul className="list-group list-group-flush">
                <li className="list-group-item">Name: {this.state.currentUser.name}</li>
                    <li className="list-group-item">Role: {this.state.currentUser.role}</li>
                </ul>
                <div className="card-body">
                <a href="/editprofile"  >Edit</a>
                              
                </div>
                
                </div>
               
        </div>

           
        )
    }
}