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
        src: require("src/img/User.png"),
    };

    button2 = {
        btnName: "选课系统",
        src: require("src/img/Bookmark.png"),
    };

    button3 = {
        btnName: "查看课表",
        src: require("src/img/Calendar.png"),
    };

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
                        <Menu.Item key="userManage">
                            <a onClick={this.handleClick.bind(this, {direction: "userManage"})}>用户信息管理</a></Menu.Item>
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

        return (
            <div>
                <h2 className={"ant-menu-item-group-title"} style={{fontSize: "large", marginLeft: "35px"}}>导航页面</h2>
                <div>
                    <Row>
                        <Col span={4} offset={4}>
                            <Block1 level={this.props.level} />
                        </Col>
                        <Col span={4} offset={2}>
                            <JumpButton {...this.button2} />
                        </Col>
                        <Col span={4} offset={2}>
                            <JumpButton {...this.button3} />
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
