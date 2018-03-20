import {Component} from 'react';
import * as React from 'react';
import {WrappedLoginForm} from './LoginForm';
import DvaProps from '../models/DvaProps';

export default class HomePageComponent extends Component implements DvaProps {
    public dispatch: any;

    render() {
        return (
            <div>
                <WrappedLoginForm dispatch={this.dispatch}/>
            </div>
        );
    }
}
