import {Component} from 'react';
import * as React from 'react';
import {WrappedResultSearchQtypeForm} from './TestsysTeacherResultQtypeForm';
import DvaProps from '../types/DvaProps';

class HomePageProps implements DvaProps {
    public dispatch: any;
}

export default class TestsysTeacherResultQtypecomponent extends Component<HomePageProps, {}> {
    render() {
        return (
            <div>
                <h2>查询类型题目成绩</h2>
                <WrappedResultSearchQtypeForm dispatch={this.props.dispatch}/>
            </div>
        );
    }
}
