import * as React from 'react';
import {Component} from 'react';
import {Form, Button, Modal, Input, Icon, Select, Table, Divider, Col, Row, Layout, message} from 'antd';
import DvaProps from '../types/DvaProps';
import {WrappedManagerInfoEditForm} from './ManagerInfoEditForm';
import {WrappedManagerInfoViewForm} from './ManagerInfoViewForm'
import {NavigationBar, TssFooter, TssHeader} from "./TssPublicComponents";
import {WrappedManagerInfoAddForm} from './ManagerInfoAddForm'
import {type} from "os";
import {getType} from "../utils/localStorage";

interface UserManageFormProps extends DvaProps {
    data: any;
    form: any;
    deptList: any[]
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
    deptList: any[]
}

interface UserState {
    modal1Visible: boolean;
    modal2Visible: boolean;
    modal3Visible: boolean;
    modal4Visible: boolean;
    fname: string;
    selected: any;
}

const FormItem = Form.Item;
const Option = Select.Option;

class SearchForm extends Component<UserManageFormProps, {}> {
    componentDidMount() {
        this.props.dispatch({type: 'dept/getDeptList', payload: {}});
    }

    handleSearch = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log('Received values of form: ', values);
            this.props.dispatch({type: 'userinfo/searchUser', payload: {...values}})
        });
    };

    handleReset = () => {
        this.props.form.resetFields();
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        const dept = this.props.deptList.map((k) => {
            return (
                <Option value={`${k}`} key={`${k}`}>{`${k}`} </Option>
            )
        });
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
                                rules: []
                            })(
                                <Input prefix={<Icon type="user" style={{fontSize: 13}}/>} style={{width: 200}}/>
                            )
                        }
                    </FormItem>
                    <FormItem label="职务" labelCol={{span: 8, offset: 4}} wrapperCol={{span: 8}}>
                        {
                            getFieldDecorator('type', {})(
                                <Select style={{width: 200}}>
                                    <Option value="System Administrator">系统管理员</Option>
                                    <Option value="Teaching Administrator">教务管理员</Option>
                                    <Option value="Teacher">教师</Option>
                                    <Option value="Student">学生</Option>
                                </Select>
                            )
                        }
                    </FormItem>
                    <FormItem label="院系" labelCol={{span: 8, offset: 4}} wrapperCol={{span: 8}}>
                        {
                            getFieldDecorator('dept', {})(
                                <Select style={{width: 200}}>
                                    {dept}
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
let selected: string[] = [];


export default class UserManagePageComponent extends Component<UserManageProps, UserState> {
    componentDidMount() {
        const type = getType();
        if (type != 'Teaching Administrator' && type != 'System Administrator') {
            this.props.dispatch({type: "navigation/jump", payload: {direction: 'navi'}});
            return;
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            modal1Visible: false,
            modal2Visible: false,
            modal3Visible: false,
            modal4Visible: false,
            fname: '',
            selected: [""]
        };
        this.props.dispatch({type: 'dept/getDeptList', payload: {}});
        console.log(this.props.deptList);
    }

    columns = [
        {title: '学号', dataIndex: 'uid', key: 'uid'},
        {title: '姓名', dataIndex: 'name', key: 'name'},
        {title: '性别', dataIndex: 'gender', key: 'gender'},
        {title: '职务', dataIndex: 'type', key: 'type'},
        {title: '院系', dataIndex: 'dept', key: 'dept'},
        {title: '入学时间', dataIndex: 'year', key: 'year'},
        {
            title: '操作', dataIndex: 'x', key: 'x', render: (text, record) => (
                <span>
                <a href="javascript:void(0);" onClick={() => {
                    this.getInfo(record.uid)
                }}>查看</a>
                <span className="ant-divider"/>
                <a href="javascript:void(0);" onClick={() => this.modifyInfo(record.uid)}>编辑</a>
                <span className="ant-divider"/>
                <a href="javascript:void(0);" onClick={() => this.resetPassword(record.uid)}>重置密码</a>
                </span>
            )
        },
    ];

    formRef1: any;
    formRef2: any;
    formRef3: any;
    formRef4: any;
    import: any;
    rowSelection = {
        onChange(selectedRowKeys, selectedRows) {
            selected = [];
            for (let i = 0; i < selectedRows.length; i++) {
                selected.push(selectedRows[i].uid);
            }
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        onSelect(record, selected, selectedRows) {
            selected = record.uid.toString();
            console.log("selected", selected);
        },
        onSelectAll(selected, selectedRows, changeRows) {
            console.log(selected, selectedRows, changeRows);
        },
    };
    onSelect = (record, selected, selectedRows) => {
        console.log(record, selected, selectedRows);
    };

    getInfo(id: string) {
        this.props.dispatch({type: 'userinfo/showUser', payload: {uid: id}});
        this.setModal1Visible(true);
    };

    modifyInfo(id: string) {
        this.props.dispatch({type: 'userinfo/showUser', payload: {uid: id}});
        this.setModal2Visible(true);
    };

    resetPassword(id: string) {
        // message.success("重置密码成功");
        this.props.dispatch({type: 'pswd/reset', payload: {uid: id}});
    }

    setModal1Visible(modalVisible) {
        // if (this.formRef1 && modalVisible === true) this.formRef1.refresh();
        this.setState({modal1Visible: modalVisible});
    };

    setModal2Visible(modalVisible) {
        // if (this.formRef2 && modalVisible === true) this.formRef2.refresh();
        this.setState({modal2Visible: modalVisible});
    };

    setModal3Visible(modalVisible) {
        if (this.formRef3 && modalVisible === true) this.formRef3.refresh();
        this.setState({modal3Visible: modalVisible});
    };

    setModal4Visible(modalVisible) {
        // if (this.formRef4 && modalVisible === true) this.formRef4.refresh();
        this.setState({modal4Visible: modalVisible});
    };

    handleOk1(e) {
        // if(!this.formRef.handleSubmit(e)) this.setModalVisible(false);
        this.setModal1Visible(false);
    }

    handleOk2(e) {
        if (!this.formRef2.handleSubmit(e)) {
            message.success("编辑信息成功");
            this.setModal2Visible(false);
        }
    }

    handleOk3(e) {
        if (!this.formRef3.handleSubmit(e)) {
            message.success("添加用户成功");
            this.setModal3Visible(false);
        }
    }

    handleOk4(e) {
        if (this.state.fname === '') {
            message.warning('未选择文件');
            return;
        }
        this.props.dispatch({
            type: 'userinfo/addUser',
            payload: {
                names: this.names,
                uids: this.uids,
                genders: this.genders,
                type: this.type,
                passwords: this.passwords
            }
        });
        this.setModal4Visible(false);
        this.setState({fname: ''});
    }

    addUser() {
        this.props.dispatch({type: 'userinfo/resetUser', payload: {}});
        this.setModal3Visible(true);
    }

    handleClick() {
        this.props.dispatch({type: 'userinfo/deleteUser', payload: {uids: selected}});
        selected = [];
    };

    handleBatchAdd() {
        this.setModal4Visible(true);
    };

    uids: any[];
    names: any[];
    genders: any[];
    type: any;
    passwords: any[];

    uploadHandler(name, content) {
        if(name === ''){
            this.setState({fname: ''});
            return;
        }
        let uploadFile = {
            name: name,
            fileContent: content
        };
        let uids: any = [];
        let names: any = [];
        let genders: any = [];
        let type: any;
        let passwords: any = [];
        let records = content.split(/[\n]/);
        for (let i = 0; i < records.length; i++) {
            if (i === 0) {
                type = records[i];
            }
            else {
                let tmp = records[i].split(/[,]/);
                if (tmp[0] != undefined && tmp[1] != undefined && tmp[2] != undefined) {
                    uids.push(tmp[0]);
                    names.push(tmp[1]);
                    genders.push(tmp[2]);
                    passwords.push(null);
                }
            }
        }
        this.uids = uids;
        this.names = names;
        this.genders = genders;
        this.type = type;
        this.passwords = passwords;
        this.setState({fname: name});
    };

    render() {
        return (
            <div>
                <br/>
                <div>
                    <WrappedSearchForm data={this.props.data} dispatch={this.props.dispatch}
                                       deptList={this.props.deptList}/>
                    <Table footer={() => {
                        return (
                            <Row>
                                <Col span={12} offset={0} style={{textAlign: 'left'}}>
                                    <Button icon="delete" type="primary"
                                            onClick={() => this.handleClick()}>删除已选用户</Button>
                                    <Button icon='plus' type="primary" onClick={() => {
                                        this.addUser()
                                    }} style={{marginLeft: 8}}>添加新的用户</Button>
                                    <Button icon="upload" type="primary" style={{marginLeft: 8}}
                                            onClick={() => this.handleBatchAdd()}>批量上传用户</Button>
                                </Col>
                            </Row>)
                    }} style={{width: "100%", background: "#ffffff"}} columns={this.columns}
                           dataSource={this.props.data} rowSelection={this.rowSelection} className="table"/>
                    <Modal
                        title="查看用户信息"
                        wrapClassName="vertical-center-modal"
                        visible={this.state.modal1Visible}
                        onOk={(e) => this.handleOk1(e)}
                        onCancel={() => this.setModal1Visible(false)}
                    >
                        <WrappedManagerInfoViewForm wrappedComponentRef={(inst) => this.formRef1 = inst}
                                                    dispatch={this.props.dispatch} uid={this.props.uid}
                                                    name={this.props.name} gender={this.props.gender}
                                                    dept={this.props.dept} type={this.props.type}
                                                    email={this.props.email} tel={this.props.telephone}
                                                    intro={this.props.intro} year={this.props.year}/>
                    </Modal>
                    <Modal
                        title="编辑用户信息"
                        wrapClassName="vertical-center-modal"
                        visible={this.state.modal2Visible}
                        onOk={(e) => this.handleOk2(e)}
                        onCancel={() => this.setModal2Visible(false)}
                    >
                        <WrappedManagerInfoEditForm wrappedComponentRef={(inst) => this.formRef2 = inst}
                                                    dispatch={this.props.dispatch} uid={this.props.uid}
                                                    name={this.props.name} gender={this.props.gender}
                                                    dept={this.props.dept} type={this.props.type}
                                                    email={this.props.email} tel={this.props.telephone}
                                                    intro={this.props.intro} year={this.props.year}
                        />
                    </Modal>
                    <Modal
                        title="添加用户"
                        wrapClassName="vertical-center-modal"
                        visible={this.state.modal3Visible}
                        onOk={(e) => this.handleOk3(e)}
                        onCancel={() => this.setModal3Visible(false)}
                    >
                        <WrappedManagerInfoAddForm wrappedComponentRef={(inst) => this.formRef3 = inst}
                                                   dispatch={this.props.dispatch} uid={this.props.uid}
                                                   name={this.props.name} gender={this.props.gender}
                                                   dept={this.props.dept} type={this.props.type}
                                                   year={this.props.year}/>
                    </Modal>
                    <Modal
                        title="批量添加用户"
                        wrapClassName="vertical-center-modal"
                        visible={this.state.modal4Visible}
                        onOk={(e) => this.handleOk4(e)}
                        onCancel={() => {
                            this.setModal4Visible(false);
                            this.setState({fname: ''});
                        }}
                    >
                        <p>文件输入格式：（.txt文件）首行输入用户类型(Student,Teacher,Teaching Administrator,System Administrator)</p>
                        <p>例如：</p>
                        <p>Student</p>
                        <p>3150100000,姓名,男</p>
                        <p>3150100001,姓名,女</p>
                        <p>3150100002,姓名,男</p>
                        <p>3150100003,姓名,男</p>
                        <Button onClick={() => {
                            this.import.openDisk()
                        }}><Icon type={"upload"}/>选择上传文件</Button>
                        <p>{this.state.fname}</p>
                        <Import
                            ref={el => this.import = el}
                            uploadCallback={this.uploadHandler.bind(this)}
                            dispatch={this.props.dispatch}
                        />
                    </Modal>
                </div>
            </div>
        );
    }
}

interface ImportProps
    extends DvaProps {
    uploadCallback: any
}

export class Import extends Component<ImportProps> {
    constructor(props) {
        super(props);
        this.bindHander();
    };

    fileUpload: any;

    bindHander() {
        this.openDisk = this.openDisk.bind(this);
        this.readFileContent = this.readFileContent.bind(this);
    };

    openDisk() {
        this.fileUpload.click();
    };

    readFileContent(e) {
        let
            _self = this,
            file = e.target.files[0];
        if (file) {
            let
                reader = new FileReader();
            reader.readAsText(file);
            reader.onload = function () {
                _self.props.uploadCallback(file.name, reader.result);
            };
        } else {
            _self.props.uploadCallback('', '');
            console.log('error');
        }
    };

    render() {
        return <input type="file" hidden={true} ref={(el) => {
            this.fileUpload = el
        }} onClick={this.readFileContent} onChange={this.readFileContent} accept={".txt"}/>
    }
}
