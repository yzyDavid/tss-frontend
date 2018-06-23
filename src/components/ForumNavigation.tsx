import {Component} from 'react';
import * as React from 'react';
import {Layout, Menu, Icon,Badge } from 'antd';
import DvaProps from "../types/DvaProps";
const {Header, Footer} = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;



interface BarProps extends DvaProps {
    current: string;
    unread:any;
}

export default class NavigationBar extends Component<BarProps>{
    constructor(props){
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }
    componentDidMount() {
        // this.props.dispatch
    };
    handleClick(e) {
        if(e.key !== this.props.current)this.props.dispatch({type:'ForumNavigation/jump', payload: {direction: e.key}});
    };
    render() {
        return (

            <div>

                <Menu onClick={this.handleClick}
                      selectedKeys={[this.props.current]}
                      mode="horizontal"
                >


                    <Menu.Item key="home">
                        <Icon type="calendar" />首页
                    </Menu.Item>



                    <SubMenu title={<span><Icon type="user" />个人中心</span>}>
                        <MenuItemGroup >
                            <Menu.Item key="userinfo">基本信息</Menu.Item>
                            <Menu.Item key="mypost">我的帖子</Menu.Item>
                        </MenuItemGroup>
                    </SubMenu>


                    <SubMenu title={<span><Icon type="message" />消息中心<Badge style={{marginLeft:10,marginBottom:3}} count={parseInt(this.props.unread.replyNum)+parseInt(this.props.unread.letterNum)}>
                            </Badge></span>}>
                        <MenuItemGroup >
                            <Menu.Item key="PrivateLetter">私信
                                <Badge style={{marginLeft:10,marginBottom:3}} count={parseInt(this.props.unread.letterNum)}>
                                </Badge></Menu.Item>
                            <Menu.Item key="Reply">回复我的
                                <Badge style={{marginLeft:10,marginBottom:3}} count={parseInt(this.props.unread.replyNum)}>
                                </Badge></Menu.Item>
                        </MenuItemGroup>
                    </SubMenu>
                </Menu>

            </div>

        );
    };
}