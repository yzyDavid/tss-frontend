import {Component, FormEvent, ReactNode} from 'react';
import * as React from 'react';
import {Icon, Form, Button, Input, message, Table, Checkbox, Modal, Popconfirm, DatePicker, Row, Col} from 'antd';
import DvaProps from '../types/DvaProps';
import {PaperFormData} from './TestsysTeacherPaperInsertForm';
import {SearchPageProps} from './TestsysTeacherPaperSearch'
import * as moment from "moment";
import {Moment} from "moment";



const FormItem = Form.Item;
const { TextArea } = Input;
const { RangePicker } = DatePicker;

interface PaperFormProps extends SearchPageProps {
    form: any;
    paperlist:PaperFormData[];
    uid: string;


}

interface EditState {
  //  paperlist: PaperFormData[];
    index: number;      //list的第几个
    modalVisible: boolean;
    buttonDisable: boolean;
    isauto: boolean;
    uuid: number;
    select: string;
    question_data: {qid:string, score:string}[];

    pid_t: string;
    papername_t: string;
    begin_t: string;
    end_t: string;
    last_t: string;
    count_t: string;
    isauto_t: boolean;
    qid_t: string[];  //题目
    score_t: string[];//对应分支
}

export class PaperSearchForm extends Component<PaperFormProps, EditState> {
    componentDidMount() {
    }
    constructor(props){
        super(props);
        this.state = {
            index:0,
            modalVisible: false,
            buttonDisable: false,
            isauto: false,
            uuid:0,
            select: '0',
            question_data:[],

            pid_t: '1',
            papername_t:'hello',
            begin_t: '2018-04-30 16:30:00',
            end_t: '2018-04-30 16:30:00',
            last_t: '1:00:00',
            count_t: '2',
            isauto_t: false,
            qid_t: ['1111', '2222'],
            score_t: ['10', '20'],
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
    handleOk(e){
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if(!err)
                this.setModalVisible(false);
        });

    }
    handleSubmit = (e: FormEvent<{}>) => {
        e.preventDefault();
        const formProps = this.props.form;
        formProps.validateFieldsAndScroll((err: any, fieldsValue) => {
            if (err) {
                message.error('信息填写不合法');
                return;
            }
            const values = {
                   ...fieldsValue
            };
            console.log('Paper Search: ', values);
     //       this.props.dispatch({type:'teacherpaper/update', payload: values});
        });

    };

    handleSearch = () => {
        console.log("searchpaper");
        const values = {
            direction: "all",
            info: "",
        }
        this.props.dispatch({type:'teacherpaper/search', payload: values});
    }

    handleSetUpdate = (id)=>{
       // this.props.dispatch({type:'teacherpaper/setupdate', payload: id});
        this.setState({select:id});

        const{form} = this.props;
        const list = this.props.paperlist;

        var index = 0;  //list中第几个
        for(var i=0;i<list.length;i++){
            if(list[i].pid == id){
                index = i;

                break;
            }
        }

        if(index == list.length)
            console.log("no such id!");


        var qlist = list[index].qid;
        var slist = list[index].score;

        console.log("list:"+list[0].qid+"  index:"+index);
        for(var i=0;i<qlist.length;i++){

            this.state.question_data[i] = {qid: qlist[i], score: slist[i]};
            console.log("i:"+i);
            console.log("q:"+qlist[i]);
            console.log("s:"+slist[i]);
        }

        this.setState({question_data:this.state.question_data});
        this.setState({index:index});



        console.log("index:"+index);
        const pid = form.getFieldValue('pid');
        const papername = form.getFieldValue('papername');
        const isauto = form.getFieldDecorator('auto');
        const begin = form.getFieldValue('begin');
        const end = form.getFieldValue('end');
        const last = form.getFieldValue('last');
        const pid_t = form.getFieldValue('pid_t');

        form.setFieldsValue({
            pid: list[index].pid,
            papername: list[index].papername,
            isauto: list[index].isauto,
            begin: moment(list[index].begin),
            end: moment(list[index].end),
            last:list[index].last,
            //begin end
            pid_t:list[index].pid,

        });
     //  console.log(form.getFieldValue('pid_t'));

        this.setState({pid_t:list[index].pid, papername_t:list[index].papername, isauto_t:list[index].isauto, begin_t:list[index].begin,
        end_t:list[index].end, last_t:list[index].last, count_t:list[index].count, qid_t:list[index].qid, score_t:list[index].score});

    };


