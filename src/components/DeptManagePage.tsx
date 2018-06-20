import * as React from 'react';
import {Component, FormEvent} from 'react';
import {Form, Button, Modal, Input, Icon, Select, Table, Divider, Col, Row, Layout, message} from 'antd';
import DvaProps from '../types/DvaProps';
import {WrappedAddDeptForm} from "./AddDeptForm";
import {WrappedAddMajorForm} from "./AddMajorForm";
import {WrappedAddClassForm} from "./AddClassForm";
import {WrappedAddStuForm} from "./AddStuForm";
import {WrappedAddTeaForm} from "./AddTeaForm";
import {Import} from "./UserManagePage";
import {getType} from "../utils/localStorage";

interface FormProps extends DvaProps {
    data: any;
    form: any;
}

interface DeptProps extends DvaProps {
    data: any;
    majorData: any;
    classData: any;
    stuData: any;
    name: string;
    majorName: string;
    className: string;
    pswdShow: boolean;
    year: string;
}

interface DeptState {
    modal1Visible: boolean;
    modal2Visible: boolean;
    modal3Visible: boolean;
    modal4Visible: boolean;
    modal5Visible: boolean;
    modal6Visible: boolean;
    modal7Visible: boolean;
    modal8Visible: boolean;
    modal9Visible: boolean;
    fname: string;
}

let selected1: string[] = [];
let selected2: string[] = [];
let selected3: string[] = [];
let selected4: string[] = [];


