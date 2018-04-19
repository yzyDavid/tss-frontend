import * as React from 'react';
import {Component} from 'react';
import {Layout, Menu, Breadcrumb, Icon, Table, Divider} from 'antd';
import 'antd/dist/antd.css';
import DvaProps from '../types/DvaProps';

const { Header, Content, Footer, Sider } = Layout;
const { Column } = Table;

export default class SelectionNaviComponent extends Component{
    componentDidMount(){

    };
    render(){
        return( <Layout>
            <Sider
                trigger={null}
                collapsible
                /*collapsed={this.state.collapsed}*/
            >
                <div className="logo" />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1">
                        <Icon type="book" />
                        <span className="nav-text">培养方案</span>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Icon type="search" />
                        <span className="nav-text">搜索课程</span>
                    </Menu.Item>
                    <Menu.Item key="3" >
                        <Icon type="plus-circle" />
                        <span className="nav-text">选课</span>
                    </Menu.Item>
                    <Menu.Item key="4">
                        <Icon type="file" />
                        <span className="nav-text" >查看课表</span>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Header style={{ background: '#000', padding: 0 }}>
                    <span style={{color:'#fff', paddingLeft:'2%', fontSize:'1.4em'}}>选课系统</span>
                    <span style={{color:'#fff', float:'right', paddingRight:'1%'}}>
                            <img src="src/image/zju_logo.jpg" className="App-logo" alt="logo" />
                        </span>
                </Header>
                <Content style={{ margin: '0 16px' }}>
                    <Breadcrumb style={{ margin: '12px 0' }}>
                        <Breadcrumb.Item>选课系统</Breadcrumb.Item>
                    </Breadcrumb>
                    <div style={{ padding: 24, background: '#fff', minHeight: 780 }}>

                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    浙江大学本科生院 ©2018 Created by Group A
                </Footer>
            </Layout>
        </Layout>);
    }
}