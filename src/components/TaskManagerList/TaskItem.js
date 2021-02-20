import React from 'react';
import { Button, Space } from 'antd';

import  { DeleteOutlined, FileDoneOutlined } from '@ant-design/icons';
import './TaskManagerList.scss'

const TaskItem = ( props ) => {
    console.log('props', props);
    return (
        <div className='TaskItem'>
            <div className='taskItem_description'>
                { props.message }
            </div>
            <div className="taskItem_actions_list">
                <div>
                    <Space size='small'>
                        <Button key="1" type="primary" icon={ <FileDoneOutlined /> }>
                            Complete Task
                        </Button>
                        <Button key="1" type="danger" icon={ <DeleteOutlined /> }>
                            Delete task
                        </Button>
                    </Space>
                </div>
            </div>
        </div>
    )
};

export default TaskItem;