import {Component, FormEvent, ReactNode} from 'react';
import * as React from 'react';
import {Icon, Form, Button, Input, message} from 'antd';
import DvaProps from '../types/DvaProps';

const FormItem = Form.Item;

interface FormProps extends DvaProps {
    form: any;
}

export class LoginFormData {
    old: string;
    new: string;
    new2: string
}

export class PswdForm extends Component<FormProps, LoginFormData> {
    componentDidMount() {
    }

    handleSubmit = (e: FormEvent<{}>) => {
        e.preventDefault();
        const formProps = this.props.form;
        formProps.validateFieldsAndScroll((err: any, values: LoginFormData) => {
            if (err) {
                message.error('信息填写不合法');
                return;
            }
            if(values.new !== values.new2){
                message.error('两次密码不一致');
                return;
            }
            this.props.dispatch({type:'pswd/modify', payload: {oldPwd: values.old, newPwd: values.new}});
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
                <FormItem label="旧密码" {...formItemLayout} hasFeedback>
                    {
                        getFieldDecorator('old', {
                            rules: [
                                {required: true, message: '请输入旧密码'}
                            ]
                        })(
                            <Input />
                        )
                    }
                </FormItem>
                <FormItem label="新密码" {...formItemLayout} hasFeedback>
                    {
                        getFieldDecorator('new', {
                            rules: [
                                {required: true, message: '请输入新密码'}
                            ]
                        })(
                            <Input/>
                        )
                    }
                </FormItem>
                <FormItem label="确认新密码" {...formItemLayout} hasFeedback>
                    {
                        getFieldDecorator('new2', {
                            rules: [
                                {required: true, message: '请确认新密码'}
                            ]
                        })(
                            <Input/>
                    )
                    }
                </FormItem>
            </Form>
        );
    }
}

const WrappedPswdForm: any = Form.create({})(PswdForm);

export {WrappedPswdForm};
