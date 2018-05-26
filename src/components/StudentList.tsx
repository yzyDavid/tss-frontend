import * as React from 'react';
import {Component} from 'react';
import {Layout, Modal, Breadcrumb, Icon, Table, Button, Input, Select, Form} from 'antd';
import 'antd/dist/antd.css';
import {NavigationBar} from './TssPublicComponents'
import DvaProps from '../types/DvaProps';

interface StudentListProps extends DvaProps{
    uid: string;
    location: any;
}

var data = [
    {
        key: "1",
        name: "小明",
        id: "31500000",
        major: "计算机科学与技术"
    }
]
export default class StudentListComponent extends Component<StudentListProps>{
    constructor(props){
        super (props);
        this.props.dispatch({type: "studentList/stuList", payload: this.props.location.query})
    }

    render(){
        const columns = [{
            title: "姓名",
            dataIndex: "name",
        },{
            title: "学号",
            dataIndex: "",
        },{
            title: "专业",
            dataIndex: "major"
        }];
        return(
            <div>
                <NavigationBar current={'plan'} dispatch={this.props.dispatch}/>
                <div style={{ padding: 24, background: '#fff', minHeight: 780 }}>
                    <Table dataSource={data} columns={columns}>
                    </Table>
                </div>

            </div>
        );
    }
}