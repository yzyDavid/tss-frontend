import {Component, FormEvent} from 'react';
import * as React from 'react';
import {Icon, Form, Input, message, Button, Upload} from 'antd';
import DvaProps from '../types/DvaProps';
import Bytes = jest.Bytes;


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
    uploadFile: any;
    fname: string;
}

export class InfoEditForm extends Component<FormProps, InfoEditFormData> {
    componentDidMount() {
        // this.beforeUpload = this.beforeUpload.bind(this);
        // this.setState({
        //     fileName: ''
        // })
    };

    import: any;
    fname: string = '';
    uploadFile: any;

    handleSubmit = (e: FormEvent<{}>) => {
        let flag = false;
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err: any, values: any) => {
            if (err) {
                message.error('信息填写不合法');
                flag = true;
                return;
            }
            this.props.dispatch({type: 'userinfo/modify', payload: {...values}});
            console.log('Value:', values);
        });
        if (this.uploadFile != null && this.uploadFile != undefined) {
            this.props.dispatch({type: 'userinfo/modifyPhoto', payload: {file: this.uploadFile.fileContent}});
            this.setState({
                uploadFile: null,
                // fileName: ''
            });
        }
        return flag;
    };

    refresh = () => {
        this.props.form.setFieldsValue({
            email: this.props.email,
            telephone: this.props.tel,
            intro: this.props.intro,
            fname: ''
        });
        this.setState({uploadFile: null});
        this.uploadFile = null;
        this.fname = ''
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
    // beforeUpload = (file) => {
    //     this.setState({fileList: file});
    //     return false;
    // };

    uploadClick() {
        this.import.openDisk()
    };

    uploadHandler(name, content) {
        if(name == ''){
            this.uploadFile = null;
            this.fname = '';
            this.props.form.setFieldsValue({
                fname: ''
            });
            this.setState({uploadFile: null, fname: name});
            return;
        }
        let uploadFile = {
            name: name,
            fileContent: content
        };
        this.uploadFile = uploadFile;
        this.setState({uploadFile: uploadFile, fname: name});
        this.fname = name;
        console.log('fname', this.fname);
        this.props.form.setFieldsValue({
            fname: name
        });
    }

    render
    () {
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
                <Button type={"ghost"} onClick={this.uploadClick.bind(this)}><Icon type={"upload"}/>点击上传头像</Button>
                <FormItem>{
                    getFieldDecorator('fname', {
                        initialValue: ''
                    })(
                        <Input disabled={true}/>
                    )
                }</FormItem>
                <Import
                    ref={el => this.import = el}
                    uploadCallback={this.uploadHandler.bind(this)}
                    dispatch={this.props.dispatch}
                />
                {/*<Input type="file"/>*/}
                {/*<FormItem>*/}
                {/*{getFieldDecorator('upload', {*/}
                {/*valuePropName: 'fileList',*/}
                {/*getValueFromEvent: this.normFile,*/}
                {/*})(*/}
                {/*<Upload beforeUpload={this.beforeUpload} name="logo" action="/photo" method="post"*/}
                {/*listType="picture" onChange={this.handleChange}*/}
                {/*{...getFieldDecorator('upload', {*/}
                {/*valuePropName: 'fileList',*/}
                {/*})}*/}
                {/*>*/}
                {/*<Button type="ghost">*/}
                {/*<Icon type="upload"/> 点击上传*/}
                {/*</Button>*/}
                {/*</Upload>)}*/}
                {/*</FormItem>*/}
            </Form>
        );
    }
}

interface ImportProps
    extends DvaProps {
    uploadCallback: any
}

class Import extends Component<ImportProps> {
    constructor(props) {
        super(props);
        this.bindHander();
    };

    fileUpload: any;

    bindHander() {
        this.openDisk = this.openDisk.bind(this);
        this.readFileContent = this.readFileContent.bind(this);
    };

    openDisk() {
        this.fileUpload.click();
    };

    readFileContent(e) {
        let
            _self = this,
            file = e.target.files[0];
        console.log("read");
        if (file) {
            let
                reader = new FileReader();
            reader.readAsArrayBuffer(file);
            reader.onload = function () {
                let byte: any = [];
                let tmp: Uint8Array = new Uint8Array(reader.result);
                for (let i = 0; i < tmp.length; i++) {
                    byte.push(tmp[i])
                }
                _self.props.uploadCallback(file.name, byte);
            };
        } else
            console.log('error');
            _self.props.uploadCallback('', null);
    };

    render() {
        return <input type="file" hidden={true} ref={(el) => {
            this.fileUpload = el
        }} onClick={this.readFileContent} onChange={this.readFileContent} accept={".jpg"}/>
    }
}

const WrappedInfoEditForm: any = Form.create({})(InfoEditForm);

export {WrappedInfoEditForm};