const rowSelection1 = {
    onChange(selectedRowKeys, selectedRows) {
        selected1 = [];
        for (let i = 0; i < selectedRows.length; i++) {
            selected1.push(selectedRows[i].name);
        }
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
};
const rowSelection2 = {
    onChange(selectedRowKeys, selectedRows) {
        selected2 = [];
        for (let i = 0; i < selectedRows.length; i++) {
            selected2.push(selectedRows[i].name);
        }
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
};
const rowSelection3 = {
    onChange(selectedRowKeys, selectedRows) {
        selected3 = [];
        for (let i = 0; i < selectedRows.length; i++) {
            selected3.push(selectedRows[i].name);
        }
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
};
const rowSelection4 = {
    onChange(selectedRowKeys, selectedRows) {
        selected4 = [];
        for (let i = 0; i < selectedRows.length; i++) {
            selected4.push(selectedRows[i].uid);
        }
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
};
const FormItem = Form.Item;
const Option = Select.Option;

interface FormState {
    tag: string | null
}

class SearchForm extends Component<FormProps, FormState> {
    constructor(props) {
        super(props);
        this.state = {
            tag: "1"
        };
    }

    handleSearch = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log('Received values of dept search: ', values);
            this.props.dispatch({type: 'dept/search', payload: {...values}});
        });
    };

    handleReset = () => {
        this.props.form.resetFields();
    };

    handleChange = (value) => {
        this.setState({tag: value})
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        // let Item2 = () => {
        //     switch (this.state.tag) {
        //         case "1":
        //             return (<FormItem label="院系" labelCol={{span: 8, offset: 4}} wrapperCol={{span: 8}}>
        //                 {
        //                     getFieldDecorator('name', {})(
        //                         <Input prefix={<Icon type="user" style={{fontSize: 13}}/>} style={{width: 200}}/>
        //                     )
        //                 }
        //             </FormItem>);
        //         case "2":
        //             return (<FormItem label="专业" labelCol={{span: 8, offset: 4}} wrapperCol={{span: 8}}>
        //                 {
        //                     getFieldDecorator('name', {
        //                         rules: []
        //                     })(
        //                         <Input prefix={<Icon type="user" style={{fontSize: 13}}/>} style={{width: 200}}/>
        //                     )
        //                 }
        //             </FormItem>);
        //         default :
        //             return (<FormItem label="班级" labelCol={{span: 8, offset: 4}} wrapperCol={{span: 8}}>
        //                 {
        //                     getFieldDecorator('name', {})(
        //                         <Input prefix={<Icon type="user" style={{fontSize: 13}}/>} style={{width: 200}}/>
        //                     )
        //                 }
        //             </FormItem>);
        //     }
        // };
        return (
            <div>
                <Form className="ant-advanced-search-form" layout={"inline"} onSubmit={this.handleSearch}>
                    {/*<FormItem label="院系／专业／班级" labelCol={{span: 10, offset: 4}} wrapperCol={{span: 8}}>*/}
                    {/*{*/}
                    {/*getFieldDecorator('tag', {*/}
                    {/*initialValue: "1",*/}
                    {/*onChange: this.handleChange*/}
                    {/*})(*/}
                    {/*<Select style={{width: 200}}>*/}
                    {/*<Option value="1">院系</Option>*/}
                    {/*<Option value="2">专业</Option>*/}
                    {/*<Option value="3">班级</Option>*/}
                    {/*</Select>*/}
                    {/*)*/}

                    {/*}*/}
                    {/*</FormItem>*/}
                    {/*<Item2/>*/}
                    <FormItem label="院系" labelCol={{span: 8, offset: 4}} wrapperCol={{span: 8}}>
                        {
                            getFieldDecorator('name', {})(
                                <Input prefix={<Icon type="user" style={{fontSize: 13}}/>} style={{width: 200}}/>
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

export default class DeptManagePageComponent extends Component<DeptProps, DeptState> {
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
            modal5Visible: false,
            modal6Visible: false,
            modal7Visible: false,
            modal8Visible: false,
            modal9Visible: false,
            fname: ''
        };
    }

    columns = [
        {title: '院系名称', dataIndex: 'name', key: 'name'},
        {
            title: '操作', dataIndex: 'x', key: 'x', render: (text, record) => (
                <span>
                    {/*<a href="javascript:void(0);" onClick={()=>{this.getInfo(record.id)}}>查看</a>*/}
                    {/*<span className="ant-divider" />*/}
                    <a href="javascript:void(0);" onClick={() => this.modifyDept(record.name)}>查看/编辑</a>
                </span>
            )
        },
    ];

    columnsMajor = [
        {title: '专业名称', dataIndex: 'name', key: 'name'},
        {
            title: '操作', dataIndex: 'x', key: 'x', render: (text, record) => (
                <span>
                    <a href="javascript:void(0);" onClick={() => {
                        this.modifyMajor(record.name)
                    }}>查看/编辑</a>
                    {/*<span className="ant-divider" />*/}
                    {/*<a href="javascript:void(0);" onClick={()=>this.modifyMajor(record.id)}>编辑</a>*/}
                </span>
            )
        },
    ];

    columnsClass = [
        {title: '班级名称', dataIndex: 'name', key: 'name'},
        {
            title: '操作', dataIndex: 'x', key: 'x', render: (text, record) => (
                <span>
                    <a href="javascript:void(0);" onClick={() => {
                        this.modifyClass(record.name)
                    }}>查看/编辑</a>
                </span>
            )
        },
    ];

    columnsStu = [
        {title: '学生学号', dataIndex: 'uid', key: 'uid'},
        {title: '学生姓名', dataIndex: 'name', key: 'name'},
    ];

    formRef1: any;
    formRef2: any;
    formRef3: any;
    formRef4: any;
    formRef5: any;
    formRef6: any;
    formRef7: any;
    formRef9: any;
    import: any;

    getInfo(id: string) {
        // this.props.dispatch({type: '/user/info', payload: {uid: id}});
    };

    modifyInfo(name: string) {
        // this.props.dispatch({type: '/user/info', payload: {uid: id}});
    };

    modifyDept(name: string) {
        this.props.dispatch({type: 'dept/getDept', payload: {name: name}});
        this.setModal1Visible(true);
    }

    modifyClass(name: string) {
        this.props.dispatch({type: 'dept/getClass', payload: {name: name}});
        this.setModal3Visible(true);
    }

    modifyMajor(name: string) {
        this.props.dispatch({type: 'dept/getMajor', payload: {name: name}});
        this.setModal2Visible(true);
    }

    setModal1Visible(modalVisible) {
        // if (this.formRef1 && modalVisible === true) this.formRef1.refresh();
        this.setState({modal1Visible: modalVisible, modal2Visible: false, modal3Visible: false});
    };

    setModal2Visible(modalVisible) {
        // if (this.formRef2 && modalVisible === true) this.formRef2.refresh();
        this.setState({modal1Visible: false, modal2Visible: modalVisible, modal3Visible: false});
    };

    setModal3Visible(modalVisible) {
        // if (this.formRef3 && modalVisible === true) this.formRef3.refresh();
        this.setState({modal1Visible: false, modal2Visible: false, modal3Visible: modalVisible});
    };

    setModal4Visible(modalVisible) {
        // if (this.formRef4 && modalVisible === true) this.formRef4.refresh();
        this.setState({modal1Visible: false, modal2Visible: false, modal3Visible: false, modal4Visible: modalVisible});
    };

    setModal5Visible(modalVisible) {
        this.setState({modal1Visible: false, modal2Visible: false, modal3Visible: false, modal5Visible: modalVisible});
    };

    setModal6Visible(modalVisible) {
        // if (this.formRef4 && modalVisible === true) this.formRef4.refresh();
        this.setState({modal1Visible: false, modal2Visible: false, modal3Visible: false, modal6Visible: modalVisible});
    };

    setModal7Visible(modalVisible) {
        // if (this.formRef4 && modalVisible === true) this.formRef4.refresh();
        this.setState({modal1Visible: false, modal2Visible: false, modal3Visible: false, modal7Visible: modalVisible});
    };

    setModal8Visible(modalVisible) {
        // if (this.formRef4 && modalVisible === true) this.formRef4.refresh();
        this.setState({modal1Visible: false, modal2Visible: false, modal3Visible: false, modal8Visible: modalVisible});
    };

    setModal9Visible(modalVisible) {
        // if (this.formRef4 && modalVisible === true) this.formRef4.refresh();
        this.setState({modal1Visible: false, modal2Visible: false, modal3Visible: false, modal9Visible: modalVisible});
    };

    handleOk1(e) {
        // if(!this.formRef.handleSubmit(e)) this.setModalVisible(false);
        this.setModal1Visible(false);
    }

    handleOk2(e) {
        // if(!this.formRef.handleSubmit(e)) this.setModalVisible(false);
        this.setModal2Visible(false);
    }

    handleOk3(e) {
        // if(!this.formRef.handleSubmit(e)) this.setModalVisible(false);
        this.setModal3Visible(false);
    }

    handleOk4(e) {
        if (!this.formRef4.handleSubmit(e)) this.setModal4Visible(false);
        // this.setModal3Visible(false);
    }

    handleOk5(e) {
        if (!this.formRef5.handleSubmit(e)) this.setModal5Visible(false);
        // this.setModal3Visible(false);
    }

    handleOk6(e) {
        if (!this.formRef6.handleSubmit(e)) this.setModal6Visible(false);
        // this.setModal3Visible(false);
    }

    handleOk7(e) {
        if (!this.formRef7.handleSubmit(e)) this.setModal7Visible(false);
        // this.setModal3Visible(false);
    }

    handleOk8(e) {
        if (this.state.fname != '') {
            this.props.dispatch({type: 'dept/addStu', payload: {uids: this.uids, majorClass: this.props.className}});
            this.setModal8Visible(false);
            this.setState({fname: ''});
        }
        else {
            message.warning("未选择文件");
        }
    }

    handleOk9(e) {
        this.setModal9Visible(false);
        // this.setModal3Visible(false);
    }

    uids: any = [];

    uploadHandler(name, content) {
        let uploadFile = {
            name: name,
            fileContent: content
        };
        let uids: any = [];
        let records = content.split(/[\n]/);
        for (let i = 0; i < records.length; i++) {
            if (records[i] != undefined) {
                uids.push(records[i]);

            }
        }

        this.uids = uids;
        this.setState({fname: name});
    };

    render() {
        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 6},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 14},
            },
        };
        return (
            <div>
                <br/>
                <div>
                    <WrappedSearchForm data={this.props.data} dispatch={this.props.dispatch}/>
                    <Table footer={() => {
                        return (
                            <Row>
                                <Col span={12} offset={0} style={{textAlign: 'left'}}>
                                    <Button icon="delete" type="primary" onClick={() => this.props.dispatch({
                                        type: 'dept/deleteDept',
                                        payload: {names: selected1}
                                    })}>删除已选院系</Button>
                                    <Button icon='plus' type="primary" style={{marginLeft: 8}}
                                            onClick={() => {
                                                this.setModal4Visible(true)
                                            }}>添加新的院系</Button>
                                </Col>
                            </Row>)
                    }} style={{width: "100%", background: "#ffffff"}} columns={this.columns}
                           dataSource={this.props.data} rowSelection={rowSelection1} className="table"/>
                    <Modal
                        title="查看编辑院系信息"
                        wrapClassName="vertical-center-modal"
                        visible={this.state.modal1Visible}
                        onOk={(e) => this.handleOk1(e)}
                        onCancel={() => this.setModal1Visible(false)}
                    >
                        <WrappedDeptForm wrappedComponentRef={(inst) => this.formRef1 = inst}
                                         dispatch={this.props.dispatch} name={this.props.name}/>
                        <Table size="small" footer={() => {
                            return (
                                <Row>
                                    <Col span={24} offset={0} style={{textAlign: 'left'}}>
                                        <Button icon="delete" type="primary" onClick={() => this.props.dispatch({
                                            type: 'dept/deleteMajor',
                                            payload: {names: selected2}
                                        })}>删除已选专业</Button>
                                        <Button icon='plus' type="primary" style={{marginLeft: 8}} onClick={() => {
                                            this.setModal5Visible(true)
                                        }}>添加新的专业</Button>
                                        <Button icon='user' type="primary" style={{marginLeft: 8}} onClick={() => {
                                            this.setModal9Visible(true)
                                        }}>院系教师管理</Button>
                                    </Col>
                                </Row>)
                        }} style={{width: "100%", background: "#ffffff"}} columns={this.columnsMajor}
                               dataSource={this.props.majorData} rowSelection={rowSelection2} className="table"/>
                    </Modal>
                    <Modal
                        title="查看编辑专业信息"
                        wrapClassName="vertical-center-modal"
                        visible={this.state.modal2Visible}
                        onOk={(e) => this.handleOk2(e)}
                        onCancel={() => this.setModal2Visible(false)}
                    >
                        <WrappedMajorForm wrappedComponentRef={(inst) => this.formRef2 = inst}
                                          dispatch={this.props.dispatch} majorName={this.props.majorName}
                                          dept={this.props.name}/>
                        <Table size="small" footer={() => {
                            return (
                                <Row>
                                    <Col span={24} offset={0} style={{textAlign: 'left'}}>
                                        <Button icon="delete" type="primary" onClick={() => this.props.dispatch({
                                            type: 'dept/deleteClass',
                                            payload: {names: selected3}
                                        })}>删除已选班级</Button>
                                        <Button icon='plus' type="primary" style={{marginLeft: 8}} onClick={() => {
                                            this.setModal6Visible(true)
                                        }}>添加新的班级</Button>
                                    </Col>
                                </Row>)
                        }} style={{width: "100%", background: "#ffffff"}} columns={this.columnsClass}
                               dataSource={this.props.classData} rowSelection={rowSelection3} className="table"/>
                    </Modal>
                    <Modal
                        title="查看编辑班级信息"
                        wrapClassName="vertical-center-modal"
                        visible={this.state.modal3Visible}
                        onOk={(e) => this.handleOk3(e)}
                        onCancel={() => this.setModal3Visible(false)}
                    >
                        <WrappedClassForm wrappedComponentRef={(inst) => this.formRef3 = inst}
                                          dispatch={this.props.dispatch} majorName={this.props.majorName}
                                          className={this.props.className} year={this.props.year}/>
                        <Table size="small" footer={() => {
                            return (
                                <Row>
                                    <Col span={24} offset={0} style={{textAlign: 'left'}}>
                                        <Button icon="delete" type="primary" onClick={() => this.props.dispatch({
                                            type: 'dept/deleteStu',
                                            payload: {uids: selected4, majorClass: this.props.className}
                                        })}>删除已选学生</Button>
                                        <Button icon='plus' type="primary" style={{marginLeft: 8}} onClick={() => {
                                            this.setModal7Visible(true)
                                        }}>添加新的学生</Button>
                                        <Button icon='plus' type="primary" style={{marginLeft: 8}} onClick={() => {
                                            this.setModal8Visible(true)
                                        }}>批量录入学生</Button>
                                    </Col>
                                </Row>)
                        }} style={{width: "100%", background: "#ffffff"}} columns={this.columnsStu}
                               dataSource={this.props.stuData} rowSelection={rowSelection4} className="table"/>
                    </Modal>
                    <Modal
                        title="添加院系"
                        wrapClassName="vertical-center-modal"
                        visible={this.state.modal4Visible}
                        onOk={(e) => this.handleOk4(e)}
                        onCancel={() => this.setModal4Visible(false)}
                    >
                        <WrappedAddDeptForm wrappedComponentRef={(inst) => this.formRef4 = inst}
                                            dispatch={this.props.dispatch}/>
                    </Modal>
                    <Modal
                        title="添加专业"
                        wrapClassName="vertical-center-modal"
                        visible={this.state.modal5Visible}
                        onOk={(e) => this.handleOk5(e)}
                        onCancel={() => this.setModal5Visible(false)}
                    >
                        <WrappedAddMajorForm wrappedComponentRef={(inst) => this.formRef5 = inst}
                                             dispatch={this.props.dispatch} dept={this.props.name}/>
                    </Modal>
                    <Modal
                        title="添加班级"
                        wrapClassName="vertical-center-modal"
                        visible={this.state.modal6Visible}
                        onOk={(e) => this.handleOk6(e)}
                        onCancel={() => this.setModal6Visible(false)}
                    >
                        <WrappedAddClassForm wrappedComponentRef={(inst) => this.formRef6 = inst}
                                             dispatch={this.props.dispatch} major={this.props.majorName}/>
                    </Modal>
                    <Modal
                        title="添加学生"
                        wrapClassName="vertical-center-modal"
                        visible={this.state.modal7Visible}
                        onOk={(e) => this.handleOk7(e)}
                        onCancel={() => this.setModal7Visible(false)}
                    >
                        <WrappedAddStuForm wrappedComponentRef={(inst) => this.formRef7 = inst}
                                           dispatch={this.props.dispatch} majorClass={this.props.className}/>
                    </Modal>
                    <Modal
                        title="批量录入学生"
                        wrapClassName="vertical-center-modal"
                        visible={this.state.modal8Visible}
                        onOk={(e) => this.handleOk8(e)}
                        onCancel={() => {
                            this.setModal8Visible(false);
                            this.setState({fname: ''});
                        }}
                    >
                        <p>文件输入格式：（.txt文件）每行一个学生学号</p>
                        <p>例如：</p>
                        <p>3150100000</p>
                        <p>3150100001</p>
                        <p>3150100002</p>
                        <p>3150100003</p>
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
                    <Modal
                        title="院系教师管理"
                        wrapClassName="vertical-center-modal"
                        visible={this.state.modal9Visible}
                        onOk={(e) => this.handleOk9(e)}
                        onCancel={() => this.setModal9Visible(false)}
                    >
                        <WrappedAddTeaForm wrappedComponentRef={(inst) => this.formRef9 = inst}
                                           dispatch={this.props.dispatch} department={this.props.name}/>
                    </Modal>
                </div>
            </div>
        );
    }
}

