import React, { Component } from 'react';
import { BrowserRouter as Link } from 'react-router-dom';
import axios from 'axios';

export default class ProjectList extends Component {
    constructor(props){
        super(props);
        this.state = {
            projects: []
        }
    }

    componentDidMount(){
        axios.get('http://localhost:4000/projects/')
        .then( res => {
            this.setState({ projects : res.data });
        }).catch( err => {
            console.log(err);
        });
    }

    render() {
        return (
            <div className="primary project-list col-md-8 col-12">
                <table className="table table-sm table-hover table-light secondary position-relative offset-md-1 col-md-10 col-12">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Tech</th>
                        <th>Link</th>
                    </tr>
                </thead>
                    <tbody>
                        {
                            this.state.projects.map( ( project, id )  => {
                                return (
                                    <tr key={id}>
                                        <td>{id + 1}</td>
                                        <td>{project.name}</td>
                                        <td>{project.tech.map( ( technology, index ) => <span className="badge badge-pill badge-primary" key={index}>{technology}</span>)}</td>
                                        <td><a href={project.link}>{project.link}</a></td>
                                    </tr>
                                )
                                    
                            })
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}

