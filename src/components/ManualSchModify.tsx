import * as React from 'react';
import {Component} from 'react';
import {Form, Button, Table, Select} from 'antd';
import DvaProps from '../types/DvaProps';
import NavigationBar from './TssPublicComponents';

interface UserManageProps extends DvaProps {
    form: any;
}

interface UserState {
    modalVisible: boolean;
}

interface roomResource {
    data: any;
    pagination: any;
    loading: boolean;
}

const FormItem = Form.Item;
const Option = Select.Option;

const columns = [
    {title: '地点', dataIndex: 'classroomAddress', key: 'classroomAddress'},
    {title: '时间', dataIndex: 'classroomTime', key: 'classroomTime'},
    {tile: '操作', key: 'operation', render:()=>(<a>修改至该时间</a>)}
    ];

const data = [
    {key: 1, classroomAddress: '东一102', classroomTime: '16:30-18:30'},
    {key: 2, classroomAddress: '东二202', classroomTime: '16:30-18:30'},
    {key: 3, classroomAddress: '西一223', classroomTime: '16:30-18:30'},
    {key: 4, classroomAddress: '西二308', classroomTime: '16:30-18:30'},
    {key: 5, classroomAddress: '东一105', classroomTime: '16:30-18:30'},
];

/*
class classroomData extends Component<UserManageProps,roomResource>{
    constructor(props){
        super(props);
        this.state = {
            data: [],
            pagination: {},
            loading: false,
        }
        this.handleTableChange = this.handleTableChange.bind(this);
    }

    handleTableChange(pagination, filters, sorter) {
        const pager = this.state.pagination;
        pager.current = pagination.current;
        this.setState({
            pagination: pager,
        });
        this.fetch({
            results: pagination.pageSize,
            page: pagination.current,
            sortField: sorter.field,
            sortOrder: sorter.order,
            ...filters,
        });
    }
    fetch(params = {}) {
        console.log('请求参数：', params);
        this.setState({ loading: true });
        request({
            url: 'http://api.randomuser.me',
            method: 'get',
            data: {
                results: 10,
                ...params,
            },
            type: 'json',
        }).then(data => {
            const pagination = this.state.pagination;
            // Read total count from server
            // pagination.total = data.totalCount;
            pagination.total = 200;
            this.setState({
                loading: false,
                data: data.results,
                pagination,
            });
        });
    }
    componentDidMount() {
        this.fetch();
    }
    render() {
        return (
            <Table columns={columns}
                   rowKey={record => record.registered}
                   dataSource={this.state.data}
                   pagination={this.state.pagination}
                   loading={this.state.loading}
                   onChange={this.handleTableChange}
            />
        );
    }

}
*/

class SearchForm extends Component<UserManageProps, {}> {
    handleSearch = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log('Received values of form: ', values);
        });
    }
    handleReset = () => {
        this.props.form.resetFields();
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <div>
                <Form className="ant-advanced-search-form" layout={"inline"} onSubmit={this.handleSearch}>
                    <FormItem
                        label="校区" style={{paddingLeft: 20}}>
                        {getFieldDecorator('campus', {})(
                            <Select style={{width: 200}}>
                                <Option value="玉泉校区">玉泉校区</Option>
                                <Option value="紫金港校区">紫金港校区</Option>
                                <Option value="西溪校区">西溪校区</Option>
                                <Option value="华家池校区">华家池校区</Option>
                                <Option value="之江校区">之江校区</Option>
                            </Select>
                        )}
                    </FormItem>
                    <FormItem
                        label="日期" >
                        {getFieldDecorator('classroomDate', {})(
                            <Select style={{width: 200}}>
                                <Option value="周一">周一</Option>
                                <Option value="周二">周二</Option>
                                <Option value="周三">周三</Option>
                                <Option value="周四">周四</Option>
                                <Option value="周五">周五</Option>
                                <Option value="周六">周六</Option>
                                <Option value="周日">周日</Option>
                            </Select>
                        )}
                    </FormItem>
                    <FormItem
                        label="时间" >
                        {getFieldDecorator('classroomTime', {})(
                            <Select style={{width: 200}}>
                                <Option value="全部">全部</Option>
                                <Option value="第1,2节">第1,2节</Option>
                                <Option value="第3,4节">第3,4节</Option>
                                <Option value="第3,4,5节">第3,4,5节</Option>
                                <Option value="第6,7,8节">第6,7,8节</Option>
                                <Option value="第7,8节">第7,8节</Option>
                                <Option value="第9,10节">第9,10节</Option>
                                <Option value="第11,12,13节">第11,12,13节</Option>
                            </Select>
                        )}
                    </FormItem>
                    <Button icon="search" type="primary" htmlType="submit">搜索</Button>
                </Form>
                <Table
                    style={{width: "100%", background: "#ffffff"}}
                    columns={columns}
                    dataSource={data}
                    className="table"/>
            </div>
        );
    }
}

const WrappedSearchForm: any = Form.create({})(SearchForm);

export default class ManualSchModifyComponent extends Component<UserManageProps, UserState> {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false
        };
    }

    formRef: any;

    setModalVisible(modalVisible) {
        if (this.formRef && modalVisible === true) this.formRef.refresh();
        this.setState({modalVisible: modalVisible});
    };

    handleOk(e) {
        // if(!this.formRef.handleSubmit(e)) this.setModalVisible(false);
    }

    render() {
        return (
            <div>
                <NavigationBar current={"course"} dispatch={this.props.dispatch}/>
                <br/>
                <div>
                    <WrappedSearchForm/>
                </div>
            </div>
        );
    }
}

