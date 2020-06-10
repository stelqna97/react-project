import React from "react"
import "./Registration.css"

export default class Registration extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: "",
            name: "",
            username: "",
            password: "",
            role: "",
            dateOfRegistration: "",
            users: window.localStorage.getItem("users")? JSON.parse(window.localStorage.getItem("users")): [],
            invalid: false,
            errorMessage: ""
        }
    }


    handleChange = (event) => {
        this.setState({ [event.target.id]: event.target.value });
    }

    isValid = () => {
        if (this.state.users.find(u => u.username === this.state.username)) {
            this.setState({
                invalid: true,
                errorMessage: "This username is already exist."
            })
            return false;
        }
        this.setState({
            invalid: false
        })

        return true;
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

    handleSubmit = (event) => {
        event.preventDefault()

        if (this.isValid()) {
            let user = {
                id: this.makeid(20),
                username: this.state.username,
                name: this.state.name,
                password: this.state.password,
                role: "user",
                dateOfRegistration: new Date().toString(),
                photo: ""
            }
            let users = [...this.state.users, user]
            if (this.state.users) {
                this.setState({
                    users: users
                })
            }
            window.localStorage.setItem("users", JSON.stringify(users));
            window.localStorage.setItem("currentUser", JSON.stringify(user));
            this.props.update()
            this.props.history.push("/profile/"+ this.state.username);
        }
    }

    render() {
        return (
            <div className="register-wrapper">
            <form className="register-form" onSubmit={this.handleSubmit}>
        { this.state.invalid && <span className="text-danger">{this.state.errorMessage}</span> }
                <div className="form-group">
                     <label labelfor="name">Name: </label>
                     <input type="text" name="name" id="name" className="form-control" onChange={this.handleChange} value={this.state.name} required/>
                </div>
                <div className="form-group">
                     <label labelfor="username">Username: </label>
                     <input type="text" name="username" id="username" className="form-control" onChange={this.handleChange} value={this.state.username} required/>
                </div>
                <div className="form-group">
                     <label labelfor="password">Password: </label>
                     <input type="password" name="password" id="password" className="form-control" onChange={this.handleChange} value={this.state.password} required/>
                </div>
                <button className="btn btn-primary" >Register</button>
                
            </form>
        </div>

          
        )
    }
}