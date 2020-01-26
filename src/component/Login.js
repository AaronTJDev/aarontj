import React, { Component } from 'react';

export default class Contact extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            passphrase: ''
        }
    }

    onChange = (e) => {
        let target = e.target;
        console.log(target.value)
        
        if ( target.name === 'username' ){
            this.setState({ username: target.value })
        } else if ( target.name === 'passphrase'){
            this.setState({ passphrase: target.value })
        }
    }

    render() {
        console.log(this.props)
        var form =
            <form id="authenticate">
                <div className="form-group rounded">
                    <label htmlFor="username" value="username">Username</label>
                    <input onChange={this.onChange} className="form-control" type="text" name="username" id="username" />
                </div>
                <div className="form-group rounded">
                    <label htmlFor="authenticate" value="authenticate">Passphrase</label>
                    <input onChange={this.onChange} className="form-control" type="password" name="passphrase" id="passphrase" />
                </div>
                <div className="form-group rounded text-right" id="btn-control">
                    <button onClick={() => this.props.handleClick(this.state.username, this.state.passphrase) } className="btn btn-primary" value={{username: this.state.username, passphrase: this.state.passphrase}} id="project-submit" type="button">Authenitcate</button>
                </div>
            </form>

        return (
            <div className="primary col-md-8 col-sm-12 col-12">
                {
                    this.props.authenticated ?
                    <h1 className="col-12 success">Success</h1> :
                    form
                }
            </div>
        )
    }
}

