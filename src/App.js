import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import CreateSecret from './CreateSecret';
import GetSecret from './GetSecret';
import { submitSecret } from './redux/actions';

class App extends Component {
  constructor(props) {
	super(props);
	this.createSecretHanlder = this.createSecretHandler.bind(this);
  }

  render() {
    return (
      <Router>
        <div>
          <ul>
            <li><Link to="/">Create</Link></li>
            <li><Link to="/get">Get Secret</Link></li>
          </ul>

          <hr/>

          <Route exact path="/" render={(props) => ( <CreateSecret token={this.props.token} onCreateSecret={this.createSecretHandler}/> )}/>
          <Route path="/get/:token" component={GetSecret}/>
          <Route path="/get/:token/:password" component={GetSecret}/>
        </div>
      </Router>
    );
  }
  createSecretHandler = secret => {
    console.log('In parent submitting secret');
  	this.props.createSecretProp(secret);
  }
}

const mapStateToProps = state => {
	return {
		secret: state.secret,
		token: state.token
	}
}

const mapDispatchToProps = dispatch => {
	return {
		createSecretProp: function(secret) {
			dispatch(submitSecret(secret));
		}
	}
}

const ReduxApp = connect(
	mapStateToProps,
	mapDispatchToProps
)(App);

export default ReduxApp;

