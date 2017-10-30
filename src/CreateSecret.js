import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
				<textarea value={ this.state.message } onChange={ this.handleMessageChange } rows="10" cols="80"></textarea>
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
                    <p>Generated token: { this.props.token }</p>
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

