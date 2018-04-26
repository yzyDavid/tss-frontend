import * as React from 'react';
import {Component} from 'react';
import {Form, Button, Modal, Input, Icon, Select, Table, Divider,Upload} from 'antd';
import DvaProps from '../types/DvaProps';
import {WrappedInfoEditForm} from './InfoEditForm';
import NavigationBar from './TssPublicComponents';

interface UserManageProps extends DvaProps {
    form: any;
}

interface UserState {
    modalVisible: boolean;
}

const columns = [
    {title: '校区', dataIndex: 'campus', key: 'campus'},
    {title: '教学楼', dataIndex: 'building', key: 'building'},
    {title: '教室', dataIndex: 'room', key: 'room'},
    {title: '容量', dataIndex: 'capacity', key: 'capacity'},
    {title: '设备', dataIndex: 'device', key: 'device'},
    {title: '操作', dataIndex: 'x', key: 'x', render: () => <a >编辑</a>},
];

const data = [
    {key: 1, campus: '紫金港', building:'东2',room:'302',capacity: '50', device: '桌椅', x: ''},
    {key: 2, campus: '紫金港', building:'东1',room:'404',capacity: '40', device: '桌椅', x: ''},
    {key: 3, campus: '紫金港', building:'西1',room:'505',capacity: '120', device: '电脑', x: ''},
    {key: 4, campus: '玉泉', building:'教4',room:'233',capacity: '40', device: '电脑', x: ''},
    {key: 5, campus: '玉泉', building:'曹光彪西1',room:'111',capacity: '40', device: '桌椅', x: ''},
    {key: 6, campus: '西溪', building:'楼1',room:'777',capacity: '120', device: '桌椅', x: ''},
    {key: 7, campus: '西溪', building:'楼2',room:'666',capacity: '120', device: '桌椅', x: ''},
    {key: 8, campus: '华家池', building:'楼1',room:'110',capacity: '120', device: '桌椅', x: ''},
    {key: 9, campus: '舟山', building:'楼2',room:'119',capacity: '233', device: '桌椅', x: ''},
    {key: 9, campus: '海宁', building:'楼3',room:'120',capacity: '233', device: '桌椅', x: ''},
    {key: 9, campus: '之江', building:'楼4',room:'911',capacity: '40', device: '电脑', x: ''},
    {key: 9, campus: '舟山', building:'楼5',room:'999',capacity: '40', device: '电脑', x: ''},

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

class SearchForm extends Component<UserManageProps, {}> {
    handleSearch = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log('Received values of form: ', values);
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
                            getFieldDecorator('grade', {})(
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
                        <Button style={{width: "250px"}} icon="search" type="primary" htmlType="submit">搜索</Button>
                    </FormItem>
                    <FormItem labelCol={{span: 8, offset: 24}} wrapperCol={{span: 8, offset: 12}}>
                        <Upload>
                            <Button style={{width: "250px"}}  type="primary" htmlType="submit">批量录入</Button>
                        </Upload>
                    </FormItem>
                    {/*<FormItem wrapperCol={{span: 12, offset: 11}}>*/}
                    {/*<Button icon="edit" type="primary" >编辑</Button>*/}
                    {/*<Modal*/}
                    {/*title="修改个人信息"*/}
                    {/*wrapClassName="vertical-center-modal"*/}
                    {/*visible={this.state.modalVisible}*/}
                    {/*onOk={(e) => this.handleOk(e)}*/}
                    {/*onCancel={() => this.setModalVisible(false)}*/}
                    {/*>*/}
                    {/*<WrappedInfoEditForm wrappedComponentRef={(inst) => this.formRef = inst}*/}
                    {/*dispatch={this.props.dispatch} uid={this.props.uid}*/}
                    {/*email={this.props.email} tel={this.props.tel}*/}
                    {/*intro={this.props.intro}/>*/}
                    {/*</Modal>*/}
                    {/*</FormItem>*/}
                </Form>
                <Table style={{width: "100%", background: "#ffffff"}} columns={columns} dataSource={data} rowSelection={rowSelection} className="table"/>
            </div>
        );
    }
}

const WrappedSearchForm: any = Form.create({})(SearchForm);

export default class ClassroomManagePage extends Component<UserManageProps, UserState> {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false
        };
    }

    formRef: any;

    setModalVisible(modalVisible) {
        if (this.formRef && modalVisible === true) this.formRef.refresh();
        this.setState({modalVisible: modalVisible});
    };

    handleOk(e) {
        // if(!this.formRef.handleSubmit(e)) this.setModalVisible(false);
    }

    render() {
        return (
            <div>
                <NavigationBar current={"course"} dispatch={this.props.dispatch}/>
                <br/>
                <div>
                    <WrappedSearchForm/>
                </div>
            </div>

        );
    }
}

