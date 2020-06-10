import React from "react"
import "./Profile.css"


export default class EditProfile extends React.Component {

    constructor(props) {
        super(props);
        let currentUser = JSON.parse(window.localStorage.getItem("currentUser"))
        this.state = {
                dateOfRegistration: currentUser.dateOfRegistration,
                dateOfModification: currentUser.dateOfModification,
                id: currentUser.id,
                name: currentUser.name,
                username: currentUser.username,
                photo: currentUser.photo,
                password: currentUser.password,
                role: currentUser.role
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
            <div>
            <div id="edit" className="modal" >
<div className="modal-content">
<h4>Edit Profile</h4>

<form className="col s12" onSubmit={this.handleSubmit}>


    <div className="row">
        <div className="input-field col s12">
            <input id="name" type="text" className="validate" onChange={this.handleChange} value={this.state.name} />
            <label htmlFor="name">Name</label>
        </div>
        <div className="input-field col s12">
            <input id="photo" type="text" className="validate" onChange={this.handleChange} value={this.state.photo} />
            <label htmlFor="photo">Photo</label>
        </div>
    </div>
    <div className="row">
        <div className="input-field col s12">
            <input id="password" type="password" className="validate" onChange={this.handleChange} value={this.state.password} />
            <label htmlFor="password">Password</label>
        </div>
    </div>
    
    <div className="row">
        <div className="input-field col s12">
            <textarea id="description" className="materialize-textarea" onChange={this.handleChange}
                value={this.state.description}></textarea>
            <label htmlFor="description">Describe yourself</label>
        </div>
    </div>
</form>

</div>
<div className="modal-footer">
<a href="/profile" className="modal-close btn-flat" onClick={this.save}>Save</a>
<a href="/profile" className="modal-close btn-flat">Cancel</a>

</div>
</div>

</div>
)
}
}