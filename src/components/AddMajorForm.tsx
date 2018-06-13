import {Component, FormEvent, ReactNode} from 'react';
import * as React from 'react';
import {Icon, Form, Button, Input, message} from 'antd';
import DvaProps from '../types/DvaProps';

const FormItem = Form.Item;

interface FormProps extends DvaProps {
    form: any;
    dept: string;
}

export class FormData {
    name: string;
}

export class AddMajorForm extends Component<FormProps, FormData> {
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
            this.props.dispatch({type:'dept/addMajor', payload: {name: values.name, department: this.props.dept}});
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
                <FormItem label="输入专业名称" {...formItemLayout} hasFeedback>
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

const WrappedAddMajorForm: any = Form.create({})(AddMajorForm);

export {WrappedAddMajorForm};
