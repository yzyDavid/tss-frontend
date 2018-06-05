import * as React from 'react';
import {Component} from 'react';
import {Layout, Modal, Breadcrumb, Icon, Table, Button, Input, Select, Form, Collapse} from 'antd';
import 'antd/dist/antd.css';
import {NavigationBar} from './TssPublicComponents'
import DvaProps from '../types/DvaProps';

const { Column } = Table;
const FormItem = Form.Item;
const Panel = Collapse.Panel;

interface PlanProps extends DvaProps{
    uid: string;
    form: any;
    dataSource1: any;
    dataSource2: any;
}

const data = [{
    key: '1',
    courseId: 20102,
    courseName: '数据结构基础',
    teacher: 'Mike',
    brief: '重点介绍算法设计、算法描述和相应C程序编码，并给出相应的数据结构应用实例',
    credit: 3.0,
    semester: '春夏',
}, {
    key: '2',
    courseId: 20104,
    name: '软件工程',
    teacher: 'Mary',
    brief: 'ddd',
    credit: 2.0,
    semester: '春',
}
];

export default class PlanComponent extends Component<PlanProps>{
    constructor(props) {
        super(props);
        this.props.dispatch({type: "plan/fetchCourseList"});
    }

    deletePlan(course){
        //console.log(course);
        this.props.dispatch({type: "plan/deletePlan", payload: {courseId: course["courseId"]}})
    }
    addPlan(course){
        //console.log(course);
        this.props.dispatch({type: "plan/addPlan", payload: {courseId: course["courseId"]}})
    }
    handleSubmit(){

    }
    callback(key) {
        console.log(key);
    }
    render(){
        const columns1 = [{
            title: "课程代码",
            dataIndex: "courseId",
        },{
            title: "课程名称",
            dataIndex: "courseName",
        },{
            title: "学分",
            dataIndex: "credit"
        },{
            title: "种类",
            dataIndex: "type"
        },{
            title: "添加",
            render: (record)=>(
                <span>
                    <a onClick={()=>this.addPlan(record)}>添加</a>
                </span>
            )
        }]
        const columns2 = [{
            title: "课程代码",
            dataIndex: "courseId",
        },{
            title: "课程名称",
            dataIndex: "courseName",
        },{
            title: "学分",
            dataIndex: "credit"
        },{
            title: "学期",
            dataIndex: 'semester'
        },{
            title:"删除",
            render: (record)=>(
                <span>
                    <a onClick={()=>this.deletePlan(record)}>删除</a>
                </span>
            )
        }];
        return(
            <div>
               <NavigationBar current={'plan'} dispatch={this.props.dispatch}/>
                <div style={{ padding: 24, background: '#fff', minHeight: 780 }}>
                    <Collapse defaultActiveKey={['1']} onChange={this.callback}>
                        <Panel header="修改培养方案" key="1">
                            <Table dataSource={this.props.dataSource1} columns={columns1}>
                            </Table>
                        </Panel>
                        <Panel header="查看培养方案" key="2">
                            <Table dataSource={this.props.dataSource2} columns={columns2}>
                            </Table>
                        </Panel>
                    </Collapse>
                </div>

            </div>

        );
    }
}
