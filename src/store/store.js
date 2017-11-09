import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import Task from '../reducers/task';

const store = createStore(Task, window.devToolsExtension && window.devToolsExtension(), applyMiddleware(thunk));

export default store;