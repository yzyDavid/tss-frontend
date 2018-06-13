import * as React from 'react';
import {Component} from 'react';
import {Form, Button, Modal} from 'antd';
import DvaProps from '../types/DvaProps';
import {NavigationBar} from './TssPublicComponents';
import Breadcrumb from "antd/es/breadcrumb/Breadcrumb";
import TestStudentSideBar from './TestStudentSideBar';
import Layout from "antd/es/layout/layout";

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

    handleClick = (e) => {
        this.props.dispatch({type:'testsys_student/jump', payload: {direction: e.direction}});
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
            <Layout>
                <TestStudentSideBar dispatch={this.props.dispatch} />
                {/*<div>*/}
                    {/*<FormItem {...formItemLayout}>*/}
                        {/*<Button icon="copy" type="primary" htmlType="submit" onClick={this.handleClick.bind(this, {direction: "student_paper"})}>我要答题</Button>*/}
                        {/*<Button icon="copy" type="primary" htmlType="submit" onClick={this.handleClick.bind(this, {direction: "student_score"})}>成绩查询</Button>*/}
                    {/*</FormItem>*/}
                {/*</div>*/}
                <Layout id = "content" style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
                    欢迎!
                </Layout>
            </Layout>
        );

    }
}
