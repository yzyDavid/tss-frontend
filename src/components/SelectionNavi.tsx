import * as React from 'react';
import {Component} from 'react';
import {Layout, Menu, Breadcrumb, Icon, Table, Button, Input, Select, Form} from 'antd';
import 'antd/dist/antd.css';

import NavigationBar from './TssPublicComponents'
import DvaProps from '../types/DvaProps';

const { Header, Content, Footer, Sider } = Layout;
const { Column } = Table;
const Option = Select.Option;
const FormItem = Form.Item;

interface UserProps extends DvaProps {
    uid: string;
    email: string;
    tel: string;
    intro: string;
}

interface UserState {
    modalVisible: boolean;
}

const search = (
    <Select defaultValue="课程名" style={{width: 90}}>
        <Option value="课程名">课程名</Option>
        <Option value="教师">教师</Option>
    </Select>
)

const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
    }),
};

const data = [{
    key: '1',
    id: 20102,
    name: '数据结构基础',
    credit: 3.0,
    semester: '春夏',
}, {
    key: '2',
    id: 20104,
    name: '软件工程',
    credit: 2.0,
    semester: '春',
}, {
    key: '3',
    id: 20106,
    name: '计算机网络',
    credit: 3.5,
    semester: '夏',
},{
    key: '4',
    id: 20109,
    name: '人工智能',
    credit: 3.5,
    semester: '夏',
},{
    key: '5',
    id: 20111,
    name: 'B/S体系设计',
    credit: 4,
    semester: '春夏',
}
];

export default class SelectionNaviComponent extends Component<UserProps, UserState>{
    constructor(props){
        super(props);

    }
    componentDidMount(){

    };
    render(){
        return(
            <Layout>
                <div>
                <Content>
                    <NavigationBar current={"course"} dispatch={this.props.dispatch}/>
                </Content>
                </div>
            <Layout>
            <Layout>

                <Content style={{ margin: '0 16px' }}>
                    <Breadcrumb style={{ margin: '12px 0' }}>
                        <Breadcrumb.Item>选课系统</Breadcrumb.Item>
                    </Breadcrumb>
                    <div style={{ padding: 24, background: '#fff', minHeight: 780 }}>
                        <Form layout="inline" >
                            <FormItem>
                            <Input addonBefore={search} defaultValue="数据结构基础" />
                            </FormItem>
                            <FormItem>
                            <Button type="primary" icon="search">搜索</Button>
                            </FormItem>
                        </Form>
                        <br/>
                        <Table dataSource={data} rowSelection={rowSelection}>
                            <Column
                                title="课程代码"
                                dataIndex="id"
                                key="id"
                            />
                            <Column
                                title="课程名称"
                                dataIndex="name"
                                key="name"
                            />
                            <Column
                                title="学分"
                                dataIndex="credit"
                                key="credit"
                            />
                            <Column
                                title="学期"
                                dataIndex='semester'
                                key='semester'/>
                        </Table>)
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    浙江大学本科生院 ©2018 Created by Group A
                </Footer>
            </Layout>
        </Layout>
            </Layout>);
    }
}