import * as React from 'react';
import {Component} from 'react';
import {Redirect} from 'react-router';
import {Button, Card, message, Row, Col, Dropdown, Menu, Modal, Layout} from 'antd';
import DvaProps from '../types/DvaProps';
import {WrappedPswdForm} from './PswdEditForm'
import {TssFooter, TssHeader} from "./TssPublicComponents";


interface NaviProps extends DvaProps {
    uid: string;
    level: string;
    pswdShow: boolean;
}

const JumpButton = (props) => {
    return (
        <Button style={{width: "100%", height: "100%", textAlign: "center"}} onClick={props.onClick}>
            <div>
                <img alt={props.btnName} width="60%" src={props.src} style={{margin: "30px auto"}}/>
            </div>
            <div>
                <h3>{props.btnName}</h3>
            </div>
        </Button>
    );
};
const {Content} = Layout;

export default class NavigationPageComponent extends Component<NaviProps, {}> {
    handleClick = (e) => {
        this.props.dispatch({type: 'navigation/jump', payload: {direction: e.direction}});
    };

    button1 = {
        btnName: "个人信息",
        src: require("" +
            "src/img/User.png"),
    };

    button2 = {
        btnName: "信息管理",
        src: require("src/img/Bookmark.png"),
    };

    button2_t = {
        btnName: "课程管理",
        src: require("src/img/Bookmark.png"),
    };

    button2_stu = {
        btnName: "选课系统",
        src: require("src/img/Bookmark.png"),
    }

    button3 = {
        btnName: "排课系统",
        src: require("src/img/Calendar.png"),
    };

    button3_t = {
        btnName: "课表查询",
        src: require("src/img/Calendar.png"),
    };

    button3_stu = {
        btnName: "培养方案",
        src: require("src/img/Book.png"),
    };

    button4 = {
        btnName: "师生论坛",
        src: require("src/img/Message.png"),
    };

    button5 = {
        btnName: "测试系统",
        src: require("src/img/DocumentEdit.png"),
    };

    button6 = {
        btnName: "选课系统",
        src: require("src/img/ChartBar.png"),
    };

    button6_t = {
        btnName: "成绩管理",
        src: require("src/img/ChartBar.png"),
    };

