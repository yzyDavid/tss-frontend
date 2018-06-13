import {Component} from 'react';
import * as React from 'react';
import {Col, Card, Layout} from 'antd'
import {WrappedLoginForm} from './LoginForm';
import DvaProps from '../types/DvaProps';
import { TssFooter, TssHeader} from "./TssPublicComponents";

class HomePageProps implements DvaProps {
    public dispatch: any;
}
const {Content} = Layout;

export default class HomePageComponent extends Component<HomePageProps, {}> {
    render() {
        return (
            <div>
                <h2>用户登录</h2>
                <Col span={12} offset={6}>
                    <Card title="Login">
                        <WrappedLoginForm dispatch={this.props.dispatch} />
                    </Card>
                </Col>
            </div>
        );
    }
}
