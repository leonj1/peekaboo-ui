import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

class GetSecret extends Component {
	constructor(props) {
		super(props);
		this.state = {
			contents: ""
		}
	}

    componentDidMount() {
		console.log('In component did mount: ' + JSON.stringify(this.props));
		let url = "http://localhost:3434/secrets/" + this.props.match.params.token;
        console.log('URL: ' + url);
		console.log('Params: ' + JSON.stringify(this.props.params));
        axios
            .get(url)
            .then(res => this.setState({ message: res.data }))
            .catch(err => console.log(err))
	}

	render() {

		return (
	        <div>
	        	<label>Message contents</label>
	        	<p>{ this.state.contents }</p>
	        </div>
		)
	}
}

GetSecret.propTypes = {
	params: PropTypes.shape ({
		token: PropTypes.string.isRequired
	})
}

export default GetSecret;

