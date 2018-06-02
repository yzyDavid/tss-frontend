import {Component, FormEvent, ReactNode} from 'react';
import * as React from 'react';
import {Icon, Form, Button, Input, message, Table, List} from 'antd';
import DvaProps from '../types/DvaProps';

const FormItem = Form.Item;
const { TextArea } = Input;

interface FormProps extends DvaProps {
    form: any;

    // pids: string[];
    // scores: string[];
    // dates: string[];
    scores: any[];
}

export class ScoreFormData {
    pid: string;
    score: string;
    date: string;
}

interface ScoreList {
    scores: ScoreFormData[];
}



export class ScoreForm extends Component<FormProps, ScoreList> {
    componentDidMount() {
    }

    constructor(props){
        super(props);
        // this.state = {
        //     scores: [{
        //         pid: "10",
        //         score: "90",
        //         date: "2018-05-01",
        //     }, {
        //         pid: "11",
        //         score: "92",
        //         date: "2018-05-02",
        //     }],
        // };
        // for(let i in this.props.pids) {
        //     this.state.scores.push({
        //         pid: this.props.pids[i],
        //         score: this.props.scores[i],
        //         date: this.props.dates[i],
        //     });
        // }
    }

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
        const columns = [
            {
                title: '试卷号',
                dataIndex: 'pid',
                key: 'pid',
            }, {
                title: '考试日期',
                dataIndex: 'date',
                key: 'date',
                render: (text, record) => (
                    <div>{record.date}</div>
                ),
            }, {
                title: '分数',
                dataIndex: 'score',
                key: 'score',
                render: (text, record) => (
                    <div>{record.score}</div>
                ),
            },
        ];

        return (
            <div>
                <Table rowKey="pid" columns = {columns} dataSource = {this.props.scores}/>
            </div>
        );
    }
}

const WrappedScoreDisplayForm: any = Form.create({})(ScoreForm);

export {WrappedScoreDisplayForm};
