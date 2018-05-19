import {Component} from 'react';
import * as React from 'react';
import {Layout, Menu, Icon} from 'antd';
import DvaProps from "../types/DvaProps";

const {Header, Footer} = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

export class TssHeader extends Component {
    render() {
        return (
            <Header>
                <h1 style={{color: 'white'}}>教务服务系统</h1>
            </Header>
        );
    }
}

export class TssFooter extends Component {
    render() {
        return (
            <Footer>
                <div style={{textAlign: 'center'}}>&copy;2018 浙江大学</div>
            </Footer>
        );
    }
}

interface BarProps extends DvaProps {
    current: string;
}

export default class NavigationBar extends Component<BarProps>{
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    componentDidMount() {
    };
    handleClick(e) {
        console.log("jump:"+e.key);
        if(e.key !== this.props.current)this.props.dispatch({type:'navigation/jump', payload: {direction: e.key}});
    };
    render() {
        return (
            <Menu onClick={this.handleClick}
                  selectedKeys={[this.props.current]}
                  mode="horizontal"
            >
                <SubMenu title={<span><Icon type="user" />个人信息</span>}>
                    <MenuItemGroup title="个人信息">
                        <Menu.Item key="user">个人信息查询</Menu.Item>
                        <Menu.Item key="setting:2">管理用户信息</Menu.Item>
                    </MenuItemGroup>
                </SubMenu>
                <Menu.Item key="course">
                    <Icon type="book" />选课系统
                </Menu.Item>
                <Menu.Item key="list">
                    <Icon type="calendar" />查看课表
                </Menu.Item>
                <Menu.Item key="forum">
                        学生论坛
                </Menu.Item>
                <Menu.Item key="exam">
                    <Icon type="edit"  />在线测试
                </Menu.Item>
                <Menu.Item key="score">
                    <Icon type="bar-chart" />成绩查询
                </Menu.Item>
            </Menu>
        );
    };
}