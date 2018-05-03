import {Component} from 'react';
import * as React from 'react';
import {WrappedResultSearchQunitForm} from './TestsysTeacherResultQunitForm';
import DvaProps from '../types/DvaProps';

class HomePageProps implements DvaProps {
    public dispatch: any;
}

export default class TestsysTeacherResultQunitComponent extends Component<HomePageProps, {}> {
    render() {
        return (
            <div>
                <h2>查询类型题目成绩</h2>
                <WrappedResultSearchQunitForm dispatch={this.props.dispatch}/>
            </div>
        );
    }
}
