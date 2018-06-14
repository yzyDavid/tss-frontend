import {Component, FormEvent} from 'react';
import * as React from 'react';
import {Icon, Form, Input, message} from 'antd';
import DvaProps from '../types/DvaProps';
import Select from "antd/es/select";

const FormItem = Form.Item;

interface FormProps extends DvaProps {
    form: any;
    cid: string;
    name: string;
    credit: string;
    weeklyNum: string;
    semester: string;
    dept: string;
    intro: string;
    deptList: any[];
}

class CourseFormData {
    cid: string;
    name: string;
    credit: string;
    numLessonsEachWeek: string;
    semester: string;
    dept: string;
    intro: string;
}

export class CourseEditForm extends Component<FormProps, CourseFormData> {
    handleSubmit = (e: FormEvent<{}>) => {
        let flag = false;
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err: any, values: CourseFormData) => {
            if (err) {
                message.error('信息填写不合法');
                flag = true;
                return;
            }
            this.props.dispatch({type:'course/modify', payload: {...values, cid: this.props.cid}});
            console.log('Value:', values);
        });
        return flag;
    };

    refresh = () => {
        this.props.form.setFieldsValue({
            // cid: this.props.cid,
            // name: this.props.name,
            // credit: this.props.credit,
            // numLessonsEachWeek: this.props.weeklyNum,
            // semester: this.props.semester,
            // dept: this.props.dept,
            // intro: this.props.intro
        });
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

        const dept = this.props.deptList.map((k) => {
            return (
                <Select.Option value={`${k}`} key={`${k}`}>{`${k}`} </Select.Option>
            )
        });
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem label="课程号" {...formItemLayout}>
                    <span className="ant-form-text" > {this.props.cid} </span>
                </FormItem>
                <FormItem label="课程名称" {...formItemLayout} hasFeedback>
                    {
                        getFieldDecorator('name', {
                            initialValue: this.props.name
                        })(
                            <Input prefix={<Icon type="" style={{fontSize: 13}}/>} />
                        )
                    }
                </FormItem>
                <FormItem label="学分" {...formItemLayout} hasFeedback>
                    {
                        getFieldDecorator('credit', {
                            initialValue: this.props.credit
                        })(
                            <Input prefix={<Icon type="" style={{fontSize: 13}}/>} />
                        )
                    }
                    </FormItem>
                <FormItem label="每周课时" {...formItemLayout} hasFeedback>
                    {
                        getFieldDecorator('numLessonsEachWeek', {
                            initialValue: this.props.weeklyNum
                        })(
                            <Input prefix={<Icon type="" style={{fontSize: 13}}/>} />
                        )
                    }
                    </FormItem>
                <FormItem label="院系" {...formItemLayout} hasFeedback>
                    {
                        getFieldDecorator('department', {
                            initialValue: this.props.dept
                        })(
                            <Select>
                                {dept}
                            </Select>
                        )
                    }
                    </FormItem>
                <FormItem label="学期" {...formItemLayout} hasFeedback>
                    {
                        getFieldDecorator('semester', {
                            initialValue: this.props.semester
                        })(
                            <Input prefix={<Icon type="" style={{fontSize: 13}}/>} />
                        )
                    }
                    </FormItem>
                <FormItem label="Introduction" {...formItemLayout} hasFeedback>
                    {
                        getFieldDecorator('intro', {
                            initialValue: this.props.intro
                        })(
                            <Input prefix={<Icon type="" style={{fontSize: 13}}/>} />
                        )
                    }
                    </FormItem>
            </Form>
        );
    }
}

const WrappedCourseEditForm: any = Form.create({})(CourseEditForm);

export {WrappedCourseEditForm};
