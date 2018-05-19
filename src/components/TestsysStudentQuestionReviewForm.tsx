import {Component, FormEvent, ReactNode} from 'react';
import * as React from 'react';
import {Icon, Form, Button, Input, message, Table, List} from 'antd';
import DvaProps from '../types/DvaProps';
import RadioGroup from "antd/es/radio/group";
import Radio from "antd/es/radio/radio";

const FormItem = Form.Item;
const { TextArea } = Input;

interface FormProps extends DvaProps {
    form: any;
    questions: QuestionFormData[];
}

export class QuestionFormData {
    qid: string;
    question: string;
    qtype: string;
    qanswer: string;
    qmyanswer: string;
    qunit: string;
}

export class QuestionReviewForm extends Component<FormProps, QuestionFormData> {
    componentDidMount() {
    }

    constructor(props){
        super(props);
        this.state = {
            qid: '1',
            question: 'Is monkey an animal?',
            qtype: 'Judge',
            qanswer: 'yes',
            qmyanswer: 'yes',
            qunit: '1',
        };
    }

    handleSave = () => {
        //check unanswered
        // const values = {
        //
        // };
        console.log("handle save");
    };

    handleSubmit = () => {
        this.handleSave();
        const values = {};
        this.props.dispatch({type:"studentquestion/submit", payload: values});
        console.log("handle submit");
    };

    handleUpdate = (qid, radio) => {
        this.handleSave();
        const values = {
            id: qid,
            myanswer: radio.value,
        };
        console.log("handle update");
    };


    render() {
        const list = this.props.questions;


        const {getFieldDecorator} = this.props.form;
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
        const columns = [
            {
                title: '题目号',
                dataIndex: 'qid',
                key: 'qid',
            },{
                title: '问题',
                dataIndex: 'question',
                key: 'question',
            }, {
                title: '单元',
                dataIndex: 'qunit',
                key: 'unit',
            }, {
                title: '答题',
                key: 'action',
                render: (text, record) => (
                <RadioGroup onChange={()=>this.handleUpdate(record.qid, this)}>
                    <Radio>True</Radio>
                    <Radio>False</Radio>
                </RadioGroup>
                ),
            // }, {
            // title: '分数',
            // dataIndex: 'qscore',
            // key: 'score',
            // }, {
            }

        ];

        return (
            <div>
            <Table rowKey="qid" columns = {columns} dataSource = {this.props.questions}/>
            <Button onClick={()=>this.handleSave()}>保存</Button>
            <Button onClick={()=>this.handleSubmit()}>提交</Button>
            </div>
        );
    }
}

const WrappedQuestionReviewForm: any = Form.create({})(QuestionReviewForm);

export {WrappedQuestionReviewForm};
