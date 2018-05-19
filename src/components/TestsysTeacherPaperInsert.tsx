import {Component} from 'react';
import * as React from 'react';
import {WrappedPaperInsertForm} from './TestsysTeacherPaperInsertForm';
import DvaProps from '../types/DvaProps';
import TestTeacherSideBar from './TestTeacherSideBar'
import { Layout, Breadcrumb} from 'antd';

class HomePageProps implements DvaProps {
    public dispatch: any;
}
/*
*<div>
                <h2>新增试卷</h2>
                <WrappedPaperInsertForm dispatch={this.props.dispatch}/>
            </div>
* */
export default class TestsysTeacherPaperInsertComponent extends Component<HomePageProps, {}> {
    render() {
        return (
            <Layout>
                <TestTeacherSideBar dispatch={this.props.dispatch} />
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>新增试卷</Breadcrumb.Item>
                    </Breadcrumb>
                    <Layout id = "content" style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
                        <WrappedPaperInsertForm dispatch={this.props.dispatch}/>

                    </Layout>
                </Layout>
            </Layout>


        );
    }
}
