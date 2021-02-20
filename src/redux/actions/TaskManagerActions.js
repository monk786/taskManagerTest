import axios from 'axios';
import { 
    USERS_LIST_URL,
    TASK_LIST_URL,
    DELETE_TASK_URL,
    CREATE_TASK_URL 
} from '../../utils/urls';

//Action Types
export const GET_USERS = 'GET_USERS';
export const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';
export const GET_USERS_FAILURE = 'GET_USERS_FAILURE';

export const GET_TASK_LIST = 'GET_TASK_LIST';
export const GET_TASK_LIST_SUCCESS = 'GET_TASK_LIST_SUCCESS';
export const GET_TASK_LIST_FAILURE = 'GET_TASK_LIST_FAILURE';

export const CREATE_TASK = 'CREATE_TASK';
export const CREATE_TASK_SUCCESS = 'CREATE_TASK_SUCCESS';
export const CREATE_TASK_FAILURE = 'CREATE_TASK_FAILURE';

export const DELETE_TASK = 'DELETE_TASK';
export const DELETE_TASK_SUCCESS = 'DELETE_TASK_SUCCESS';
export const DELETE_TASK_FAILURE = 'DELETE_TASK_FAILURE';

export const RESET_NOTIFICATION = 'RESET_NOTIFICATION';

export const getUserList = () => {
    return ( dispatch ) => {
        dispatch({ type: GET_USERS });
        return  axios({
            method: 'get',
            url: USERS_LIST_URL,
        }).then( res => { 
            // console.log('resp', res);  
          return dispatch({ type: GET_USERS_SUCCESS, users: res.data.users })
        } )
        .catch( error => dispatch({ type: GET_USERS_FAILURE, error: error }) );
    }
}


export const getTaskList = () => {
    return ( dispatch ) => {
        dispatch({ type: GET_TASK_LIST });
        return  axios({
            method: 'get',
            url: TASK_LIST_URL,
        }).then( res => { 
            // console.log('resp', res);  
          return dispatch({ type: GET_TASK_LIST_SUCCESS, taskList: res.data.tasks })
        } )
        .catch( error => dispatch({ type: GET_TASK_LIST_FAILURE, error: error }) );
    }
}


export const deleteTask = ( taskId ) => {
    let taskFormData = new FormData();
    taskFormData.append('taskid', taskId);
    // console.log('deleteTask -> taskFormData',taskFormData);
    return (dispatch) => {
        dispatch({ type: DELETE_TASK});
        return axios.post(DELETE_TASK_URL, taskFormData )
        .then( res => { 
            // console.log('deleteTask res '); 
            return dispatch({ type: DELETE_TASK_SUCCESS, taskDeleted: true, message: res.message, taskId })
        })
        .catch( error => { console.log('error', error) ;return dispatch( { type: DELETE_TASK_FAILURE })});
    }
}


export const createTask = ( formData, values ) => {
    return dispatch => {
        dispatch({ type: CREATE_TASK});
        return axios.post(CREATE_TASK_URL, formData )
        .then( res => { 
          console.log('create Task Res', res); 
          console.log('formData',formData);
          console.log('values',values);
            // this.props.handleOk();
            // this.props.updateTaskList(res.data.tasks);
            return dispatch({ type: CREATE_TASK_SUCCESS, taskId: res.data.taskid, taskData: values });
        } , (error) => {
            return dispatch({ type: CREATE_TASK_FAILURE, error: error });
          });
    }
}