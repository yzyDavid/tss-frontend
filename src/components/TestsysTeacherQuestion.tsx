import * as React from 'react';
import {Component} from 'react';
import {Form, Button, Modal} from 'antd';
import DvaProps from '../types/DvaProps';
import {NavigationBar} from './TssPublicComponents';

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

export default class TeacherQuestionPageComponent extends Component<UserProps, UserState> {
    constructor(props){
        super(props);
        this.state = {
            modalVisible: false
        };
    }
    formRef: any;


    handleClick = (e) => {
        this.props.dispatch({type:'teacherquestion/jump', payload: {direction: e.direction}});
        console.log("teacherquestion:"+e.direction);
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
                    <Button icon="copy" type="primary" htmlType="submit" onClick={this.handleClick.bind(this, {direction: "Insert"})}>
                        新增题目
                    </Button>
                    <Button icon="copy" type="primary" htmlType="submit" onClick={this.handleClick.bind(this, {direction: "Search"})}>
                        查询题目
                    </Button>
                </FormItem>
            </div>

        );
    }
}
