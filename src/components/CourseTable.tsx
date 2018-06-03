import * as React from 'react';
import {Component} from 'react';
import {Layout, Modal, Breadcrumb, Icon, Table, Button, Input, Select, Form} from 'antd';
import 'antd/dist/antd.css';
import {NavigationBar} from './TssPublicComponents'
import DvaProps from '../types/DvaProps';

const { Column } = Table;
const FormItem = Form.Item;
const Option = Select.Option;

interface CourseProps extends DvaProps{
    uid: string;
    dataSource: any;
}

interface CourseTableState {
    year: string;
    semester: string;
}

export default class CourseTableComponent extends Component<CourseProps>{
    constructor(props) {
        super(props)
    }

    handleSubmit(){

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
                    <Form layout="inline" onSubmit={this.handleSubmit}>
                        <FormItem label="学年">
                            <Select defaultValue="2015" style={{width: 100}} onChange={(value)=>{this.setState({year: value})}}>
                                <Option value="2015">2015</Option>
                                <Option value="2016">2016</Option>
                                <Option value="2017">2017</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="学期">
                            <Select defaultValue="FIRST" style={{width: 110}} onChange={(value)=>{this.setState({semester: value})}}>
                                <Option value="FIRST">FIRST</Option>
                                <Option value="SECOND">SECOND</Option>
                            </Select>
                        </FormItem>
                        <Button
                            icon="search"
                            type="primary"
                            htmlType="submit"
                            onClick={this.handleSubmit}>搜索
                        </Button>
                    </Form>
                    <br/>
                    <Table dataSource={this.props.dataSource} columns={columns}>
                    </Table>
                    <Button type="primary" >打印课表</Button>
                </div>

            </div>

        );
    }
}
