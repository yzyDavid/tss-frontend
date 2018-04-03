import {Component, FormEvent} from 'react';
import * as React from 'react';
import {Icon, Form, Input, message} from 'antd';
import DvaProps from '../types/DvaProps';

const FormItem = Form.Item;
const {TextArea} = Input;

interface FormProps extends DvaProps {
    form: any;
    uid: string;
    email: string;
    tel: string;
    intro: string;
}

class InfoEditFormData {
    email: string;
    tel: string;
    intro: string;
}

export class InfoEditForm extends Component<FormProps, InfoEditFormData> {
    componentDidMount() {
    };

    handleSubmit = (e: FormEvent<{}>) => {
        let flag = false;
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err: any, values: InfoEditFormData) => {
            if (err) {
                message.error('信息填写不合法');
                flag = true;
                return;
            }
            this.props.dispatch({type:'user/modify', payload: values});
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
                <FormItem label="学号" {...formItemLayout}>
                    <span className="ant-form-text" > {this.props.uid} </span>
                </FormItem>
                <FormItem label="E-mail" {...formItemLayout} hasFeedback>
                    {
                        getFieldDecorator('email', {
                            rules: [
                                {message: "邮箱格式不正确", type: "email"}
                            ],
                            initialValue: this.props.email
                        })(
                            <Input prefix={<Icon type="mail" style={{fontSize: 13}}/>} />
                        )
                    }
                </FormItem>
                <FormItem label="Telephone" {...formItemLayout} hasFeedback>
                    {
                        getFieldDecorator('tel', {
                            rules: [
                                {message: "请输入数字", pattern: /^[0-9]+$/, }
                            ],
                            initialValue: this.props.tel
                        })(
                            <Input prefix={<Icon type="phone" style={{fontSize: 13}}/>}/>
                        )
                    }
                </FormItem>
                <FormItem label="Introduction" {...formItemLayout} hasFeedback>
                    {
                        getFieldDecorator('intro', {
                            initialValue: this.props.intro
                        })(
                            <TextArea autosize={{ minRows: 2, maxRows: 6 }} />
                        )
                    }
                </FormItem>
            </Form>
        );
    }
}

const WrappedInfoEditForm: any = Form.create({})(InfoEditForm);

export {WrappedInfoEditForm};
