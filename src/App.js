import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Login from "./Login/Login"
import Registration from "./Registration/Registration"
import Profile from "./Profile/Profile"

import Users from "./Users/Users"
import EditUser from "./Users/EditUser"
import AddUser from "./Users/AddUser"
import EditProfile from './Profile/EditProfile'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Tasks from './Tasks/Tasks'
import EditTask from './Tasks/EditTask'
import MyTasks from './Tasks/MyTasks'
import AddTask from './Tasks/AddTasks';

const styles = {
  backgroundColor: 'lightgray',
  height: '20px',
  width: '100%',
  position: 'fixed',
  bottom: 0
};

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: JSON.parse(window.localStorage.getItem("currentUser"))
    }
  }

  

  update = () => {
    this.setState({
      currentUser: JSON.parse(window.localStorage.getItem("currentUser"))
    })
  }

  logOut = () => {
    window.localStorage.setItem("currentUser", JSON.stringify(""));
    this.setState({
      currentUser: ''
    })
  }

  render() {
    return (
      <Router>

        <div className="App">
          
    
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
    
<a className="navbar-brand" href="!#">Tasks</a>
<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
  <span className="navbar-toggler-icon"></span>
</button>

<div className="collapse navbar-collapse" id="navbarSupportedContent">
  <ul className="navbar-nav mr-auto">
    <li className="nav-item active">
      <a className="nav-link" href='/'>Home <span className="sr-only">(current)</span></a>
    </li>
    <li className="nav-item">
      <a className="nav-link" href={"/profile/" + (this.state.currentUser.username )}>Profile</a>
    </li>
    <li className="nav-item">
      <a className="nav-link" href="/tasks">Tasks</a>
    </li>
    <li className="nav-item">
      <a className="nav-link" href="/mytasks"> My Tasks</a>
    </li>
    <li className="nav-item">
      <a className="nav-link" href="/addtasks" >Add Task</a>
    </li>
   
    <li className="nav-item">
      <a className="nav-link" href="/users">Users</a>
    </li>
    <li className="nav-item">
      <a className="nav-link" href="/addUser" >Add User</a>
    </li>
    <li className="nav-item">
      <a className="nav-link" href="/login">Login</a>
    </li>
    <li className="nav-item">
      <a className="nav-link" href="/register">Registration</a>
    </li>
  </ul>
  
  <form className="form-inline my-2 my-lg-0">
    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
  </form>
  <ul className="navbar-nav ">
  <li className="nav-item">
      <a className="nav-link" href="!#" onClick={this.logOut}> Log Out</a>
    </li>
    </ul>
</div>
</nav>


          

          {
            this.state.currentUser ?
            <div className="main-content">
              <Switch>
                
                <Route path="/profile/:username" component={Profile}>
                </Route>
               
                <Route path="/users" component={Users}></Route>
                <Route path="/editprofile" component={EditProfile}></Route>            
                <Route path="/editUser" component={EditUser}></Route>
                <Route path="/tasks" component={Tasks}></Route>
                <Route path="/addtasks" component={AddTask}></Route>
                <Route path="/edittask" component={EditTask}></Route>
                <Route path="/mytasks" component={MyTasks}></Route>
                {this.state.currentUser.role==='admin' &&<Route path="/addUser" component={AddUser}></Route>}
                
                
              </Switch>
              </div>
              : <Switch>

                <Route path="/register" render={(props) => <Registration {...props} update={this.update} />}>
                </Route>
                <Route path="/login" render={(props) => <Login {...props} update={this.update} />}>
                </Route>
              </Switch>
          }
          <div className="footer" style={styles}>
            Footer works
        </div>
    </div>
        
        
      </Router>
    );
  }

}

export default App;