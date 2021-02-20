import React from 'react';
import { PageHeader, Button, Tooltip } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import CreateTaskModal from '../CreateTaskModal/CreateTaskModal'

class TaskManagerHeader extends React.Component{

    state = {
      visible: false,
    };

    showModal = () => {
      this.setState({
        visible: true,
      });
    };

    handleOk = () => {
        this.setState({ visible: false });

    };
  
    handleCancel = () => {
      this.setState({ visible: false });
    };

    render(){
        const { visible } = this.state;
        const { users, updateTaskList, taskList } = this.props;
        return(
            <div> 
                <PageHeader
                 title="Task Manager"
                 extra={[
                     <Tooltip key='Tooltip1'>
                        <Button key="craeteBtn" type="primary" icon={ <PlusOutlined/> } onClick={this.showModal}>
                            Create Task 
                        </Button>
                     </Tooltip>
                    ,
                  ]}
                />

                <CreateTaskModal taskList={ taskList } updateTaskList={ updateTaskList } users={ users } visible={ visible } handleCancel={ this.handleCancel } handleOk={this.handleOk}/>
            </div>
        )
    }
}

export default TaskManagerHeader;