import {Component} from 'react';
import * as React from 'react';
import {Layout} from 'antd';

const {Header, Content, Footer} = Layout;

export default class HomePageComponent extends Component {
    render() {
        return (
            <div>
                <Layout>
                    <Header>
                        <h1 style={{color: "white"}}>教务服务系统</h1>
                    </Header>
                    <Content style={{minHeight: "500px"}}>
                        <h2>登录</h2>
                    </Content>
                    <Footer>
                        <div style={{textAlign: "center"}}>&copy;2018 浙江大学</div>
                    </Footer>
                </Layout>
            </div>
        );
    }
}
