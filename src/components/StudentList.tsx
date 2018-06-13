import * as React from 'react';
import {Component} from 'react';
import {Layout, Modal, Breadcrumb, Icon, Table, Button, Input, Select, Form} from 'antd';
import 'antd/dist/antd.css';
import {NavigationBar} from './TssPublicComponents'
import DvaProps from '../types/DvaProps';

interface StudentListProps extends DvaProps{
    uid: string;
    location: any;
    dataSource: any
}

export default class StudentListComponent extends Component<StudentListProps>{
    constructor(props){
        super (props);
        this.props.dispatch({type: "studentList/stuList", payload: this.props.location.query})
    }
    exportExcel(){

    }
    render(){
        const columns = [{
            title: "姓名",
            dataIndex: "name",
        },{
            title: "学号",
            dataIndex: "id",
        },{
            title: "专业",
            dataIndex: "major"
        }];
        return(
            <div>
                {/*<NavigationBar current={'plan'} dispatch={this.props.dispatch}/>*/}
                <div style={{ padding: 24, background: '#fff', minHeight: 780 }}>
                    <div style={{paddingBottom: 20, paddingRight:100}}>
                        <Button type="primary" onClick={this.exportExcel}>导出Excel</Button>
                    </div>
                    <Table dataSource={this.props.dataSource} columns={columns}>
                    </Table>
                </div>

            </div>
        );
    }
}