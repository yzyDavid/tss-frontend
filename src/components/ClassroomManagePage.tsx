import * as React from 'react';
import {Component} from 'react';
import {Form, Button, Modal, Input, Icon, Select, Table, Divider,Upload} from 'antd';
import DvaProps from '../types/DvaProps';
import {WrappedInfoEditForm} from './InfoEditForm';
import {NavigationBar} from './TssPublicComponents';
import { connect } from 'dva';

interface ClassroomManageProps extends DvaProps {
    form: any;
    dataSource: any;
}

const columns = [
    {title: '校区', dataIndex: 'campus', key: 'campus'},
    {title: '教学楼', dataIndex: 'building', key: 'building'},
    {title: '教室', dataIndex: 'room', key: 'room'},
    {title: '容量', dataIndex: 'capacity', key: 'capacity'},
    {title: '操作', dataIndex: 'x', key: 'x', render: () => <a >编辑</a>},
];

/*fake data*/
const data = [
    {key: 1, campus: '紫金港', building:'东2',room:'302',capacity: '50', x: ''},
    {key: 2, campus: '紫金港', building:'东1',room:'404',capacity: '40', x: ''},
    {key: 3, campus: '紫金港', building:'西1',room:'505',capacity: '120', x: ''},
    {key: 4, campus: '玉泉', building:'教4',room:'233',capacity: '40', x: ''},
    {key: 5, campus: '玉泉', building:'曹光彪西1',room:'111',capacity: '40',  x: ''},
    {key: 6, campus: '西溪', building:'楼1',room:'777',capacity: '120', x: ''},
    {key: 7, campus: '西溪', building:'楼2',room:'666',capacity: '120', x: ''},
    {key: 8, campus: '华家池', building:'楼1',room:'110',capacity: '120', x: ''},
    {key: 9, campus: '舟山', building:'楼2',room:'119',capacity: '233', x: ''},
    {key: 10, campus: '海宁', building:'楼3',room:'120',capacity: '233', x: ''},
    {key: 11, campus: '之江', building:'楼4',room:'911',capacity: '40', x: ''},
    {key: 12, campus: '舟山', building:'楼5',room:'999',capacity: '40', x: ''},
];

var initData=[
    {key: 1, campus: '凉了', building:'凉了',room:'凉了',capacity: '凉了', x: ''},
];

// 通过 rowSelection 对象表明需要行选择
const rowSelection = {
    onChange(selectedRowKeys, selectedRows) {
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
    }

    handleSearch = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if(err)
                return;
            console.log('Received values of form: ', values);
            this.props.dispatch({type:'classroommanage/fetchClassroomInfo',payload:values});
        });
    }

    handleReset = () => {
        this.props.form.resetFields();
    }

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
                </Form>
                <Table style={{width: "100%", background: "#ffffff"}} columns={columns} dataSource={this.props.dataSource} rowSelection={rowSelection} className="table"/>
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