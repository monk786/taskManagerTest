import React from 'react';

import { List, Avatar, Button, Skeleton, notification } from 'antd';
import  { DeleteOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { deleteTask } from '../../redux/actions/TaskManagerActions';
import { getUserData } from '../../redux/reducers/utils';
import { PRIORITY } from './constants';

notification.config({
    placement: 'bottomRight',
    bottom: 50,
    duration: 2,
    rtl: true,
  });

class TaskManagerList extends React.Component{

    static defaultProps = {
        list: [],
    }

    
    openNotification = type => {
        notification[type]({
            message:'Task Deleted Successfully',
        })
    }

    deleteTask1 = ( taskId ) => {
        this.props.deleteTask( taskId );
    }

    componentDidUpdate(){
        const { showNotification } = this.props;
        if( showNotification ){
            this.openNotification('success');
        }

    }

    render(){
        
        const { tasks, users } = this.props;
        
        return(
            
          <List 
                className="taskManagerList"
                bordered={ true }
                itemLayout="horizontal"
                loading={ tasks.loading }
                locale={ {emptyText: 'No Task Created, Yet'}}
                dataSource={tasks.list}
                renderItem={ item => { 
                let user = getUserData( users.list, item.assigned_to);
                let description = `${ item.assigned_name ? `Assigned to ${item.assigned_name},` : ''} ${`Priority: ${PRIORITY[item.priority]}`}`;
                
                return (
                    <List.Item
                        key={item.id}
                        actions={[   
                        <Button onClick={ () => this.deleteTask1(item.id) }  key={item.id} type="danger" icon={ <DeleteOutlined /> }>
                            Delete task
                        </Button>
                        ]}
                    >
                         <Skeleton avatar title={false} loading={ item.loading } active>
                        <List.Item.Meta 
                            avatar={ <Avatar src={ user ? user.picture : '' }/> }
                            description={ description }
                            title={ item.message }
                        />
                            </Skeleton>
                    </List.Item>
                )} }
            >
            </List>
            
        )
    }
}

const mapStateToProps = state => ({
    tasks: state.appData.tasks,
    showNotification: state.appData.showNotification,
    users: state.appData.users,
})
const mapDispatchToProps = dispatch => ({
    deleteTask: ( taskId ) => dispatch( deleteTask( taskId )),
})

export default connect( mapStateToProps, mapDispatchToProps )(TaskManagerList);