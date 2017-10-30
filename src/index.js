import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { START_CREATE_SECRET, FAILED_CREATE_SECRET, SUCCESS_CREATE_SECRET, START_FETCH_SECRET, FAILED_FETCH_SECRET, SUCCESS_FETCH_SECRET } from './redux/actions';
import createSagaMiddleware from 'redux-saga';
import mySaga from './sagas/createSecret';

const initialState = {
	secret: {
		message: "",
		expiryMinutes: 60,
		password: ""
	},
	token: ""
}

// reducers
function startCreatingSecret(action) {
    console.log('actionCreator: startCreatingSecret: ' + JSON.stringify(action));
	return action.payload;
}
function failedCreatingSecret(action) {
	return action.payload;
}

// Actions the store should perform when an action is received
const myReducer = (state = initialState, action) => {
	switch (action.type) {
		case START_CREATE_SECRET:
			return {
				...state,
				secret: startCreatingSecret(action),
			};
		case FAILED_CREATE_SECRET:
			return {
				...state,
				secret: failedCreatingSecret(action),
			};
		case SUCCESS_CREATE_SECRET:
            console.log('Reducer: Token being saved to state: ' + JSON.stringify(action.token));
			return {
				...state,
				token: action.token,
			};
		case START_FETCH_SECRET:
		case FAILED_FETCH_SECRET:
		case SUCCESS_FETCH_SECRET:
		default:
			return state;
	}
}

const sagaMiddleware = createSagaMiddleware();
const middleware = [
	sagaMiddleware
];

const composeEnhancers = (window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const enhancer = composeEnhancers(
  applyMiddleware(...middleware)
);

const store = createStore(
  myReducer,
  enhancer
);

sagaMiddleware.run(mySaga);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();

