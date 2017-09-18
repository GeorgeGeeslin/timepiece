import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import TaskReducer from './src/reducers/task';
import Timepiece from './src/containers/Timepiece';

const store = createStore(
	TaskReducer,
	window.devToolsExtension && window.devToolsExtension()
);

render(
	<Provider store={store}>
		<Timepiece />
	</Provider>,
	document.getElementById('root')
);