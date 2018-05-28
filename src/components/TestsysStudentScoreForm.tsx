import {Component, FormEvent, ReactNode} from 'react';
import * as React from 'react';
import {Icon, Form, Button, Input, message, Table, List} from 'antd';
import DvaProps from '../types/DvaProps';

const FormItem = Form.Item;
const { TextArea } = Input;

interface FormProps extends DvaProps {
    form: any;
    scores: ScoreFormData[];
}

export class ScoreFormData {
    pid: string;
    score: string;
}



export class ScoreForm extends Component<FormProps, ScoreFormData> {
    componentDidMount() {
    }

    constructor(props){
        super(props);
        this.state = {
            pid: '1',
            score: '90',
        };
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
                // title: '状态',
                // dataIndex: 'pstatus',
                // key: 'status',
                // render: (text, record) => (
                //     <div>{record.pstatus==true? "已参加":"尚未参加"}</div>
                // ),

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
