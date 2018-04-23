import * as React from 'react';
import {Component} from 'react';
import {Form, Button, Table, Select, message} from 'antd';
import DvaProps from '../types/DvaProps';
import NavigationBar from './TssPublicComponents';
import {FormEvent} from "react";

const FormItem = Form.Item;
const Option = Select.Option;
const columns = [
    {title: '地点', dataIndex: 'classroomAddress', key: 'classroomAddress'},
    {title: '时间', dataIndex: 'classroomTime', key: 'classroomTime'},
    {title: '容量', dataIndex: 'classroomCapacity', key: 'classroomCapacity'},
    {tile: '操作', key: 'operation', render:()=>(<a>修改至该时间</a>)}
    ];


var initData = [
            {key: 1, classroomAddress: '东一102', classroomTime: '16:30-18:30', classroomCapacity: '100'},
            {key: 2, classroomAddress: '东二202', classroomTime: '16:30-18:30', classroomCapacity: '50'},
            {key: 3, classroomAddress: '西一223', classroomTime: '16:30-18:30', classroomCapacity: '100'},
            {key: 4, classroomAddress: '西二308', classroomTime: '16:30-18:30', classroomCapacity: '200'},
            {key: 5, classroomAddress: '东一105', classroomTime: '16:30-18:30', classroomCapacity: '150'},
        ];

interface ManualSchModifyProps extends DvaProps {
    form: any;
    dataSource: any;
}

export class FreeClassroomFormData {
    campus: string;
    classroomDate: string;
    classroomTime: string;
}

class SearchForm extends Component<ManualSchModifyProps> {
    handleSubmit = (e: FormEvent<{}>) => {
        e.preventDefault();
        const formProps = this.props.form;
        formProps.validateFieldsAndScroll((err: any, values: FreeClassroomFormData) => {
            if (err) {
                return;
            }
            this.props.dispatch({type: 'freeclassroominfo/freeClassroomInfo', payload: values});
            console.log(this.props.dataSource);
        });
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <div>
                <Form layout={"inline"} onSubmit={this.handleSubmit.bind(this)}>
                    <FormItem
                        label="校区" style={{paddingLeft: 20}}>
                        {getFieldDecorator('campus', {})(
                            <Select style={{width: 200}}>
                                <Option value="玉泉校区">玉泉校区</Option>
                                <Option value="紫金港校区">紫金港校区</Option>
                                <Option value="西溪校区">西溪校区</Option>
                                <Option value="华家池校区">华家池校区</Option>
                                <Option value="之江校区">之江校区</Option>
                            </Select>
                        )}
                    </FormItem>
                    <FormItem
                        label="日期" >
                        {getFieldDecorator('classroomDate', {})(
                            <Select style={{width: 200}}>
                                <Option value="周一">周一</Option>
                                <Option value="周二">周二</Option>
                                <Option value="周三">周三</Option>
                                <Option value="周四">周四</Option>
                                <Option value="周五">周五</Option>
                                <Option value="周六">周六</Option>
                                <Option value="周日">周日</Option>
                            </Select>
                        )}
                    </FormItem>
                    <FormItem
                        label="时间" >
                        {getFieldDecorator('classroomTime', {})(
                            <Select style={{width: 200}}>
                                <Option value="全部">全部</Option>
                                <Option value="第1,2节">第1,2节</Option>
                                <Option value="第3,4节">第3,4节</Option>
                                <Option value="第3,4,5节">第3,4,5节</Option>
                                <Option value="第6,7,8节">第6,7,8节</Option>
                                <Option value="第7,8节">第7,8节</Option>
                                <Option value="第9,10节">第9,10节</Option>
                                <Option value="第11,12,13节">第11,12,13节</Option>
                            </Select>
                        )}
                    </FormItem>
                    <Button icon="search" type="primary" htmlType="submit">搜索</Button>
                </Form>
            </div>
        );
    }
}

const WrappedSearchForm: any = Form.create({})(SearchForm);

export default class ManualSchModifyComponent extends Component<ManualSchModifyProps> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <NavigationBar current={"course"} dispatch={this.props.dispatch}/>
                <br/>
                <div>
                    <WrappedSearchForm dispatch={this.props.dispatch}/>
                    <Table
                        style={{width: "100%", background: "#ffffff"}}
                        columns={columns}
                        dataSource={initData}/>
                </div>
            </div>
        );
    }
}

