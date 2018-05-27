import * as React from 'react';
import {Component} from 'react';
import {Modal, Breadcrumb,  Table, Button, Input, Select, Form} from 'antd';
import 'antd/dist/antd.css';
import {WrappedCourseDetailForm}from './CourseDetailForm';
import {NavigationBar} from './TssPublicComponents'
import DvaProps from '../types/DvaProps';
import {browserHistory, routerRedux} from 'dva/router';
import FreeClassroomFormData from "./ManualSchModify";

const FormItem = Form.Item
const Search = Input.Search
const Option = Select.Option
const { Column } = Table
interface ManSelectionProps extends DvaProps{
    form: any;
    dataSource: any;
}

interface ManSelectionState {

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

export default class ManagerSelectionComponent extends Component<ManSelectionProps, ManSelectionState>{
    constructor(props){
        super(props);
        this.state = {

        }
        this.handleSubmit1 = this.handleSubmit1.bind(this)
    }
    formRef: any;
    ChooseCourse(index, modalVisible) {
        if(this.formRef && modalVisible === true) this.formRef.refresh();
        this.setState({ modalVisible: modalVisible, courseIndex: index });
        console.log(index);
        console.log(data[index].courseTitle);
    }
    handleSubmit1 = (e) => {
        const formProps = this.props.form;
        formProps.validateFieldsAndScroll((err: any, values: FreeClassroomFormData) => {
            if (err) {
                return;
            }
            console.log(values);
            this.props.dispatch({type: 'courseinfo/courseInfo', payload: values});
            data=this.props.dataSource;
            console.log(this.props.dataSource);
            this.setState({refresh:true});
        });
    }
    render(){
       // const {getFieldDecorator} = this.props.form
        const columns = [{
            title: "课程代码",
            dataIndex: "courseNumber",
        },{
            title: "课程名称",
            dataIndex: "courseTitle",
           // render: (text, record, index) => <a onClick={()=>this.ChooseCourse(index, true)}>{text}</a>
        },{
            title: "学分",
            dataIndex: "credit"
        },{
            title: "学期",
            dataIndex: 'semester'
        }];
        return(
            <div>
                <NavigationBar current={"ManSelect"} dispatch={this.props.dispatch}/>
                <br/>
                <div style={{ padding: 24, background: '#fff', minHeight: 780 }}>
                    <Form layout = {"inline"}>
                        <FormItem label = "学生学号">
                            <Input placeholder="请输入学生学号" style={{width: 200}}/>
                        </FormItem>
                    </Form>
                    <br/>
                    <Form layout="inline" >
                        <FormItem>
                            <Search
                                addonBefore={<Select defaultValue="课程名" style={{width: 85}} onChange={(value) =>{this.setState({searchIndex: value})}}>
                                    <Option value="课程名">课程名</Option>
                                    <Option value="教师">教师</Option>
                                </Select>}
                                placeholder="input search text"
                                enterButton
                            />
                        </FormItem>
                    </Form>
                    <Table dataSource={data} rowSelection={rowSelection} columns={columns}>

                    </Table>
                </div>
            </div>

        );
    }
}