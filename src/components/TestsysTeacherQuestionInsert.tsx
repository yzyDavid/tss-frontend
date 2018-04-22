import {Component} from 'react';
import * as React from 'react';
import {WrappedQuestionInsertForm} from './TestsysTeacherQuestionInsertForm';
import DvaProps from '../types/DvaProps';

class HomePageProps implements DvaProps {
    public dispatch: any;
}

export default class TestsysTeacherQuestionInsertComponent extends Component<HomePageProps, {}> {
    render() {
        return (
            <div>
                <h2>新增题目</h2>
                <WrappedQuestionInsertForm dispatch={this.props.dispatch}/>
            </div>
        );
    }
}
