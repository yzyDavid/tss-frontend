import * as React from 'react';
import {Component} from 'react';
import {Form, Button, Modal, Select, Table} from 'antd';;
import DvaProps from '../types/DvaProps';
import NavigationBar from './TssPublicComponents';
import {browserHistory, routerRedux} from 'dva/router';

const FormItem = Form.Item;
const Option = Select.Option;

const columns = [
    {title: '课程号', dataIndex: 'courseNumber', key: 'courseNumber'},
    {title: '课程名称', dataIndex: 'courseName', key: 'courseName'},
    {title: '学期', dataIndex: 'semester', key: 'semester'},
    {title: '上课时间', dataIndex: 'courseTime', key: 'courseTime'},
];

interface ManualSchedulingProps extends DvaProps {
    form: any;
    dataSource: any;
    buildingData: any;
    classroomData: any;
}

interface ViewState {
    item1State: boolean;
    item2State: boolean;
    item3State: boolean;
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
            item1State: true,
            item2State: false,
            item3State: false,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubmit2 = this.handleSubmit2.bind(this);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const formProps = this.props.form;
        formProps.validateFieldsAndScroll((err: any, values: ClassroomFormData) => {
            if (err) {
                return;
            }
            //console.log('this is the value we selected');
            //console.log(values);
            if(this.state.item1State && (!this.state.item2State))
            {
                if(values.campus)
                {
                    this.setState({item2State:true,});
                    selectedValue.campus = values.campus;
                    this.props.dispatch({type: 'curriculummanage/getBuilding', payload: values});
                }
            }
            else if(this.state.item1State && this.state.item2State && (!this.state.item3State))
            {
                if(values.building)
                {
                    this.setState({item3State:true,});
                    selectedValue.building = values.building;
                    this.props.dispatch({type: 'curriculummanage/getClassroom', payload: values});
                }
            }
            else if(this.state.item1State && this.state.item2State && this.state.item3State)
            {
                if(values.classroom)
                {
                    this.setState({item3State:true,});
                    selectedValue.classroom = values.classroom;
                    this.props.dispatch({type: 'curriculummanage/curriculumManage', payload: values});
                    initData=this.props.dataSource;
                }
            }
        });
    }

    handleSubmit2 = (e) => {
        e.preventDefault();
        const formProps = this.props.form;
        formProps.validateFieldsAndScroll((err: any, values: ClassroomFormData) => {
            if (err) {
                return;
            }
            console.log('this is the handleSubmit2');
            selectedValue = {campus: '',building: '', classroom: ''};
            this.setState({item1State: true, item2State: false, item3State: false,});
        });
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        if(this.state.item1State && (!this.state.item2State))
            return (
                <div>
                    <Form layout={"inline"} onSubmit={this.handleSubmit}>
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
                        <Button
                            icon="edit"
                            type="primary"
                            htmlType="submit"
                            onClick={this.handleSubmit}>选择
                        </Button>
                    </Form>
                    <Table
                        style={{width: "100%", background: "#ffffff"}}
                        columns={columns}
                        className = "table"
                        dataSource={[{key: 1, courseNumber: '', courseName: '', semester: '',  courseTime: ''},]}/>
                </div>
            );
        else if(this.state.item1State && this.state.item2State && (!this.state.item3State))
            return (
                <div>
                    <Form layout={"inline"} onSubmit={this.handleSubmit}>
                        <FormItem
                            label="校区" >
                            {getFieldDecorator('campus', {})(
                                <Select style={{width: 200}}>
                                    <Option value={selectedValue.campus}>{selectedValue.campus}</Option>
                                </Select>
                            )}
                        </FormItem>
                        <FormItem label="教学楼">
                            {getFieldDecorator('building', {})(
                                <Select
                                    style={{width: 200}}>
                                    <Option value={this.props.buildingData[0]}>{this.props.buildingData[0]}</Option>
                                    <Option value={this.props.buildingData[1]}>{this.props.buildingData[1]}</Option>
                                </Select>
                            )}
                        </FormItem>
                        <Button
                            icon="edit"
                            type="primary"
                            htmlType="submit"
                            onClick={this.handleSubmit}>选择
                        </Button>
                        <Button
                            style={{marginLeft:20}}
                            type="primary"
                            htmlType="submit"
                            onClick={this.handleSubmit2}>重置
                        </Button>
                    </Form>
                    <Table
                        style={{width: "100%", background: "#ffffff"}}
                        columns={columns}
                        className = "table"
                        dataSource={[{key: 1, courseNumber: '', courseName: '', semester: '',  courseTime: ''},]}/>
                </div>
            );
        else if(this.state.item1State && this.state.item2State && this.state.item3State)
            return (
                <div>
                    <Form layout={"inline"} onSubmit={this.handleSubmit}>
                        <FormItem
                            label="校区" >
                            {getFieldDecorator('campus', {})(
                                <Select style={{width: 200}}>
                                    <Option value={selectedValue.campus}>{selectedValue.campus}</Option>
                                </Select>
                            )}
                        </FormItem>
                        <FormItem label="教学楼">
                            {getFieldDecorator('building', {})(
                                <Select
                                    style={{width: 200}}>
                                    <Option value={selectedValue.building}>{selectedValue.building}</Option>
                                </Select>
                            )}
                        </FormItem>
                        <FormItem label="教室">
                            {getFieldDecorator('classroom', {})(
                                <Select style={{width: 200}}>
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
                        <Button
                            style={{marginLeft:20}}
                            type="primary"
                            htmlType="submit"
                            onClick={this.handleSubmit2}>重置
                        </Button>
                    </Form>
                    <Table
                        style={{width: "100%", background: "#ffffff"}}
                        columns={columns}
                        className = "table"
                        dataSource={initData}/>
                    <br/>
                </div>
            );
        else
            return (
                <div/>
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
            </div>

        );
    }
}

