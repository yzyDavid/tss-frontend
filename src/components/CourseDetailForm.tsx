import * as React from 'react';
import {Component, FormEvent} from 'react';
import DvaProps from '../types/DvaProps';
import {Icon, Form} from 'antd';

const FormItem = Form.Item;

interface FormProps extends DvaProps {
    form: any;
    courseName: string;
    courseId: number;
    credit: number;
    brief: string;
    classroom: string;
}
class CourseInfo{
    courseName: string;
    courseId: number;
    credit: number;
    brief: string;
    classroom: string;
}

export class CourseDetailForm extends Component<FormProps,CourseInfo>{
    componentDidMount() {};
    refresh = () => {
        this.props.form.setFieldsValue({
            name: this.props.courseName,
            id: this.props.courseId,
            credit: this.props.credit,
            brief: this.props.brief,
            class: this.props.classroom,
        });
    }
    render(){
        return (
            <Form>
                <FormItem label="课程名">
                    <span className="ant-form-text"> {this.props.courseName}</span>
                </FormItem>
                <FormItem label="课程号">
                    <span className="ant-form-text"> {this.props.courseId}</span>
                </FormItem>
                <FormItem label="学分">
                    <span className="ant-form-text"> {this.props.credit}</span>
                </FormItem>
                {/*<FormItem label="课程简介">*/}
                    {/*<span className="ant-form-text"> {this.props.brief}</span>*/}
                {/*</FormItem>*/}

                <FormItem label="教师">
                    <span className="ant-form-text"> {this.props.classroom}</span>
                </FormItem>
            </Form>
        );
    }
}

const WrappedCourseDetailForm: any = Form.create({})(CourseDetailForm);

export {WrappedCourseDetailForm};