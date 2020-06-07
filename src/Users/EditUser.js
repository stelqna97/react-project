import React from "react";
import "./Users.css"



export default class EditUser extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            
            user: props.location.state.user
            
            
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
            user: user
        })

        let users = JSON.parse(window.localStorage.getItem("users"));
        let index = users.findIndex(u => u.id === user.id);
        users[index] = user;
        window.localStorage.setItem("users", JSON.stringify(users));
        this.props.history.push("/users");
    }

    render() {
        return (
          
        <div className="user-edit-wrapper">            
            <form className="user-edit-form" onSubmit={this.handleSubmit}>
            { this.state.invalid && <span className="text-danger">{this.state.errorMessage}</span> }
                <div className="form-group">
                    <label labelfor="name">Name: </label>
                    <input type="text" name="name" id="name" className="form-control" onChange={this.handleChange} value={this.state.user.name} />
                </div>
                <div className="form-group">
                    <label labelfor="username">Username: </label>
                    <input type="text" name="name" id="username" className="form-control" onChange={this.handleChange} value={this.state.user.username} />
                </div>
                <div className="form-group">
                    <label labelfor="password">Password: </label>
                    <input type="password" name="password" id="password" className="form-control" onChange={this.handleChange} value={this.state.user.password} />
                </div>
                <div className="input-field col s12">
                <label htmlFor="description">Description</label>
                <textarea id="description" className="form-control" onChange={this.handleChange} value={this.state.user.description}></textarea>               
                </div>
                
                <div className="form-group">
                    <label labelfor="role">Role: </label>
                    <input type="text" name="name" id="role" className="form-control" onChange={this.handleChange} value={this.state.user.role} />
                </div>
                <div className="form-group">
                    <label labelfor="photo">Photo: </label>
                    <input type="text" name="name" id="photo" className="form-control" onChange={this.handleChange} value={this.state.user.photo} />
                </div>
                <button className="btn btn-success"><a className="link" href="/users"  onClick={this.save}>Save</a></button>
                
                <button className="btn btn-cancel">  <a className="link" href="/users"  onClick={() => this.props.history.push("/users")}>Cancel</a></button>
            </form>
        </div>
        
           
                       

        )
    }
}