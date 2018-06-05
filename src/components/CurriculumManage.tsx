import * as React from 'react';
import {Component} from 'react';
import {Form, Button, message, Select, Table, Row, Col} from 'antd';;
import DvaProps from '../types/DvaProps';
import {NavigationBar} from './TssPublicComponents';
import {browserHistory, routerRedux} from 'dva/router';

const FormItem = Form.Item;
const Option = Select.Option;

const columns = [
    {title: '课程号', dataIndex: 'classId',
        filters:[{text: '已安排', value: 'true'}],
        filterMultiple: false,
        onFilter: (value, record) => record.classId != null,
        //onFilter: (value, record) => (record.classId === null),
        key: 'classId',
        render: (text)=>{
            if(text == null)
                text="无";
            return (
                <label>{text}</label>
            );
        }},
    {title: '课程名称', dataIndex: 'courseName', key: 'courseName',render: (text)=>{
            if(text == null)
                text="无";
            return (
                <label>{text}</label>
            );
        }},
    {title: '上课时间', dataIndex: 'typeName', key: 'typeName',
        // render: (text)=>{
        //     var timeB, timeA;
        //     if(!text)
        //         timeA = ' ';
        //     else {
        //         timeB= text.toString();
        //         timeA = timeB.substring(0,3)+ ' ' + timeB.substring(4,5)+ '~' + timeB.substring(timeB.length-1,timeB.length);
        //     }
        //     return (
        //         <label>{timeA}</label>
        //     );
        // }
        },
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
    campusId: any;
    buildingId: any;
    classroomId: any;
}

var initData = [{id: 1, classId: 1, courseName: '', typeName: ''},];

var classroomInitData =[{key: 1, id: -1, name: ''},];
var buildingInitData = [{key: 1, id: -1, name: ''},];
var selectedValue = {campusId: 0,buildingId: 0, classroomId: 0};
var buildingsChildren = [<Option key={-1}>请选择校区</Option>,];
var classroomsChildren = [<Option key={-1}>请选择建筑物</Option>,];

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
            selectedValue.campusId = values;
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
                selectedValue.buildingId = values;
                this.props.dispatch({type: 'curriculummanage/getClassroom', payload: selectedValue});
                if(this.state.item1Reset)
                    this.setState({item1Reset:false});
            }
            else {
                selectedValue = {campusId: 0,buildingId: 0, classroomId: 0};
                this.setState({item2State: false, item3State: false,item1Reset: false, item2Reset: false, });
            }
        }
    }

    handleChange3(values){
        if(this.state.item3State )
        {
            if(values)
            {
                selectedValue.classroomId = values;
                this.setState({item2Reset: false});
            }
            else {
                selectedValue = {campusId: 0,buildingId: 0, classroomId: 0};
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
                    initData = [{id: 1,classId: -1, courseName: '', typeName: ''},];
                    selectedValue = {campusId: 0,buildingId: 0, classroomId: 0};
                    this.setState({item2State: false, item3State: false,item1Reset: false, item2Reset: false, });
                }
            else
            {
                waring2();
                initData = [{id: 1,classId: -1, courseName: '', typeName: ''},];
                selectedValue = {campusId: 0,buildingId: 0, classroomId: 0};
                this.setState({item2State: false, item3State: false,item1Reset: false, item2Reset: false, });
            }
         });
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        classroomInitData = this.props.classroomData;
        buildingInitData = this.props.buildingData;
        initData = this.props.dataSource;

        if(this.state.item1Reset){
            for (let i = buildingsChildren.length ; i >0; i--) {
                buildingsChildren.pop();
            }
            for (let i = 0; i < buildingInitData.length; i++) {
                buildingsChildren.push(<Option key={ buildingInitData[i].id}>{buildingInitData[i].name}</Option>);
            }
        }
        if(this.state.item2Reset ){
            for (let i = classroomsChildren.length ; i >0; i--) {
                classroomsChildren.pop();
            }
            if(classroomInitData[0].id>0)
                for (let i = 0; i < classroomInitData.length; i++) {
                    classroomsChildren.push(<Option key={classroomInitData[i].id}>{classroomInitData[i].name}</Option>);
                }
        }

        return (
            <div>
                <Form layout={"inline"} style={{textAlign: 'center'}}>
                    <FormItem
                        label="校区" >
                        {getFieldDecorator('campusId', {})(
                            <Select  style={{width: 200}} onChange={this.handleChange1} >
                                <Option value= {10000}>紫金港校区</Option>
                                <Option value= {10001} >玉泉校区</Option>
                                <Option value={10002}>西溪校区</Option>
                                <Option value={10003}>华家池校区</Option>
                                <Option value={10004}>之江校区</Option>
                                <Option value={10005}>舟山校区</Option>
                            </Select>
                        )}
                    </FormItem>
                    <FormItem label="教学楼">
                        {getFieldDecorator('buildingId', {})(
                            <Select  disabled={!(this.state.item2State)} style={{width: 200}} onChange={this.handleChange2}>
                                {buildingsChildren}
                            </Select>
                        )}
                    </FormItem>
                    <FormItem label="教室">
                        {getFieldDecorator('classroomId', {})(
                            <Select  disabled={!(this.state.item3State)} style={{width: 200}} onChange={this.handleChange3}>
                                {classroomsChildren}
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
                    rowKey = "id"
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

