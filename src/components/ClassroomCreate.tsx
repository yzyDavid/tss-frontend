import * as React from 'react';
import {Component} from 'react';
import {Form, Button, Select, message, Input} from 'antd';
import DvaProps from '../types/DvaProps';
import NavigationBar from './TssPublicComponents';
import { connect } from 'dva';

interface ClassroomCreateProps extends DvaProps {
    form: any;
    dataSource: any;
}

const FormItem = Form.Item;
const Option = Select.Option;

export class formData {
    campus: any;
    building: any;
    classroom: any;
    capacity: any
}

class SearchForm extends Component<ClassroomCreateProps> {
    constructor(props){
        super(props);
        this.handleFinalSubmit = this.handleFinalSubmit.bind(this);
    }

    handleFinalSubmit = (e) => {
        e.preventDefault();
        console.log("in handleFinalSubmit");
        const formProps = this.props.form;
        formProps.validateFieldsAndScroll((err: any, values: formData) => {
            if (err) {
                message.error('信息填写不合法');
                return;
            }
            console.log("values are",values);
            this.props.dispatch({type: 'classroommanage/createClassroom', payload: values});

        });
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <div>
                <Form className="ant-advanced-search-form" layout={"horizontal"} onSubmit={this.handleFinalSubmit}>
                    <FormItem label="校区" labelCol={{span: 8,offset:2}} wrapperCol={{span: 8}}>
                        {
                            getFieldDecorator('campus', {
                                rules: [
                                    {required: true, message: '请选择校区'}
                                ]
                            })(
                                <Select style={{width: 210}}>
                                    <Option value="紫金港">紫金港</Option>
                                    <Option value="玉泉">玉泉</Option>
                                    <Option value="西溪">西溪</Option>
                                    <Option value="华家池">华家池</Option>
                                    <Option value="之江">之江</Option>
                                    <Option value="舟山">舟山</Option>
                                    <Option value="海宁">海宁</Option>
                                </Select>
                            )
                        }
                    </FormItem>
                    <FormItem label="教学楼" labelCol={{span: 8, offset: 2}} wrapperCol={{span: 8}}>
                        {
                            getFieldDecorator('building', {
                                rules: [
                                    {required: true, message: '请输入教学楼名称'}
                                ]
                            })(
                                <Input style={{width: "210px",height:"30px"}}/>
                            )
                        }
                    </FormItem>
                    <FormItem label="教室" labelCol={{span: 8, offset: 2}} wrapperCol={{span: 8}}>
                        {
                            getFieldDecorator('classroom', {
                                rules: [
                                    {required: true, message: '请输教室名称'}
                                ]
                            })(
                                <Input style={{width: "210px",height:"30px"}}/>
                            )
                        }
                    </FormItem>
                    <FormItem label="容量" labelCol={{span: 8, offset: 2}} wrapperCol={{span: 8}}>
                        {
                            getFieldDecorator('capacity', {
                                rules: [
                                    {required: true, message: '请输入教室容量'},
                                    {pattern: /^[0-9]+$/, message: '请输入数字'}
                                ]
                            })(
                                <Input style={{width: "210px",height:"30px"}} />
                            )
                        }
                    </FormItem>
                    <FormItem labelCol={{span: 8, offset: 3}} wrapperCol={{span: 8, offset: 10}}>
                        <Button
                            style={{width: "210px"}}
                            type="primary"
                            htmlType="submit"
                            onClick={this.handleFinalSubmit}>提交</Button>
                    </FormItem>
                </Form>
            </div>
            );
    }
}

const WrappedSearchForm: any = Form.create({})(SearchForm);

export default class ClassroomCreateComponent extends Component<ClassroomCreateProps> {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <NavigationBar current={"list"} dispatch={this.props.dispatch}/>
                <br/>
                <div>
                    <WrappedSearchForm dispatch={this.props.dispatch} dataSource={this.props.dataSource}/>
                </div>
            </div>
        );
    }
}