interface DeptFormProps extends DvaProps {
    form: any;
    name: string;
}

class DeptFormData {
    name: string;
}

export class DeptForm extends Component<DeptFormProps, DeptFormData> {
    handleSubmit = (e: FormEvent<{}>) => {
        let flag = false;
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err: any, values: DeptFormData) => {
            if (err) {
                message.error('信息填写不合法');
                flag = true;
                return;
            }
            this.props.dispatch({type: 'dept/modifyDept', payload: {name: this.props.name, newName: values.name}});
            console.log('Value:', values);
        });
        return flag;
    };

    refresh = () => {
        // this.props.form.setFieldsValue({
        //     name: this.props.name,
        // });
    };
    handleChange = (info) => {
        info.fileList.slice(-1);
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 6},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 14},
            },
        };
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem label="院系名称" {...formItemLayout} hasFeedback>
                    {
                        getFieldDecorator('name', {
                            rules: [],
                            initialValue: this.props.name
                        })(
                            <Input prefix={<Icon type="mail" style={{fontSize: 13}}/>}/>
                        )
                    }
                </FormItem>
            </Form>
        );
    }
}

const WrappedDeptForm: any = Form.create({})(DeptForm);

interface MajorFormProps extends DvaProps {
    form: any;
    majorName: string;
    dept: string;
}

