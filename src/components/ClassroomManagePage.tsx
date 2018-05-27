import * as React from 'react';
import {Component} from 'react';
import {Form, Button, Select, Table, Popconfirm} from 'antd';
import DvaProps from '../types/DvaProps';
import NavigationBar from './TssPublicComponents';
import { connect } from 'dva';

interface ClassroomManageProps extends DvaProps {
    form: any;
    dataSource: any;
}

var initData=[
    {key: 1, campus: '凉了', building:'凉了',room:'凉了',capacity: '凉了', x: ''},
];

// 通过 rowSelection 对象表明需要行选择
let classToDelete = -1; // 要删除的教室的id

const rowSelection = {
    onChange(selectedRowKeys, selectedRows) {
        classToDelete = selectedRowKeys;
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    onSelect(record, selected, selectedRows) {
        console.log(record, selected, selectedRows);
    },
    onSelectAll(selected, selectedRows, changeRows) {
        console.log(selected, selectedRows, changeRows);
    },
};

const FormItem = Form.Item;
const Option = Select.Option;

class SearchForm extends Component<ClassroomManageProps, {}> {
    constructor(props){
        super(props);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleSearch = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if(err){
                return;
            }
            //console.log('Received values of form: ', values.campus);
            // fetch the specific classrooms, identified by campus name
            this.props.dispatch({type:'classroommanage/fetchSpecific',payload:values.campus});
        });
    }

    handleCreate = (e) =>{
        e.preventDefault();
        console.log("in handle create");
        /*jump to another page...*/
        this.props.dispatch({type:'navigation/jump', payload: {direction: "classroomCreate"}});
    }

    handleDelete = (e) =>{
        e.preventDefault();
        //console.log("in handleDelete");
        //console.log("class to delete:",classToDelete);
        this.props.dispatch({type:'classroommanage/deleteClassroom', payload:`${classToDelete}`});
    }

    columns = [
        {
            title: '校区',
            dataIndex: 'campus',
            key: 'campus'
        },
        {
            title: '教学楼',
            dataIndex: 'building',
            key: 'building'},
        {
            title: '教室',
            dataIndex: 'room',
            key: 'room'
        },
        {
            title: '容量',
            dataIndex: 'capacity',
            key: 'capacity'
        },
        {
            title: '操作',
            dataIndex: 'x',
            key: 'x',
            //render: () => <a >删除</a>
            render:()=> (
                <Popconfirm title="确认删除?" onConfirm={this.handleDelete}>
                    <a href="">删除</a>
                </Popconfirm>
            )
        },
    ];

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <div>
                <Form className="ant-advanced-search-form" layout={"inline"} onSubmit={this.handleSearch}>
                    <FormItem label="校区" labelCol={{span: 8, offset: 4}} wrapperCol={{span: 8}}>
                        {
                            getFieldDecorator('campus', {})(
                                <Select style={{width: 200}}>
                                    <Option value="紫金港">紫金港</Option>
                                    <Option value="玉泉">玉泉</Option>
                                    <Option value="西溪">西溪</Option>
                                    <Option value="华家池">华家池</Option>
                                    <Option value="之江">之江</Option>
                                    <Option value="舟山">舟山</Option>
                                    <Option value="海宁">海宁</Option>
                                </Select>
                            )
                        }
                    </FormItem>
                    <FormItem labelCol={{span: 8, offset: 24}} wrapperCol={{span: 8, offset: 12}}>
                        <Button
                            style={{width: "250px"}}
                            icon="search"
                            type="primary"
                            htmlType="submit"
                            onClick={this.handleSearch}>搜索</Button>
                    </FormItem>
                    <FormItem labelCol={{span: 8, offset: 24}} wrapperCol={{span: 8, offset: 12}}>
                        <Button
                            style={{width: "250px"}}
                            type="primary"
                            htmlType="submit"
                            onClick={this.handleCreate}>录入资源</Button>
                    </FormItem>
                </Form>
                <Table style={{width: "100%", background: "#ffffff"}} columns={this.columns} dataSource={this.props.dataSource} rowSelection={rowSelection} className="table"/>
            </div>
        );
    }
}

const WrappedSearchForm: any = Form.create({})(SearchForm);

export default class ClassroomManagePage extends Component<ClassroomManageProps> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <NavigationBar current={"classroom"} dispatch={this.props.dispatch}/>
                <br/>
                <div>
                    <WrappedSearchForm dispatch={this.props.dispatch} dataSource={this.props.dataSource}/>
                </div>
            </div>
        );
    }
}