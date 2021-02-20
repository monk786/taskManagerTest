import React from 'react';
import { Modal, Button, Form, Input, Select, DatePicker  } from 'antd';

import { connect } from 'react-redux';
import { createTask } from '../../redux/actions/TaskManagerActions';

const { Option } = Select;

const config = {
    rules: [
      {
        type: 'object',
        required: false,
      },
    ],
  };

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};


class CreateTaskModal extends React.Component{


    onFinish = (fieldsValue ) => {
        let formData = new FormData();
       
        
        const values = {
            ...fieldsValue,
            'due_date': fieldsValue['due_date'] ? fieldsValue['due_date'].format('YYYY-MM-DD HH:mm:ss') : '2020-09-18 12:12:12',
            'assigned_to': fieldsValue['assigned_to'] ? fieldsValue['assigned_to'] : '',
            'priority': fieldsValue['priority'] ? fieldsValue['priority'] : '',
            
        }
        for ( var key in values ) {
            formData.append(key, values[key]);
        }

        this.props.createTask( formData, values );
        this.props.handleOk();

      };

    
      render(){
        const { visible, handleCancel, users } = this.props;
        return (
            <>
        <Modal
          visible={visible}
          title="Create Task"
          onOk={this.onFinish}
          onCancel={handleCancel}
          footer={ null }
        >
          <Form
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={this.onFinish}
          >
            <Form.Item
              label="Task Message"
              name="message"
              rules={[{ required: true, message: 'Enter Task Message' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item name="due_date" label="Due Date" {...config}>
              <DatePicker />
            </Form.Item>

            <Form.Item
                label="priority"
                name="priority"
            >
            <Select placeholder="Prioritize">
                <Option key='option1' value="1">1: normal</Option>
                <Option key='option2' value="2">2: mid</Option>
                <Option key='option3' value="3">3: high</Option>
              </Select>
            </Form.Item>

            <Form.Item
                label="Assigned to"
                name="assigned_to"
            >
              <Select placeholder="Users">
                { users.list.map( user => <Option key={ user.id } value={ user.id}>{user.name}</Option> ) }
              </Select>
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </>
        )
      }
}

const mapDispatchToProps = dispatch => ({
  createTask: ( formData,values ) =>  dispatch( createTask( formData, values )),
})
export default connect( null, mapDispatchToProps )(CreateTaskModal);