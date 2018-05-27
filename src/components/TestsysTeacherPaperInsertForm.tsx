import {Component, FormEvent, ReactNode} from 'react';
import * as React from 'react';
import {Icon, Form, Button, Input, message, DatePicker, TimePicker, Checkbox, Modal} from 'antd';
import DvaProps from '../types/DvaProps';

const FormItem = Form.Item;
const { TextArea } = Input;
const { RangePicker } = DatePicker;

interface PaperFormProps extends DvaProps {
    form: any;

}

export class PaperFormData {
    pid: string;
    papername: string;
    begin: string;
    end: string;
    last: string;
    count: string;
    isauto: boolean;
    qid: string[];  //题目
    score: string[];//对应分支
    punit: string;  //自动生成时才使用
    pcount: string; //自动生成时才使用
}
interface EditState {
    modalVisible: boolean;
    buttonDisable: boolean;
    isauto: boolean;
    uuid: number;
}

export class PaperInsertForm extends Component<PaperFormProps, EditState> {
    componentDidMount() {
    }
    constructor(props){
        super(props);
        this.state = {
            modalVisible: false,
            buttonDisable: false,
            isauto: false,
            uuid:0
        };
    }
    formRef: any;
    setModalVisible(modalVisible) {
        if(this.formRef && modalVisible === true) this.formRef.refresh();
        this.setState({ modalVisible: modalVisible });
    };
    changeButtonDisable() {
        this.setState({ buttonDisable: !this.state.buttonDisable,
                                isauto: !this.state.isauto});
    };


    handleSubmit = (e: FormEvent<{}>) => {
        e.preventDefault();
        const formProps = this.props.form;
        formProps.validateFieldsAndScroll((err: any, fieldsValue) => {
            if (err) {
                message.error('信息填写不合法');
                return;
            }
            const rangeTimeValue =  fieldsValue['range-time-picker'];
            const values = {
            //    ...fieldsValue,
                pid: fieldsValue['pid'],
                papername: fieldsValue['papername'],
                isauto: this.state.isauto,

                begin:   rangeTimeValue[0].format('YYYY-MM-DD HH:mm:ss'),
                end:   rangeTimeValue[1].format('YYYY-MM-DD HH:mm:ss'),
                last: fieldsValue['last'],

                count: this.state.uuid,
                qid: fieldsValue['nums'],
                score: fieldsValue['score'],

                punit: fieldsValue['paperunit'],
                pcount: fieldsValue['pcount'],
            };
            console.log("insertpaper");
            console.log(values);
            this.props.dispatch({type:'teacherpaper/insert', payload: values});
        });

    };

