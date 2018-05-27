import {Component, FormEvent, ReactNode} from 'react';
import * as React from 'react';
import {Icon, Form, Button, Input, message, Table, List} from 'antd';
import DvaProps from '../types/DvaProps';

const FormItem = Form.Item;
const { TextArea } = Input;

interface FormProps extends DvaProps {
    form: any;
    pids: string[];
    papers: PaperFormData[];
    uid: string;
}

export class PaperFormData {
    pid: string;
    pstatus: boolean;
    pscore: string;
    ptime: string;
    plength: string
}

export class PaperForm extends Component<FormProps, PaperFormData> {
    componentDidMount() {
    }

    constructor(props){
        super(props);
        // this.state = {
        //     pid: '1',
        //     pstatus: true,
        //     pscore: '90',
        //     ptime: "Monday 9:00-9:15",
        //     plength: "1:30:00",
        // };
        for(var i=0;i<this.props.pids.length;i++) {
            this.props.dispatch({type:'testsys_student/getpaper', payload: {qid: this.props.pids[i], uid: this.props.form.uid}});
        }
        // for(var i=0;i<this.props.papers.length;i++) {
        // }
    }

    handleBeginClick = (pid) => {
        console.log("getqids: "+pid);
        const values = {pid: pid, sid: this.props.form.uid};
        this.props.dispatch({type:'testsys_student/getquestions', payload: values});
    };


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
                title: '状态',
                dataIndex: 'pstatus',
                key: 'status',
            }, {
                title: '分数',
                dataIndex: 'pscore',
                key: 'score',
                render: (text, record) => (
                    <div>{record.score}</div>
                ),
            }, {
                title: '开始时间',
                dataIndex: 'ptime',
                key: 'time',
            }, {
                title: '时长',
                dataIndex: 'plength',
                key: 'length',
            }, {
                title: '',
                key: 'action',
                render: (text, record) => (
                    <div>
                        <Button icon="copy"  type="primary" htmlType="submit" onClick={()=>this.handleBeginClick(record.pid)}>开始答题</Button>
                    </div>
                )
            }
        ];

        return (
            <div>
                <Table rowKey="pid" columns = {columns} dataSource = {this.props.papers}/>
        </div>
    );
    }
}

const WrappedPaperDisplayForm: any = Form.create({})(PaperForm);

export {WrappedPaperDisplayForm};
