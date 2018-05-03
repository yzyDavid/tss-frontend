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

    handleClick = (e) => {
        this.props.dispatch({type:'teacherpaper/jump', payload: {direction: e.direction}});
        console.log("teacherpaper:"+e.direction);
    };

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

                    <Button icon="copy" type="primary" htmlType="submit" onClick={this.handleClick.bind(this, {direction: "Insert"})}>新增试卷</Button>
                    <Button icon="copy" type="primary" htmlType="submit" onClick={this.handleClick.bind(this, {direction: "Search"})}>查询试卷</Button>
                </FormItem>
            </div>

        );
    }
}
