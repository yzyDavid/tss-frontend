import * as React from 'react';
import {Component} from 'react';
import {Layout, Modal, Breadcrumb, Icon, Table, Button, Input, Select, Form} from 'antd';
import 'antd/dist/antd.css';
import {NavigationBar} from './TssPublicComponents'
import DvaProps from '../types/DvaProps';

const { Column } = Table;

interface CourseProps extends DvaProps{
    uid: string;
}

const data = [

];

export default class CourseTableComponent extends Component<CourseProps>{
    constructor(props) {
        super(props)
    }

    render(){
        const columns = [{
            title: "课程代码",
            dataIndex: "id",
        },{
            title: "课程名称",
            dataIndex: "courseName",
        },{
            title: "上课时间",
            dataIndex: "timeSlot"
        },{
            title: "学期",
            dataIndex: 'semester'
        },{
            title: "学分",
            dataIndex: 'credit'
        }];
        return(
            <div>
               <NavigationBar current={'courseTable'} dispatch={this.props.dispatch}/>
                <div style={{ padding: 24, background: '#fff', minHeight: 780 }}>
                    <Table dataSource={data} columns={columns}>
                    </Table>
                    <Button type="primary" >打印课表</Button>
                </div>

            </div>

        );
    }
}
