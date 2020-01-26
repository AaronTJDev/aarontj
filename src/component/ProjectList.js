import React, { Component } from 'react';
import axios from 'axios';
import Row from './Row';

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
                <table className="table table-sm table-hover table-light secondary position-relative col-12">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Tech</th>
                        <th>Link</th>
                        { this.props.authenticated ? 
                            <th>Edit</th> :
                            null
                        }
                    </tr>
                </thead>
                    <tbody>
                        {
                            this.state.projects.map( ( project, id )  => {
                                return (
                                    <Row project={ project } id={id} key={id} authenticated={this.props.authenticated} />
                                )
                                    
                            })
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}