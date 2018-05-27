import * as React from 'react';
import {Component} from 'react';
import {Form, Button, Modal, Input, Icon, Select, Table, Divider, Col, Row, Layout, message} from 'antd';
import DvaProps from '../types/DvaProps';
import {WrappedManagerInfoEditForm} from './ManagerInfoEditForm';
import {WrappedManagerInfoViewForm} from './ManagerInfoViewForm'
import {NavigationBar, TssFooter, TssHeader} from "./TssPublicComponents";
import {WrappedManagerInfoAddForm} from './ManagerInfoAddForm'

interface UserManageFormProps extends DvaProps {
    data: any;
    form: any;
}

interface UserManageProps extends DvaProps {
    data: any;
    uid: string;
    name: string;
    telephone: string;
    email: string;
    intro: string;
    dept: string;
    year: string;
    type: string;
    gender: string;
    majorClass: string;
    photo: any;
    pswdShow: boolean;
}

interface UserState {
    modal1Visible: boolean;
    modal2Visible: boolean;
    modal3Visible: boolean;
    selected: any;
}

const FormItem = Form.Item;
const Option = Select.Option;

class SearchForm extends Component<UserManageFormProps, {}> {
    handleSearch = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log('Received values of form: ', values);
            this.props.dispatch({type:'userinfo/searchUser', payload:{...values}})
        });
    };

    handleReset = () => {
        this.props.form.resetFields();
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <div>
                <Form className="ant-advanced-search-form" layout={"inline"} onSubmit={this.handleSearch}>
                    <FormItem label="学号或教工号" labelCol={{span: 8, offset: 4}} wrapperCol={{span: 8}}>
                        {
                            getFieldDecorator('uid', {
                                rules: [
                                    {pattern: /^[0-9]+$/, message: '请输入数字'}
                                ]
                            })(
                                <Input prefix={<Icon type="user" style={{fontSize: 13}}/>} style={{width: 200}}/>
                            )
                        }
                    </FormItem>
                    <FormItem label="姓名" labelCol={{span: 8, offset: 4}} wrapperCol={{span: 8}}>
                        {
                            getFieldDecorator('name', {
                                rules: [
                                ]
                            })(
                                <Input prefix={<Icon type="user" style={{fontSize: 13}}/>} style={{width: 200}}/>
                            )
                        }
                    </FormItem>
                    <FormItem label="职务" labelCol={{span: 8, offset: 4}} wrapperCol={{span: 8}}>
                        {
                            getFieldDecorator('type', {})(
                                <Select style={{width: 200}}>
                                    <Option value="管理员">管理员</Option>
                                    <Option value="学生">学生</Option>
                                    <Option value="教师">教师</Option>
                                </Select>
                            )
                        }
                    </FormItem>
                    <FormItem label="院系" labelCol={{span: 8, offset: 4}} wrapperCol={{span: 8}}>
                        {
                            getFieldDecorator('dept', {})(
                                <Select style={{width: 200}}>
                                    <Option value="计算机科学与技术学院">计算机科学与技术学院</Option>
                                    <Option value="数学科学院">数学科学院</Option>
                                    <Option value="公共管理学院">公共管理学院</Option>
                                    <Option value="教务处">教务处</Option>
                                </Select>
                            )
                        }
                    </FormItem>
                    <FormItem labelCol={{span: 8, offset: 24}} wrapperCol={{span: 8, offset: 12}}>
                        <Button style={{width: "200px"}} icon="search" type="primary" htmlType="submit">搜索</Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
}

const WrappedSearchForm: any = Form.create({})(SearchForm);
const {Content} = Layout;
let selected:string="";


export default class UserManagePageComponent extends Component<UserManageProps, UserState> {
    constructor(props) {
        super(props);
        this.state = {
            modal1Visible: false,
            modal2Visible: false,
            modal3Visible: false,
            selected: ""
        };
    }
    columns = [
        {title: '学号', dataIndex: 'uid', key: 'uid'},
        {title: '姓名', dataIndex: 'name', key: 'name'},
        {title: '性别', dataIndex: 'gender', key: 'gender'},
        {title: '职务', dataIndex: 'type', key: 'type'},
        {title: '院系', dataIndex: 'dept', key:'dept'},
        {title: '入学时间', dataIndex: 'year', key: 'year'},
        {title: '操作', dataIndex: 'x', key: 'x', render: (text, record) => (
                <span>
                    <a href="javascript:void(0);" onClick={()=>{this.getInfo(record.uid)}}>查看</a>
                    <span className="ant-divider" />
                    <a href="javascript:void(0);" onClick={()=>this.modifyInfo(record.uid)}>编辑</a>
                    <span className="ant-divider" />
                    <a href="javascript:void(0);" onClick={()=>this.resetPassword(record.uid)}>重置密码</a>
                </span>
            )},
    ];

