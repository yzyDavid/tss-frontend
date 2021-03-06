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
    results: any[];
}

export class ResultFormData {
    // id: string;
    // pid: string;
    // date: string;
    // score: string;
    qid: string;
    rate: string;

}

interface  ResultList{
    sid: string;
    gpa: string;
    results: ResultFormData[];
    modalVisible: boolean;

}


export class ResultSearchSidForm extends Component<studentProp,  ResultList> {
    constructor(props){
        super(props);
        this.state = {
            sid: '3150101234',
            gpa: '4.5',
            modalVisible: false,

            results :[
//                 {
//                 id: '1',
//                 pid: '10',
//                 date: '2018-04-30 16:30:00',
//                 score: '90'
// ,
//             }, {
//                 id: '2',
//                 pid: '10',
//                 date: '2018-04-24 16:30:00',
//                 score: '93'
//             },{
//                 id: '3',
//                 pid: '10',
//                 date: '2018-04-25 16:30:00',
//                 score: '70'
//             }
            ]
        };
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
            // this.props.dispatch({type:'teacherresult/search', payload: values});
            const{form} = this.props;
            const sid = form.getFieldValue("sid");
            console.log("tr/search: "+sid);
            this.props.dispatch({type:'teacherresult/search', payload: {type:0, sid:sid, pid:null, qtype:null, qunit:null}});
        });
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
            title: '试卷编号',
            dataIndex: 'pid',
            key: 'pid',
        }, {
            title: '考试日期',
            dataIndex: 'date',
            key: 'date',
        },   {
            title: '考试成绩',
            dataIndex: 'score',
            key: 'score',
            /*
            render: (text, record) => (
                <span>

                <span className="ant-divider" />
                    <Button onClick={() => this.handleDetail(record.id)}>点我</Button>

                </span>
            ),*/
        //     title: '题目编号',
        //     dataIndex: 'qid',
        //     key: 'qid',
        //     render: text => <a href="#">{text}</a>,
        // },   {
        //     title: '正确率',
        //     dataIndex: 'rate',
        //     key: 'rate',
        }];



        return (
            <Form onSubmit={this.handleSearch}>

                <FormItem label="学号" {...formItemLayout} hasFeedback>
                    {
                        getFieldDecorator('sid', {
                            rules: [
                                   {required: true, message: '请输入学号'},
                                {pattern: /^[0-9]+$/, message: '请输入数字'}
                            ]
                        })(
                            <Input placeholder="请输入学号"/>
                            // <TextArea rows={4} />
                        )
                    }
                </FormItem>



                <FormItem {...formItemLayout}>
                    <Button icon="copy" type="primary" htmlType="submit">搜索</Button>

                </FormItem>


                <Table columns = {columns} rowKey="pid" dataSource = {this.props.results}/>
            </Form>



        );
    }
}

const WrappedResultSearchSidForm: any = Form.create({})(ResultSearchSidForm);

export {WrappedResultSearchSidForm};
