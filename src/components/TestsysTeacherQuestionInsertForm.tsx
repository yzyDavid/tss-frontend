import {Component, FormEvent, ReactNode} from 'react';
import * as React from 'react';
import {Icon, Form, Button, Input, message} from 'antd';
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

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 14,
            offset: 6,
        },
    },
};
export class QuestionInsertForm extends Component<FormProps, QuestionFormData> {
    componentDidMount() {
    }

    handleSubmit = (e: FormEvent<{}>) => {
        e.preventDefault();
        const formProps = this.props.form;
        formProps.validateFieldsAndScroll((err: any, values: QuestionFormData) => {
            if (err) {
                message.error('信息填写不合法');
                return;
            }
            this.props.dispatch({type:'teacherquestion/insert', payload: values});     //!!!!!!!!
            console.log("insertquestion");
            console.log(values);
        });

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
        return (
            <Form onSubmit={this.handleSubmit}>

                <FormItem label="题目号" {...formItemLayout} hasFeedback>
                    {
                        getFieldDecorator('qid', {
                            rules: [
                                {required: true, message: '请输入题目号'},
                                {pattern: /^[0-9]+$/, message: '请输入数字'}
                            ]
                        })(

                            <Input />
                        )
                    }
                </FormItem>

                <FormItem label="题目" {...formItemLayout} hasFeedback>
                    {
                        getFieldDecorator('question', {
                            rules: [
                                {required: true, message: '请输入题目'}
                            ]
                        })(

                            <TextArea rows={4} />
                        )
                    }
                </FormItem>

                <FormItem label="答案" {...formItemLayout} hasFeedback>
                    {
                        getFieldDecorator('qanswer', {
                            rules: [
                                {required: true, message: '请输入答案'}
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
                                {required: true, message: '该知识点的单元号'}
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
                                {required: true, message: '请输入题型（1：判断，2：选择，3：填空）'},
                                {pattern: /^[0-9]+$/, message: '请输入数字'}
                            ]
                        })(
                            <Input />
                        )
                    }
                </FormItem>

                <FormItem {...tailFormItemLayout}>
                    <Button icon="copy" type="primary" htmlType="submit">提交</Button>
                </FormItem>
            </Form>
        );
    }
}

const WrappedQuestionInsertForm: any = Form.create({})(QuestionInsertForm);

export {WrappedQuestionInsertForm};
