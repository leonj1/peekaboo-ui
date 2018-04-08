import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { START_CREATE_SECRET, FAILED_CREATE_SECRET, SUCCESS_CREATE_SECRET, START_FETCH_SECRET, FAILED_FETCH_SECRET, SUCCESS_FETCH_SECRET, CLEAR_PREVIOUS_REQUEST } from './redux/actions';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas/apiSaga';

const initialState = {
	secret: {
		message: "",
		expiryMinutes: 60,
		password: ""
	},
	token: "",
	request: {
		status: 200,
		reason: ""
	}
};

// reducers
function startCreatingSecret(action) {
    console.log('actionCreator: startCreatingSecret: ' + JSON.stringify(action));
	return action.payload;
}
function failedCreatingSecret(action) {
	return action.payload;
}
function startFetchingSecret(action) {
    console.log('actionCreator: startFetchingSecret: ' + JSON.stringify(action));
    return action.token;
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
                secret: {
                    message: "",
                    expiryMinutes: 60,
                    password: ""
                }
			};
		case START_FETCH_SECRET:
            return {
                ...state,
                token: startFetchingSecret(action),
            };
		case FAILED_FETCH_SECRET:
            return {
                ...state,
                request: action.request,
                secret: {
                    message: "",
                    expiryMinutes: 60,
                    password: ""
                }
            };
		case SUCCESS_FETCH_SECRET:
            console.log('Reducer: Contents being saved to state: ' + JSON.stringify(action.payload));
            return {
                ...state,
                secret: {
                    message: action.payload.contents
                },
                request: action.payload.request
            };
        case CLEAR_PREVIOUS_REQUEST:
            console.log('Clearing previous request');
            return {
                ...state,
                request: action.payload
            };
		default:
			return state;
	}
};

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

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
