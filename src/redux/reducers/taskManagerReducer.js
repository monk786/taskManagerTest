import {
    GET_USERS,
    GET_USERS_SUCCESS,
    GET_USERS_FAILURE,
    GET_TASK_LIST,
    GET_TASK_LIST_SUCCESS,
    GET_TASK_LIST_FAILURE,
    CREATE_TASK,
    CREATE_TASK_SUCCESS,
    CREATE_TASK_FAILURE,
    DELETE_TASK,
    DELETE_TASK_SUCCESS,
    DELETE_TASK_FAILURE,
    RESET_NOTIFICATION,
} from '../actions/TaskManagerActions';

import { getUserData } from '../../redux/reducers/utils';

const initialState = {
    tasks: {
        list:[],
        loading: false,
    },
    users: {
        list:[],
        loading: false,
    },
    showModal: false,
    showNotification: false,
}

const taskManagerReducer = ( state=initialState, action ) => {
    switch( action.type ) {
        case GET_USERS:
            return { ...state, loading: true }
        case GET_USERS_SUCCESS:
            return { ...state, users:{ loading: false, list: action.users} };
        case GET_USERS_FAILURE:
            return { ...state, loading: false, error: action.error};
        case GET_TASK_LIST:
            return { ...state, tasks:{ loading: true} };
        case GET_TASK_LIST_SUCCESS:
            return { ...state, tasks:{ loading: false, list: action.taskList } };
        case GET_TASK_LIST_FAILURE:
            return { ...state, tasks:{ loading: false, error: action.error}};
        case CREATE_TASK:
            return { ...state, tasks:{ list: [...state.tasks.list],  loading: true } };
        case CREATE_TASK_SUCCESS:
            let user = getUserData( state.users.list, action.taskData.assigned_to);
            return { 
                ...state,
                tasks:{ loading: false, list: [ ...state.tasks.list, { id: action.taskId, ...action.taskData, assigned_name: user.name }] }
            };
        case CREATE_TASK_FAILURE:
            return { ...state, tasks:{ loading: false, error: action.error}};
        case DELETE_TASK:
            return { ...state }
        case DELETE_TASK_SUCCESS:
            return { 
                ...state, 
                showNotification: true, 
                successMessage: action.message, 
                tasks:{ list: state.tasks.list.filter( task => task.id !== action.taskId )}
            };
        case RESET_NOTIFICATION:
            return {
                ...state,
                showNotification: false,
            }
        case DELETE_TASK_FAILURE:
            return { ...state, taskDeleted: false, error: action.error};
        default:
            return { ...state };
    }
}

export default taskManagerReducer;