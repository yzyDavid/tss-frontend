import * as React from 'react';
import {Component} from 'react';
import {Layout, Modal, Breadcrumb,  Table, Button, Input, Select, Form} from 'antd';
import 'antd/dist/antd.css';
import {WrappedCourseDetailForm}from './CourseDetailForm';
import NavigationBar from './TssPublicComponents'
import DvaProps from '../types/DvaProps';
import {type} from "os";


const { Header, Content, Footer, Sider } = Layout;
const { Column } = Table;
const Option = Select.Option;
const FormItem = Form.Item;
const Search = Input.Search;

interface UserProps extends DvaProps {
    form: any;
    dataSource: any
}

interface UserState {
    modalVisible: boolean;
    courseIndex: number;
    searchIndex: any;
    refresh: boolean
}

const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
    }),

};

var data = [{
    key: '1',
    courseNumber: 20102,
    courseTitle: '数据结构基础',
    teacher: 'Mike',
    brief: '重点介绍算法设计、算法描述和相应C程序编码，并给出相应的数据结构应用实例',
    credit: 3.0,
    semester: '春夏',
}, {
    key: '2',
    courseNumber: 20104,
    courseTitle: '软件工程',
    teacher: 'Mary',
    brief: 'ddd',
    credit: 2.0,
    semester: '春',
}, {
    key: '3',
    courseNumber: 20106,
    courseTitle: '计算机网络',
    teacher: 'Joe',
    brief: 'ccc',
    credit: 3.5,
    semester: '夏',
},{
    key: '4',
    courseNumber: 20109,
    courseTitle: '人工智能',
    teacher: 'Kathy',
    brief: 'bbb',
    credit: 3.5,
    semester: '夏',
},{
    key: '5',
    courseNumber: 20111,
    courseTitle: 'B/S体系设计',
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
            searchIndex: "",
            refresh: false
        }
    }

    formRef: any;
    ChooseCourse(index, modalVisible) {
        if(this.formRef && modalVisible === true) this.formRef.refresh();
        this.setState({ modalVisible: modalVisible, courseIndex: index });
        console.log(index);
        console.log(data[index].courseTitle);
    }
    setModalVisible(modalVisible) {
        this.setState({ modalVisible: modalVisible });
    };
    handleSearch = (value, searchIndex)=>{
        console.log({value,searchIndex})
        this.props.dispatch({type: "courseinfo/courseInfo", payload: {value,searchIndex}});
        data = this.props.dataSource
        console.log(this.props.dataSource)
        this.setState({refresh: true})
    }

    componentDidMount(){

    };

    render(){
        const columns = [{
            title: "课程代码",
            dataIndex: "courseNumber",
        },{
            title: "课程名称",
            dataIndex: "courseTitle",
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
                    <NavigationBar current={"selection"} dispatch={this.props.dispatch}/>
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
                                <Search
                                    addonBefore={<Select defaultValue="课程名" style={{width: 85}} onChange={(value) =>{this.setState({searchIndex: value})}}>
                                    <Option value="课程名">课程名</Option>
                                    <Option value="教师">教师</Option>
                                     </Select>}
                                    placeholder="input search text"
                                    onSearch={(value)=>this.handleSearch(value,this.state.searchIndex)}
                                    enterButton
                                />
                            </FormItem>
                            <Modal
                                title="查看课程详情"
                                wrapClassName="vertical-center-modal"
                                visible={this.state.modalVisible}
                                onCancel={() => this.setModalVisible(false)}
                                onOk={() => this.setModalVisible(false)}

                            >
                                <WrappedCourseDetailForm  wrappedComponentRef={(inst) => this.formRef = inst} dispatch={this.props.dispatch} name={data[this.state.courseIndex].courseTitle} id={data[this.state.courseIndex].courseNumber} teacher={data[this.state.courseIndex].teacher} brief={data[this.state.courseIndex].brief}/>
                            </Modal>
                        </Form>
                        <br/>
                        <Table dataSource={data} rowSelection={rowSelection} columns={columns}>

                        </Table>
                    </div>

                </Content>

            </Layout>
        </Layout>
            </Layout>);
    }
}