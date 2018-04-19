import * as React from 'react';
import {Component} from 'react';
import {Redirect} from 'react-router';
import {Button, Card, message, Row, Col, Dropdown, Menu} from 'antd';
import DvaProps from '../types/DvaProps';

interface NaviProps extends DvaProps {
    uid: string;
    level: string;
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
}

export default class NavigationPageComponent extends Component<NaviProps, {}> {
    handleClick = (e) => {
        this.props.dispatch({type:'navigation/jump', payload: {direction: e.direction}});
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

    button2_stu = {
        btnName: "选课系统",
        src: require("src/img/Bookmark.png"),
    }

    button3 = {
        btnName: "自动排课",
        src: require("src/img/Calendar.png"),
    };

    button3_stu = {
        btnName: "培养方案",
        src: require("src/img/Book.png"),
    }

    button4 = {
        btnName: "学生论坛",
        src: require("src/img/Message.png"),
    };

    button5 = {
        btnName: "在线测试",
        src: require("src/img/DocumentEdit.png"),
    };

    button6 = {
        btnName: "成绩查询",
        src: require("src/img/ChartBar.png"),
    };

    render() {
        console.log(this.props.level);

        const Block1 = (props) => {
            if(props.level === 'student' || props.level === 'teacher'){
                return (
                    <JumpButton {...this.button1} onClick={this.handleClick.bind(this, {direction: "user"})} />
                );
            }
            else {
                const menu = (
                    <Menu>
                        <Menu.Item key="user">
                            <a onClick={this.handleClick.bind(this, {direction: "user"})}>个人信息查询</a>
                        </Menu.Item>
                        <Menu.Item key="2">用户信息管理</Menu.Item>
                    </Menu>
                );
                return(
                    <Dropdown overlay={menu}>
                        <div>
                            <JumpButton {...this.button1} />
                        </div>
                    </Dropdown>
                );
            }
        };

        const Block2 = (props) => {
            if(props.level === 'student' ){
                return (
                    <JumpButton {...this.button2_stu} onClick={this.handleClick.bind(this, {direction: "selection"})} />
                );
            }
            else {
                const menu = (
                    <Menu>
                        <Menu.Item key="classroomManage">
                            <a onClick={this.handleClick.bind(this, {direction: "classroomManage"})}>信息管理</a>
                        </Menu.Item>
                    </Menu>
                );
                return(
                    <Dropdown overlay={menu}>
                        <div>
                            <JumpButton {...this.button2} />
                        </div>
                    </Dropdown>
                );
            }
        };

        const Block3 = (props) => {
            if(props.level === 'student' ){
                return (
                    <JumpButton {...this.button3_stu} onClick={this.handleClick.bind(this, {direction: "user"})} />
                );
            }
            else {
                const menu = (
                    <Menu>
                        <Menu.Item key="autoScheduling">
                            <a onClick={this.handleClick.bind(this, {direction: "autoScheduling"})}>自动排课</a>
                        </Menu.Item>
                        <Menu.Item key="manualScheduling">
                            <a onClick={this.handleClick.bind(this, {direction: "manualScheduling"})}>手动调课</a>
                        </Menu.Item>
                        <Menu.Item key="3">课表查询</Menu.Item>
                    </Menu>
                );
                return(
                    <Dropdown overlay={menu}>
                        <div>
                            <JumpButton {...this.button3} />
                        </div>
                    </Dropdown>
                );
            }
        };

        return (
            <div>
                <h2 className={"ant-menu-item-group-title"} style={{fontSize: "large", marginLeft: "35px"}}>导航页面</h2>
                <div>
                    <Row>
                        <Col span={4} offset={4}>
                            <Block1 level={this.props.level} />
                        </Col>
                        <Col span={4} offset={2}>
                            <Block2 level={this.props.level} />
                        </Col>
                        <Col span={4} offset={2}>
                            <Block3 level={this.props.level} />
                        </Col>
                    </Row>
                    <p />
                    <Row>
                        <Col span={4} offset={4}>
                            <JumpButton {...this.button4} />
                        </Col>
                        <Col span={4} offset={2}>
                            <JumpButton {...this.button5} />
                        </Col>
                        <Col span={4} offset={2}>
                            <JumpButton {...this.button6} />
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}