class MajorData {
    majorName: string;
    dept: string;
}

export class MajorForm extends Component<MajorFormProps, MajorData> {
    handleSubmit = (e: FormEvent<{}>) => {
        let flag = false;
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err: any, values: MajorData) => {
            if (err) {
                message.error('信息填写不合法');
                flag = true;
                return;
            }
            this.props.dispatch({
                type: 'dept/modifyMajor',
                payload: {name: this.props.majorName, newName: values.majorName, department: values.dept}
            });
            console.log('Value:', values);
        });
        return flag;
    };

    refresh = () => {
        // this.props.form.setFieldsValue({
        //     name: this.props.majorName,
        // });
    };
    handleChange = (info) => {
        info.fileList.slice(-1);
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 6},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 14},
            },
        };
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem label="专业名称" {...formItemLayout} hasFeedback>
                    {
                        getFieldDecorator('majorName', {
                            rules: [],
                            initialValue: this.props.majorName
                        })(
                            <Input prefix={<Icon type="mail" style={{fontSize: 13}}/>}/>
                        )
                    }
                </FormItem>
                <FormItem label="所属院系" {...formItemLayout} hasFeedback>
                    {
                        getFieldDecorator('dept', {
                            rules: [],
                            initialValue: this.props.dept
                        })(
                            <Select>
                                <Option value="计算机科学与技术学院"> 计算机科学与技术学院</Option>
                                <Option value="数学科学院"> 数学科学院</Option>
                                <Option value="公共管理学院"> 公共管理学院</Option>
                                <Option value="教务处"> 教务处</Option>
                            </Select>
                        )
                    }
                </FormItem>
            </Form>
        );
    }
}

