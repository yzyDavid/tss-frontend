import * as React from 'react';
import {Component} from 'react';
import {Form, Button, Input, Select, Table} from 'antd';;
import DvaProps from '../types/DvaProps';
import NavigationBar from './TssPublicComponents';
import FreeClassroomFormData from "./ManualSchModify";
import {browserHistory, routerRedux} from 'dva/router';

const FormItem = Form.Item;
const Option = Select.Option;
const columns = [
    {title: '课程号', dataIndex: 'courseNumber', key: 'courseNumber'},
    {title: '课程名称', dataIndex: 'courseTitle', key: 'courseTitle'},
    {title: '上课地点', dataIndex: 'courseAddress', key: 'courseAddress'},
    {title: '上课时间', dataIndex: 'courseTime', key: 'courseTime'}
];

interface ManualSchedulingProps extends DvaProps {
    form: any;
    dataSource: any;
}

interface ViewState {
    reflush: boolean;
}

export class CourseFormData {
    campus: string;
    courseName: string;
}

var initData = [
    {key: 1, courseNumber: '00001', courseTitle: '线性代数', courseAddress: '3150100001', courseTime: '16:30-18:30'},
    {key: 2, courseNumber: '00002', courseTitle: '微积分', courseAddress: '3150100002', courseTime: '16:30-18:30'},
    {key: 3, courseNumber: '00003', courseTitle: '大学英语', courseAddress: '3150100003', courseTime: '16:30-18:30'},
    {key: 4, courseNumber: '00004', courseTitle: '大学物理（甲）', courseAddress: '3150100004', courseTime: '16:30-18:30'},
    {key: 5, courseNumber: '00005', courseTitle: '微积分', courseAddress: '3150100005', courseTime: '16:30-18:30'},
    {key: 6, courseNumber: '00006', courseTitle: '大学物理（甲）', courseAddress: '3150100006', courseTime: '16:30-18:30'},
    {key: 7, courseNumber: '00007', courseTitle: '大学英语', courseAddress: '3150100007', courseTime: '16:30-18:30'},
    {key: 8, courseNumber: '00008', courseTitle: '线性代数', courseAddress: '3150100008', courseTime: '16:30-18:30'},
    {key: 9, courseNumber: '00009', courseTitle: '大学物理（甲）', courseAddress: '3150100009', courseTime: '16:30-18:30'},
    {key: 10, courseNumber: '00010', courseTitle: '微积分', courseAddress: '3150100010', courseTime: '16:30-18:30'},
    {key: 11, courseNumber: '00011', courseTitle: '大学英语', courseAddress: '3150100011', courseTime: '16:30-18:30'},
    {key: 12, courseNumber: '00012', courseTitle: '线性代数', courseAddress: '3150100012', courseTime: '16:30-18:30'},
];
var selectedValue;

class SearchForm extends Component<ManualSchedulingProps,ViewState> {
    constructor(props){
        super(props);
        this.state = {
            reflush : false,
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
            console.log(values);
            this.props.dispatch({type: 'courseinfo/courseInfo', payload: values});
            initData=this.props.dataSource;
            console.log(this.props.dataSource);
            this.setState({reflush:true});
        });
    }

    handleSubmit2 = (e) => {
        e.preventDefault();
        this.props.dispatch({type:'courseinfo/modifyCourseInfo',payload:selectedValue});
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <div>
                <Form layout={"inline"} onSubmit={this.handleSubmit1}>
                    <FormItem
                        label="校区" >
                        {getFieldDecorator('campus', {})(
                            <Select style={{width: 200}}>
                                <Option value="玉泉校区">玉泉校区</Option>
                                <Option value="紫金港校区">紫金港校区</Option>
                                <Option value="西溪校区">西溪校区</Option>
                                <Option value="华家池校区">华家池校区</Option>
                                <Option value="之江校区">之江校区</Option>
                                <Option value="舟山校区">舟山校区</Option>
                            </Select>
                        )}
                    </FormItem>
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
                        style={{marginLeft:100}}
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

