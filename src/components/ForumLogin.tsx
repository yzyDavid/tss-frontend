import { Form, Icon, Input, Button, Checkbox } from 'antd';
import * as React from 'react'
import HomePageComponent from "./HomePage";
const FormItem = Form.Item;

export default class ForumLoginComponent extends React.Component {

    render() {

        return (
            <Form  className="login-form">
                <FormItem>
                    <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />

                </FormItem>
                <FormItem>
                    <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
                </FormItem>
                <FormItem>
                    <Checkbox>Remember me</Checkbox>
                    <a className="login-form-forgot">Forgot password</a>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>

                </FormItem>
            </Form>
        );
    }
}

