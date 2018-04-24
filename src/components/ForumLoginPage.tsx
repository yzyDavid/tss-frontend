import {Component} from 'react';
import * as React from 'react';
import { ForumLoginForm} from './ForumLogin';
import DvaProps from '../models/DvaProps';
import "./css/HomePage.css"
class HomePageProps implements DvaProps {
    public dispatch: any;
}

export default class LoginPageComponent extends Component<HomePageProps, {}> {
    render() {
        return (
            <div style={{position: "fixed", left: screen.width/2 - 150}}  className="forum-login-component">
                {/*<h2 style={{textAlign:"center"}}>用户登录</h2>*/}
                <ForumLoginForm   dispatch={this.props.dispatch} />

            </div>
        );
    }
}
