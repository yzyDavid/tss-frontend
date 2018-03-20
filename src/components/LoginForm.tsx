import {Component, ReactNode} from 'react';
import * as React from 'react';
import {Form, Button} from 'antd';

const FormItem = Form.Item;

interface FormProps {
    form: any;
}

export class LoginForm extends Component<FormProps, any> {
    componentDidMount() {
    }

    handleSubmit(e: any) {
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
                <FormItem>

                </FormItem>
            </Form>
        );
    }
}

const WrappedLoginForm = Form.create({})(LoginForm);

export {WrappedLoginForm};