    render() {
        console.log(this.props.level);

        const Block1 = (props) => {
            return (
                <JumpButton {...this.button1} onClick={this.handleClick.bind(this, {direction: "user"})}/>
            );
        };

        const Block2 = (props) => {
            if (props.level === 'Teaching Administrator' || props.level === "System Administrator") {
                const menu = (
                    <Menu>
                        <Menu.Item key="userManage">
                            <a onClick={this.handleClick.bind(this, {direction: "userManage"})}>用户管理</a>
                        </Menu.Item>
                        <Menu.Item key="courseManage">
                            <a onClick={this.handleClick.bind(this, {direction: "courseManage"})}>课程管理</a>
                        </Menu.Item>
                        <Menu.Item key="deptManage">
                            <a onClick={this.handleClick.bind(this, {direction: "deptManage"})}>院系管理</a>
                        </Menu.Item>
                        <Menu.Item key="classroomManage">
                            <a onClick={this.handleClick.bind(this, {direction: "classroomManage"})}>教室管理</a>
                        </Menu.Item>
                    </Menu>
                );
                return (
                    <Dropdown overlay={menu}>
                        <div>
                            <JumpButton {...this.button2} />
                        </div>
                    </Dropdown>
                );
            }
            else if (props.level === "Teacher") {
                return (
                    <JumpButton {...this.button2_t} onClick={this.handleClick.bind(this, {direction: "teacherClass"})}/>
                );
            }
            else {
                const menu = (
                    <Menu>
                        <Menu.Item key="stuSelect">
                            <a onClick={this.handleClick.bind(this, {direction: "stuSelect"})}>学生选课</a>
                        </Menu.Item>
                        <Menu.Item key="unknown">
                            <a onClick={this.handleClick.bind(this, {direction: "unknown"})}>课表查询</a>
                        </Menu.Item>
                    </Menu>
                );
                return (
                    <Dropdown overlay={menu}>
                        <div>
                            <JumpButton {...this.button2_stu} />
                        </div>
                    </Dropdown>
                );
            }
        };

        const Block3 = (props) => {
            if (props.level === 'Teaching Administrator' || props.level === "System Administrator") {
                const menu = (
                    <Menu>
                        <Menu.Item key="autoScheduling">
                            <a onClick={this.handleClick.bind(this, {direction: "autoScheduling"})}>自动排课</a>
                        </Menu.Item>
                        <Menu.Item key="manualScheduling">
                            <a onClick={this.handleClick.bind(this, {direction: "manualScheduling"})}>手动调课</a>
                        </Menu.Item>
                        <Menu.Item key="curriculumTeacher">
                            <a onClick={this.handleClick.bind(this, {direction: "curriculumManage"})}>课表查询</a>
                        </Menu.Item>
                    </Menu>
                );
                return (
                    <Dropdown overlay={menu}>
                        <div>
                            <JumpButton {...this.button3} />
                        </div>
                    </Dropdown>
                );
            }
            else if (props.level === 'Teacher') {
                return (
                    <JumpButton {...this.button3_t}
                                onClick={this.handleClick.bind(this, {direction: "curriculumTeacher"})}/>
                );
            }
            else {
                return (
                    <JumpButton {...this.button3_stu} onClick={this.handleClick.bind(this, {direction: "plan"})}/>
                );
            }
        };

        const Block4 = () => {
            return (
                <JumpButton {...this.button4} onClick={this.handleClick.bind(this, {direction: "forum/home"})}/>
            );
        };

        const Block5 = (props) => {
            if (props.level === 'Teaching Administrator' || props.level === "System Administrator") {
                const menu = (
                    <Menu>
                        <Menu.Item key="testsys">
                            <a onClick={this.handleClick.bind(this, {direction: "testsys_teacher"})}>教师测试系统</a>
                        </Menu.Item>
                        <Menu.Item key="testsys">
                            <a onClick={this.handleClick.bind(this, {direction: "testsys_student"})}>学生测试系统</a>
                        </Menu.Item>
                        <Menu.Item key="scoreManager">
                            <a onClick={this.handleClick.bind(this, {direction: "scoreManager"})}>成绩管理</a>
                        </Menu.Item>
                    </Menu>
                );
                return (
                    <Dropdown overlay={menu}>
                        <div>
                            <JumpButton {...this.button5} />
                        </div>
                    </Dropdown>
                );
            }
            else if (props.level === "Teacher") {
                return (
                    <JumpButton {...this.button5}
                                onClick={this.handleClick.bind(this, {direction: "testsys_teacher"})}/>
                );
            }
            else {
                return (
                    <JumpButton {...this.button5}
                                onClick={this.handleClick.bind(this, {direction: "testsys_student"})}/>
                );
            }
        };

        const Block6 = (props) => {
            if (props.level === 'Teaching Administrator' || props.level === "System Administrator") {
                const menu = (
                    <Menu>
                        <Menu.Item key="plan">
                            <a onClick={this.handleClick.bind(this, {direction: "plan"})}>培养方案管理</a>
                        </Menu.Item>
                        <Menu.Item key="scoreManager">
                            <a onClick={this.handleClick.bind(this, {direction: "manageTime"})}>选课时间设置</a>
                        </Menu.Item>
                        <Menu.Item key="manSelect">
                            <a onClick={this.handleClick.bind(this, {direction: "manSelect"})}>学生选课管理</a>
                        </Menu.Item>
                    </Menu>
                );
                return (
                    <Dropdown overlay={menu}>
                        <div>
                            <JumpButton {...this.button6} />
                        </div>
                    </Dropdown>
                );
            }
            else if (props.level === "Teacher") {
                const menu = (
                    <Menu>
                        <Menu.Item key="scoreUpload">
                            <a onClick={this.handleClick.bind(this, {direction: "scoreUpload"})}>成绩上传</a>
                        </Menu.Item>
                        <Menu.Item key="scoreFetch">
                            <a onClick={this.handleClick.bind(this, {direction: "scoreFetch"})}>成绩查询</a>
                        </Menu.Item>
                        <Menu.Item key="applyModify">
                            <a onClick={this.handleClick.bind(this, {direction: "applyModify"})}>成绩修改</a>
                        </Menu.Item>
                    </Menu>
                );
                return (
                    <Dropdown overlay={menu}>
                        <div>
                            <JumpButton {...this.button6_t} />
                        </div>
                    </Dropdown>
                )
            }
            else {
                return (
                    <JumpButton {...this.button6_t} onClick={this.handleClick.bind(this, {direction: "scoreFetch"})}/>
                );
            }
        };

        return (
            <div>
                <h2 className={"ant-menu-item-group-title"} style={{fontSize: "large", marginLeft: "35px"}}>导航页面</h2>
                <div>
                    <Row>
                        <Col span={4} offset={4}>
                            <Block1 level={this.props.level}/>
                        </Col>
                        <Col span={4} offset={2}>
                            <Block2 level={this.props.level}/>
                        </Col>
                        <Col span={4} offset={2}>
                            <Block3 level={this.props.level}/>
                        </Col>
                    </Row>
                    <p/>
                    <Row>
                        <Col span={4} offset={4}>
                            <Block4/>
                        </Col>
                        <Col span={4} offset={2}>
                            <Block5 level={this.props.level}/>
                        </Col>
                        <Col span={4} offset={2}>
                            <Block6 level={this.props.level}/>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}
