import {Component} from 'react';
import * as React from 'react';
import {WrappedLoginForm} from './LoginForm';
import DvaProps from '../types/DvaProps';

class HomePageProps implements DvaProps {
    public dispatch: any;
}

export default class HomePageComponent extends Component<HomePageProps, {}> {
    render() {
        return (
            <div>
                <h2>用户登录</h2>
                <WrappedLoginForm dispatch={this.props.dispatch}/>
            </div>
        );
    }
}
