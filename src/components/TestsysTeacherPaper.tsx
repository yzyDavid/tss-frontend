import * as React from 'react';
import {Component} from 'react';
import {Form, Button, Modal} from 'antd';
import DvaProps from '../types/DvaProps';
import NavigationBar from './TssPublicComponents';

interface UserProps extends DvaProps {
    uid: string;
    email: string;
    tel: string;
    intro: string;
}
interface UserState {
    modalVisible: boolean;
}
const FormItem = Form.Item;

export default class TeacherPaperPageComponent extends Component<UserProps, UserState> {
    constructor(props){
        super(props);
        this.state = {
            modalVisible: false
        };
    }
    formRef: any;
    setModalVisible(modalVisible) {
        if(this.formRef && modalVisible === true) this.formRef.refresh();
        this.setState({ modalVisible: modalVisible });
    };
    handleOk(e){
        if(!this.formRef.handleSubmit(e)) this.setModalVisible(false);
    }
    render() {

        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 6},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 14},
            },
        };
        return (
            <div>
                <FormItem {...formItemLayout}>
                    <Button icon="copy" type="primary" htmlType="submit">新增试卷</Button>
                    <Button icon="copy" type="primary" htmlType="submit">查询试卷</Button>
                </FormItem>
            </div>

        );
    }
}
