import * as React from 'react';
import {Component} from 'react';
import {Modal, Breadcrumb,  Table, Button, Input, Select, Form} from 'antd';
import 'antd/dist/antd.css';
import {WrappedCourseDetailForm}from './CourseDetailForm';
import {NavigationBar} from './TssPublicComponents'
import DvaProps from '../types/DvaProps';
import {browserHistory, routerRedux} from 'dva/router';
import FreeClassroomFormData from "./ManualSchModify";

const FormItem = Form.Item
const Search = Input.Search
const Option = Select.Option
const { Column } = Table
interface ManSelectionProps extends DvaProps{
    form: any;
    dataSource: any;
}

interface ManSelectionState {
    modalVisible: boolean;
    courseIndex: number;
    searchIndex: any;
    refresh: boolean;
    stuId: any;
}


var data = [{
    key: '1',
    id: 20102,
    year: '2011',
    semester: 'SECOND',
    capacity: 1,
    numStudent: 2
}];

export default class ManagerSelectionComponent extends Component<ManSelectionProps, ManSelectionState>{
    constructor(props){
        super(props);
        this.state = {
            modalVisible: false,
            courseIndex: 0,
            searchIndex: "课程名",
            refresh: false,
            stuId: null,
        }
        this.props.dispatch({type:"selectManCourse/fetchClassLists",payload: ""});
    }
    formRef: any;
    ChooseCourse(index, modalVisible) {
        if(this.formRef && modalVisible === true) this.formRef.refresh();
        this.setState({ modalVisible: modalVisible, courseIndex: index });
        console.log(index);
        console.log(data[index].id);
    }
    select(course){
        console.log(course)
        this.props.dispatch({type:"selectManCourse/select",payload:{classId: course["id"],uid: this.state.stuId}});
    };
    // dismiss(course){
    //     this.props.dispatch({type:"selectManCourse/dismiss",payload:course["id"]})
    // }
    handleSearch = (value, searchIndex)=>{
        console.log({value,searchIndex})
        this.props.dispatch({type: "selectManCourse/search", payload: {value,searchIndex}});
        this.setState({refresh: true})
    }
    render(){
        const columns = [{
            title: "课程编号",
            dataIndex: "courseId",
        }, {
            title: "教学班号",
            dataIndex: "id",
        },{
            title: "课程名称",
            dataIndex: "courseName",
            render: (text, record, index) => <a onClick={()=>this.ChooseCourse(index, true)}>{text}</a>
        },{
            title: "学年",
            dataIndex: "year",
        },{
            title: "学期",
            dataIndex: 'semester'
        },{
            title: "时间",
            dataIndex: 'timeSlot'
        },{
            title: "容量",
            dataIndex: "capacity"
        },{
            title: "已选",
            dataIndex: "numStudent"
        },{
            title: "选课状态",
            dataIndex: "status"
        }, {
            title: "选课",
            render: (record)=>(
                <span>
                    <a onClick={()=>this.select(record)}>选课</a>
                    {/*<a onClick={()=>this.dismiss(record)}>退选</a>*/}
                </span>)
        }];
        return(
            <div>
                {/*<NavigationBar current={"ManSelect"} dispatch={this.props.dispatch}/>*/}
                <br/>
                <div style={{ padding: 24, background: '#fff', minHeight: 780 }}>
                    <Form layout = {"inline"}>
                        <FormItem label = "学生学号">
                            <Input placeholder="请输入学生学号" style={{width: 200}} onChange={(value)=>{this.setState({stuId: value})}}/>
                        </FormItem>
                    </Form>
                    <br/>
                    <Form layout="inline" >
                        <FormItem>
                            <Search
                                addonBefore={<Select defaultValue="课程名" style={{width: 85}} onChange={(value) =>{this.setState({searchIndex: value})}}>
                                    <Option value="课程名">课程名</Option>
                                    <Option value="教师">教师</Option>
                                    <Option value="课程号">课程号</Option>
                                </Select>}
                                placeholder="input search text"
                                onSearch={(value)=>this.handleSearch(value,this.state.searchIndex)}
                                enterButton
                            />
                        </FormItem>
                    </Form>
                    <Table dataSource={this.props.dataSource} columns={columns}>

                    </Table>
                </div>
            </div>

        );
    }
}