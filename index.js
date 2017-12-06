import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import store from './src/store/store';
import App from './src/containers/App';

render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);