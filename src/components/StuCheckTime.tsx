import * as React from 'react';
import {Component} from 'react';
import {Layout, Modal, Breadcrumb, Icon, Table, Button, Input, Select, Form} from 'antd';
import 'antd/dist/antd.css';
import DvaProps from '../types/DvaProps';
import * as ReactToPrint from "react-to-print"
const { Column } = Table;
const FormItem = Form.Item;
const Option = Select.Option;

interface StuTimeProps extends DvaProps{
    dataSource: any;
}
const columns = [{
    title: "序号",
    dataIndex: "id",
},{
    title: "开始时间",
    dataIndex: "start",
},{
    title: "结束时间",
    dataIndex: "end"
},{
    title: "初选",
    dataIndex: 'register'
},{
    title: "补选",
    dataIndex: 'complement'
},{
    title: "退选",
    dataIndex: "drop"
}];
export default class StuCheckTimeComponent extends Component<StuTimeProps>{
    constructor(props){
        super(props)
        this.props.dispatch({type:"stuTimeTable/fetchTime",payload: ""});
    }
    render(){
        return (
            <div style={{ padding: 24, background: '#fff', minHeight: 780 }}>
         <div>
        <Table dataSource={this.props.dataSource} columns={columns}>
        </Table>
         </div>
            </div>);
    }
}