import {Component} from 'react';
import * as React from 'react';
import {QuestionFormData, WrappedQuestionSearchForm} from './TestsysTeacherQuestionSearchForm';
import DvaProps from '../types/DvaProps';
import {Form} from "antd";
import {WrappedScoreDisplayForm} from "./TestsysStudentScoreForm";
import Layout from "antd/es/layout/layout";
import TestStudentSideBar from "./TestStudentSideBar";

interface UserProps extends DvaProps {
    uid: string;
    email: string;
    tel: string;
    intro: string;
    scores: any[];
    // score_pids: string[];
    // score_scores: string[];
    // score_dates: string[];
}
interface UserState {
    modalVisible: boolean;
}
const FormItem = Form.Item;

export default class TestsysStudentScoreComponent extends Component<UserProps, UserState> {
    render() {
        return (
            <Layout>
                <TestStudentSideBar dispatch={this.props.dispatch} />
                <Layout id = "content" style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
                    <h2>查询成绩</h2>
                    <WrappedScoreDisplayForm
                        dispatch={this.props.dispatch}
                        // pids={this.props.score_pids}
                        // scores={this.props.score_scores}
                        // dates={this.props.score_dates}/>
                        scores={this.props.scores} />
                </Layout>
            </Layout>
    );
    }
}
