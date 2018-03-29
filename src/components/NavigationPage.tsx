import {Component} from 'react';
import * as React from 'react';
import {Layout, Card, Row, Col, Popover} from 'antd';

const {Header, Content, Footer} = Layout;
const content = (
    <div>
        <p>选课</p>
        <p>课程查询</p>
    </div>
);
export default class NavigationPage extends Component {
    render() {
        return (
            <div>
                <Layout>
                    <Header>
                        <h1 style={{color: "white"}}>教务服务系统</h1>
                    </Header>
                    <Content style={{minHeight: "500px"}}>
                        <h2>导航</h2>
                        <div>
                            <Row>
                                <Col span={4} offset={4}>
                                    <Card style={{width: 240, height: 240, textAlign: "center"}} bodyStyle={{padding: 0}}>
                                        <div className="custom-image">
                                            <img alt="personal-info" width="180" height="180" src={require("../img/info.png")} style={{margin: "10px auto"}}/>
                                        </div>
                                        <div className="custom-card">
                                            <h3>Personal Information</h3>
                                        </div>
                                    </Card>
                                </Col>
                                <Col span={4} offset={2}>
                                    <Popover content={content} title="标题">
                                        <Card style={{width: 240, height: 240}} bodyStyle={{padding: 0}}/>

                                    </Popover>
                                </Col>
                                <Col span={4} offset={2}>
                                    <Popover content={content} title="标题">
                                        <Card style={{width: 240, height: 240}} bodyStyle={{padding: 0}}/>

                                    </Popover>
                                </Col>
                            </Row>
                            <p/>
                            <Row>
                                <Col span={4} offset={4}>
                                    <Popover content={content} title="标题">
                                        <Card style={{width: 240, height: 240}} bodyStyle={{padding: 0}}/>
                                    </Popover>
                                </Col>
                                <Col span={4} offset={2}>
                                    <Popover content={content} title="标题">
                                        <Card style={{width: 240, height: 240}} bodyStyle={{padding: 0}}/>
                                    </Popover>
                                </Col>
                                <Col span={4} offset={2}>
                                    <Popover content={content} title="标题">
                                        <Card style={{width: 240, height: 240}} bodyStyle={{padding: 0}}/>
                                    </Popover>
                                </Col>
                            </Row>
                        </div>
                    </Content>
                    <Footer>
                        <div style={{textAlign: "center"}}>&copy;2018 浙江大学</div>
                    </Footer>
                </Layout>
            </div>
        );
    }
}