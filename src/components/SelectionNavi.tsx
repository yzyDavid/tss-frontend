import * as React from 'react';
import {Component} from 'react';
import {Layout, Modal, Breadcrumb, Icon, Table, Button, Input, Select, Form} from 'antd';
import 'antd/dist/antd.css';
import {WrappedCourseDetailForm}from './CourseDetailForm';
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
    courseIndex: number;
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
    teacher: 'Mike',
    brief: 'eee',
    credit: 3.0,
    semester: '春夏',
}, {
    key: '2',
    id: 20104,
    name: '软件工程',
    teacher: 'Mary',
    brief: 'ddd',
    credit: 2.0,
    semester: '春',
}, {
    key: '3',
    id: 20106,
    name: '计算机网络',
    teacher: 'Joe',
    brief: 'ccc',
    credit: 3.5,
    semester: '夏',
},{
    key: '4',
    id: 20109,
    name: '人工智能',
    teacher: 'Kathy',
    brief: 'bbb',
    credit: 3.5,
    semester: '夏',
},{
    key: '5',
    id: 20111,
    name: 'B/S体系设计',
    teacher: 'Steve',
    brief: 'aaa',
    credit: 4,
    semester: '春夏',
}

];

export default class SelectionNaviComponent extends Component<UserProps, UserState>{
    constructor(props){
        super(props);
        this.state = {
            modalVisible: false,
            courseIndex: 0,
        }
    }

    formRef: any;
    ChooseCourse(index, modalVisible) {
        if(this.formRef && modalVisible === true) this.formRef.refresh();
        this.setState({ modalVisible: modalVisible, courseIndex: index });
        console.log(index);
        console.log(data[index].name);
    }
    setModalVisible(modalVisible) {
        this.setState({ modalVisible: modalVisible });
    };

    componentDidMount(){

    };

    render(){
        const columns = [{
            title: "课程代码",
            dataIndex: "id",
        },{
            title: "课程名称",
            dataIndex: "name",
            render: (text, record, index) => <a onClick={()=>this.ChooseCourse(index, true)}>{text}</a>
        },{
            title: "学分",
            dataIndex: "credit"
        },{
            title: "学期",
            dataIndex: 'semester'
        }];

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
                            <FormItem>
                                <span>{this.props.tel}</span>
                            </FormItem>
                            <Modal
                                title="查看课程详情"
                                wrapClassName="vertical-center-modal"
                                visible={this.state.modalVisible}
                                onCancel={() => this.setModalVisible(false)}
                                onOk={() => this.setModalVisible(false)}

                            >
                                <WrappedCourseDetailForm  wrappedComponentRef={(inst) => this.formRef = inst} dispatch={this.props.dispatch} name={data[this.state.courseIndex].name} id={data[this.state.courseIndex].id} teacher={data[this.state.courseIndex].teacher} brief={data[this.state.courseIndex].brief}/>
                            </Modal>
                        </Form>
                        <br/>
                        <Table dataSource={data} rowSelection={rowSelection} columns={columns}>

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