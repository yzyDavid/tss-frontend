import {Component, ReactNode} from 'react';
import * as React from 'react';
import {Form} from 'antd';

interface FormProps {
    form: any;
}

export class LoginForm extends Component<FormProps, any> {
    componentDidMount() {
    }

    handleSubmit(e: any) {
    }

    render(): ReactNode {
        return (
            <div>form</div>
        );
    }
}

const WrappedLoginForm = Form.create({})(LoginForm);

export {WrappedLoginForm};
