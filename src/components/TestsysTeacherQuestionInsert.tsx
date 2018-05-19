import {Component} from 'react';
import * as React from 'react';
import {WrappedQuestionInsertForm} from './TestsysTeacherQuestionInsertForm';
import DvaProps from '../types/DvaProps';
import TestTeacherSideBar from './TestTeacherSideBar'
import { Layout, Breadcrumb} from 'antd';
class HomePageProps implements DvaProps {
    public dispatch: any;
}

export default class TestsysTeacherQuestionInsertComponent extends Component<HomePageProps, {}> {
    render() {
        return (
            <Layout>
                <TestTeacherSideBar dispatch={this.props.dispatch} />
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>新增题目</Breadcrumb.Item>
                    </Breadcrumb>
                    <Layout id = "content" style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
                        <WrappedQuestionInsertForm dispatch={this.props.dispatch}/>

                    </Layout>
                </Layout>
            </Layout>


        );
    }
}