    handleUpdate = ()=>{
        const{form} = this.props;
        const rangeTimeValue =  form.getFieldValue("range-time-picker");

        const list = this.props.paperlist;
        var add = this.state.uuid;
        var c = Number(list[this.state.index].count);
        var qid_old = list[this.state.index].qid;
        var score_old = list[this.state.index].score;

        for(var i = 0; i < add; i++){
            c = c+1;
            var cs = String(i);
            var qid_n = form.getFieldValue("nums[" + cs + "]");
            var score_n = form.getFieldValue("scores[" + cs + "]");


            qid_old=[
                ...qid_old,
                qid_n
            ]
            score_old=[
                ...score_old,
                score_n
            ];



        }

        const values = {
            pid: form.getFieldValue("pid_t"),
            papername: form.getFieldValue("papername"),
            begin:  form.getFieldValue("begin").format('YYYY-MM-DD HH:mm:ss'),
            end:  form.getFieldValue("end").format('YYYY-MM-DD HH:mm:ss'),
            last: form.getFieldValue("last"),
            isauto: this.state.isauto,     //?

            count: c,
            qid:qid_old,
            score: score_old,

        }
        this.props.dispatch({type:'teacherpaper/update', payload: values});
        console.log("update paper");
        console.log(values);

        location.reload();
    }

    handleDeletePaper = (pid) => {
        console.log("deletepaper:"+pid);
        this.props.dispatch({type:'teacherpaper/delete', payload: {pid:pid}});
        location.reload();
    }

    handleDelete = (qid) => {

        const{form} = this.props;

        const list = this.props.paperlist;


        var c = Number(list[this.state.index].count) - 1;
        var qid_old = list[this.state.index].qid;
        var score_old = list[this.state.index].score;


        var qindex;
        var i;
        for(i = 0; i < Number(list[this.state.index].count); i++){
            console.log("this:",list[this.state.index].qid[i]);
            console.log("target:",qid);
            if(list[this.state.index].qid[i] == qid){
                qindex = i;
                break;
            }
        }
        if(i == Number(list[this.state.index].count)){
            console.log("no such qid");
            return;
        }
        qid_old.splice(qindex,1);
        score_old.splice(qindex,1);


        const values = {
            pid: form.getFieldValue("pid"),
            papername: form.getFieldValue("papername"),
            begin:   form.getFieldValue("begin").format('YYYY-MM-DD HH:mm:ss'),
            end:   form.getFieldValue("end").format('YYYY-MM-DD HH:mm:ss'),
            last: form.getFieldValue("last"),
            isauto: this.state.isauto,     //?

            count: c,
            qid:qid_old,
            score: score_old,

        }

        console.log(qindex);
   //     this.setState({question_data: this.state.question_data.splice(qindex,1)})
        this.props.dispatch({type:'teacherpaper/update', payload: values});
        console.log("update paper(delete)");
        console.log(values);

        location.reload();
       // const DelDataSource = this.props.paperlist;
        //DelDataSource.splice(id, 1);
//

    };

