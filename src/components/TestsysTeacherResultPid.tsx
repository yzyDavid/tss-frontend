import {Component} from 'react';
import * as React from 'react';
import {WrappedResultSearchPidForm} from './TestsysTeacherResultPidForm';
import DvaProps from '../types/DvaProps';
import TestTeacherSideBar from './TestTeacherSideBar'
import { Layout, Breadcrumb} from 'antd';

export class ResultPidProps implements DvaProps {
    public dispatch: any;

    // qids: string[];
    // rates: string[];
    qresult: any[];

}

export default class TestsysTeacherResultPidComponent extends Component<ResultPidProps, {}> {
    render() {
        return (
            <Layout>
                <TestTeacherSideBar dispatch={this.props.dispatch} />
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>按试卷号查询成绩</Breadcrumb.Item>
                    </Breadcrumb>
                    <Layout id = "content" style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
                        <WrappedResultSearchPidForm dispatch={this.props.dispatch}
                            qresult={this.props.qresult}/>

                    </Layout>
                </Layout>
            </Layout>


        );
    }
}
