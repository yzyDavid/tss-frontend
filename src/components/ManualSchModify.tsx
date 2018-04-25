import * as React from 'react';
import {Component} from 'react';
import {Form, Button, Table, Select, Modal,message} from 'antd';
import { Router,Route,hashHistory} from 'react-router';
import DvaProps from '../types/DvaProps';
import NavigationBar from './TssPublicComponents';
import {FormEvent} from "react";

const FormItem = Form.Item;
const Option = Select.Option;
const columns = [
    {title: '地点', dataIndex: 'classroomAddress', key: 'classroomAddress'},
    {title: '时间', dataIndex: 'classroomTime', key: 'classroomTime'},
    {title: '容量', dataIndex: 'classroomCapacity', key: 'classroomCapacity'},
    ];


var initData = [
            {key: 1, classroomAddress: '东一102', classroomTime: '16:30-18:30', classroomCapacity: '100'},
            {key: 2, classroomAddress: '东二202', classroomTime: '16:30-18:30', classroomCapacity: '50'},
            {key: 3, classroomAddress: '西一223', classroomTime: '16:30-18:30', classroomCapacity: '100'},
            {key: 4, classroomAddress: '西二308', classroomTime: '16:30-18:30', classroomCapacity: '200'},
            {key: 5, classroomAddress: '东一105', classroomTime: '16:30-18:30', classroomCapacity: '150'},
        ];
var confirmData = {classroomAddress: '', classroomTime: '', classroomCapacity: ''};

interface ManualSchModifyProps extends DvaProps {
    form: any;
    dataSource: any;
    location: any;
}

interface ViewState {
    refresh: boolean;
    modalState: boolean;
}

export class FreeClassroomFormData {
    campus: string;
    classroomDate: string;
    classroomTime: string;
}

class SearchForm extends Component<ManualSchModifyProps,ViewState> {
    constructor(props){
        super(props);
        this.state = {
            refresh : false,
            modalState: false,
        }
        this.handleSubmit1 = this.handleSubmit1.bind(this);
        this.handleSubmit2 = this.handleSubmit2.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    handleSubmit1 = (e: FormEvent<{}>) => {
        e.preventDefault();
        const formProps = this.props.form;
        formProps.validateFieldsAndScroll((err: any, values: FreeClassroomFormData) => {
            if (err) {
                return;
            }
            this.props.dispatch({type: 'freeclassroominfo/freeClassroomInfo', payload: values});
            initData=this.props.dataSource;
            this.setState({refresh:true});
        });
    };

    handleSubmit2 = (e) => {
        e.preventDefault();
        if(confirmData.classroomAddress.length>1)
            this.setState({modalState: true,});
    };

    handleOk() {
        this.setState({modalState: false,});
    };

    handleCancel(e) {
        this.setState({modalState: false,});
    };


    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <div>
                <Form layout={"inline"} onSubmit={this.handleSubmit1.bind(this)}>
                    <FormItem
                        label="校区" style={{paddingLeft: 20}}>
                        {getFieldDecorator('campus', {})(
                            <Select style={{width: 200}}>
                                <Option value="玉泉校区">玉泉校区</Option>
                                <Option value="紫金港校区">紫金港校区</Option>
                                <Option value="西溪校区">西溪校区</Option>
                                <Option value="华家池校区">华家池校区</Option>
                                <Option value="之江校区">之江校区</Option>
                            </Select>
                        )}
                    </FormItem>
                    <FormItem
                        label="日期" >
                        {getFieldDecorator('classroomDate', {})(
                            <Select style={{width: 200}}>
                                <Option value="周一">周一</Option>
                                <Option value="周二">周二</Option>
                                <Option value="周三">周三</Option>
                                <Option value="周四">周四</Option>
                                <Option value="周五">周五</Option>
                                <Option value="周六">周六</Option>
                                <Option value="周日">周日</Option>
                            </Select>
                        )}
                    </FormItem>
                    <FormItem
                        label="时间" >
                        {getFieldDecorator('classroomTime', {})(
                            <Select style={{width: 200}}>
                                <Option value="全部">全部</Option>
                                <Option value="第1,2节">第1,2节</Option>
                                <Option value="第3,4节">第3,4节</Option>
                                <Option value="第3,4,5节">第3,4,5节</Option>
                                <Option value="第6,7,8节">第6,7,8节</Option>
                                <Option value="第7,8节">第7,8节</Option>
                                <Option value="第9,10节">第9,10节</Option>
                                <Option value="第11,12,13节">第11,12,13节</Option>
                            </Select>
                        )}
                    </FormItem>
                    <Button
                        icon="search"
                        type="primary"
                        htmlType="submit"
                        onClick={this.handleSubmit1}>搜索
                    </Button>
                    <Button
                        style={{marginLeft: 20}}
                        icon="edit"
                        type="primary"
                        htmlType="submit"
                        onClick={this.handleSubmit2}>修改至该时间
                    </Button>
                    <Modal title="修改成功" visible={this.state.modalState}
                           onOk={this.handleOk} onCancel={this.handleCancel}
                    >
                        <br/>
                        <p> 上课地点: {confirmData.classroomAddress}</p>
                        <br/>
                        <p>  上课时间: {confirmData.classroomTime}</p>
                        <br/>
                        <p>  教室容量: {confirmData.classroomCapacity}</p>
                        <br/>
                    </Modal>
                </Form>
                <br/>
                <Table
                    style={{width: "100%", background: "#ffffff"}}
                    columns={columns}
                    rowSelection={{
                        type: 'radio',
                        onSelect(record, selected, selectedRows) {
                            confirmData = record;
                            console.log(record, selected, selectedRows);
                        },}}
                    dataSource={initData}/>
            </div>
        );
    }
}

const WrappedSearchForm: any = Form.create({})(SearchForm);

export default class ManualSchModifyComponent extends Component<ManualSchModifyProps> {
    constructor(props,context) {
        super(props,context);
        console.log(props.location.query);
    }

    render() {
        return (
            <div>
                <NavigationBar current={"course"} dispatch={this.props.dispatch}/>
                <br/>
                <div>
                    <WrappedSearchForm dispatch={this.props.dispatch} dataSource={this.props.dataSource}/>
                </div>
            </div>
        );
    }
}

