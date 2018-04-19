import * as React from 'react';
import {Component} from 'react';
import {Layout, Menu, Breadcrumb, Icon, Table, Divider} from 'antd';
import 'antd/dist/antd.css';

import NavigationBar from './TssPublicComponents'
import DvaProps from '../types/DvaProps';

const { Header, Content, Footer, Sider } = Layout;
const { Column } = Table;

interface UserProps extends DvaProps {
    uid: string;
    email: string;
    tel: string;
    intro: string;
}

interface UserState {
    modalVisible: boolean;
}

export default class SelectionNaviComponent extends Component<UserProps, UserState>{
    constructor(props){
        super(props);

    }
    componentDidMount(){

    };
    render(){
        return(
            <Layout>
                <div>
                <Content>
                    <NavigationBar current={"course"} dispatch={this.props.dispatch}/>
                </Content>
                </div>
            <Layout>
            <Layout>

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
        </Layout>
            </Layout>);
    }
}