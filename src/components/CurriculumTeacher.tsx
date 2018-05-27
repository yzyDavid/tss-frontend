import * as React from 'react';
import {Component} from 'react';
import {Form, Button, Table} from 'antd';
import { Router,Route,hashHistory} from 'react-router';
import DvaProps from '../types/DvaProps';
import {NavigationBar} from './TssPublicComponents';

const FormItem = Form.Item;


interface CurriculumTeacherProps extends DvaProps {
    form: any;
    dataSource: any;
    location: any;
}

export default class CurriculumTeacher extends Component<CurriculumTeacherProps> {
    constructor(props,context) {
        super(props,context);
        console.log(props.location.query);
       // this.props.dispatch({type: 'curriculumteacher/curriculumTeacher', payload: {teacherId: '123'}});
        //initData = this.props.dataSource;
    }

    render() {
        const columns = [
            {title: '课程号', dataIndex: 'classId', key: 'classId'},
            {title: '课程名称', dataIndex: 'courseName', key: 'courseName'},
            {title: '上课时间', dataIndex: 'courseTime', key: 'courseTime', render: (text)=>{
                    var timeB, timeA;
                    if(!text)
                        timeA = ' ';
                    else {
                        timeB= text.toString();
                        timeA = timeB.substring(0,3)+ ' ' + timeB.substring(4,5)+ '~' + timeB.substring(timeB.length-1,timeB.length);
                    }
                    return (
                        <label>{timeA}</label>
                    );
                }},
            {title: '校区', dataIndex: 'campusName', key: 'campusName'},
            {title: '教学楼', dataIndex: 'buildingName', key: 'buildingName'},
            {title: '教室', dataIndex: 'classroomName', key: 'classroomName'},
            {
                title: "查看",
                render: (text,record,index)=>(<a onClick={()=>{this.props.dispatch({type: "curriculumteacher/showList", payload: {courseId: this.props.dataSource[index].classId}})}}>学生名单</a>)
            }

        ];
        return (
            <div>
                <NavigationBar current={"list"} dispatch={this.props.dispatch}/>
                <Form layout={"inline"} style={{textAlign: 'center',fontSize: 'larger'}}>
                    <FormItem

                         label="教师号：310001">{this.props.location.query}</FormItem>
                    <FormItem
                        label="教师姓名：张三">{this.props.location.query}</FormItem>
                </Form>
                <div>
                    <Table
                        style={{width: "100%", background: "#ffffff"}}
                        columns={columns}
                        dataSource={this.props.dataSource}/>
                </div>
                <Form layout={"inline"} style={{textAlign: 'center'}}>
                    <FormItem>
                    <Button  type="primary" style={{fontSize: 'large'}}>打印</Button></FormItem>
                </Form>
                {/*<button onClick={()=>{this.props.dispatch({type: "curriculumteacher/curriculumTeacher", payload: "bbb"});}}>daf</button>*/}
            </div>
        );
    }
}

