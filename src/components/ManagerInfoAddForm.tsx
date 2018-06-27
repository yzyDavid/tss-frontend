import {Component, FormEvent} from 'react';
import * as React from 'react';
import {Icon, Form, Input, message, Button, Upload, Select} from 'antd';
import DvaProps from '../types/DvaProps';


const FormItem = Form.Item;
const Option = Select.Option;
const {TextArea} = Input;

interface FormProps extends DvaProps {
    form: any;
    deptList: any[]
}

export class ManagerInfoAddForm extends Component<FormProps> {
    handleSubmit = (e: FormEvent<{}>) => {
        let flag = false;
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err: any, values: any) => {
            if (err) {
                message.error('信息填写不合法');
                flag = true;
                return;
            }
            this.props.dispatch({type: 'userinfo/addUser',
                payload: {
                    uids: [values.uid],
                    names: [values.name],
                    type: values.type,
                    genders: [values.gender],
                    passwords: ["123456"]
                }
            });
            console.log('Value:', values);
        });
        return flag;
    };

    refresh = () => {
        this.props.form.setFieldsValue({
            uid: "",
            name: "",
            gender: "男",
            type: "",
            // year: this.props.year,
            // dept: this.props.dept
        });
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
                            rules: [{required: true, message: '学号教工号不能为空'},
                                {pattern: /^[0-9]{10}$/, message:'请输入十位数字'}],
                        })(
                            <Input prefix={<Icon type="credit-card" style={{fontSize: 13}}/>}/>
                        )
                    }
                </FormItem>
                <FormItem label="姓名" {...formItemLayout} hasFeedback>
                    {
                        getFieldDecorator('name', {
                            rules: [{required: true, message: '姓名不能为空'}],
                        })(
                            <Input prefix={<Icon type="user" style={{fontSize: 13}}/>}/>
                        )
                    }
                </FormItem>
                <FormItem label="性别" {...formItemLayout}>
                    {
                        getFieldDecorator('gender', {
                            initialValue: "男"
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
                            initialValue: "Student"
                        })(
                            <Select>
                                <Option value="Teaching Administrator"> 教务管理员 </Option>
                                <Option value="Teacher"> 教师 </Option>
                                <Option value="Student"> 学生 </Option>
                            </Select>
                        )
                    }
                </FormItem>
            </Form>
        );
    }
}

const WrappedManagerInfoAddForm: any = Form.create({})(ManagerInfoAddForm);


export class CourseInfoAddForm extends Component<FormProps> {
    handleSubmit = (e: FormEvent<{}>) => {
        let flag = false;
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err: any, values: any) => {
            if (err) {
                message.error('信息填写不合法');
                return;
            }
            flag = true;
            this.props.dispatch({type: 'course/add', payload: {...values}});
        });
        return flag;
    };

    refresh = () => {
        // this.props.form.setFieldsValue({
        //     cid: "",
        //     name: "",
        //     credit: "",
        //     numLessonsEachWeek: "",
        //     department: ""
        // });
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
        const dept = this.props.deptList.map((k) => {
            return (
                <Option value={`${k}`} key={`${k}`}>{`${k}`} </Option>
            )
        });
        return (

            <Form onSubmit={this.handleSubmit}>
                <FormItem label="课程号" {...formItemLayout}>
                    {
                        getFieldDecorator('cid', {
                            rules: [{required: true, message: '课程号不能为空'},
                                {pattern: /^[0-9A-C]{8}$/, message:'课程号为8位数字和字母的组合'}],
                            initialValue: ''
                        })(
                            <Input prefix={<Icon type="user" style={{fontSize: 13}}/>}/>
                        )
                    }
                </FormItem>
                <FormItem label="课程名" {...formItemLayout} hasFeedback>
                    {
                        getFieldDecorator('name', {
                            rules: [{required: true, message: '课程名不能为空'}],
                            initialValue: ''
                        })(
                            <Input prefix={<Icon type="book" style={{fontSize: 13}}/>}/>
                        )
                    }
                </FormItem>
                <FormItem label="学分" {...formItemLayout}>
                    {
                        getFieldDecorator('credit', {
                            rules: [{required: true, message: '学分不能为空'},
                                {pattern: /^[0-9]+((\.[0-9]$)|$)/, message:'请输入合法数字，最多一位小数'}],
                            initialValue: ''
                        })(
                            <Input prefix={<Icon type="bar-chart" style={{fontSize: 13}}/>}/>
                        )
                    }
                </FormItem>
                <FormItem label="周学时数" {...formItemLayout} hasFeedback>
                    {
                        getFieldDecorator('numLessonsEachWeek', {
                            rules: [{required: true, message: '周学时数不能为空'},
                                {pattern: /^[0-9]+((\.[0-9]$)|$)/, message:'请输入合法数字，最多一位小数'}],
                            initialValue: ''
                        })(
                            <Input prefix={<Icon type="bars" style={{fontSize: 13}}/>}/>
                        )
                    }
                </FormItem>
                <FormItem label="所属院系" {...formItemLayout} hasFeedback>
                    {
                        getFieldDecorator('department', {
                            rules: [{required: true, message: '请选择院系'}]
                        })(
                            <Select>
                                {dept}
                            </Select>
                        )
                    }
                </FormItem>
            </Form>
        );
    }
}

const WrappedCourseInfoAddForm: any = Form.create({})(CourseInfoAddForm);

export {WrappedManagerInfoAddForm, WrappedCourseInfoAddForm};
