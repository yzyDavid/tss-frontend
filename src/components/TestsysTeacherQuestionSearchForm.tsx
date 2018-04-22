import {Component, FormEvent, ReactNode} from 'react';
import * as React from 'react';
import {Popconfirm, Table, Icon, Form, Button, Input, message} from 'antd';
import DvaProps from '../types/DvaProps';

const FormItem = Form.Item;
const { TextArea } = Input;

interface FormProps extends DvaProps {
    form: any;
}

export class QuestionFormData {
    qid: string;
    question: string;
    qanswer: string;
    qtype: string;
    qunit: string;
}

interface  QuestionList{
    questions: QuestionFormData[];

}


export class QuestionSearchForm extends Component<FormProps,  QuestionList> {
    constructor(props){
        super(props);
        this.state = {

            questions :[{
                qid: '1',
                question: 'Is monkey an animal?',
                qanswer: 'yes',
                qtype: 'Judge',
                qunit: '1',
            }, {
                qid: '2',
                question: 'Is apple an animal?',
                qanswer: 'no',
                qtype: 'Judge',
                qunit: '1',
            },{
                qid: '3',
                question: 'Is the sun rising from east?',
                qanswer: 'yes',
                qtype: 'Judge',
                qunit: '2',
            }]
        };
    }

    componentDidMount() {
    }

    handleSearch = (e: FormEvent<{}>) => {
        e.preventDefault();
        const formProps = this.props.form;
        formProps.validateFieldsAndScroll((err: any, values: QuestionFormData) => {
            if (err) {
                message.error('信息填写不合法');
                return;
            }
            this.props.dispatch({type:'teacherquestion/search', payload: values});
        });
    };



    handleDelete = (id) => {
//        e.preventDefault();

            this.props.dispatch({type:'teacherquestion/delete', payload: id});     //!!!!!!!!
            const DelDataSource = this.state.questions;
            DelDataSource.splice(id, 1);
            this.setState({questions: DelDataSource});
                /*list.splice(行号,1)
this.setState({list});*/
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

        const columns = [{
            title: 'Question',
            dataIndex: 'question',
            key: 'q',
            render: text => <a href="#">{text}</a>,
        }, {
            title: 'Answer',
            dataIndex: 'qanswer',
            key: 'answer',
        }, {
            title: 'Type',
            dataIndex: 'qtype',
            key: 'type',
        }, {
            title: 'Unit',
            dataIndex: 'qunit',
            key: 'unit',
        },  {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <span>
                    <a >Action 一 {record.name}</a>
                <span className="ant-divider" />
                    <Popconfirm title="Delete?" onConfirm={() => this.handleDelete(record.id)}>
                        <Button>Delete</Button>
                    </Popconfirm>
                <span className="ant-divider" />
                    <a href="#" className="ant-dropdown-link">
                        More actions <Icon type="down" />
                    </a>
                </span>
            ),
        }];



        return (
            <Form onSubmit={this.handleSearch}>

                <FormItem label="题目关键字" {...formItemLayout} hasFeedback>
                    {
                        getFieldDecorator('question', {
                            rules: [
                             //   {required: true, message: '请输入题目'}
                            ]
                        })(
                            <Input />
                           // <TextArea rows={4} />
                        )
                    }
                </FormItem>

                <FormItem label="答案关键字" {...formItemLayout} hasFeedback>
                    {
                        getFieldDecorator('qanswer', {
                            rules: [
                               // {required: true, message: '请输入答案'}
                            ]
                        })(
                            <Input  />
                        )
                    }
                </FormItem>

                <FormItem label="单元" {...formItemLayout} hasFeedback>
                    {
                        getFieldDecorator('qunit', {
                            rules: [
                              //  {required: true, message: '该知识点的单元号'}
                            ]
                        })(
                            <Input />
                        )
                    }
                </FormItem>

                <FormItem label="题型编号" {...formItemLayout} hasFeedback>
                    {
                        getFieldDecorator('qtype', {
                            rules: [
                                {pattern: /^[0-9]+$/, message: '请输入数字'}
                            ]
                        })(
                            <Input />
                        )
                    }
                </FormItem>

                <FormItem {...formItemLayout}>
                    <Button icon="copy" type="primary" htmlType="submit">搜索</Button>
                </FormItem>


                <Table columns = {columns} dataSource = {this.state.questions}/>
            </Form>



        );
    }
}

const WrappedQuestionSearchForm: any = Form.create({})(QuestionSearchForm);

export {WrappedQuestionSearchForm};
