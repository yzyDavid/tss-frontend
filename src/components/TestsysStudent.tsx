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

export default class StudentComponent extends Component<UserProps, UserState> {
    constructor(props){
        super(props);
    }
    formRef: any;

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
                    <Button icon="copy" type="primary" htmlType="submit">我要答题</Button>
                    <Button icon="copy" type="primary" htmlType="submit">成绩查询</Button>
                </FormItem>
            </div>

        );

    }
}
