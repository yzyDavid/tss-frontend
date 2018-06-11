import {Component} from 'react';
import * as React from 'react';
import {Layout, Menu, Icon, Modal, message} from 'antd';
import DvaProps from "../types/DvaProps";
import {WrappedPswdForm} from "./PswdEditForm";

const {Header, Footer} = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class TssProps implements DvaProps {
    show: boolean;
    visible: boolean;
    dispatch: any
}

export class TssHeader extends Component<TssProps> {
    changePswd = () => {
        this.props.dispatch({type: 'pswd/showWindow', payload: {show: true}});
    };
    handleCancal = () => {
        this.props.dispatch({type: 'pswd/showWindow', payload: {show: false}});
    };
    handleOK = () => {
        this.props.dispatch({type: 'pswd/showWindow', payload: {show: false}});
    };

    render() {
        const Buttons = (props) => {
            if (props.visible === true)
                return (
                    <span style={{alignSelf: "flex-end", position: 'absolute', right: 10}}>
                        <a href="javascript:void(0)" onClick={this.changePswd}
                           style={{fontSize: 15, marginRight: 10}}><Icon type="edit"/>修改密码</a>
                        <a href="javascript:void(0)" onClick={() => {
                            message.success("注销成功")
                        }} style={{fontSize: 15, marginRight: 10}}><Icon type="logout"/>退出登陆</a>
                        <a href="javascript:void(0)" onClick={() => {
                            this.props.dispatch({type: 'navigation/jump', payload: {direction: "navi"}});
                        }} style={{fontSize: 15}}><Icon type="logout"/>返回首页</a>
                    </span>
                );
            else {
                return (<div/>);
            }
        };

        return (

            <Header style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <h1 style={{color: 'white', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <span>教学服务系统</span>
                    <Buttons style={{alignSelf: "flex-end", position: 'absolute', right: 10}}
                             visible={this.props.visible}/>
                </h1>
                <Modal title="修改密码" wrapClassName="vertical-center-modal" visible={this.props.show}
                       onCancel={this.handleCancal} onOk={this.handleOK}>
                    <WrappedPswdForm dispatch={this.props.dispatch}/>
                </Modal>
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
    show: boolean;
    level: string;
    current: string;
}

export class NavigationBar extends Component<BarProps> {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
    };

    handleClick(e) {
        console.log("jump:" + e.key);
        if (e.key !== this.props.current) this.props.dispatch({type: 'navigation/jump', payload: {direction: e.key}});
    };

    render() {
        if (this.props.show) {
            if (this.props.level === 'Teaching Administrator' || this.props.level === "System Administrator") {
                return (
                    <Menu onClick={this.handleClick}
                          selectedKeys={[this.props.current]}
                          mode="horizontal"
                    >
                        <Menu.Item key="user"><Icon type="user"/>个人信息</Menu.Item>
                        <SubMenu title={<span><Icon type="book"/>信息管理</span>}>
                            <MenuItemGroup title="信息管理">
                                <Menu.Item key="userManage">用户信息管理</Menu.Item>
                                <Menu.Item key="courseManage">课程信息管理</Menu.Item>
                                <Menu.Item key="deptManage">院系信息管理</Menu.Item>
                                <Menu.Item key="classroomManage">教室信息管理</Menu.Item>
                            </MenuItemGroup>
                        </SubMenu>
                        <SubMenu title={<span><Icon type="calendar"/>排课系统</span>}>
                            <MenuItemGroup title="排课系统">
                                <Menu.Item key="autoScheduling">自动排课</Menu.Item>
                                <Menu.Item key="manualScheduling">手动调课</Menu.Item>
                                <Menu.Item key="curriculumTeacher">课表查询</Menu.Item>
                            </MenuItemGroup>
                        </SubMenu>
                        <Menu.Item key="forum/home"><Icon type="message"/>师生论坛</Menu.Item>
                        <SubMenu title={<span><Icon type="edit"/>测试系统</span>}>
                            <MenuItemGroup title="测试系统">
                                <Menu.Item key="testsys">在线测试</Menu.Item>
                                <Menu.Item key="scoreManager">成绩管理</Menu.Item>
                            </MenuItemGroup>
                        </SubMenu>
                        <SubMenu title={<span><Icon type="bar-chart"/>选课系统</span>}>
                            <MenuItemGroup title="选课系统">
                                <Menu.Item key="plan">在线测试</Menu.Item>
                                <Menu.Item key="manageTime">选课时间设置</Menu.Item>
                                <Menu.Item key="manSelect">学生选课管理</Menu.Item>
                            </MenuItemGroup>
                        </SubMenu>
                    </Menu>
                )
            }
            else if (this.props.level === "Teacher") {
                return (
                    <Menu onClick={this.handleClick}
                          selectedKeys={[this.props.current]}
                          mode="horizontal"
                    >
                        <Menu.Item key="user">个人信息</Menu.Item>
                        <Menu.Item key="teacherClass"><Icon type="book"/>课程管理</Menu.Item>
                        <Menu.Item key="curriculumTeacher"><Icon type="calendar"/>课表查询</Menu.Item>
                        <Menu.Item key="forum/home"><Icon type="message"/>师生论坛</Menu.Item>
                        <Menu.Item key="testsys_teacher"><Icon type="edit"/>测试系统</Menu.Item>
                        <SubMenu title={<span><Icon type="bar-chart"/>成绩管理</span>}>
                            <MenuItemGroup title="成绩管理">
                                <Menu.Item key="scoreUpload">成绩上传</Menu.Item>
                                <Menu.Item key="applyModify">成绩修改</Menu.Item>
                            </MenuItemGroup>
                        </SubMenu>
                    </Menu>

                );
            }
            else {
                return (
                    <Menu onClick={this.handleClick}
                          selectedKeys={[this.props.current]}
                          mode="horizontal"
                    >
                        <Menu.Item key="user">个人信息</Menu.Item>
                        <SubMenu title={<span><Icon type="book"/>选课系统</span>}>
                            <MenuItemGroup title="选课系统">
                                <Menu.Item key="stuSelect">学生选课</Menu.Item>
                                <Menu.Item key="unknown">课表查询</Menu.Item>
                            </MenuItemGroup>
                        </SubMenu>
                        <Menu.Item key="plan"><Icon type="calendar"/>培养方案</Menu.Item>
                        <Menu.Item key="forum/home"><Icon type="message"/>师生论坛</Menu.Item>
                        <Menu.Item key="testsys_student"><Icon type="edit"/>测试系统</Menu.Item>
                        <Menu.Item key="scoreFetch">成绩管理</Menu.Item>

                    </Menu>

                );
            }
        }
        else return null;
    }

    // else return null;
}