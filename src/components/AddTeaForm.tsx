import {Component, FormEvent, ReactNode} from 'react';
import * as React from 'react';
import {Icon, Form, Button, Input, message, Col, Row} from 'antd';
import DvaProps from '../types/DvaProps';

const FormItem = Form.Item;

interface FormProps extends DvaProps {
    form: any;
    department: string;
}

export class FormData {
    uid: string;
}

export class AddTeaForm extends Component<FormProps, FormData> {
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
            this.props.dispatch({
                type: 'dept/addTea',
                payload: {uids: [values.uid], department: this.props.department}
            });
        });
    };

    handleCancel = (e: FormEvent<{}>) => {
        e.preventDefault();
        const formProps = this.props.form;
        formProps.validateFieldsAndScroll((err: any, values: FormData) => {
            if (err) {
                message.error('信息填写不合法');
                return;
            }
            console.log(this.props);
            this.props.dispatch({
                type: 'dept/deleteTea',
                payload: {uids: [values.uid], department: this.props.department}
            });
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
                <FormItem label="输入教工号" {...formItemLayout} hasFeedback>
                    {
                        getFieldDecorator('uid', {
                            rules: [
                                {required: true, message: '请输入教工号'}
                            ]
                        })(
                            <Input/>
                        )
                    }
                </FormItem>
                <Row>
                    <Col span={4} offset={8}>
                        <Button onClick={this.handleSubmit}>添加</Button>
                    </Col>
                    <Col span={6} offset={0}>
                        <Button onClick={this.handleCancel}>删除</Button>
                    </Col>
                </Row>
            </Form>
        );
    }
}

const WrappedAddTeaForm: any = Form.create({})(AddTeaForm);

export {WrappedAddTeaForm};
