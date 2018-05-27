import {Component} from 'react';
import * as React from 'react';
import {WrappedResultSearchQtypeForm} from './TestsysTeacherResultQtypeForm';
import DvaProps from '../types/DvaProps';
import TestTeacherSideBar from './TestTeacherSideBar'
import { Layout, Breadcrumb} from 'antd';
class HomePageProps implements DvaProps {
    public dispatch: any;
    qid: string[];
    avg: string[];
}

export default class TestsysTeacherResultQtypecomponent extends Component<HomePageProps, {}> {
    render() {
        return (
            <Layout>
                <TestTeacherSideBar dispatch={this.props.dispatch} />
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>按题目类型查询成绩</Breadcrumb.Item>
                    </Breadcrumb>
                    <Layout id = "content" style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
                        <WrappedResultSearchQtypeForm
                            qid={this.props.qid}
                            avg={this.props.avg}/>

                    </Layout>
                </Layout>
            </Layout>


        );
    }
}
