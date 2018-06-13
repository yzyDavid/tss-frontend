import {Component, FormEvent, ReactNode} from 'react';
import * as React from 'react';
import {Popconfirm, Table, Icon, Form, Button, Input, message, Modal} from 'antd';
import DvaProps from '../types/DvaProps';

const FormItem = Form.Item;
const { TextArea } = Input;

interface studentProp extends DvaProps {
    form:any;

    // qids: string[];
    // rates: string[];
    qresult: any[];

}

export class ResultFormData {
    qid:string;
    rate: string;
}

interface  ResultList{
    pid: string;
    papername: string;
    begin: string;
    end: string;
    results: ResultFormData[];
    modalVisible: boolean;

}


export class ResultSearchPidForm extends Component<studentProp,  ResultList> {
    constructor(props){
        super(props);
        // this.state = {
        //     pid: '233',
        //     papername: '第一套',
        //     begin: '2018-04-30 16:30:00',
        //     end: '2018-04-30 16:30:00',
        //     modalVisible: false,
        //
        //     results :[/*{
        //         qid: '10',
        //         avg: '90'
        //         ,
        //     }, {
        //         qid: '11',
        //         avg: '93'
        //     },{
        //         qid: '10',
        //         avg: '71'
        //     }*/ ]
        // };
        // for(let i in this.props.qids) {
        //     this.state.results.push({
        //         qid: this.props.qids[i],
        //         rate: this.props.rates[i],
        //     });
        // }
    }

    componentDidMount() {
    }

    handleSearch = (e: FormEvent<{}>) => {
        e.preventDefault();
        const formProps = this.props.form;
        formProps.validateFieldsAndScroll((err: any, values: ResultFormData) => {
            if (err) {
                message.error('信息填写不合法');
                return;
            }
            const{form} = this.props;
            const pid = form.getFieldValue("pid");
            console.log("tr/search: "+pid);
            this.props.dispatch({type:'teacherresult/search', payload: {type:1, sid:null, pid:pid, qtype:null, qunit:null}});
        });


     //   for(var i = 0; i < this.props.qid.length; i++)
   //             this.state.results[i] = {qid: this.props.qid[i], avg: this.props.avg[i]};

    };



    handleDetail = (id) => {
//        e.preventDefault();

        this.props.dispatch({type:'teacherquestion/detail', payload: id});     //!!!!!!!!


    };

    formRef: any;
    setModalVisible(modalVisible) {
        if(this.formRef && modalVisible === true) this.formRef.refresh();
        this.setState({ modalVisible: modalVisible });
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

        const columns = [{
            title: '题目编号',
            dataIndex: 'qid',
            key: 'qid',
        },{
            title: '题目内容',
            dataIndex: 'question',
            key: 'question',
        } , {
            title: '答案',
            dataIndex: 'qanswer',
            key: 'qanswer',
        } ,  {
            title: '单元',
            dataIndex: 'qunit',
            key: 'qunit',
        } ,  {
            title: '题型',
            dataIndex: 'qtype',
            key: 'qtype',
        } ,  {
            title: '正确率',
            dataIndex: 'rate',
            key: 'rate',

        }];



        return (
            <Form onSubmit={this.handleSearch}>



                <FormItem label="试卷号" {...formItemLayout} hasFeedback>
                    {
                        getFieldDecorator('pid', {
                            rules: [
                                {required: true, message: '请输入试卷号'},
                                {pattern: /^[0-9]+$/, message: '请输入数字'}
                            ]
                        })(
                            <Input  placeholder="请输入试卷号"/>
                        )
                    }
                </FormItem>


                <FormItem {...formItemLayout}>
                    <Button icon="copy" type="primary" htmlType="submit">搜索</Button>

                </FormItem>


                <Table columns = {columns} rowKey = "qid" dataSource = {this.props.qresult}/>
            </Form>



        );
    }
}

const WrappedResultSearchPidForm: any = Form.create({})(ResultSearchPidForm);

export {WrappedResultSearchPidForm};