    formRef1: any;
    formRef2: any;
    formRef3: any;
    rowSelection = {
        onChange(selectedRowKeys, selectedRows) {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        onSelect(record, selected, selectedRows) {
            // this.onSelect(record, selected, selectedRows);
            selected = record.uid.toString();
            console.log("selected", selected);
        },
        onSelectAll(selected, selectedRows, changeRows) {
            console.log(selected, selectedRows, changeRows);
        },
    };
    onSelect = (record, selected, selectedRows) => {
        console.log(record, selected, selectedRows);
        // this.selected = record.uid;
        // this.setState({selected: record.uid});
    };

    getInfo(id:string){
        this.props.dispatch({type: 'userinfo/showUser', payload: {uid: id}});
        this.setModal1Visible(true);
    };

    modifyInfo(id:string){
        this.props.dispatch({type: 'userinfo/showUser', payload: {uid: id}});
        this.setModal2Visible(true);
    };

    resetPassword(id:string){
        message.success("重置密码成功");
        // this.props.dispatch();
    }
    setModal1Visible(modalVisible) {
        this.setState({modal1Visible: modalVisible});
        if (this.formRef1 && modalVisible === true) this.formRef1.refresh();
    };
    setModal2Visible(modalVisible) {
        this.setState({modal2Visible: modalVisible});
        if (this.formRef2 && modalVisible === true) this.formRef2.refresh();
    };
    setModal3Visible(modalVisible) {
        this.setState({modal3Visible: modalVisible});
        if (this.formRef3 && modalVisible === true) this.formRef3.refresh();
    };
    handleOk1(e) {
        // if(!this.formRef.handleSubmit(e)) this.setModalVisible(false);
        this.setModal1Visible(false);
    }
    handleOk2(e) {
        this.formRef2.handleSubmit(e);
        message.success("编辑信息成功");
        this.setModal2Visible(false);
    }
    handleOk3(e) {
        this.formRef3.handleSubmit(e);
        message.success("添加用户成功");
        this.setModal3Visible(false);
    }
    addUser(){
        this.props.dispatch({type:'userinfo/addUser', payload:{uid: "", name: "", type: "", dept: "", gender:"男", year:""}});
        this.props.dispatch({type:'userinfo/showUser', payload:{uid:""}});
        this.setModal3Visible(true);
        this.props.dispatch({type:'userinfo/deleteUser', payload:{uid:""}});
    }
    handleClick(){
        this.props.dispatch({type:'userinfo/deleteUser', payload:{uid:selected.toString()}});
    };
    render() {
        return (
            <div>
                <NavigationBar current={"userManage"} dispatch={this.props.dispatch}/>
                <br/>
                <div>
                    <WrappedSearchForm data={this.props.data} dispatch={this.props.dispatch}/>
                    <Table footer={()=>{
                        return (
                            <Row>
                            <Col span={12} offset={0} style={{ textAlign: 'left'}} >
                                <Button icon="delete" type="primary" onClick={this.handleClick}>删除已选用户</Button>
                                <Button icon='plus' type="primary" onClick={()=>{this.addUser()}} style={{marginLeft: 8}}>添加新的用户</Button>
                            </Col>
                    </Row>)}} style={{width: "100%", background: "#ffffff"}} columns={this.columns} dataSource={this.props.data} rowSelection={this.rowSelection} className="table"/>
                    <Modal
                        title="查看用户信息"
                        wrapClassName="vertical-center-modal"
                        visible={this.state.modal1Visible}
                        onOk={(e) => this.handleOk1(e)}
                        onCancel={() => this.setModal1Visible(false)}
                    >
                        <WrappedManagerInfoViewForm  wrappedComponentRef={(inst) => this.formRef1 = inst} dispatch={this.props.dispatch} uid={this.props.uid} name={this.props.name} gender={this.props.gender} dept={this.props.dept} type={this.props.type} email={this.props.email} tel={this.props.telephone} intro={this.props.intro} year={this.props.year}/>
                    </Modal>
                    <Modal
                        title="编辑用户信息"
                        wrapClassName="vertical-center-modal"
                        visible={this.state.modal2Visible}
                        onOk={(e) => this.handleOk2(e)}
                        onCancel={() => this.setModal2Visible(false)}
                    >
                        <WrappedManagerInfoEditForm  wrappedComponentRef={(inst) => this.formRef2 = inst} dispatch={this.props.dispatch} uid={this.props.uid} name={this.props.name} gender={this.props.gender} dept={this.props.dept} type={this.props.type} email={this.props.email} tel={this.props.telephone} intro={this.props.intro} year={this.props.year}/>
                    </Modal>
                    <Modal
                        title="添加用户"
                        wrapClassName="vertical-center-modal"
                        visible={this.state.modal3Visible}
                        onOk={(e) => this.handleOk3(e)}
                        onCancel={() => this.setModal3Visible(false)}
                    >
                        <WrappedManagerInfoAddForm  wrappedComponentRef={(inst) => this.formRef3 = inst} dispatch={this.props.dispatch} uid={this.props.uid} name={this.props.name} gender={this.props.gender} dept={this.props.dept} type={this.props.type} year={this.props.year}/>
                    </Modal>
                </div>
            </div>
        );
    }
}

