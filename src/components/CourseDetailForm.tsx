import * as React from 'react';
import {Component, FormEvent} from 'react';
import DvaProps from '../types/DvaProps';
import {Icon, Form} from 'antd';

const FormItem = Form.Item;

interface FormProps extends DvaProps {
    form: any;
    name: string;
    id: number;
    teacher: string;
    brief: string;
}
class CourseInfo{
    name: string;
    id: number;
    teacher: string;
    brief: string;
}

export class CourseDetailForm extends Component<FormProps,CourseInfo>{
    componentDidMount() {};
    refresh = () => {
        this.props.form.setFieldsValue({
            name: this.props.name,
            id: this.props.id,
            teacher: this.props.teacher,
            brief: this.props.brief,
        });
    }
    render(){
        return (
            <Form>
                <FormItem label="课程名">
                    <span className="ant-form-text"> {this.props.name}</span>
                </FormItem>
                <FormItem label="课程号">
                    <span className="ant-form-text"> {this.props.id}</span>
                </FormItem>
                <FormItem label="开课老师">
                    <span className="ant-form-text"> {this.props.teacher}</span>
                </FormItem>
                <FormItem label="课程简介">
                    <span className="ant-form-text"> {this.props.brief}</span>
                </FormItem>
            </Form>
        );
    }
}

const WrappedCourseDetailForm: any = Form.create({})(CourseDetailForm);

export {WrappedCourseDetailForm};