import { Menu, Breadcrumb, Icon } from 'antd';
import * as React from 'react';
import BrowserFrame from './ForumBrowserFrame';
import './css/ForumHomePage.css'
const SubMenu = Menu.SubMenu;




export default class ForumHomePageComponent extends React.Component{

    constructor(props) {
        super(props);

        // 设置 initial state
        this.state = {
            text: props.initialValue || 'placeholder'
        };

        // ES6 类中函数必须手动绑定
        //this.handleChange = this.handleChange.bind(this);
    }


    render(){
        return(
            <BrowserFrame>
                <div className="ant-layout-topaside">
                    <div className="ant-layout-header">
                        <div className="ant-layout-wrapper">
                            <div className="ant-layout-logo"></div>
                            <Menu theme="dark" mode="horizontal"
                                  defaultSelectedKeys={['1']} style={{lineHeight: '64px'}}>
                                <Menu.Item key="1">首页</Menu.Item>
                                <Menu.Item key="2">个人中心</Menu.Item>
                                <Menu.Item key="3">消息中心</Menu.Item>
                            </Menu>
                        </div>
                    </div>


                    <div className="ant-layout-wrapper">
                        <div className="ant-layout-breadcrumb">
                            <Breadcrumb>
                                <Breadcrumb.Item>搜索</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                        <div className="ant-layout-container">
                            <aside className="ant-layout-sider">
                                <Menu mode="inline" defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']}>
                                    <SubMenu key="sub1" title={<span><Icon type="user" />订阅版块</span>}>
                                        <Menu.Item key="1">选项1</Menu.Item>
                                        <Menu.Item key="2">选项2</Menu.Item>
                                        <Menu.Item key="3">选项3</Menu.Item>
                                        <Menu.Item key="4">选项4</Menu.Item>
                                    </SubMenu>
                                    <SubMenu key="sub2" title={<span><Icon type="laptop" />导航二</span>}>
                                        <Menu.Item key="5">选项5</Menu.Item>
                                        <Menu.Item key="6">选项6</Menu.Item>
                                        <Menu.Item key="7">选项7</Menu.Item>
                                        <Menu.Item key="8">选项8</Menu.Item>
                                    </SubMenu>
                                    <SubMenu key="sub3" title={<span><Icon type="notification" />全部版块</span>}>
                                        <Menu.Item key="9">选项9</Menu.Item>
                                        <Menu.Item key="10">选项10</Menu.Item>
                                        <Menu.Item key="11">选项11</Menu.Item>
                                        <Menu.Item key="12">选项12</Menu.Item>
                                    </SubMenu>
                                </Menu>
                            </aside>
                            <div className="ant-layout-content">
                                <div style={{ height: 240 }}>
                                    <div style={{clear: 'both'}}>内容区域</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </BrowserFrame>
        );
    }
}

