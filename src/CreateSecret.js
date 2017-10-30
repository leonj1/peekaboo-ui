import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

class CreateSecret extends Component {
	constructor(props) {
		super(props);
		this.state = {
			message: "",
			expiryMinutes: 60,
			password: ""
		}
		this.handleMessageChange = this.handleMessageChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.handleExpiryChange = this.handleExpiryChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	render() {
		return (
			<div>
                <form>
                  <FormGroup
                    controlId="formBasicText"
                  >
                    <ControlLabel>Working example with validation</ControlLabel>
                    <FormControl
                      style={{height: '150px'}}
                      componentClass="textarea"
                      height="100"
                      value={this.state.message}
                      placeholder="Enter text"
                      onChange={this.handleMessageChange}
                    />
                  </FormGroup>
                </form>
				<div>
					<label>Password to unlock </label>
					<input value={ this.state.password } onChange={ this.handlePasswordChange } type="password" placeholder="Optional" />
                </div>
				<div>
					<label>Expiry (mins) </label>
					<input value={ this.state.expiryMinutes } onChange={ this.handleExpiryChange } type="number" ></input>
				</div>
				<div>
				  <input onClick={ this.handleSubmit } type="submit"/>
				</div>
				<div>
                    <p>Generated token: <Link to={ "/get/" + this.props.token }>{ this.props.token }</Link></p>
				</div>
			</div>
		)
	}

    handleMessageChange = event => {
		this.setState({ message: event.target.value });
    }

    handleExpiryChange = event => {
		this.setState({ expiryMinutes: event.target.value });
    }

	handlePasswordChange = event => {
		this.setState({ password: event.target.value });
	}

	handleSubmit = function(e) {
        console.log("handing submit");
	    this.props.onCreateSecret && this.props.onCreateSecret(this.state);
        e.preventDefault();
	}
}

CreateSecret.propTypes = {
	onCreateSecret: PropTypes.func
}

export default CreateSecret;

