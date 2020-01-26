import React, { Component } from 'react';
import axios from 'axios';

export default class Row extends Component {
    constructor(props){
        super(props);
        this.state = {
            editMode: false,
            project: this.props.project
        }
    }

    handleEditProject = () => {
        this.setState({editMode : ! this.state.editMode});
    }

    onChange = (e) => {
        var target = e.target;
        
        if ( target.name === 'name' ){
            this.setState( prevState => {
                let project = Object.assign({}, prevState.project);
                project.name = target.value;
                return { project };
              })
        } else if ( target.name === 'tech' ){
            this.setState( prevState => {
                let project = Object.assign({}, prevState.project);
                project.tech = target.value;
                return { project };
              })
        } else if ( target.name === 'link' ){
            this.setState( prevState => {
                let project = Object.assign({}, prevState.project);
                project.link = target.value;
                return { project };
              })
        }
    }

    onClick = (e) => {
        e.preventDefault(); 
        
        var project = {
            name: this.state.project.name,
            tech: this.state.project.tech.split(','),
            link: this.state.project.link
        }

        axios.post(`http://localhost:4000/projects/edit/${this.state.project._id}`, project ).then(
            res => console.log(res.data)
        )

        this.setState({
            editMode: false
        })
    }

    render() {
        let project = this.props.project;
        var row = this.state.editMode   ?
                    <tr key={this.props.id}>
                        <td>{this.props.id + 1}</td>
                        <td><input onChange={this.onChange} className="form-control" type="text" name="name" id="project-name" value={this.state.project.name} /></td>
                        <td><input onChange={this.onChange} className="form-control" type="text" name="tech" id="project-tech" value={this.state.project.tech} /></td>
                        <td><input onChange={this.onChange} className="form-control" type="text" name="link" id="project-link" value={this.state.project.link} /></td>
                        <td><button onClick={this.onClick} className="btn btn-primary" value="Add Project" id="project-submit">Update</button></td>
                    </tr>
                    :                    
                    <tr key={this.props.id}>
                        <td>{this.props.id + 1}</td>
                        <td>{project.name}</td>
                        <td>{project.tech.map( ( technology, index ) => <span className="badge badge-pill badge-primary" key={index}>{technology}</span>)}</td>
                        <td><a href={project.link}>{project.link}</a></td>
                        {
                            this.props.authenticated ?
                            <td onClick={this.handleEditProject}>Edit</td> :
                            null
                        }
                    </tr> 

                    
        return (

            row
            
        )            
    }
}