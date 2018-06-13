import * as React from 'react';
import {Component} from 'react';
import {Layout, Modal, Breadcrumb,  Table, Button, Input, Select, Form} from 'antd';
import 'antd/dist/antd.css';
import {WrappedCourseDetailForm}from './CourseDetailForm';
import {NavigationBar} from './TssPublicComponents'
import DvaProps from '../types/DvaProps';
import {type} from "os";


const { Header, Content, Footer, Sider } = Layout;
const { Column } = Table;
const Option = Select.Option;
const FormItem = Form.Item;
const Search = Input.Search;

interface UserProps extends DvaProps {
    form: any;
    dataSource: any
}

interface UserState {
    courseIndex: number
}


export default class ClassSelectionComponent extends Component<UserProps, UserState>{
    constructor(props){
        super(props);
        this.state = {
            courseIndex: 1
        }
    }
    select(course){
        console.log(course)
        this.props.dispatch({type:"selectClass/select",payload:course["classId"]});
    };
    dismiss(course){
        this.props.dispatch({type:"selectClass/dismiss",payload:course["classId"]})
    }

    componentDidMount(){

    };

    render(){
        const columns = [{
            title: "课程编号",
            dataIndex: "classId",
        },{
            title: "学年",
            dataIndex: "year",
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
        },{
            title:"操作",
            render: (record)=>(
                <span>
                    <a onClick={()=>this.select(record)}>选课/</a>
                    <a onClick={()=>this.dismiss(record)}>退选</a>
                </span>
            )
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
                        <Table dataSource={this.props.dataSource} columns={columns}>

                        </Table>
                    </div>

                </Content>

            </Layout>
        </Layout>
            </Layout>);
    }
}