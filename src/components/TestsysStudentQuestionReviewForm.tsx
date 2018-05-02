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
    question: string;
    qanswer: string;
    qmyanswer: string;
    qunit: string;
}

export class QuestionReviewForm extends Component<FormProps, QuestionFormData> {
    componentDidMount() {
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
        return (
            <div>
                <div>
                    <h3>题干</h3>
                </div>
                <div>
                    <h3>正确答案</h3>
                </div>
            </div>
    );
    }
}

const WrappedQuestionReviewForm: any = Form.create({})(QuestionReviewForm);

export {WrappedQuestionReviewForm};
