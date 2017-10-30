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
		let url = "http://dob2-bfs-r5n01.bloomberg.com:3434/secrets/" + this.props.match.params.token;
        console.log('URL: ' + url);
		console.log('Params: ' + JSON.stringify(this.props.params));
        axios
            .get(url)
            .then(function(res) {
                console.log('Setting state: ' + JSON.stringify(res));
				this.setState({ contents: res.data });
			}.bind(this))
            .catch(function(err) {
				console.log(JSON.stringify(err));
				this.setState({ contents: err.response.data });
			}.bind(this))
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