const WrappedMajorForm: any = Form.create({})(MajorForm);

interface ClassFormProps extends DvaProps {
    form: any;
    className: string;
    majorName: string;
    year: string;
}

class ClassData {
    className: string;
    majorName: string;
    year: string;
}

export class ClassForm extends Component<ClassFormProps, ClassData> {
    handleSubmit = (e: FormEvent<{}>) => {
        let flag = false;
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err: any, values: ClassData) => {
            if (err) {
                message.error('信息填写不合法');
                flag = true;
                return;
            }
            this.props.dispatch({
                type: 'dept/modifyClass',
                payload: {
                    name: this.props.className,
                    newName: values.className,
                    major: values.majorName,
                    year: values.year
                }
            });
            console.log('Value:', values);
        });
        return flag;
    };

    refresh = () => {
        // this.props.form.setFieldsValue({
        //     name: this.props.majorName,
        // });
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 6},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 14},
            },
        };
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem label="班级名称" {...formItemLayout} hasFeedback>
                    {
                        getFieldDecorator('className', {
                            rules: [],
                            initialValue: this.props.className
                        })(
                            <Input prefix={<Icon type="name" style={{fontSize: 13}}/>}/>
                        )
                    }
                </FormItem>
                <FormItem label="所属专业" {...formItemLayout} hasFeedback>
                    {
                        getFieldDecorator('majorName', {
                            rules: [],
                            initialValue: this.props.majorName
                        })(
                            <Input prefix={<Icon type="major" style={{fontSize: 13}}/>}/>
                        )
                    }
                </FormItem>
                <FormItem label="年份" {...formItemLayout} hasFeedback>
                    {
                        getFieldDecorator('year', {
                            rules: [],
                            initialValue: this.props.year
                        })(
                            <Input prefix={<Icon type="time" style={{fontSize: 13}}/>}/>
                        )
                    }
                </FormItem>
            </Form>
        );
    }
}

const WrappedClassForm: any = Form.create({})(ClassForm);