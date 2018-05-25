import {Component} from 'react';
import * as React from 'react';
import {Layout, Menu, Icon, Modal, message} from 'antd';
import DvaProps from "../types/DvaProps";
import {WrappedPswdForm} from "./PswdEditForm";

const {Header, Footer} = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
// class TssProps implements DvaProps{
//     show: boolean;
//     visible: boolean;
//     dispatch: any
// }
export class TssHeader extends Component {
    // changePswd = () => {
    //     this.props.dispatch({type: 'pswd/showWindow', payload: {show: true}});
    // };
    // handleCancal = () => {
    //     this.props.dispatch({type: 'pswd/showWindow', payload: {show: false}});
    // };
    // handleOK = () => {
    //     this.props.dispatch({type: 'pswd/showWindow', payload: {show: false}});
    // };
    render() {
        return (
            <Header>
                <h1 style={{color: 'white'}}>教务服务系统
                    {/*{this.props.visible === true ? (*/}
                        {/*<a href="javascript:void(0)" onClick={this.changePswd} style={{fontSize: 15, marginLeft: 1000}}><Icon type="edit"/>修改密码</a>*/}
                            {/*) : (<div />)*/}
                    {/*}*/}
                    {/*{this.props.visible === true ? (*/}
                        {/*<a href="#" onClick={()=>{message.success("注销成功")}} style={{fontSize:15, marginLeft: 20}}><Icon type="logout" />退出登陆</a>*/}
                    {/*) : (<div />)}*/}
                </h1>
                {/*<Modal title="修改密码" wrapClassName="vertical-center-modal" visible={this.props.show} onCancel={this.handleCancal} onOk={this.handleOK}>*/}
                    {/*<WrappedPswdForm dispatch={this.props.dispatch}/>*/}
                {/*</Modal>*/}
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

export class NavigationBar extends Component<BarProps>{
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
                <SubMenu title={<span><Icon type="user" />个人信息</span>}>
                    <MenuItemGroup title="个人信息">
                        <Menu.Item key="user">个人信息查询</Menu.Item>
                        <Menu.Item key="userManage">管理用户信息</Menu.Item>
                    </MenuItemGroup>
                </SubMenu>
<<<<<<< HEAD
                <Menu.Item key="course">
                    <Icon type="book" />信息管理
                </Menu.Item>
                <Menu.Item key="list">
                    <Icon type="calendar" />排课系统
=======
                <Menu.Item key="courseManage">
                    <Icon type="book" />课程管理
                </Menu.Item>
                <Menu.Item key="deptManage">
                    <Icon type="calendar" />院系管理
>>>>>>> master
                </Menu.Item>
                <Menu.Item key="alipay">
                    <a href="http://www.alipay.com/" target="_blank"><Icon type="message" />
                        学生论坛</a>
                </Menu.Item>
                <Menu.Item key="forum">
                    <Icon type="edit" />在线测试
                </Menu.Item>
                <Menu.Item key="exam">
                    <Icon type="bar-chart" />成绩查询
                </Menu.Item>
            </Menu>
        );
    };
}