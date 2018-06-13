import {Component, FormEvent, ReactNode} from 'react';
import * as React from 'react';
import {Popconfirm, Table, Icon, Form, Button, Input, message, Row, Col} from 'antd';
import DvaProps from '../types/DvaProps';

const FormItem = Form.Item;
const { TextArea } = Input;

interface FormProps extends DvaProps {
    form: any;
    questions: QuestionFormData[];
}

export class QuestionFormData {
    qid: string;
    question: string;
    qanswer: string;
    qtype: string;
    qunit: string;
}

interface  QuestiontoEdit{
    qid_t: string;
    question_t: string;
    qanswer_t: string;
    qtype_t: string;
    qunit_t: string;
}

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

export class QuestionSearchForm extends Component<FormProps,  QuestiontoEdit> {
    constructor(props){
        super(props);
        this.state = {

            qid_t: '1',
            question_t: 'Is monkey an animal?',
            qanswer_t: 'yes',
            qtype_t: 'Judge',
            qunit_t: '1',
        };
    }

    componentDidMount() {
    }



    handleSearch = (direction) => {
        const{form} = this.props;
        var info;
        if(direction == "qid"){
            info =  form.getFieldValue("qid");
        }
        else if(direction == "qunit"){
            info =  form.getFieldValue("qunit");
        }
        else if(direction == "qtype"){
            info =  form.getFieldValue("qtype");
        }
        else if(direction == "all"){
            info =  form.getFieldValue("all");
        }

        const values = {
            direction: direction,
            info:info,
        }
        this.props.dispatch({type:'teacherquestion/search', payload: values});
        console.log("Search question: "+direction);
        console.log(values);



        /*e.preventDefault();
        const formProps = this.props.form;
        formProps.validateFieldsAndScroll((err: any, values: QuestionFormData) => {
            if (err) {
                message.error('信息填写不合法');
                return;
            }

            this.props.dispatch({type:'teacherquestion/search', payload: values});
            console.log("searchquestion");
            console.log(values);
        });*/
    };



    handleDelete = (id) => {
//        e.preventDefault();
            console.log("deletequestion:"+id);
            const values = {
                qid: id,
            }
            this.props.dispatch({type:'teacherquestion/delete', payload: values});     //!!!!!!!!
        location.reload();
       /*
            const DelDataSource = this.props.questions;
            DelDataSource.splice(id, 1);
            this.setState({questions: DelDataSource});
         */
                /*list.splice(行号,1)
this.setState({list});*/
    };

    handleSetUpdate = (id)=>{
     //   this.props.dispatch({type:'teacherquestion/setupdate', payload: id});

        const{form} = this.props;
        const list = this.props.questions;

        const qid = form.getFieldValue('qid_t');
        const question = form.getFieldValue('question_t');
        const qanswer = form.getFieldValue('qanswer_t');
        const qtype = form.getFieldValue('qtype_t');
        const qunit = form.getFieldValue('qunit_t');

        var index = 0;
        for(var i=0;i<list.length;i++){
            if(list[i].qid == id){
                index = i;

                break;
            }
        }

        console.log(id);
        form.setFieldsValue({
            qid_t: list[index].qid,
            question_t: list[index].question,
            qanswer_t: list[index].qanswer,
            qtype_t: list[index].qtype,
            qunit_t: list[index].qunit,
        });

    }

    handleUpdate = ()=>{
        const{form} = this.props;
        const values = {
            qid: form.getFieldValue("qid_t"),
            question: form.getFieldValue("question_t"),
            qanswer: form.getFieldValue("qanswer_t"),
            qunit: form.getFieldValue("qunit_t"),
            qtype: form.getFieldValue("qtype_t"),
        }
        this.props.dispatch({type:'teacherquestion/update', payload: values});
        console.log("update question");
        console.log(values);

        location.reload();
    }

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

