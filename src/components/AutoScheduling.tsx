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
    {title: '课程号', dataIndex: 'courseNumber', key: 'courseNumber'},
    {title: '课程名称', dataIndex: 'courseName', key: 'courseName'},
    {title: '未安排课时', dataIndex: 'restCourseTime', key: 'restCourseTime'},
];

interface AutoSchProps extends DvaProps {
    dataSource: any;
    totalCourse: any;
}

// interface loadingState {
//     loading : boolean;
// }
var initNum = "正在排课......";
var initData = [{key: 1, courseNumber: ' ', courseName: ' ', restCourseTime: ' '},];

// class LoadButton extends Component<AutoSchProps,loadingState>{
//     constructor(props){
//         super(props);
//         this.state = {
//             loading : false,
//         }
//         this.handleClick = this.handleClick.bind(this);
//     }
//
//     handleClick(){
//         if(this.state.loading)
//             this.setState({loading : false});
//         else
//             this.setState({loading : true});
//         //send the requirement of this to the
//     }
//
//     render() {
//         return (
//             <Button
//                 style={{textAlign: 'center'}}
//                 type="primary"
//                 loading={this.state.loading}
//                 onClick={this.handleClick}>
//             自动排课
//             </Button>
//         );
//     }
// }
//
// const AutoSelectButton: any = Form.create({})(LoadButton);

export  default class AutoSchedulingComponent extends Component<AutoSchProps, {}> {
constructor(props) {
        super(props);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log('handleClick');
        this.props.dispatch({type: 'autoscheduling/restCourseInfo', payload: {}});
        initData=this.props.dataSource;
        initNum=this.props.totalCourse;
    }

    render() {
        initData=this.props.dataSource;
        initNum=this.props.totalCourse;
        return (
            <div>
                <NavigationBar current={"list"} dispatch={this.props.dispatch}/>
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
                            columns={columns}
                            dataSource={initData}/>
                    </FormItem>
                    <br/>
                </Form>
                {/*<AutoSelectButton/>*/}
                </div>
            // </div>
        );
    }
}
