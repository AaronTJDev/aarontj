import React, { Component } from 'react';
import axios from 'axios';

export default class AddProject extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: this.props.project.name,
            tech: this.props.project.tech,
            link: this.props.project.link
        }
    }

    onChange = (e) => {
        var target = e.target;
        
        if ( target.name === 'name' ){
            this.setState({ name: target.value })
        } else if ( target.name === 'tech' ){
            this.setState({ tech: target.value})
        } else if ( target.name === 'link' ){
            this.setState({ link: target.value})
        }
    }

    onClick = (e) => {
        e.preventDefault(); 
        
        const project = {
            name: this.state.name,
            tech: this.state.tech.split(','),
            link: this.state.link
        }

        axios.post('http://localhost:4000/projects/add', project ).then(
            res => console.log(res.data)
        )

        this.setState({
            name: '',
            tech: '',
            link: ''
        })
    }
    
    render() {
        console.log(this.state);
        return (
            <div className="primary col-md-8 col-sm-12 col-12">
                <h1 className="col-12 text-center p-4">Edit Project</h1>
                <form>
                    <div className="form-group rounded">
                        <label htmlFor="name" value="name">Name</label>
                        <input onChange={this.onChange} className="form-control" type="text" name="name" id="project-name" />
                    </div>
                    <div className="form-group rounded">
                        <label htmlFor="tech" value="tech">Tech</label>
                        <input onChange={this.onChange} className="form-control" type="text" name="tech" id="project-tech" />
                    </div>
                    <div className="form-group rounded">
                        <label htmlFor="link" value="link">Link</label>
                        <input onChange={this.onChange} className="form-control" type="text" name="link" id="project-link" />
                    </div>
                    <div className="form-group rounded text-right" id="btn-control">
                        <button onClick={this.onClick} className="btn btn-primary" value="Add Project" id="project-submit">Update</button>
                    </div>
                </form>
            </div>
        );
    }
}

