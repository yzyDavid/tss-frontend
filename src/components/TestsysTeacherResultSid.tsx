import {Component} from 'react';
import * as React from 'react';
import {WrappedResultSearchSidForm} from './TestsysTeacherResultSidForm';
import DvaProps from '../types/DvaProps';

class HomePageProps implements DvaProps {
    public dispatch: any;
}

export default class TestsysTeacherResultSidComponent extends Component<HomePageProps, {}> {
    render() {
        return (
            <div>
                <h2>查询学生成绩</h2>
                <WrappedResultSearchSidForm dispatch={this.props.dispatch}/>
            </div>
        );
    }
}
