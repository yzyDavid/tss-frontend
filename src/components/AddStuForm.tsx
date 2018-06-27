import {Component, FormEvent, ReactNode} from 'react';
import * as React from 'react';
import {Icon, Form, Button, Input, message} from 'antd';
import DvaProps from '../types/DvaProps';

const FormItem = Form.Item;

interface FormProps extends DvaProps {
    form: any;
    majorClass: string;
}

export class FormData {
    uid: string;
}

export class AddStuForm extends Component<FormProps, FormData> {
    componentDidMount() {
    }

    handleSubmit = (e: FormEvent<{}>) => {
        e.preventDefault();
        const formProps = this.props.form;
        let flag = false;
        formProps.validateFieldsAndScroll((err: any, values: FormData) => {
            if (err) {
                message.error('信息填写不合法');
                return;
            }
            flag = true;
            console.log(this.props);
            this.props.dispatch({
                type: 'dept/addStu',
                payload: {uids: [values.uid], majorClass: this.props.majorClass}
            });
        });
        return flag;
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
                <FormItem label="输入学号" {...formItemLayout} hasFeedback>
                    {
                        getFieldDecorator('uid', {
                            rules: [
                                {required: true, message: '请输入学号'},
                                {pattern: /^[0-9]{10}$/, message: '请输入十位数字'}
                            ]
                        })(
                            <Input prefix={<Icon type="user" style={{fontSize: 13}}/>}/>
                        )
                    }
                </FormItem>
            </Form>
        );
    }
}

const WrappedAddStuForm: any = Form.create({})(AddStuForm);

export {WrappedAddStuForm};
