import * as React from 'react';
import {Component} from 'react';
import {Form, Button, Table, Select, Modal,message} from 'antd';
import { Router,Route,hashHistory} from 'react-router';
import DvaProps from '../types/DvaProps';
import NavigationBar from './TssPublicComponents';

const columns = [
    {title: '课程号', dataIndex: 'courseNumber', key: 'courseNumber'},
    {title: '课程名称', dataIndex: 'courseName', key: 'courseName'},
    {title: '学期', dataIndex: 'semester', key: 'semester'},
    {title: '校区', dataIndex: 'campus', key: 'campus'},
    {title: '上课时间', dataIndex: 'courseTime', key: 'courseTime'},
    {title: '上课地点', dataIndex: 'courseAddress', key: 'courseAddress'},
    ];

interface CurriculumTeacherProps extends DvaProps {
    form: any;
    dataSource: any;
    location: any;
}

export default class CurriculumTeacher extends Component<CurriculumTeacherProps> {
    constructor(props,context) {
        super(props,context);
        console.log(props.location.query);
        this.props.dispatch({type: 'curriculumteacher/curriculumTeacher', payload: {teacherId: '123'}});
        //initData = this.props.dataSource;
    }

    render() {
        return (
            <div>
                <NavigationBar current={"list"} dispatch={this.props.dispatch}/>
                <br/>
                <label style={{fontSize: 'large', marginLeft: 20}}>教师号：{this.props.location.query}</label>
                <label style={{fontSize: 'large', marginLeft: 20}}>教师姓名：{this.props.location.query}</label>
                <div>
                    <Table
                        style={{width: "100%", background: "#ffffff"}}
                        columns={columns}
                        dataSource={this.props.dataSource}/>
                </div>
            </div>
        );
    }
}

