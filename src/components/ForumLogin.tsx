import { Form, Icon, Input, Button, Checkbox } from 'antd';
import {Component} from 'react'
import * as React from 'react'
import './css/ForumLogin.css'
import FormItem from "antd/es/form/FormItem";
import DvaProps from "../models/DvaProps";


interface FormProps extends DvaProps {
    form: any;
}


export class LoginFormData {
    uid: string;
    password: string;
}

export  class ForumLoginComponent extends Component<FormProps,LoginFormData> {


    componentDidMount(){

    }

    handleSubmit = (e) => {

    }
    render() {

        const {getFieldDecorator} = this.props.form;

        return (
        <Form  className="login-form">
            <FormItem>

                {getFieldDecorator('user', {
                    rules: [{ required: true, message: '请输入学号!' }],
                })(
                    <Input  prefix={<Icon type="user" style={{ fontSize: 13 }} />} type="user" placeholder="学号" />
                )}
            </FormItem>
            <FormItem>
                {getFieldDecorator('password', {
                    rules: [{ required: true, message: '请输入密码!' }],
                })(
                    <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码" />
                )}
            </FormItem>
            <FormItem>
                <Checkbox>记住我</Checkbox>
                <a style={{float:150}} className="login-form-forgot">忘记密码</a>
                <Button  type="primary" htmlType="submit" className="login-form-button"  >
                    登录
                </Button>
            </FormItem>

        </Form>

        );
    }
}

const ForumLoginForm: any = Form.create({})(ForumLoginComponent);

export {ForumLoginForm};
