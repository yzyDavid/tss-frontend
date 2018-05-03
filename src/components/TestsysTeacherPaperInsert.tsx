import {Component} from 'react';
import * as React from 'react';
import {WrappedPaperInsertForm} from './TestsysTeacherPaperInsertForm';
import DvaProps from '../types/DvaProps';

class HomePageProps implements DvaProps {
    public dispatch: any;
}

export default class TestsysTeacherPaperInsertComponent extends Component<HomePageProps, {}> {
    render() {
        return (
            <div>
                <h2>新增试卷</h2>
                <WrappedPaperInsertForm dispatch={this.props.dispatch}/>
            </div>
        );
    }
}
