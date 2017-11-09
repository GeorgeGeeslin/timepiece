import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import store from './src/store/store';
import Timepiece from './src/containers/Timepiece';

render(
	<Provider store={store}>
		<Timepiece />
	</Provider>,
	document.getElementById('root')
);