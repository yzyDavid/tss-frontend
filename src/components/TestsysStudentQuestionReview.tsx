import * as React from 'react';
import {Component} from 'react';
import {Form, Button, Modal} from 'antd';
import DvaProps from '../types/DvaProps';
import {NavigationBar} from './TssPublicComponents';
import {QuestionFormData, WrappedQuestionReviewForm} from "./TestsysStudentQuestionReviewForm";
import { start } from 'repl';
import TestStudentSideBar from "./TestStudentSideBar";
import Layout from "antd/es/layout/layout";

interface UserProps extends DvaProps {
    uid: string;
    email: string;
    tel: string;
    intro: string;
    // questions: QuestionFormData[];
    questions: any;
    qids: string[];
    pid: string;
    startTime: string;
    currentTime: string;
}
interface UserState {
    modalVisible: boolean;
}
const FormItem = Form.Item;

export default class TestsysStudentQuestionPageComponent extends Component<UserProps, UserState> {
    constructor(props){
        super(props);
        this.state = {
            modalVisible: false
        };
        console.log(this.state);
        console.log(this.props);
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
            <Layout>
                <TestStudentSideBar dispatch={this.props.dispatch} />
                <div>
                    <h2>查看题目</h2>
                    <WrappedQuestionReviewForm
                        dispatch = {this.props.dispatch}
                        questions = {this.props.questions}
                        // qids = {this.props.qids}
                        uid = {this.props.uid}
                        pid = {this.props.pid}
                        startTime = {this.props.startTime}
                        currentTime = {this.props.currentTime}/>
                </div>
            </Layout>
        );
    }
}
