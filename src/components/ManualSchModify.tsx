import * as React from 'react';
import {Component} from 'react';
import {Form, Button, Table, Select, Modal,message} from 'antd';
import { Router,Route,hashHistory} from 'react-router';
import DvaProps from '../types/DvaProps';
import {NavigationBar} from './TssPublicComponents';
import {FormEvent} from "react";

const FormItem = Form.Item;
const Option = Select.Option;
const columns = [
    {title: '地点', dataIndex: 'classroomAddress', key: 'classroomAddress'},
    {title: '时间', dataIndex: 'classroomTime', key: 'classroomTime'},
    {title: '容量', dataIndex: 'classroomCapacity', key: 'classroomCapacity'},
];

var initData = [
    {key: 1, classroomAddress: '', classroomTime: '', classroomCapacity: ''},

];
var initClassInfo = {courseId:'', courseName:'', numLessonsLeft:'',numLessonsEachWeek:'',arrangements:[{buildingName:'',classroomId:'', typeName:''},]};

var confirmData = {classroomAddress: '', classroomTime: '', classroomCapacity: ''};

interface ManualSchModifyProps extends DvaProps {
    form: any;
    dataSource: any;
    location: any;
    clazzInfo: any;
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
            this.setState({refresh:true});
        });
    };

    handleSubmit2 = (e) => {
        e.preventDefault();
        if(confirmData.classroomAddress.length>1)
            this.setState({modalState: true,});
        this.props.dispatch({type: 'courseinfo/modifyClassArrange', payload: {classroomId: 1, typeName: 'MON_1_2', classId: 10001}});
    };

    handleOk() {
        this.setState({modalState: false,});
    };

    handleCancel(e) {
        this.setState({modalState: false,});
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        initData = this.props.dataSource;
        return (
            <div>
                <Form layout={"inline"} onSubmit={this.handleSubmit1.bind(this)} style={{textAlign: 'center'}}>
                    <FormItem
                        label="校区" >
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
                                <Option value="MON">周一</Option>
                                <Option value="TUE">周二</Option>
                                <Option value="WED">周三</Option>
                                <Option value="THU">周四</Option>
                                <Option value="FRI">周五</Option>
                                <Option value="SAT">周六</Option>
                                <Option value="SUN">周日</Option>
                            </Select>
                        )}
                    </FormItem>
                    <FormItem
                        label="时间" >
                        {getFieldDecorator('classroomTime', {})(
                            <Select style={{width: 200}}>
                                <Option value="全部">全部</Option>
                                <Option value="1_2">第1,2节</Option>
                                <Option value="3_5">第3,4,5节</Option>
                                <Option value="6_8">第6,7,8节</Option>
                                <Option value="9_10">第9,10节</Option>
                                <Option value="11_13">第11,12,13节</Option>
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
                        style={{marginLeft: 10}}
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
                            //console.log(record, selected, selectedRows);
                        },}}
                    dataSource={initData}/>
            </div>
        );
    }
}

const WrappedSearchForm: any = Form.create({})(SearchForm);

export default class ManualSchModifyComponent extends Component<ManualSchModifyProps,ViewState> {
    constructor(props,context) {
        super(props,context);
        this.state = {
            refresh : false,
            modalState: false,
        }
        initClassInfo = this.props.clazzInfo;
        this.handleSubmit1 = this.handleSubmit1.bind(this);
        this.handleSubmit2 = this.handleSubmit2.bind(this);
    }

    handleSubmit1 = (e: FormEvent<{}>) => {
        e.preventDefault();
        this.props.dispatch({type: 'courseinfo/deleteClassArrange', payload: initClassInfo.arrangements[0]});
        this.setState({refresh:true});
    };
    handleSubmit2 = (e: FormEvent<{}>) => {
        e.preventDefault();
        this.props.dispatch({type: 'courseinfo/deleteClassArrange', payload: 2});
        this.setState({refresh:true});
    };