    handleOk(e){
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
             console.log('Received values of form: ', values);
            if(!err)
                this.setModalVisible(false);
        });

    }


    handleQuestionSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }

    remove = (k) => {
        const { form } = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        // We need at least one passenger
        if (keys.length === 1) {
            return;
        }

        // can use data-binding to set
        form.setFieldsValue({
            keys: keys.filter(key => key !== k),
        });
    }

    add = () => {
        const { form } = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        const nextKeys = keys.concat(this.state.uuid);
        this.setState({uuid: this.state.uuid + 1});
        // can use data-binding to set
        // important! notify form to detect changes
        form.setFieldsValue({
            keys: nextKeys,
        });
    }


    render() {
        //题号！！！！！！



        const {getFieldDecorator, getFieldValue} = this.props.form;
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
        const formItemLayoutWithOutLabel = {
            wrapperCol: {
                xs: { span: 24, offset: 0 },
                sm: { span: 14, offset: 6 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 14,
                    offset: 6,
                },
            },
        };

        getFieldDecorator('keys', { initialValue: [] });
        const keys = getFieldValue('keys');
        const dynamicFormItems = keys.map((k, index) => {
            return (
                <FormItem
                    {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                    label={index === 0 ? '问题:' : ''}
                    required={false}
                    key={k}
                >
                    {getFieldDecorator(`nums[${k}]`, {
                        validateTrigger: ['onChange', 'onBlur'],
                        rules: [{
                            required: true,
                            whitespace: true,
                            message: "请输入题目.",
                        }],
                    })(
                        <Input placeholder="问题编号" style={{ width: '55%', marginRight: 8 }} />
                    )}
                    {getFieldDecorator(`score[${k}]`, {
                        validateTrigger: ['onChange', 'onBlur'],
                        rules: [{
                            required: true,
                            whitespace: true,
                            message: "请输入分值.",
                        }],
                    })(
                        <Input placeholder="分值" style={{ width: '30%', marginRight: 8 }} />
                    )}

                    {keys.length > 1 ? (
                        <Icon
                            className="dynamic-delete-button"
                            type="minus-circle-o"
                          //  disabled={keys.length === 1}
                            onClick={() => this.remove(k)}
                        />
                    ) : null}
                </FormItem>
            );
        });

        return (
            <Form onSubmit={this.handleSubmit}>

                <FormItem label="试卷号" {...formItemLayout} hasFeedback>
                    {
                        getFieldDecorator('pid', {
                            rules: [
                                {required: true, message: '请输入试卷号'},
                                {pattern: /^[0-9]+$/, message: '请输入数字'}
                            ]
                        })(

                            <Input  />
                        )
                    }
                </FormItem>

                <FormItem label="试卷名称" {...formItemLayout} hasFeedback>
                    {
                        getFieldDecorator('papername', {
                            rules: [
                                {required: true, message: '请输入名称'}
                            ]
                        })(

                            <Input  />
                        )
                    }
                </FormItem>

                <FormItem {...formItemLayout} label="考试时间"
                >
                    {getFieldDecorator('range-time-picker', {
                        rules: [
                            { type: 'array', required: true, message: '请选择时间!' }
                            ]
                        })(
                        <RangePicker  showTime format="YYYY-MM-DD HH:mm:ss" />
                    )}
                </FormItem>

                <FormItem label="持续时间" {...formItemLayout} hasFeedback>
                    {
                        getFieldDecorator('last', {
                            rules: [
                                {required: true, message: '请输入名称'},
                                {pattern: /[1-9][0-9]?:[0-9][0-9]:[0-9][0-9]/, message: '请按照格式 hh:mm:ss 如：1:00:00'}
                            ]
                        })(

                            <Input placeholder="请按照格式 hh:mm:ss 如：1:00:00" />

                        )
                    }
                </FormItem>



                <FormItem {...tailFormItemLayout} >
                    {getFieldDecorator('auto', {
                        valuePropName: 'checked',
                    })(
                        <Checkbox value={this.state.isauto}  onChange={()=> this.changeButtonDisable()}>自动生成</Checkbox>
                    )}
                </FormItem>

                <FormItem label="试卷单元号" {...formItemLayout} hasFeedback>
                    {
                        getFieldDecorator('paperunit', {

                        })(

                            <Input  placeholder="如需自动生成试卷，请填写考察单元号" disabled={!this.state.isauto}/>
                        )
                    }
                </FormItem>

                <FormItem label="试卷题目数" {...formItemLayout} hasFeedback>
                    {
                        getFieldDecorator('pcount', {

                        })(

                            <Input  placeholder="如需自动生成试卷，请填写题目数量" disabled={!this.state.isauto}/>
                        )
                    }
                </FormItem>

                <FormItem {...tailFormItemLayout} >
                    <Button icon="edit" type="primary"
                            disabled={ this.state.buttonDisable}
                            onClick={() => this.setModalVisible(true)}>添加题目</Button>
                </FormItem>

                <FormItem {...tailFormItemLayout}>
                    <Button icon="copy" type="primary" htmlType="submit">提交</Button>
                    <Modal
                        title="编辑试卷"
                        wrapClassName="vertical-center-modal"
                        visible={this.state.modalVisible}
                        onOk={(e) => this.handleOk(e)}
                        onCancel={() => this.setModalVisible(false)}
                    >

                        <Form>
                            {dynamicFormItems}
                            <FormItem {...formItemLayoutWithOutLabel}>
                                <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
                                    <Icon type="plus" /> 添加问题
                                </Button>
                            </FormItem>

                        </Form>

                    </Modal>
                </FormItem>
            </Form>
        );
    }
}

const WrappedPaperInsertForm: any = Form.create({})(PaperInsertForm);

export {WrappedPaperInsertForm};