    handleDeleteQuestion = (id) => {            //无用

        console.log(id);
        this.props.dispatch({type:'teacherpaper/deletequestion', payload: id});     //!!!!!!!!
        // const DelDataSource = this.props.paperlist;
        //DelDataSource.splice(id, 1);
//

    };

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
        console.log("id:"+this.state.uuid);
        // can use data-binding to set
        // important! notify form to detect changes
        form.setFieldsValue({
            keys: nextKeys,
        });
    /*

    */
    }





    render() {
        const { getFieldDecorator, getFieldValue} = this.props.form;

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
                    {getFieldDecorator(`scores[${k}]`, {
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
            title: '试卷号',
            dataIndex: 'pid',
            key: 'pid',
        }, {
            title: '试卷名',
            dataIndex: 'papername',
            key: 'papername',
        }, {
            title: '开始时间',
            dataIndex: 'begin',
            key: 'begin',
        }, {
            title: '结束时间',
            dataIndex: 'end',
            key: 'end',
        }, {
            title: '持续时间',
            dataIndex: 'last',
            key: 'last',
        },  {
            title: '操作',
            key: '操作',
            render: (text, record) => (
                <span>
                <span className="ant-divider" />
                    <Popconfirm title="真的要删除?" onConfirm={() => this.handleDeletePaper(record.pid)}>
                        <Button>删除</Button>
                    </Popconfirm>
                <span className="ant-divider" />

                        <Button onClick={() => this.handleSetUpdate(record.pid)}>修改试卷</Button>

                </span>
            ),
        }];


        const columns_question = [{
            title: '题目号',
            dataIndex: 'qid',
            key: 'qid'
        },{
            title: '分值',
            dataIndex: 'score',
            key: 'score',
        },  {
            title: '操作',
            key: '操作',
            render: (text, record) => (
                <span>
                <span className="ant-divider" />
                    <Popconfirm title="真的要删除?" onConfirm={() => this.handleDelete(record.qid)}>
                        <Button>删除</Button>
                    </Popconfirm>



                </span>
            ),
        }]


        return (
            <Form>
                <Row type="flex" justify="center">
                    <Col >
                        <Button onClick={()=>this.handleSearch()}>查询所有试卷</Button>
                    </Col>
                </Row>
                <br/>
                <Table rowKey="pid" columns = {columns} dataSource = {this.props.paperlist}/>

                <Form >


                    <FormItem label="试卷名称" {...formItemLayout} hasFeedback>
                        {
                            getFieldDecorator('papername', {
                                rules: [
                                    {required: true, message: '请输入名称'}
                                ]
                            })(

                                <Input/>
                            )
                        }
                    </FormItem>

                    <FormItem {...formItemLayout} label="开始时间"
                    >
                        {getFieldDecorator('begin', {
                            rules: [
                                { required: true, message: '请选择时间!' }
                            ]
                        })(
                            <DatePicker  showTime format="YYYY-MM-DD HH:mm:ss" />
                        )}
                    </FormItem>

                    <FormItem {...formItemLayout} label="结束时间"
                    >
                        {getFieldDecorator('end', {
                            rules: [
                                { required: true, message: '请选择时间!' }
                            ]
                        })(
                            <DatePicker  showTime format="YYYY-MM-DD HH:mm:ss" />
                        )}
                    </FormItem>



                    <FormItem label="持续时间" {...formItemLayout} hasFeedback>
                        {
                            getFieldDecorator('last', {
                                rules: [
                                    {required: true, message: '请输入名称'},
                                    {pattern: /[1-9][0-9]?:[0-5][0-9]:[0-5][0-9]$/, message: '请按照格式 hh:mm:ss 如：1:00:00'}
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

                    <FormItem {...tailFormItemLayout} >
                        <Button icon="edit" type="primary"
                                disabled={ this.state.buttonDisable}
                                onClick={() => this.setModalVisible(true)}>新增题目</Button>
                    </FormItem>

                    <FormItem {...tailFormItemLayout}>
                        <Button icon="copy" type="primary" onClick={()=>this.handleUpdate()}>修改</Button>
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

                    <Table  rowKey="qid" columns = {columns_question} dataSource = {this.state.question_data}/>

                </Form>
            </Form>



        );
    }
}

const WrappedPaperSearchForm: any = Form.create({})(PaperSearchForm);

export {WrappedPaperSearchForm};


