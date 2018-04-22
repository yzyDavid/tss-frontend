import { Form, Icon, Input, Button, Checkbox } from 'antd';
import * as React from 'react'
import './css/ForumLogin.css'
import FormItem from "antd/es/form/FormItem";


export default class ForumLoginComponent extends React.Component {

    render() {

        return (
            <Form  className="login-form">
                <FormItem>
                    <Input  prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="学号" />

                </FormItem>
                <FormItem>
                    <Input  prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码" />
                </FormItem>
                <FormItem>
                    <Checkbox>记住我</Checkbox>
                    <a style={{float:150}} className="login-form-forgot">忘记密码</a>
                    <Button  type="primary" htmlType="submit" className="login-form-button">
                        登录
                    </Button>
                </FormItem>

            </Form>
        );
    }
}

