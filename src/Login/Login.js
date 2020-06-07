import React from "react"
import "./Login.css"

export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            users: JSON.parse(window.localStorage.getItem("users")),
            username: "",
            password: ""
        }
    }

    handleChange = (event) => {
        this.setState({ [event.target.id]: event.target.value });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let user = this.state.users.find(user => user.username === this.state.username &&
            user.password === this.state.password)
        if (user) {
            window.localStorage.setItem("currentUser", JSON.stringify(user));
            this.props.update()
            this.props.history.push("/profile/"+ this.state.username);
        } else {
            this.setState({
                invalid: true,
                errorMessage: "Wrong username or password"
            })
        }
    }

    render() {
        return (
            <div className="login-wrapper">
            <form className="login-form" onSubmit={this.handleSubmit}>
            { this.state.invalid && <span className="text-danger">{this.state.errorMessage}</span> }
               
                <div className="form-group">
                    <label htmlFor="username">Username: </label>
                    <input type="username" name="username" id="username" className="form-control" onChange={this.handleChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password: </label>
                    <input type="password" name="password" id="password" className="form-control" onChange={this.handleChange} />
                </div>
                <button className="btn btn-primary">Login</button>
            </form>
        </div>
            
        )
    }
}