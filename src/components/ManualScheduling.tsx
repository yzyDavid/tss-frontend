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
    {title: '课号', dataIndex: 'id', key: 'id'},
    {title: '课程名称', dataIndex: 'courseName', key: 'courseName'},
    {title: '课程号', dataIndex: 'courseId', key: 'courseId'},
    {title: '未安排课时', dataIndex: 'numLessonsLeft', key: 'numLessonsLeft'},
    {title: '上课地点', dataIndex: 'arrangements', key: 'arrangements'},
];

interface ManualSchedulingProps extends DvaProps {
    form: any;
    dataSource: any;
    schedulingTime: any;
}

interface ViewState {
    refresh: boolean;
}

export class CourseFormData {
    courseName: string;
    year: number;
    semester: string;
}

var initData = [{id: '', courseId:'', courseName:'', numLessonsLeft:''},];
var arrangeTime = {year: -1, semester: ''};
var selectedValue;

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
        formProps.validateFieldsAndScroll((err: any, values: {courseName}) => {
            if (err) {
                return;
            }
            //console.log(values);
            this.props.dispatch({type: 'courseinfo/courseInfo', payload: {courseName:values.courseName, year: arrangeTime.year, semester: arrangeTime.semester}});
            this.setState({refresh:true});
        });
    }

    handleSubmit2 = (e) => {
        e.preventDefault();
        this.props.dispatch({type:'courseinfo/modifyCourseInfo',payload:selectedValue.id});
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <div>
                <Form layout={"inline"} style={{textAlign:"center",fontSize:"large", marginTop: '20px'}}>
                    <span><FormItem
                        label="目前排课年份: ">{arrangeTime.year}</FormItem></span>
                    <span><FormItem
                        label="目前排课学期:">{(arrangeTime.semester=='FIRST')?'第一学期':'第二学期'}</FormItem></span>
                </Form>
                <Form layout={"inline"} onSubmit={this.handleSubmit1} style={{textAlign: 'center'}}>
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
                    rowKey = "id"
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
        arrangeTime = {year: -1, semester: ''};
    }

    render() {
        initData=this.props.dataSource;
        arrangeTime=this.props.schedulingTime;
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

