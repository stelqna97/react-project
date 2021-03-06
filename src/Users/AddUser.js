import React from "react";
import "./Users.css"

export default class AddUser extends React.Component {

    constructor(props){
        super(props);
          this.state={
            users: JSON.parse(window.localStorage.getItem("users")),
            user: {
            name:'',
            id:'',
            password:'',
            username:'',
            photo:'',
            role:'user',
            invalid:false,
            errorMessage:''           
        }
        }
    }
    isValid = () => {
        if (this.state.users.find(u => u.username === this.state.user.username)) {
            this.setState({
                invalid: true,
                errorMessage: "This username is already taken."
            })
            return false;

        }
         this.setState({
            invalid: false
        })

        return true;
    }

    handleChange = (event) => {
        this.setState({
            user: {
                ...this.state.user,
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


    handleSubmit=(event)=>{
        event.preventDefault()
        if(this.isValid()){
            let user = {
                ...this.state.user,
                id: this.makeid(20),
                photo:'https://www.pngitem.com/pimgs/m/30-307416_profile-icon-png-image-free-download-searchpng-employee.png'
            }
        
            let users = [...this.state.users, user]
            this.setState({
                users: users
            })
    
            window.localStorage.setItem("users", JSON.stringify(users))
            this.props.history.push("/users");
        }
           
        
    }

   

    
    

    render() {
        return (

            <div className="user-add-wrapper">            
            <form className="user-add-form" onSubmit={this.handleSubmit}>
            { this.state.invalid && <span className="text-danger">{this.state.errorMessage}</span> }
                <div className="form-group">
                    <label labelfor="name">Name: </label>
                    <input type="text" name="name" id="name" className="form-control" onChange={this.handleChange} value={this.state.user.name} />
                </div>
                <div className="form-group">
                    <label labelfor="username">Username: </label>
                    <input type="text" name="username" id="username" className="form-control" onChange={this.handleChange} value={this.state.user.username} />
                </div>
                <div className="input-field col s12">
                     <label labelfor="password">Password: </label>
                    <input type="password" name="password" id="password" className="form-control" onChange={this.handleChange} value={this.state.user.password} />
                </div>
                
                <div className="form-group">
                         <label labelfor="role">Role: </label>
                    <select className="form-control" id="role" name="role" onChange={this.handleChange} value={this.state.user.role}>
                        <option value="user">user</option>
                        <option value="admin">admin </option>
                    </select>
                </div>
                <div className="form-group">
                    <label labelfor="photo">Photo: </label>
                    <input type="text" name="photo" id="photo" className="form-control" onChange={this.handleChange} value={this.state.user.photo} />
                </div>
                <button className="btn btn-success"> Save</button>
                  <button className="btn btn-cancell">  <a className="link" href="/users"  onClick={() => this.props.history.push("/users")}>Cancel</a></button>

            </form>
        </div>
        
           
            
            

        )
    }
}