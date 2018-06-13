import * as React from 'react';
import {Component} from 'react';
import {Form, Button, Table, Select} from 'antd';
import { Router,Route,hashHistory} from 'react-router';
import DvaProps from '../types/DvaProps';
import {NavigationBar} from './TssPublicComponents';
import {ClassroomFormData} from "./CurriculumManage";
import GlobalState from "../types/globalState";

const FormItem = Form.Item;
const Option = Select.Option;

interface CurriculumTeacherProps extends DvaProps {
    uid: any;
    form: any;
    dataSource: any;
    location: any;
}

var selectedValue = {year: -1, semester: ''};
var teacherId;
class SearchForm extends Component<CurriculumTeacherProps> {
    constructor(props,context) {
        super(props,context);
        this.handleChange1 = this.handleChange1.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
    }

    handleChange1(values){
        if(values)
        {
            this.setState({item2State:true});
            selectedValue.year = values;
        }
    }

    handleChange2(values){
        if(selectedValue.year>0)
        {
            if(values)
            {
                this.setState({item3State:true,item2Reset:true});
                selectedValue.semester = values;
                //console.log(selectedValue);
                this.props.dispatch({type: 'curriculumteacher/curriculumTeacher', payload: {teacherId: teacherId, year: selectedValue.year, semester: selectedValue.semester}});
            }
        }
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <div>
                <Form layout={"inline"} style={{textAlign: 'center'}}>
                    <FormItem
                        label="年份: " >
                        {getFieldDecorator('year', {})(
                            <Select style={{width: 200}} onChange={this.handleChange1}>
                                <Option value="2017">2017</Option>
                                <Option value="2018">2018</Option>
                                <Option value="2019">2019</Option>
                                <Option value="2020">2020</Option>
                                <Option value="2021">2021</Option>
                                <Option value="2022">2022</Option>
                            </Select>
                        )}
                    </FormItem>
                    <FormItem
                        label="学期" >
                        {getFieldDecorator('semester', {})(
                            <Select style={{width: 200}} onChange={this.handleChange2}>
                                <Option value="FIRST">第一学期</Option>
                                <Option value="SECOND">第二学期</Option>
                            </Select>
                        )}
                    </FormItem>
                </Form>
            </div>
        );
    }
}

const WrappedSearchForm: any = Form.create({})(SearchForm);

export default class CurriculumTeacher extends Component<CurriculumTeacherProps> {
    constructor(props,context) {
        super(props,context);
        //console.log(props.location.query);
        //this.props.dispatch({type: 'curriculumteacher/curriculumTeacher', payload: {teacherId: '123'}});
        //initData = this.props.dataSource;
    }

    render() {
        teacherId = this.props.uid;
        //console.log(this.props.uid);
        const columns = [
            {title: '课号', dataIndex: 'id', key: 'id'},
            {title: '课程号', dataIndex: 'courseId', key: 'courseId'},
            {title: '课程名称', dataIndex: 'courseName', key: 'courseName'},
            {title: '排课安排', dataIndex: 'arrangements', key: 'arrangements'},
            {
                title: "查看",
                render: (text,record,index)=>(<a onClick={()=>{this.props.dispatch({type: "curriculumteacher/export", payload: {classId: this.props.dataSource[index].classId}})}}>导出excel</a>)
            }

    ];
        return (
            <div>
                <NavigationBar current={"list"} dispatch={this.props.dispatch}/>
                <div>
                    <WrappedSearchForm dispatch={this.props.dispatch} teacherId={this.props.uid}/>
                </div>
                <div>
                    <Table
                        style={{width: "100%", background: "#ffffff"}}
                        rowKey = 'id'
                        columns={columns}
                        dataSource={this.props.dataSource}/>
                </div>
            </div>
        );
    }
}
