import {Component} from 'react';
import * as React from 'react';
import {WrappedQuestionSearchForm} from './TestsysTeacherQuestionSearchForm';
import DvaProps from '../types/DvaProps';

class HomePageProps implements DvaProps {
    public dispatch: any;
}

export default class TestsysTeacherQuestionSearchComponent extends Component<HomePageProps, {}> {
    render() {
        return (
            <div>
                <h2>查询/修改题目</h2>
                <WrappedQuestionSearchForm dispatch={this.props.dispatch}/>
            </div>
        );
    }
}
