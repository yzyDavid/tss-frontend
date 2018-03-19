import {Component} from 'react';
import * as React from 'react';
import {Layout, Button} from 'antd';

const {Header, Content, Footer} = Layout;

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
                        <Button>but</Button>
                    </Content>
                    <Footer>
                        <div style={{textAlign: "center"}}>&copy;2018 浙江大学</div>
                    </Footer>
                </Layout>
            </div>
        );
    }
}
