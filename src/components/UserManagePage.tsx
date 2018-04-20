import * as React from 'react';
import {Component} from 'react';
import {Form, Button, Modal, Input, Icon, Select, Table, Divider} from 'antd';
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
    {title: '姓名', dataIndex: 'name', key: 'name'},
    {title: '年级', dataIndex: 'age', key: 'age'},
    {title: '学号', dataIndex: 'address', key: 'address'},
    {title: '操作', dataIndex: 'x', key: 'x', render: () => <a >编辑</a>},
];

const data = [
    {key: 1, name: '胡彦斌', age: '大一', address: '3150100001', x: ''},
    {key: 2, name: '吴彦祖', age: '大一', address: '3150100002', x: ''},
    {key: 3, name: '李大嘴', age: '大一', address: '3150100003', x: ''},
    {key: 4, name: '小明', age: '大一', address: '3150100004', x: ''},
    {key: 5, name: '小李', age: '大一', address: '3150100005', x: ''},
    {key: 6, name: '小红', age: '大一', address: '3150100006', x: ''},
    {key: 7, name: '小王', age: '大一', address: '3150100007', x: ''},
    {key: 8, name: '小张', age: '大一', address: '3150100008', x: ''},
    {key: 9, name: '小天', age: '大一', address: '3150100009', x: ''},
    {key: 9, name: '小小明', age: '大一', address: '3150100010', x: ''},
    {key: 9, name: '小天', age: '大一', address: '3150100011', x: ''},
    {key: 9, name: '小天', age: '大一', address: '3150100012', x: ''},

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
                    <FormItem label="年级" labelCol={{span: 8, offset: 4}} wrapperCol={{span: 8}}>
                        {
                            getFieldDecorator('grade', {})(
                                <Select style={{width: 200}}>
                                    <Option value="大一">大一</Option>
                                    <Option value="大二">大二</Option>
                                    <Option value="大三">大三</Option>
                                    <Option value="大四">大四</Option>
                                </Select>
                            )
                        }
                    </FormItem>
                    <FormItem labelCol={{span: 8, offset: 24}} wrapperCol={{span: 8, offset: 12}}>
                        <Button style={{width: "250px"}} icon="search" type="primary" htmlType="submit">搜索</Button>
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

export default class UserManagePageComponent extends Component<UserManageProps, UserState> {
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
                <NavigationBar current={"userManage"} dispatch={this.props.dispatch}/>
                <br/>
                <div>
                    <WrappedSearchForm/>
                </div>
            </div>

        );
    }
}

