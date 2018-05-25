import * as React from 'react';
import {Component} from 'react';
import {Form, Button, message, Select, Table} from 'antd';;
import DvaProps from '../types/DvaProps';
import {NavigationBar} from './TssPublicComponents';
import {browserHistory, routerRedux} from 'dva/router';

const FormItem = Form.Item;
const Option = Select.Option;

const columns = [
    {title: '课程号', dataIndex: 'courseNumber', key: 'courseNumber'},
    {title: '课程名称', dataIndex: 'courseName', key: 'courseName'},
    {title: '学期', dataIndex: 'semester', key: 'semester'},
    {title: '上课时间', dataIndex: 'courseTime', key: 'courseTime'},
];
const waring1  = function() { message.error('不存在该教室，请重新选择');};
const waring2  = function() { message.error('未选择需要查看的教室');};

interface ManualSchedulingProps extends DvaProps {
    form: any;
    dataSource: any;
    buildingData: any;
    classroomData: any;
}

interface ViewState {
    item2State: boolean;
    item3State: boolean;
    item1Reset: boolean;
    item2Reset: boolean;
}

export class CurriculumData {
    courseNumber: string;
    courseName: string;
    semester: string;
    campus: string;
    courseTime: string;
    courseAddress: string;
}

export class ClassroomFormData {
    campus: any;
    building: any;
    classroom: any;
}

var initData = [{key: 1, courseNumber: '', courseName: '', semester: '',  courseTime: ''},];

var selectedValue = {campus: '',building: '', classroom: ''};

class SearchForm extends Component<ManualSchedulingProps,ViewState> {
    constructor(props){
        super(props);
        this.state = {
            item2State: false,
            item3State: false,
            item1Reset: false,
            item2Reset: false,
        }
        this.handleChange1 = this.handleChange1.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
        this.handleChange3 = this.handleChange3.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange1(values){
        if(values)
        {
            this.setState({item2State:true});
            selectedValue.campus = values;
            this.props.dispatch({type: 'curriculummanage/getBuilding', payload: selectedValue});
            if(!this.state.item1Reset)
                this.setState({item1Reset:true});
        }
    }

    handleChange2(values){
        if(this.state.item2State )
        {
            if(values)
            {
                this.setState({item3State:true,item2Reset:true});
                selectedValue.building = values;
                this.props.dispatch({type: 'curriculummanage/getClassroom', payload: selectedValue});
                if(this.state.item1Reset)
                    this.setState({item1Reset:false});
            }
            else {
                selectedValue = {campus: '',building: '', classroom: ''};
                this.setState({item2State: false, item3State: false,item1Reset: false, item2Reset: false, });
            }
        }
    }

    handleChange3(values){
        if(this.state.item3State )
        {
            if(values)
            {
                selectedValue.classroom = values;
                this.setState({item2Reset: false});
            }
            else {
                selectedValue = {campus: '',building: '', classroom: ''};
                this.setState({item2State: false, item3State: false,item1Reset: false, item2Reset: false, });
            }
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const formProps = this.props.form;
        formProps.validateFieldsAndScroll((err: any, values: ClassroomFormData) => {
            if (err) {
                return;
            }
            if(this.state.item2State&&this.state.item3State)
                if((!this.state.item1Reset)&&(!this.state.item2Reset))
                {
                    this.props.dispatch({type: 'curriculummanage/curriculumManage', payload: values});
                    initData=this.props.dataSource;
                }
                else
                {
                    waring1();
                    initData = [{key: 1, courseNumber: '', courseName: '', semester: '',  courseTime: ''},];
                    selectedValue = {campus: '',building: '', classroom: ''};
                    this.setState({item2State: false, item3State: false,item1Reset: false, item2Reset: false, });
                }
            else
            {
                waring2();
                initData = [{key: 1, courseNumber: '', courseName: '', semester: '',  courseTime: ''},];
                selectedValue = {campus: '',building: '', classroom: ''};
                this.setState({item2State: false, item3State: false,item1Reset: false, item2Reset: false, });
            }
         });
    }

    render() {
        const {getFieldDecorator} = this.props.form;

        return (
            <div>
                <Form layout={"inline"} style={{textAlign: 'center'}}>
                    <FormItem
                        label="校区" >
                        {getFieldDecorator('campus', {})(
                            <Select  style={{width: 200}} onChange={this.handleChange1}>
                                <Option value="玉泉校区">玉泉校区</Option>
                                <Option value="紫金港校区">紫金港校区</Option>
                                <Option value="西溪校区">西溪校区</Option>
                                <Option value="华家池校区">华家池校区</Option>
                                <Option value="之江校区">之江校区</Option>
                                <Option value="舟山校区">舟山校区</Option>
                            </Select>
                        )}
                    </FormItem>
                    <FormItem label="教学楼">
                        {getFieldDecorator('building', {})(
                            <Select  disabled={!(this.state.item2State)} style={{width: 200}} onChange={this.handleChange2}>
                                <Option value={this.props.buildingData[0]}>{this.props.buildingData[0]}</Option>
                                <Option value={this.props.buildingData[1]}>{this.props.buildingData[1]}</Option>
                                <Option value=''></Option>
                            </Select>
                        )}
                    </FormItem>
                    <FormItem label="教室">
                        {getFieldDecorator('classroom', {})(
                            <Select  disabled={!(this.state.item3State)} style={{width: 200}} onChange={this.handleChange3}>
                                <Option value={this.props.classroomData[0]}>{this.props.classroomData[0]}</Option>
                                <Option value={this.props.classroomData[1]}>{this.props.classroomData[1]}</Option>
                            </Select>
                        )}
                    </FormItem>
                    <Button
                        icon="edit"
                        type="primary"
                        htmlType="submit"
                        onClick={this.handleSubmit}>选择
                    </Button>
                    {/*<Button*/}
                        {/*style={{marginLeft:20}}*/}
                        {/*type="primary"*/}
                        {/*htmlType="submit"*/}
                        {/*onClick={this.handleSubmit}>重置*/}
                    {/*</Button>*/}
                </Form>
                <Table
                    style={{width: "100%", background: "#ffffff"}}
                    columns={columns}
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
                <NavigationBar current={"list"} dispatch={this.props.dispatch}/>
                <br/>
                <div>
                    <WrappedSearchForm dispatch={this.props.dispatch} dataSource={this.props.dataSource} buildingData={this.props.buildingData} classroomData={this.props.classroomData}/>
                </div>
                <Form layout={"inline"} style={{textAlign: 'center'}}>
                    <FormItem>
                        <Button  type="primary" style={{fontSize: 'large'}}>打印</Button></FormItem>
                </Form>
            </div>

        );
    }
}

