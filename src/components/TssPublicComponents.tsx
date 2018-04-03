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
        if(e.key !== this.props.current)this.props.dispatch({type:'navigation/jump', payload: {direction: e.key}});
    };
    render() {
        return (
            <Menu onClick={this.handleClick}
                  selectedKeys={[this.props.current]}
                  mode="horizontal"
            >
                <Menu.Item key="user">
                    <Icon type="user" />个人信息
                </Menu.Item>
                <Menu.Item key="course">
                    <Icon type="book" />课程信息
                </Menu.Item>
                <SubMenu title={<span><Icon type="book" />课程信息</span>}>
                    <MenuItemGroup title="分组1">
                        <Menu.Item key="setting:1">选项1</Menu.Item>
                        <Menu.Item key="setting:2">选项2</Menu.Item>
                    </MenuItemGroup>
                    <MenuItemGroup title="分组2">
                        <Menu.Item key="setting:3">选项3</Menu.Item>
                        <Menu.Item key="setting:4">选项4</Menu.Item>
                    </MenuItemGroup>
                </SubMenu>
                <Menu.Item key="alipay">
                    <a href="http://www.alipay.com/" target="_blank">导航四 - 链接</a>
                </Menu.Item>
                <Menu.Item key="forum">
                    <Icon type="message" />论坛
                </Menu.Item>
                <Menu.Item key="exam">
                    <Icon type="edit" />考试信息
                </Menu.Item>
            </Menu>
        );
    };
}