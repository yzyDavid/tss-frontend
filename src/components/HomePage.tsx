import {Component} from 'react';
import * as React from 'react';
import {Layout, Form, Input, Button, Checkbox, Card, Col} from 'antd';

const {Header, Content, Footer} = Layout;
const FormItem = Form.Item;

class LoginForm extends Component{
    constructor(props) {
        super(props);
        this.state = {
            id: 'Please input your id.',
            password: 'Please input your password',
            agreement: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log('收到表单值：', this.state);
    }

    handleChange(e) {
        const target = e.target;
        const name = target.name;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem
                    label="账户"
                >
                    <Input name='id' placeholder="请输入账户名" onChange={this.handleChange}/>
                </FormItem>
                <FormItem
                    label="密码"
                >
                    <Input name='password' type="password" placeholder="请输入密码" onChange={this.handleChange}/>
                </FormItem>
                <FormItem>
                    <Checkbox name='agreement' onChange={this.handleChange}>记住我</Checkbox>
                </FormItem>
                <Button type="primary" htmlType="submit">登录</Button>
            </Form>
        );
    }
}

export default class HomePage extends Component {
    render() {
        return (
            <div>
                <Layout>
                    <Header>
                        <h1 style={{color: "white"}}>教务服务系统</h1>
                    </Header>
                    <Content style={{minHeight: "500px"}}>
                        <h2>登录</h2>
                        <div>
                            <Col span={8} offset={8}>
                            <Card title="Login" extra={<a href="#">Froget password?</a>}>
                                <p><LoginForm /></p>
                            </Card>
                            </Col>
                        </div>
                    </Content>
                    <Footer>
                        <div style={{textAlign: "center"}}>&copy;2018 浙江大学</div>
                    </Footer>
                </Layout>
            </div>
        );
    }
}