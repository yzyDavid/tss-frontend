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
    email: string;
    tel: string;
    intro: string;
}

class InfoEditFormData {
    uid: string;
    name: string;
    gender: string;
    type: string;
    year: string;
    dept: string;
    email: string;
    tel: string;
    intro: string;
}

export class ManagerInfoViewForm extends Component<FormProps, InfoEditFormData> {
    handleSubmit = (e: FormEvent<{}>) => {
        let flag = false;
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err: any, values: InfoEditFormData) => {
            if (err) {
                message.error('信息填写不合法');
                flag = true;
                return;
            }
            this.props.dispatch({type:'userinfo/modify', payload: {...values, uid: this.props.uid}});
            console.log('Value:', values);
        });
        return flag;
    };

    refresh = () => {
        this.props.form.setFieldsValue({
            email: this.props.email,
            tel: this.props.tel,
            intro: this.props.intro
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
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem label="学号或教工号" {...formItemLayout}>
                    <span className="ant-form-text" > {this.props.uid} </span>
                </FormItem>
                <FormItem label="姓名" {...formItemLayout}>
                    <span className="ant-form-text" > {this.props.name} </span>
                </FormItem>
                <FormItem label="性别" {...formItemLayout}>
                    <span className="ant-form-text"> {this.props.gender}</span>
                </FormItem>
                <FormItem label="E-mail" {...formItemLayout} hasFeedback>
                    <span className="ant-form-text"> {this.props.email}</span>
                </FormItem>
                <FormItem label="职务" {...formItemLayout} hasFeedback>
                    <span className="ant-form-text"> {this.props.type}</span>
                </FormItem>
                <FormItem label="院系" {...formItemLayout} hasFeedback>
                    <span className="ant-form-text"> {this.props.dept}</span>
                </FormItem>
                <FormItem label="入学年份" {...formItemLayout} hasFeedback>
                    <span className="ant-form-text"> {this.props.year}</span>
                </FormItem>
                <FormItem label="Telephone" {...formItemLayout} hasFeedback>
                    <span className="ant-form-text"> {this.props.tel}</span>
                </FormItem>
                <FormItem label="Introduction" {...formItemLayout} hasFeedback>
                    <span className="ant-form-text"> {this.props.intro}</span>
                </FormItem>
            </Form>
        );
    }
}

const WrappedManagerInfoViewForm: any = Form.create({})(ManagerInfoViewForm);

export {WrappedManagerInfoViewForm};
