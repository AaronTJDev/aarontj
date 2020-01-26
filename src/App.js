import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import ProjectList from './component/ProjectList';
import AddProject from './component/AddProject';
import Login from './component/Login';
import Contact from './component/Contact';
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios';


export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      user:{},
      authenticated: false,
      colNum: 'col-4'
    }
  }

  handleClick = (username, passphrase) => {

    axios.get(`http://localhost:4000/user/${username}/${passphrase}` ).then(
      res => {
        if( res.data.username === "admin" ){
          this.setState ({
            authenticated: true,
            user: res.data
          })
        }
      }
    )    
  }

  render () {
    return (
      <Router>
        <div className="container main">
          <div className="row">
            <h2 className="text-center primary col-12 p-2">Portfolio</h2>
          </div>
          <div className="row">
            <div className="profile secondary col-md-4 col-12">
              <img className="rounded-circle profile-pic mx-auto" alt="Aaron Jackson" src="img/profile.jpeg"/>
              <h4 className="text-center primary position-relative profile-text">Aaron Jackson</h4>
              <p className="text-left position-relative profile-text alternative">2+ Years of experience, knowledgeable and highly dynamic Full Stack Web Developer with a track record of creating user-centric solutions to improve customer satisfaction and web presence.</p>
              <p className="text-left position-relative profile-text alternative">I enjoy my craft and I'm constantly striving to deliver highly efficient and scalable software solutions.</p>
              <p className="text-left position-relative profile-text alternative">I invite you to explore some of projects I've worked on throughout my career and see for yourself!</p>
            </div>
            
            <Route path="/" exact render = { () => <ProjectList authenticated={this.state.authenticated} /> } />
            <Route path="/add" component = { AddProject } />
            <Route path="/login" render = { () => <Login handleClick={this.handleClick} authenticated={this.state.authenticated} /> } />
            <Route path="/contact" component = { Contact } />

          </div>
          <nav className="fixed-bottom navbar navbar-expand-lg navbar-light bg-light">
            <Link className="col-4" to="/">HOME</Link>
            {
              this.state.authenticated ?
                <Link className="col-4" to="/add">ADD</Link> :
                <Link className="col-4" to="/login">LOGIN</Link>
            }
            <Link className="col-4" to="/contact">CONTACT</Link>
          </nav>

        </div>

      </Router>
    );
  }  
}