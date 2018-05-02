import {Component} from 'react';
import * as React from 'react';
import {WrappedResultSearchPidForm} from './TestsysTeacherResultPidForm';
import DvaProps from '../types/DvaProps';

class HomePageProps implements DvaProps {
    public dispatch: any;
}

export default class TestsysTeacherResultPidComponent extends Component<HomePageProps, {}> {
    render() {
        return (
            <div>
                <h2>查询试卷成绩</h2>
                <WrappedResultSearchPidForm dispatch={this.props.dispatch}/>
            </div>
        );
    }
}
