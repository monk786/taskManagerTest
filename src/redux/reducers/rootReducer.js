import { combineReducers } from 'redux';
import taskManagerReducer from './taskManagerReducer';

const rootReducer = combineReducers({
    appData: taskManagerReducer,
});

export default rootReducer;