import {Component, FormEvent} from 'react';
import * as React from 'react';
<<<<<<< Updated upstream
import {Icon, Form, Input, message} from 'antd';
import DvaProps from '../models/DvaProps';
=======
import {Icon, Form, Input, message, Button} from 'antd';
import DvaProps from '../types/DvaProps';
>>>>>>> Stashed changes

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
    previewVisible: boolean;
    previewImage: string;
    fileList: [any];
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
    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    };
    handleUpload = ({ fileList }) => this.setState({ fileList })
    beforeUpload = (file) => {
        this.setState({fileList: file, previewVisible: true, previewImage: file.url || file.thumbUrl});
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
                <FormItem>
                    <Upload beforeUpload={this.beforeUpload} name="logo" action="/photo" method="post" listType="picture" onChange={this.handleUpload} onPreview={this.handlePreview}
                        {...getFieldDecorator('upload', {
                                valuePropName: 'fileList',
                            })}
                    >
                        <Button type="ghost">
                            <Icon type="upload" /> 点击上传
                        </Button>
                    </Upload>
                </FormItem>
            </Form>
        );
    }
}
import { Upload, Modal } from 'antd';

class PicturesWall extends React.Component {
    state = {
        previewVisible: false,
        previewImage: '',
        fileList: [{
            uid: -1,
            name: 'xxx.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        }],
    };

    handleCancel = () => this.setState({ previewVisible: false })

    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }

    handleChange = ({ fileList }) => this.setState({ fileList })

    render() {
        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return (
            <div className="clearfix">
                <Upload onPreview={this.handlePreview} onChange={this.handleChange} >
                    {fileList.length >= 3 ? null : uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </div>
        );
    }
}

const WrappedInfoEditForm: any = Form.create({})(InfoEditForm);

export {WrappedInfoEditForm};
