import React, { Component } from 'react';
import PropTypes from 'prop-types';

class GetSecret extends Component {
	constructor(props) {
		super(props);
		this.state = {
			token: "",
			contents: ""
		};
        this.handleMessageChange = this.handleMessageChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
	}

	showContents() {
	    if(this.props.contents) {
	        return (
                <div>
                    <div>
                        <label>Message contents</label>
                    </div>
                    <div className="GetSecret-white-space-pre">
                        <p>{ this.props.contents }</p>
                    </div>
                </div>
            )
        }
    }

	render() {

		return (
	        <div className="container">
				<div>
					<label>TOKEN</label>
				</div>
				<div>
					<input type="text" className="GetToken-InputBox" onChange={this.handleMessageChange} value={ this.state.password }/>
				</div>
				<div>
					<input onClick={ this.handleSubmit } type="submit"/>
				</div>
                {this.showContents()}
	        </div>
		)
	}

    handleMessageChange = event => {
        this.setState({ token: event.target.value });
    };

    handleSubmit = function(e) {
        console.log("fetching token " + this.state.token);
        this.props.onFetchToken && this.props.onFetchToken(this.state.token);
        e.preventDefault();
    }
}

GetSecret.propTypes = {
	onFetchToken: PropTypes.func.isRequired,
    contents: PropTypes.string.isRequired,
	request: PropTypes.shape({
		status: PropTypes.number.isRequired,
		reason: PropTypes.string.isRequired
	})
};

export default GetSecret;

