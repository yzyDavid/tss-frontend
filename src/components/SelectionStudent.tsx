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

interface UserState {
    modalVisible: boolean;
    classIndex: number;
    searchIndex: any;
    refresh: boolean
}


export default class StudentSelectionComponent extends Component<UserProps, UserState>{
    constructor(props){
        super(props);
        this.state = {
            modalVisible: false,
            classIndex: 0,
            searchIndex: "课程名",
            refresh: false,
        }
        //console.log(this.props.global)
        this.props.dispatch({type:"selectCourse/fetchClassLists",payload: ""});
    }

    formRef: any;
    ChooseCourse(index, modalVisible) {
        if(this.formRef && modalVisible === true) this.formRef.refresh();
        this.setState({ modalVisible: modalVisible, classIndex: index });
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

    select(course){
        console.log(course)
        this.props.dispatch({type:"selectCourse/select",payload:course["id"]});
    };
    dismiss(course){
        this.props.dispatch({type:"selectCourse/dismiss",payload:course["id"]})
    }

    componentDidMount(){

    };

    render(){
        var wrapped;
        if(this.props.dataSource.length==0){
            wrapped = <div><span></span></div>;
        }else{
            wrapped = <WrappedCourseDetailForm  wrappedComponentRef={(inst) => this.formRef = inst} dispatch={this.props.dispatch} courseId={this.props.dataSource[this.state.classIndex]["id"]} courseName={this.props.dataSource[this.state.classIndex]["courseName"]} credit={this.props.dataSource[this.state.classIndex]["credit"]} classroom={this.props.dataSource[this.state.classIndex]["classroom"]} />
        }
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
            title: "学期",
            dataIndex: 'semester'
        },{
            title: "教师",
            dataIndex: 'teacherName'
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
                    <a onClick={()=>this.select(record)}>选课/</a>
                    <a onClick={()=>this.dismiss(record)}>退选</a>
                </span>)
        }];
        return(
            <Layout>
                <div>
                <Content>
                    {/*<NavigationBar current={"selection"} dispatch={this.props.dispatch}/>*/}
                </Content>
                </div>
            <Layout>
            <Layout>

                <Content style={{ margin: '0 16px' }}>
                    <Breadcrumb style={{ margin: '12px 0' }}>
                        <Breadcrumb.Item>选课系统</Breadcrumb.Item>
                    </Breadcrumb>
                    <div style={{ padding: 24, background: '#fff', minHeight: 780 }}>
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
                            <Modal
                                title="查看课程详情"
                                wrapClassName="vertical-center-modal"
                                visible={this.state.modalVisible}
                                onCancel={() => this.setModalVisible(false)}
                                onOk={() => this.setModalVisible(false)}

                            >
                                {wrapped}
                            </Modal>
                        </Form>
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