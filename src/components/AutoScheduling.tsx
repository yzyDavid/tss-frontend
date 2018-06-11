import * as React from 'react';
import {Component, FormEvent} from 'react';
import {Redirect} from 'react-router';
import {Icon, Form, Input, Button, Table} from 'antd';
import DvaProps from '../types/DvaProps';
import {ClassroomFormData} from "./CurriculumManage";
import {NavigationBar} from './TssPublicComponents';


const FormItem = Form.Item;
const {TextArea} = Input;

const columns = [
    {title: '课程号', dataIndex: 'classId', key: 'classId'},
];

interface AutoSchProps extends DvaProps {
    dataSource: any;
    numArrangedClasses: any;
    schedulingTime: any;
}

var initNum = "正在排课......";
var initData = [{classId: -1},];
var arrangeTime = {year: -1, semester: ''};

export default class AutoSchedulingComponent extends Component<AutoSchProps, {}> {
    constructor(props) {
        super(props);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.dispatch({type: 'autoscheduling/restCourseInfo', payload: arrangeTime});
        initData=this.props.dataSource;
        initNum=this.props.numArrangedClasses;

    }

    render() {
        initData=this.props.dataSource;
        initNum=this.props.numArrangedClasses;
        arrangeTime=this.props.schedulingTime;
        return (
            <div>
                <NavigationBar current={"list"} dispatch={this.props.dispatch}/>
                <Form layout={"inline"} style={{textAlign:"center",fontSize:"large", marginTop: '20px'}}>
                    <span><FormItem
                        label="目前排课年份: ">{arrangeTime.year}</FormItem></span>
                    <span><FormItem
                        label="目前排课学期:">{(arrangeTime.semester=='FIRST')?'第一学期':'第二学期'}</FormItem></span>
                </Form>
                <Form layout={"inline"} style={{textAlign:"center",background: "#ffffff",fontSize:"large"}}>
                    <br/>
                    <Button
                        icon="edit"
                        type="primary"
                        htmlType="submit"
                        onClick={this.handleSubmit}>自动排课
                    </Button>
                    <br/>
                    <FormItem
                        label="共排课程数: ">{initNum}</FormItem>
                    <br/>
                    <FormItem
                        label="未完全排课课程:"></FormItem>
                    <br/>
                    <FormItem>
                        <Table
                            style={{ width: "100%"}}
                            rowKey='classId'
                            columns={columns}
                            dataSource={initData}/>
                    </FormItem>
                    <br/>
                </Form>
                </div>
        );
    }
}
