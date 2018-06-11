import * as React from 'react';
import {Component} from 'react';
import {Form, Button, Input, Select, Table, Modal, message} from 'antd';;
import DvaProps from '../types/DvaProps';
import {NavigationBar} from './TssPublicComponents';
import {browserHistory, routerRedux} from 'dva/router';

const FormItem = Form.Item;
const Option = Select.Option;

interface ManualSchedulingProps extends DvaProps {
    form: any;
    dataSource: any;
}

interface ViewState {
    refresh: boolean;
    modalState: boolean;
}

export class SchedulingTime {
    year: number;
    semester: any;
}

var selectedValue = {year: -1, semester: 1};

class SearchForm extends Component<ManualSchedulingProps,ViewState> {
    constructor(props){
        super(props);
        this.state = {
            refresh : false,
            modalState: false,
        }
        selectedValue  = { year:20, semester: 1};
        this.handleSubmit1 = this.handleSubmit1.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    handleSubmit1 = (e) => {
        e.preventDefault();
        const formProps = this.props.form;
        formProps.validateFieldsAndScroll((err: any, values: SchedulingTime) => {
            if (err) {
                message.error('未选择设置内容');
                return;
            }
            if(values.year&&values.semester)
            {
                console.log(values);
                selectedValue = values;
                this.props.dispatch({type: 'autoscheduling/setSchedulingInfo', payload: values});
                this.setState({refresh:true, modalState: true});
            }else
                message.error('未选择设置内容');
        });
    }

    handleOk() {
        this.setState({modalState: false,});
    };

    handleCancel(e) {
        this.setState({modalState: false,});
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <div>
                <Form layout={"horizontal"} onSubmit={this.handleSubmit1} style={{textAlign: 'center', fontSize: 'large'}}>
                    <FormItem
                        label="年份: " >
                        {getFieldDecorator('year', {})(
                            <Select style={{width: 200}}>
                                <Option value="2017">2017</Option>
                                <Option value="2018">2018</Option>
                                <Option value="2019">2019</Option>
                                <Option value="2020">2020</Option>
                                <Option value="2021">2021</Option>
                                <Option value="2022">2022</Option>
                            </Select>
                        )}
                    </FormItem>
                    <FormItem
                        label="学期" >
                        {getFieldDecorator('semester', {})(
                            <Select style={{width: 200}}>
                                <Option value="FIRST">第一学期</Option>
                                <Option value="SECOND">第二学期</Option>
                            </Select>
                        )}
                    </FormItem>
                    <Button
                        icon="check"
                        type="primary"
                        htmlType="submit"
                        onClick={this.handleSubmit1}>选择
                    </Button>
                    <Modal title="设置成功" visible={this.state.modalState}
                           onOk={this.handleOk} onCancel={this.handleCancel}>
                        <br/>
                        <p> 选中年份: {selectedValue.year}</p>
                        <br/>
                        <p> 选中学期: {selectedValue.semester}</p>
                        <br/>
                    </Modal>
                </Form>
            </div>
        );
    }
}

const WrappedSearchForm: any = Form.create({})(SearchForm);

export default class ManualSchedulingComponent extends Component<ManualSchedulingProps> {
    constructor(props) {
        super(props);
    }

    render() {
        selectedValue=this.props.dataSource;
        return (
            <div>
                {/*<NavigationBar current={"course"} dispatch={this.props.dispatch}/>*/}
                <br/>
                <div>
                    <WrappedSearchForm dispatch={this.props.dispatch} dataSource={this.props.dataSource}/>
                </div>
            </div>

        );
    }
}

