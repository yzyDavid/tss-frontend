import {Component, FormEvent} from 'react';
import * as React from 'react';
import {Icon, Form, Input, message, Button, Upload, Select} from 'antd';
import DvaProps from '../types/DvaProps';


const FormItem = Form.Item;
const Option = Select.Option;
const {TextArea} = Input;

interface FormProps extends DvaProps {
    form: any;
    uid: string;
    name: string;
    gender: string;
    type: string;
    year: string;
    dept: string;
}

class InfoEditFormData {
    uid: string;
    name: string;
    gender: string;
    type: string;
    year: string;
    dept: string;
}

export class ManagerInfoAddForm extends Component<FormProps, InfoEditFormData> {
    handleSubmit = (e: FormEvent<{}>) => {
        let flag = false;
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err: any, values: InfoEditFormData) => {
            if (err) {
                message.error('信息填写不合法');
                flag = true;
                return;
            }
            this.props.dispatch({type:'userinfo/addUser', payload: {...values}});
            console.log('Value:', values);
        });
        return flag;
    };

    refresh = () => {
        this.props.form.setFieldsValue({
            uid: this.props.uid,
            name: this.props.name,
            gender: this.props.gender,
            type: this.props.type,
            year: this.props.year,
            dept: this.props.dept
        });
    };
    normFile = (e) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };
    handleChange = (info) => {
        info.fileList.slice(-1);
    };
    render() {
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 6},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 14},
            },
        };
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem label="学号或教工号" {...formItemLayout}>
                    {
                        getFieldDecorator('uid', {
                            rules: [
                            ],
                            initialValue: this.props.name
                        })(
                            <Input prefix={<Icon type="user" style={{fontSize: 13}}/>} />
                        )
                    }
                    </FormItem>
                <FormItem label="姓名" {...formItemLayout} hasFeedback>
                    {
                        getFieldDecorator('name', {
                            rules: [
                            ],
                            initialValue: this.props.name
                        })(
                            <Input prefix={<Icon type="name" style={{fontSize: 13}}/>} />
                        )
                    }
                </FormItem>
                <FormItem label="性别" {...formItemLayout}>
                    {
                        getFieldDecorator('gender', {
                            initialValue: this.props.gender
                        })(
                            <Select>
                                <Option value="男"> 男 </Option>
                                <Option value="女"> 女 </Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label="职务" {...formItemLayout} hasFeedback>
                    {
                        getFieldDecorator('type', {
                            initialValue: this.props.type
                        })(
                            <Select>
                                <Option value="教务管理员"> 教务管理员 </Option>
                                <Option value="教师"> 教师 </Option>
                                <Option value="学生"> 学生 </Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label="院系" {...formItemLayout} hasFeedback>
                    {
                        getFieldDecorator('dept', {
                            initialValue: this.props.dept
                        })(
                            <Select>
                                <Option value="计算机科学与技术学院"> 计算机科学与技术学院 </Option>
                                <Option value="数学科学院"> 数学科学院 </Option>
                                <Option value="公共管理学院"> 公共管理学院 </Option>
                                <Option value="教务处"> 教务处 </Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label="入学年份" {...formItemLayout} hasFeedback>
                    {
                        getFieldDecorator('year', {
                            rules: [
                                {message: "请输入四位数字", pattern: /^[1-2][0-9][0-9][0-9]$/, }
                            ],
                            initialValue: this.props.year
                        })(
                            <Input prefix={<Icon type="mail" style={{fontSize: 13}}/>} />
                        )
                    }
                </FormItem>
            </Form>
        );
    }
}

const WrappedManagerInfoAddForm: any = Form.create({})(ManagerInfoAddForm);

export {WrappedManagerInfoAddForm};
