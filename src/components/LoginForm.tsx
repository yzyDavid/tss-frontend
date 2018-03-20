import {Component, FormEvent, ReactNode} from 'react';
import * as React from 'react';
import {Icon, Form, Button, Input} from 'antd';
import DvaProps from '../models/DvaProps';

const FormItem = Form.Item;

interface FormProps extends DvaProps {
    form: any;
}

export class LoginForm extends Component<FormProps, any> {
    componentDidMount() {
    }

    handleSubmit(e: FormEvent<any>) {
        e.preventDefault();
        const formProps = this.props.form;
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
            <Form onSubmit={this.handleSubmit}>
                <FormItem label="统一身份编号" {...formItemLayout} hasFeedback>
                    {
                        getFieldDecorator('uid', {
                            rules: [
                                {required: true, message: '请输入学号或教工号'},
                                {pattern: /^[0-9]+$/, message: '请输入数字'}
                            ]
                        })(
                            <Input prefix={<Icon type="user" style={{fontSize: 13}}/>}/>
                        )
                    }
                </FormItem>
                <FormItem label="密码" {...formItemLayout} hasFeedback>
                    {
                        getFieldDecorator('password', {
                            rules: [
                                {required: true, message: '请输入密码'}
                            ]
                        })(
                            <Input prefix={<Icon type="password" style={{fontSize: 13}}/>}/>
                        )
                    }
                </FormItem>
            </Form>
        );
    }
}

const WrappedLoginForm = Form.create({})(LoginForm);

export {WrappedLoginForm};
