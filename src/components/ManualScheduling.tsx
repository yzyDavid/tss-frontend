import * as React from 'react';
import {Component} from 'react';
import {Form, Button, Input, Select, Table} from 'antd';;
import DvaProps from '../types/DvaProps';
import {NavigationBar} from './TssPublicComponents';
import FreeClassroomFormData from "./ManualSchModify";
import {browserHistory, routerRedux} from 'dva/router';

const FormItem = Form.Item;
const Option = Select.Option;
const columns = [
    {title: '课号', dataIndex: 'classId', key: 'classId'},
    {title: '课程名称', dataIndex: 'courseName', key: 'courseName'},
    {title: '课程号', dataIndex: 'courseId', key: 'courseId'},
    {title: '未安排课时', dataIndex: 'numLessonsLeft', key: 'numLessonsLeft'},
    {title: '上课地点', dataIndex: 'courseAddress', key: 'courseAddress'},
    {title: '上课时间', dataIndex: 'courseTime', key: 'courseTime'}
];

interface ManualSchedulingProps extends DvaProps {
    form: any;
    dataSource: any;
}

interface ViewState {
    refresh: boolean;
}

export class CourseFormData {
    campus: string;
    courseName: string;
}

export class CourseInfo {
    classId : any;
    courseName: string;
    courseId: any;
    numLessonsLeft: any;
    courseAddress:  string;
    courseTime: any
}

var initData = [
    {key: 1, classId :'10001',courseName:" Data Struct", courseId:'20011',  numLessonsLeft:'3',  courseAddress:'东教学楼01',  courseTime:'mon_1_2'},
    {key: 2, classId :'12001',courseName: "Data Struct2", courseId:'22011',  numLessonsLeft:'4',  courseAddress:'东教学楼02',  courseTime:'mon_2_2'},
];
var selectedValue;
var dt = new Date();

class SearchForm extends Component<ManualSchedulingProps,ViewState> {
    constructor(props){
        super(props);
        this.state = {
            refresh : false,
        }
        this.handleSubmit1 = this.handleSubmit1.bind(this);
        this.handleSubmit2 = this.handleSubmit2.bind(this);
    }

    handleSubmit1 = (e) => {
        e.preventDefault();
        const formProps = this.props.form;
        formProps.validateFieldsAndScroll((err: any, values: FreeClassroomFormData) => {
            if (err) {
                return;
            }
            //console.log(values);
            this.props.dispatch({type: 'courseinfo/courseInfo', payload: values});
            this.setState({refresh:true});
        });
    }

    handleSubmit2 = (e) => {
        e.preventDefault();
        this.props.dispatch({type:'courseinfo/modifyCourseInfo',payload:selectedValue});
    }

    render() {
        const {getFieldDecorator} = this.props.form
        console.log(dt);
        return (
            <div>
                <Form layout={"inline"} onSubmit={this.handleSubmit1} style={{textAlign: 'center'}}>
                    <FormItem
                        label="年份: " >{dt.getFullYear()}
                        {/*{getFieldDecorator('year', {})(*/}
                            {/*<Select style={{width: 200}}>*/}
                                {/*<Option value="2017">2017</Option>*/}
                                {/*<Option value="2018">2018</Option>*/}
                            {/*</Select>*/}
                        {/*)}*/}
                    </FormItem>
                    <FormItem
                        label="学期" >第一学期
                        {/*{getFieldDecorator('semester', {})(*/}
                            {/*<Select style={{width: 200}}>*/}
                                {/*<Option value="春夏">春夏</Option>*/}
                                {/*<Option value="秋冬">秋冬</Option>*/}
                            {/*</Select>*/}
                        {/*)}*/}
                    </FormItem>
                    <br/>
                    <FormItem label="课程名称">
                        {
                            getFieldDecorator('courseName', { })(
                                <Input placeholder="请输入课程名称" style={{width: 200}}/>)
                        }
                    </FormItem>
                    <Button
                        icon="search"
                        type="primary"
                        htmlType="submit"
                        onClick={this.handleSubmit1}>搜索
                    </Button>
                    <Button
                        style={{marginLeft:10}}
                        icon="edit"
                        type="primary"
                        htmlType="submit"
                        onClick={this.handleSubmit2}>选择
                    </Button>
                </Form>
                <Table
                    style={{width: "100%", background: "#ffffff"}}
                    columns={columns}
                    rowSelection={{
                        type: 'radio',
                        onSelect(record, selected, selectedRows) {
                            //console.log(record, selected, selectedRows);
                            selectedValue = record;
                        },}}
                    className = "table"
                    dataSource={initData}/>
                <br/>
            </div>
        );
    }
}

const WrappedSearchForm: any = Form.create({})(SearchForm);

export default class ManualSchedulingComponent extends Component<ManualSchedulingProps> {
    constructor(props) {
        super(props);
    }

    render() {
        initData=this.props.dataSource;
        return (
            <div>
                <NavigationBar current={"course"} dispatch={this.props.dispatch}/>
                <br/>
                <div>
                    <WrappedSearchForm dispatch={this.props.dispatch} dataSource={this.props.dataSource}/>
                </div>

            </div>

        );
    }
}

