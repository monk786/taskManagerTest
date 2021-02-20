import React from 'react';
import TaskManagerHeader from '../TaskManagerHeader/TaskManagerHeader';
import TaskManagerList from '../TaskManagerList/TaskManagerList';
import { connect } from 'react-redux';

import { getUserList, getTaskList } from '../../redux/actions/TaskManagerActions';


class TaskManagerApp extends React.Component{
    state = {
        users: [],
        taskList: [],
    }
    componentDidMount(){
        this.props.getUserList();
        this.props.getTaskList();
    }


    updateTaskList = ( updatedTaskList ) => {
        this.setState({
        taskList: updatedTaskList,
        })
    }

    render(){
        const { users, tasks, loading } = this.props;
        return (
            <div>
                <TaskManagerHeader users={ users } updateTaskList={ this.updateTaskList } taskList={ tasks.list }/>
                <TaskManagerList users={ users } taskList={ tasks.list } loading={ loading }/>
            </div>
        )
    }
}

const mapStateToProps = state =>{
    return  ({
        tasks: state.appData.tasks,
        users: state.appData.users,
        loading: state.appData.loading,
    })
};

const mapDispatchToProps = dispatch => {
    return {
        getUserList: () => dispatch(getUserList()),
        getTaskList: () => dispatch(getTaskList()),
    }
}
export default connect( mapStateToProps, mapDispatchToProps )(TaskManagerApp);