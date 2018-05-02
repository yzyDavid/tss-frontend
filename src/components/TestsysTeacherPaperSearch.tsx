import {Component} from 'react';
import * as React from 'react';
import {WrappedPaperSearchForm} from './TestsysTeacherPaperSearchForm';
import DvaProps from '../types/DvaProps';
import {PaperFormData} from "./TestsysTeacherPaperInsertForm";

export class SearchPageProps implements DvaProps {
    public dispatch: any;
    paperlist:PaperFormData[];
    pid_t: string;
    papername_t: string;
    begin_t: string;
    end_t: string;
    count_t: string;
    isauto_t: boolean;
    qid_t: string[];  //题目
    score_t: string[];//对应分支
    uid: string;
}

export default class TestsysTeacherPaperSearchComponent extends Component<SearchPageProps, {}> {
    render() {
        return (
            <div>
                <h2>查询/修改试卷</h2>
                <WrappedPaperSearchForm state={this.state}
                                        uid = {this.props.uid}
                                        paperlist = {this.props.paperlist}
                                        pid_t={this.props.pid_t}
                                        papername_t={this.props.papername_t}
                                        begin_t={this.props.begin_t}
                                        end_t={this.props.end_t}
                                        count_t={this.props.count_t}
                                        isauot_t={this.props.isauto_t}
                                        qid_t={this.props.qid_t}
                                        score_t={this.props.score_t}
                                        dispatch={this.props.dispatch}/>
            </div>
        );
    }
}