        const columns = [
            {
                title: '题目号',
                dataIndex: 'qid',
                key: 'qid',
            },{
            title: '问题',
            dataIndex: 'question',
            key: 'q',

        }, {
            title: '答案',
            dataIndex: 'qanswer',
            key: 'answer',
        }, {
            title: '类型',
            dataIndex: 'qtype',
            key: 'type',
        }, {
            title: '单元号',
            dataIndex: 'qunit',
            key: 'unit',
        },  {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <span>
                <span className="ant-divider" />
                    <Popconfirm title="Delete?" onConfirm={() => this.handleDelete(record.qid)}>
                        <Button>删除</Button>
                    </Popconfirm>
                <span className="ant-divider" />
                    <Button onClick={() => this.handleSetUpdate(record.qid)}>修改</Button>
                </span>
            ),
        }];



        return (
            <Form onSubmit={this.handleSearch}>

                    <Row type="flex" justify="center">
                        <Col span={4}>
                            <Button icon="copy" type="primary" onClick={()=>this.handleSearch("all")}>搜索全部题目</Button>
                        </Col>
                        <Col span={4}>
                            <Button icon="copy" type="primary" onClick={()=>this.handleSearch("qid")}>按题目号搜索</Button>
                        </Col>
                        <Col span={4}>
                            <Button icon="copy" type="primary" onClick={()=>this.handleSearch("qunit")}>按单元号搜索</Button>
                        </Col>
                        <Col span={4}>
                            <Button icon="copy" type="primary" onClick={()=>this.handleSearch("qtype")}>按题型搜索</Button>
                        </Col>
                    </Row>
                <br/>

                <FormItem label="题目号" {...formItemLayout} hasFeedback>
                    {
                        getFieldDecorator('qid', {
                            rules: [
                                {pattern: /^[0-9]+$/, message: '请输入数字'}
                            ]
                        })(

                            <Input />
                        )
                    }
                </FormItem>



                <FormItem label="单元" {...formItemLayout} hasFeedback>
                    {
                        getFieldDecorator('qunit', {
                            rules: [
                              //  {required: true, message: '该知识点的单元号'}
                            ]
                        })(
                            <Input />
                        )
                    }
                </FormItem>

                <FormItem label="题型编号" {...formItemLayout} hasFeedback>
                    {
                        getFieldDecorator('qtype', {
                            rules: [
                                {pattern: /^[0-9]+$/, message: '请输入题型（1：判断，2：选择，3：填空）'}
                            ]
                        })(
                            <Input />
                        )
                    }
                </FormItem>



                <Table rowKey="qid" columns = {columns} dataSource = {this.props.questions}/>





                <FormItem label="题目" {...formItemLayout} hasFeedback>
                    {
                        getFieldDecorator('question_t', {
                            rules: [
                                //   {required: true, message: '请输入题目'}
                            ]
                        })(
                            <Input />
                            // <TextArea rows={4} />
                        )
                    }
                </FormItem>

                <FormItem label="答案" {...formItemLayout} hasFeedback>
                    {
                        getFieldDecorator('qanswer_t', {
                            rules: [
                                // {required: true, message: '请输入答案'}
                            ]
                        })(
                            <Input  />
                        )
                    }
                </FormItem>

                <FormItem label="单元" {...formItemLayout} hasFeedback>
                    {
                        getFieldDecorator('qunit_t', {
                            rules: [
                                //  {required: true, message: '该知识点的单元号'}
                            ]
                        })(
                            <Input />
                        )
                    }
                </FormItem>

                <FormItem label="题型编号" {...formItemLayout} hasFeedback>
                    {
                        getFieldDecorator('qtype_t', {
                            rules: [
                                {pattern: /^[0-9]+$/, message: '请输入数字'}
                            ]
                        })(
                            <Input />
                        )
                    }
                </FormItem>

                <FormItem {...tailFormItemLayout}>
                    <Button icon="copy" type="primary" onClick={()=>this.handleUpdate()} >修改</Button>
                </FormItem>



            </Form>



        );
    }
}

const WrappedQuestionSearchForm: any = Form.create({})(QuestionSearchForm);

export {WrappedQuestionSearchForm};
