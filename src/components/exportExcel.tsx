import * as React from 'react';
import {Component} from 'react';
import {Layout, Modal, Breadcrumb,  Table, Button, Input, Select, Form} from 'antd';
import 'antd/dist/antd.css';
import {WrappedCourseDetailForm}from './CourseDetailForm';
import {NavigationBar} from './TssPublicComponents'
import DvaProps from '../types/DvaProps';
import {type} from "os";
import GlobalState from "../types/globalState";


const { Header, Content, Footer, Sider } = Layout;
const { Column } = Table;
const Option = Select.Option;
const FormItem = Form.Item;
const Search = Input.Search;

interface UserProps extends DvaProps {
    form: any;
    dataSource: any;
    global: GlobalState;
}

interface ExportState {
    modalVisible: boolean;
    courseIndex: number;
    searchIndex: any;
    refresh: boolean
}


export default class ExportComponent extends Component<UserProps, ExportState>{
    constructor(props){
        super(props);
        this.state = {
            modalVisible: false,
            courseIndex: 0,
            searchIndex: "课程名",
            refresh: false,
        }
        //console.log(this.props.global)
        this.props.dispatch({type:"export/fetchClassLists",payload: ""});
    }

    formRef: any;
    ChooseCourse(index, modalVisible) {
        if(this.formRef && modalVisible === true) this.formRef.refresh();
        this.setState({ modalVisible: modalVisible, courseIndex: index });
        console.log(index);
        console.log(this.props.dataSource[index].courseId);
    }
    setModalVisible(modalVisible) {
        this.setState({ modalVisible: modalVisible });
    };
    handleSearch = (value, searchIndex)=>{
        console.log({value,searchIndex})
        this.props.dispatch({type: "selectCourse/search", payload: {value,searchIndex}});
        this.setState({refresh: true})
    }

    export(course){
        console.log(course)
        this.props.dispatch({type:"export/export",payload:course["id"]});
    };

    componentDidMount(){

    };

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
            title: "导出",
            render: (record)=>(
                <span>
                    <a onClick={()=>this.export(record)}>导出excel</a>
                </span>)
        }];

        return(
            <Layout>
                <div>
                    <Content>
                        <NavigationBar current={"selection"} dispatch={this.props.dispatch}/>
                    </Content>
                </div>
                <Layout>
                    <Layout>

                        <Content style={{ margin: '0 16px' }}>
                            <Breadcrumb style={{ margin: '12px 0' }}>
                                <Breadcrumb.Item>选课系统</Breadcrumb.Item>
                            </Breadcrumb>
                            <div style={{ padding: 24, background: '#fff', minHeight: 780 }}>
                                <br/>
                                <Table dataSource={this.props.dataSource} columns={columns}>

                                </Table>
                            </div>

                        </Content>

                    </Layout>
                </Layout>
            </Layout>);
    }
}