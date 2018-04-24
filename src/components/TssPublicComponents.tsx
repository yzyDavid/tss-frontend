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


                <Menu.Item key="home">
                    <Icon type="calendar" />首页
                </Menu.Item>
                {/*<Menu.Item key="alipay">*/}
                    {/*<a href="http://www.alipay.com/" target="_blank"><Icon type="message" />*/}
                        {/*学生论坛</a>*/}
                {/*</Menu.Item>*/}
                <Menu.Item key="user">
                    <Icon type="user" />个人中心
                    {/*<MenuItemGroup >*/}
                        {/*<Menu.Item key="user">基本资料</Menu.Item>*/}
                        {/*<Menu.Item key="setting:2">我的帖子</Menu.Item>*/}
                    {/*</MenuItemGroup>*/}
                </Menu.Item>


                <SubMenu title={<span><Icon type="message" />消息中心</span>}>
                    <MenuItemGroup >
                        <Menu.Item key="user">私信</Menu.Item>
                        <Menu.Item key="setting:2">回复我的</Menu.Item>
                    </MenuItemGroup>
                </SubMenu>
            </Menu>
        );
    };
}