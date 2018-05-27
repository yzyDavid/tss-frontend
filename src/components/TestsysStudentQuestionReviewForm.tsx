import {Component, FormEvent, ReactNode} from 'react';
import * as React from 'react';
import {Icon, Form, Button, Input, message, Table, List, Tabs} from 'antd';
import DvaProps from '../types/DvaProps';
import RadioGroup from "antd/es/radio/group";
import Radio from "antd/es/radio/radio";
import Popconfirm from "antd/es/popconfirm";
import TestsysStudentQuestionPageComponent from "./TestsysStudentQuestionReview";
import Timer = NodeJS.Timer;
import {renderToStaticNodeStream} from "react-dom/server";
import Card from "antd/es/card";

const FormItem = Form.Item;
const { TextArea } = Input;
const TabPane = Tabs.TabPane;

interface FormProps extends DvaProps {
    form: any;
    // questions: QuestionFormData[];
    qids: string[];
    questions: any[];
    uid: string;
    pid: string;
}

export class QuestionFormData {
    qid: string;
    question: string;
    qtype: string;
    qanswer: string;
    qmyanswer: string;
    qunit: string;
}

interface questionState {
    time: string;
}

let j_questions: any[] = [];
let s_questions: any[] = [];
let f_questions: any[] = [];

let myAns: any[] = [];
let time: string = "";

export class QuestionReviewForm extends Component<FormProps, questionState> {
    componentDidMount() {
    }

    interval() {
        this.setState({ time: new Date().toUTCString()});
    }
    start() {
        // this.timeToken = setInterval(() => time = new Date().toUTCString(), 1000);
        const{form} = this.props;
        setInterval(function(){
            form.setFieldValue('time');
            time = new Date().toUTCString();
            }, 1000);
    }

    constructor(props){
        super(props);

        console.log(this.state);
        console.log(this.props);
        for(var i=0;i<this.props.qids.length;i++) {
            this.props.dispatch({type:'testsys_student/getquestion', payload: {qid: this.props.qids[i], uid: this.props.form.uid}});
        }
        for(var i=0;i<this.props.questions.length;i++) {
            switch(this.props.questions[i].qtype) {
                case '1':
                    j_questions.push(this.props.questions[i]);
                    break;
                case '2':
                    s_questions.push(this.props.questions[i]);
                    break;
                case '3':
                    f_questions.push(this.props.questions[i]);
                    break;
            }
        }
    }


    handleSave = () => {
        let values: any = {
            ans:[],
            qid:[],
            pid: this.props.pid,
        };
        console.log("handle save");
        for (var i = 0; i < myAns.length; i++) {
            console.log("qid "+myAns[i].id+": "+myAns[i].myanswer);
            values.ans.push(myAns[i].myanswer);
            values.qid.push(myAns[i].id);
        }
        this.props.dispatch({type:'testsys_student/save', payload: values});
    };

    handleSubmit = () => {
        this.handleSave();
        this.props.dispatch({type:'testsys_student/submit', payload: {pid: this.props.pid}});
        console.log("handle submit");
    };

    handleUpdate = (qid, e) => {
        var flag = false;
        for(let rec of myAns) {
            if(rec.id==qid) {
                rec.myanswer = e.target.value;
                flag = true;
            }
        }
        if(!flag) {
            myAns.push({
                id: qid,
                myanswer: e.target.value,
            });
        }
        console.log("handle update: "+qid);
    };

    // confirmText = (e) => {
    //     let hint: string = "";
    //     let diff: number = data.length - myAns.length;
    //     if(diff)
    //         hint = (diff==1)?" question":" questions"+" are not answered.\n";
    //     console.log(diff);
    //     return {hint}+"Submit?";
    // };

    render() {
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
        const columns_j = [
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
                <RadioGroup onChange={(event)=>this.handleUpdate(record.qid, event)}>
                    <Radio value={1}>True</Radio>
                    <Radio value={0}>False</Radio>
                </RadioGroup>
                ),
            // }, {
            // title: '分数',
            // dataIndex: 'qscore',
            // key: 'score',01
            // }, {
            }
        ];
        const columns_s = [
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
                    <RadioGroup onChange={(event)=>this.handleUpdate(record.qid, event)}>
                        <Radio value={1}>A</Radio>
                        <Radio value={2}>B</Radio>
                        <Radio value={3}>C</Radio>
                        <Radio value={4}>D</Radio>
                    </RadioGroup>
                ),
            }
        ];
        const columns_f = [
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
                    <FormItem>
                        {
                            getFieldDecorator(`myanswer${record.qid}`, {
                                rules: []
                            })(
                                <Input onBlur={(event)=>this.handleUpdate(record.qid, event)}/>
                            )
                        }
                    </FormItem>
                ),
            }
        ];

        return (
            <div>
                <FormItem>
                    {
                        getFieldDecorator("time", {
                            rules: []
                        })(
                            <div></div>
                        )
                    }
                </FormItem>
                <List bordered dataSource={[`剩余时间 - ${time}`]} renderItem={item => (<List.Item>{item}</List.Item>)}/>
                <Tabs defaultActiveKey="1">
                    <TabPane tab="判断题" key="1">
                        <Table rowKey="qid" columns = {columns_j} dataSource = {j_questions}/>
                    </TabPane>
                    <TabPane tab="选择题" key="2">
                        <Table rowKey="qid" columns = {columns_s} dataSource = {s_questions}/>
                    </TabPane>
                    <TabPane tab="填空题" key="3">
                        <Table rowKey="qid" columns = {columns_f} dataSource = {f_questions}/>
                    </TabPane>
                </Tabs>

                <Button onClick={()=>this.handleSave()}>保存</Button>
                <span className="ant-divider" />
                <Popconfirm title="Submit?" onConfirm={() => this.handleSubmit()}>
                    <Button>提交</Button>
                </Popconfirm>
                <span className="ant-divider" />
            </div>
        );
    }
}

const WrappedQuestionReviewForm: any = Form.create({})(QuestionReviewForm);

export {WrappedQuestionReviewForm};
