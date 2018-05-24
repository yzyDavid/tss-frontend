import {Component, FormEvent} from 'react';
import * as React from 'react';
import {Icon, Form, Input, message, Button, Upload} from 'antd';
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
    // previewVisible: boolean;
    // previewImage: string;
    fileList: any;
}

export class InfoEditForm extends Component<FormProps, InfoEditFormData> {
    componentDidMount() {
        this.beforeUpload = this.beforeUpload.bind(this);
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
            this.props.dispatch({type: 'userinfo/modify', payload: {...values, uid: this.props.uid}});
            console.log('Value:', values);
        });
        // if(this.state.fileList)this.props.dispatch({type:'userinfo/modifyPhoto', payload: {file: this.state.fileList, uid: this.props.uid}});
        return flag;
    };

    refresh = () => {
        this.props.form.setFieldsValue({
            email: this.props.email,
            tel: this.props.tel,
            intro: this.props.intro
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
    beforeUpload = (file) => {
        this.setState({fileList: file});
        return false;
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
                    <span className="ant-form-text"> {this.props.uid} </span>
                </FormItem>
                <FormItem label="E-mail" {...formItemLayout} hasFeedback>
                    {
                        getFieldDecorator('email', {
                            rules: [
                                {message: "邮箱格式不正确", type: "email"}
                            ],
                            initialValue: this.props.email
                        })(
                            <Input prefix={<Icon type="mail" style={{fontSize: 13}}/>}/>
                        )
                    }
                </FormItem>
                <FormItem label="Telephone" {...formItemLayout} hasFeedback>
                    {
                        getFieldDecorator('telephone', {
                            rules: [
                                {message: "请输入数字", pattern: /^[0-9]+$/,}
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
                            <TextArea autosize={{minRows: 2, maxRows: 6}}/>
                        )
                    }
                </FormItem>
                <FormItem>
                    {getFieldDecorator('upload', {
                        valuePropName: 'fileList',
                        getValueFromEvent: this.normFile,
                    })(
                        <Upload beforeUpload={this.beforeUpload} name="logo" action="/photo" method="post"
                                listType="picture" onChange={this.handleChange}
                                {...getFieldDecorator('upload', {
                                    valuePropName: 'fileList',
                                })}
                        >
                            <Button type="ghost">
                                <Icon type="upload"/> 点击上传
                            </Button>
                        </Upload>)}
                </FormItem>
            </Form>
        );
    }
}

const WrappedInfoEditForm: any = Form.create({})(InfoEditForm);

export {WrappedInfoEditForm};
