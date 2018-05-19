import * as React from 'react';
import {Component} from 'react';
import { Layout, Breadcrumb} from 'antd';
import DvaProps from '../types/DvaProps';
import TestTeacherSideBar from './TestTeacherSideBar'


class UserProps implements DvaProps {
    public dispatch: any;
}
interface UserState {
    modalVisible: boolean;
}

/*
*                    <Button icon="copy" type="primary" htmlType="submit" onClick={this.handleClick.bind(this, {direction: "Teacher_question"})}>新增/查询题目</Button>
                    <Button icon="copy" type="primary" htmlType="submit" onClick={this.handleClick.bind(this, {direction: "Teacher_paper"})}>新增/查询试卷</Button>
                    <Button icon="copy" type="primary" htmlType="submit" onClick={this.handleClick.bind(this, {direction: "Teacher_result"})}>成绩查询</Button>
* */

export default class TeacherPageComponent extends Component<UserProps, UserState> {
    constructor(props){
        super(props);
    }
    formRef: any;

    handleClick = (e) => {
        this.props.dispatch({type:'testsys/jump', payload: {direction: e.direction}});
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
                <TestTeacherSideBar dispatch={this.props.dispatch} />
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>测试系统</Breadcrumb.Item>
                    </Breadcrumb>
                    <Layout id = "content" style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
                        欢迎!

                    </Layout>
                </Layout>



            </Layout>



        );
    }
}
