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
    refresh: boolean
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
        }
        this.handleSubmit1 = this.handleSubmit1.bind(this)
    }
    formRef: any;
    ChooseCourse(index, modalVisible) {
        if(this.formRef && modalVisible === true) this.formRef.refresh();
        this.setState({ modalVisible: modalVisible, courseIndex: index });
        console.log(index);
        console.log(data[index].id);
    }
    handleSubmit1 = (e) => {
        const formProps = this.props.form;
        formProps.validateFieldsAndScroll((err: any, values: FreeClassroomFormData) => {
            if (err) {
                return;
            }
            console.log(values);
            this.props.dispatch({type: 'course/courseInfo', payload: values});
            data=this.props.dataSource;
            console.log(this.props.dataSource);
            this.setState({refresh:true});
        });
    }
    render(){
        const columns = [{
            title: "课程编号",
            dataIndex: "id",
        },{
            title: "学年",
            dataIndex: "year",
            render: (text, record, index) => <a onClick={()=>this.ChooseCourse(index, true)}>{text}</a>
        },{
            title: "学期",
            dataIndex: 'semester'
        },{

        },{
            title: "容量",
            dataIndex: "capacity"
        },{
            title: "已选",
            dataIndex: "numStudent"
        },
        {
            title: "选课",
            render: (text,record,index)=>(<a onClick={()=>{this.props.dispatch({type: "selectCourse/showAll", payload: {courseId: data[index].id}})}}>选课</a>)
        }];

        return(
            <div>
                {/*<NavigationBar current={"ManSelect"} dispatch={this.props.dispatch}/>*/}
                <br/>
                <div style={{ padding: 24, background: '#fff', minHeight: 780 }}>
                    <Form layout = {"inline"}>
                        <FormItem label = "学生学号">
                            <Input placeholder="请输入学生学号" style={{width: 200}}/>
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
                                enterButton
                            />
                        </FormItem>
                    </Form>
                    <Table dataSource={data} columns={columns}>

                    </Table>
                </div>
            </div>

        );
    }
}