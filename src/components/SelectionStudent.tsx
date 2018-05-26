import * as React from 'react';
import {Component} from 'react';
import {Layout, Modal, Breadcrumb,  Table, Button, Input, Select, Form} from 'antd';
import 'antd/dist/antd.css';
import {WrappedCourseDetailForm}from './CourseDetailForm';
import {NavigationBar} from './TssPublicComponents'
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
        console.log()
    },
    getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
    }),

};

var data = [{
    key: '1',
    id: 20102,
    year: '2011',
    semester: 'SECOND',
    capacity: 1,
    numStudent: 2
}

];

export default class StudentSelectionComponent extends Component<UserProps, UserState>{
    constructor(props){
        super(props);
        this.state = {
            modalVisible: false,
            courseIndex: 0,
            searchIndex: "课程名",
            refresh: false,
        }
    }

    formRef: any;
    ChooseCourse(index, modalVisible) {
        if(this.formRef && modalVisible === true) this.formRef.refresh();
        this.setState({ modalVisible: modalVisible, courseIndex: index });
        console.log(index);
        console.log(data[index].id);
    }
    setModalVisible(modalVisible) {
        this.setState({ modalVisible: modalVisible });
    };
    handleSearch = (value, searchIndex)=>{
        console.log({value,searchIndex})
        this.props.dispatch({type: "selectCourse/search", payload: {value,searchIndex}});
        data = this.props.dataSource
        //console.log(this.props.dataSource)
        this.setState({refresh: true})
    }

    componentDidMount(){

    };

    render(){
        const columns = [{
            title: "课程编号",
            dataIndex: "id",
        },{
            title: "学年",
            dataIndex: "year",
            render: (text, record, index) => <a onClick={()=>this.ChooseCourse(index, true)}>{text}</a>
        },{
            title: "学期",
            dataIndex: 'semester'
        },{

        },{
            title: "容量",
            dataIndex: "capacity"
        },{
            title: "已选",
            dataIndex: "numStudent"
        },
        {
            title: "选课",
            render: (text,record,index)=>(<a onClick={()=>{this.props.dispatch({type: "selectCourse/showAll", payload: {courseId: data[index].id}})}}>选课</a>)
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
                                    <Option value="课程号">课程号</Option>
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
                                <WrappedCourseDetailForm  wrappedComponentRef={(inst) => this.formRef = inst} dispatch={this.props.dispatch} id={data[this.state.courseIndex].id} />
                            </Modal>
                        </Form>
                        <br/>
                        <Table dataSource={this.props.dataSource} rowSelection={rowSelection} columns={columns}>

                        </Table>
                    </div>

                </Content>

            </Layout>
        </Layout>
            </Layout>);
    }
}