    render() {
        initClassInfo = this.props.clazzInfo;

        if(initClassInfo.courseId)
        {
            if(initClassInfo.arrangements.length == 1)
                return (
                    <div>
                        <NavigationBar current={"course"} dispatch={this.props.dispatch}/>
                        <Form  layout={"inline"} style={{textAlign: 'center'}}>
                            <FormItem label="课程号：" >{initClassInfo.courseId}</FormItem>
                            <FormItem label="课程名称：" >{initClassInfo.courseName}</FormItem>
                            <FormItem label="未安排课时" >{initClassInfo.numLessonsLeft}</FormItem>
                        </Form><div/>
                        <div/>
                        <Form  layout={"inline"} style={{background: "#ffffff", paddingLeft: 20, textAlign: 'center'}}>
                            <FormItem
                                label="地点" >{initClassInfo.arrangements[0].buildingName+initClassInfo.arrangements[0].classroomId}</FormItem>
                            <FormItem
                                label="时间" >{initClassInfo.arrangements[0].typeName}</FormItem>
                            <FormItem>
                                <Button
                                    style={{marginLeft: 20}}
                                    icon="cross"
                                    type="dashed"
                                    onClick={this.handleSubmit1}
                                    htmlType="submit">
                                </Button>
                            </FormItem>
                        </Form>
                        <div>
                            <WrappedSearchForm dispatch={this.props.dispatch} dataSource={this.props.dataSource}/>
                        </div>
                    </div>
                );
            else if(initClassInfo.arrangements.length == 2)
                return (
                    <div>
                        <NavigationBar current={"course"} dispatch={this.props.dispatch}/>
                        <div>
                        <Form  layout={"inline"} style={{textAlign: 'center'}}>
                            <FormItem label="课程号：" >{initClassInfo.courseId}</FormItem>
                            <FormItem label="课程名称：" >{initClassInfo.courseName}</FormItem>
                            <FormItem label="未安排课时" >{initClassInfo.numLessonsLeft}</FormItem>
                        </Form></div>
                        <Form  layout={"inline"} style={{background: "#ffffff", paddingLeft: 20, textAlign: 'center'}}>
                            <FormItem
                                label="地点" >{initClassInfo.arrangements[0].buildingName+initClassInfo.arrangements[0].classroomId}</FormItem>
                            <FormItem
                                label="时间" >{initClassInfo.arrangements[0].typeName}</FormItem>
                            <FormItem>
                                <Button
                                    style={{marginLeft: 20}}
                                    icon="cross"
                                    type="dashed"
                                    onClick={this.handleSubmit1}
                                    htmlType="submit">
                                </Button>
                            </FormItem>
                        </Form>
                        <Form  layout={"inline"} style={{background: "#ffffff", paddingLeft: 20, textAlign: 'center'}}>
                            <FormItem
                                label="地点" >{initClassInfo.arrangements[1].buildingName+initClassInfo.arrangements[0].classroomId}</FormItem>
                            <FormItem
                                label="时间" >{initClassInfo.arrangements[1].typeName}</FormItem>
                            <FormItem>
                                <Button
                                    style={{marginLeft: 20}}
                                    icon="cross"
                                    type="dashed"
                                    onClick={this.handleSubmit2}
                                    htmlType="submit">
                                </Button>
                            </FormItem>
                        </Form>
                        <div>
                            <WrappedSearchForm dispatch={this.props.dispatch} dataSource={this.props.dataSource}/>
                        </div>
                    </div>
                );
            else
                return (
                    <div>
                        <NavigationBar current={"course"} dispatch={this.props.dispatch}/>
                        <Form  layout={"inline"} style={{textAlign: 'center'}}>
                            <FormItem label="课程号：" >{initClassInfo.courseId}</FormItem>
                            <FormItem label="课程名称：" >{initClassInfo.courseName}</FormItem>
                            <FormItem label="未安排课时" >{initClassInfo.numLessonsLeft}</FormItem>
                        </Form><div/>
                        <div/>
                        <div>
                            <WrappedSearchForm dispatch={this.props.dispatch} dataSource={this.props.dataSource}/>
                        </div>
                    </div>
                );
        }else
            return (
                <div>
                    <NavigationBar current={"course"} dispatch={this.props.dispatch}/>
                    <div/>
                    <div>
                        <WrappedSearchForm dispatch={this.props.dispatch} dataSource={this.props.dataSource}/>
                    </div>
                </div>
            );
    }
}