import * as React from 'react';
import {Component} from 'react';
import {Form, Button, Modal, Input, Icon, Select, Table, Divider, Col, Row} from 'antd';
import DvaProps from '../types/DvaProps';
import {NavigationBar, TssFooter, TssHeader} from "./TssPublicComponents";
import {WrappedCourseViewForm} from "./CourseViewForm"
import {WrappedCourseEditForm} from "./CourseEditForm"
import {Layout, message} from 'antd';
import {WrappedCourseInfoAddForm} from "./ManagerInfoAddForm";
import {Simulate} from "react-dom/test-utils";

interface FormProps extends DvaProps {
    data: any;
    form: any;
}

interface CourseProps extends DvaProps {
    data: any;
    cid: string;
    name: string;
    credit: string;
    weeklyNum: string;
    semester: string;
    intro: string;
    dept: string;
    pswdShow: boolean;
}

interface CourseState {
    modal1Visible: boolean;
    modal2Visible: boolean;
    modal3Visible: boolean;
}

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


class SearchForm extends Component<FormProps> {
    constructor(props) {
        super(props);
    }

    handleSearch = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log('Received values of form: ', values);
            this.props.dispatch({type:'course/search', payload:{...values}});
        });
    };

    handleReset = () => {
        this.props.form.resetFields();
    };

    // handleChange = (value) => {
    //     this.setState({tag: value})
    // };

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <div>
                <Form className="ant-advanced-search-form" layout={"inline"} onSubmit={this.handleSearch}>
                    <FormItem label="课程号" labelCol={{span: 8, offset: 4}} wrapperCol={{span: 8}}>
                        {
                            getFieldDecorator('cid', {
                                rules: [
                                    {pattern: /^[0-9]+$/, message: '请输入数字'}
                                ]
                            })(
                                <Input prefix={<Icon type="user" style={{fontSize: 13}}/>} style={{width: 200}}/>
                            )
                        }
                    </FormItem>
                    <FormItem label="课程名" labelCol={{span: 8, offset: 4}} wrapperCol={{span: 8}}>
                        {
                            getFieldDecorator('name', {
                                rules: [
                                ]
                            })(
                                <Input prefix={<Icon type="user" style={{fontSize: 13}}/>} style={{width: 200}}/>
                            )
                        }
                    </FormItem>
                    <FormItem label="所属院系" labelCol={{span: 8, offset: 4}} wrapperCol={{span: 8}}>
                        {
                            getFieldDecorator('dept', {
                                // initialValue: "1",
                                // onChange: this.handleChange
                            })(
                                <Select style={{width: 200}}>
                                    <Option value="1">课程号</Option>
                                    <Option value="2">课程名</Option>
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


export default class CourseManagePageComponent extends Component<CourseProps, CourseState> {
    constructor(props) {
        super(props);
        this.state = {
            modal1Visible: false,
            modal2Visible: false,
            modal3Visible: false
        };
    }
    columns = [
        {title: '课程号', dataIndex: 'cid', key: 'uid'},
        {title: '名称', dataIndex: 'name', key: 'name'},
        {title: '学分', dataIndex: 'credit', key: 'gender'},
        {title: '院系', dataIndex: 'dept', key:'dept'},
        {title: '操作', dataIndex: 'x', key: 'x', render: (text, record) => (
                <span>
                    <a href="javascript:void(0);" onClick={()=>{this.getInfo(record.uid)}}>查看</a>
                    <span className="ant-divider" />
                    <a href="javascript:void(0);" onClick={()=>{this.modifyInfo(record.uid)}}>编辑</a>
                </span>
            )},
    ];

    formRef1: any;
    formRef2: any;
    formRef3: any;
    getInfo(id:string){
        // this.props.dispatch({type: '/user/info', payload: {uid: id}});
        this.setModal1Visible(true);
    };

    modifyInfo(id:string){
        // this.props.dispatch({type: '/user/info', payload: {uid: id}});
        this.setModal2Visible(true);
    };

    setModal1Visible(modal1Visible) {
        if (this.formRef1 && modal1Visible === true) this.formRef1.refresh();
        this.setState({modal1Visible: modal1Visible});
    };

    setModal2Visible(modal2Visible) {
        if (this.formRef2 && modal2Visible === true) this.formRef2.refresh();
        this.setState({modal2Visible: modal2Visible});
    };

    setModal3Visible(modal3Visible) {
        if (this.formRef3 && modal3Visible === true) this.formRef3.refresh();
        this.setState({modal3Visible: modal3Visible});
    };

    handleOk1(e) {
        // if(!this.formRef.handleSubmit(e)) this.setModalVisible(false);
        this.setModal1Visible(false);
    };

    handleOk2(e) {
        // if(!this.formRef.handleSubmit(e)) this.setModalVisible(false);
        this.setModal2Visible(false);
    };

    handleOk3(e) {
        if(!this.formRef3.handleSubmit(e)) this.setModal3Visible(false);
        // this.setModal2Visible(false);
    };

    render() {
        {/*<Layout>*/}
            {/*<TssHeader visible={true} dispatch={this.props.dispatch} show={this.props.pswdShow} />*/}
            {/*<Content style={{minHeight: '600px'}}>*/}
        return (
            <div>
                <NavigationBar current={"courseManage"} dispatch={this.props.dispatch}/>
                <br/>
                <div>
                    <WrappedSearchForm data={this.props.data} dispatch={this.props.dispatch}/>
                    <Table footer={()=>{
                        return (
                            <Row>
                            <Col span={12} offset={0} style={{ textAlign: 'left'}} >
                                <Button icon="delete" type="primary" onClick={()=>{message.success("删除成功")}} >删除已选课程</Button>
                                <Button icon='plus' type="primary" style={{marginLeft: 8}} onClick={()=>{this.setModal3Visible(true)}}>添加新的课程</Button>
                            </Col>
                    </Row>)}} style={{width: "100%", background: "#ffffff"}} columns={this.columns} dataSource={this.props.data} rowSelection={rowSelection} className="table"/>
                    <Modal
                        title="查看课程信息"
                        wrapClassName="vertical-center-modal"
                        visible={this.state.modal1Visible}
                        onOk={(e) => this.handleOk1(e)}
                        onCancel={() => this.setModal1Visible(false)}
                    >
                        <WrappedCourseViewForm  wrappedComponentRef={(inst) => this.formRef1 = inst} dispatch={this.props.dispatch} {...this.props}/>
                    </Modal>
                    <Modal
                        title="编辑课程信息"
                        wrapClassName="vertical-center-modal"
                        visible={this.state.modal2Visible}
                        onOk={(e) => this.handleOk2(e)}
                        onCancel={() => this.setModal2Visible(false)}
                    >
                        <WrappedCourseEditForm  wrappedComponentRef={(inst) => this.formRef2 = inst} dispatch={this.props.dispatch} {...this.props}/>
                    </Modal>
                    <Modal
                        title="添加课程"
                        wrapClassName="vertical-center-modal"
                        visible={this.state.modal3Visible}
                        onOk={(e) => this.handleOk3(e)}
                        onCancel={() => this.setModal3Visible(false)}
                    >
                        <WrappedCourseInfoAddForm  wrappedComponentRef={(inst) => this.formRef3 = inst} dispatch={this.props.dispatch}/>
                    </Modal>
                </div>
            </div>
        );
    // </Content>
    //     <TssFooter/>
    // </Layout>
    }
}

