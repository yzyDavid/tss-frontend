import * as React from 'react';
import {Component} from 'react';
import {Layout, Modal, Breadcrumb, Icon, Table, Button, Input, Select, Form} from 'antd';
import 'antd/dist/antd.css';
import {NavigationBar} from './TssPublicComponents'
import DvaProps from '../types/DvaProps';

const { Column } = Table;
const FormItem = Form.Item;

interface PlanProps extends DvaProps{
    uid: string;
    form: any;
}

const data = [{
    key: '1',
    courseId: 20102,
    name: '数据结构基础',
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
        super(props)
    }

    deletePlan(course){
        console.log(course);
    }
    handleSubmit(){

    }

    render(){
        const {getFieldDecorator} = this.props.form
        const columns = [{
            title: "课程代码",
            dataIndex: "courseId",
        },{
            title: "课程名称",
            dataIndex: "coursename",
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
                    <div>
                        <Form layout={"inline"} onSubmit={this.handleSubmit} style={{textAlign: 'center'}}>
                            <FormItem
                                label="addCourse" >添加课程
                            </FormItem>
                            <br/>
                            <FormItem label="课程名称">
                                {
                                    // getFieldDecorator('courseName', { })(
                                    //     <Input placeholder="请输入课程名称" style={{width: 200}}/>)
                                }
                            </FormItem>
                            <Button
                                icon="add"
                                type="primary"
                                htmlType="submit"
                                onClick={this.handleSubmit}>添加
                            </Button>
                        </Form>
                    </div>
                    <Table dataSource={data} columns={columns}>
                    </Table>
                </div>

            </div>

        );
    }
}
