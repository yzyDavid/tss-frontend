import {Component, FormEvent, ReactNode} from 'react';
import * as React from 'react';
import {Icon, Form, Button, Input, message} from 'antd';
import DvaProps from '../types/DvaProps';

const FormItem = Form.Item;

interface FormProps extends DvaProps {
    form: any;
}

export class FormData {
    name: string;
}

export class AddDeptForm extends Component<FormProps, FormData> {
    componentDidMount() {
    }

    handleSubmit = (e: FormEvent<{}>) => {
        e.preventDefault();
        const formProps = this.props.form;
        formProps.validateFieldsAndScroll((err: any, values: FormData) => {
            if (err) {
                message.error('信息填写不合法');
                return;
            }
            console.log(this.props);
            this.props.dispatch({type:'dept/add', payload: values});
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
                <FormItem label="输入院系名称" {...formItemLayout} hasFeedback>
                    {
                        getFieldDecorator('name', {
                            rules: [
                                {required: true, message: '请输入名称'}
                            ]
                        })(
                            <Input />
                        )
                    }
                </FormItem>
            </Form>
        );
    }
}

const WrappedAddDeptForm: any = Form.create({})(AddDeptForm);

export {WrappedAddDeptForm};
