import * as React from 'react';
import {Component} from 'react';
import {Form, Button, Input, Select, Table, Divider} from 'antd';
//import reqwest from 'reqwest';
import DvaProps from '../types/DvaProps';
import NavigationBar from './TssPublicComponents';

interface UserManageProps extends DvaProps {
    form: any;
}

interface UserState {
    modalVisible: boolean;
}

const columns = [
    {title: '课程号', dataIndex: 'courseNumber', key: 'courseNumber'},
    {title: '课程名称', dataIndex: 'courseTitle', key: 'courseTitle'},
    {title: '上课地点', dataIndex: 'courseAddress', key: 'courseAddress'},
    {title: '上课时间', dataIndex: 'courseTime', key: 'courseTime'},
    {title: '操作', dataIndex: 'courseModify', key: 'courseModify', render: () => (<div><WrappedModifyButton/></div>)},
];

const data = [
    {key: 1, courseNumber: '胡彦斌', courseTitle: '线性代数', courseAddress: '3150100001', courseTime: '16:30-18:30', courseModify: ''},
    {key: 2, courseNumber: '吴彦祖', courseTitle: '微积分', courseAddress: '3150100002', courseTime: '16:30-18:30', courseModify: ''},
    {key: 3, courseNumber: '李大嘴', courseTitle: '大学英语', courseAddress: '3150100003', courseTime: '16:30-18:30', courseModify: ''},
    {key: 4, courseNumber: '小明', courseTitle: '大学物理（甲）', courseAddress: '3150100004', courseTime: '16:30-18:30', courseModify: ''},
    {key: 5, courseNumber: '小李', courseTitle: '微积分', courseAddress: '3150100005', courseTime: '16:30-18:30', courseModify: ''},
    {key: 6, courseNumber: '小红', courseTitle: '大学物理（甲）', courseAddress: '3150100006', courseTime: '16:30-18:30', courseModify: ''},
    {key: 7, courseNumber: '小王', courseTitle: '大学英语', courseAddress: '3150100007', courseTime: '16:30-18:30', courseModify: ''},
    {key: 8, courseNumber: '小张', courseTitle: '线性代数', courseAddress: '3150100008', courseTime: '16:30-18:30', courseModify: ''},
    {key: 9, courseNumber: '小天', courseTitle: '大学物理（甲）', courseAddress: '3150100009', courseTime: '16:30-18:30', courseModify: ''},
    {key: 9, courseNumber: '小小明', courseTitle: '微积分', courseAddress: '3150100010', courseTime: '16:30-18:30', courseModify: ''},
    {key: 9, courseNumber: '小天', courseTitle: '大学英语', courseAddress: '3150100011', courseTime: '16:30-18:30', courseModify: ''},
    {key: 9, courseNumber: '小天', courseTitle: '线性代数', courseAddress: '3150100012', courseTime: '16:30-18:30', courseModify: ''},

];

const FormItem = Form.Item;
const Option = Select.Option;

class ModifyButton extends Component{
    constructor(props){
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        //send the requirement of this to the back
        //open a new window

    }

    render() {
        return (
            <Button
                onClick={this.handleClick}>
                修改
            </Button>
        );
    }

}

const WrappedModifyButton: any = Form.create({})(ModifyButton);

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
        reqwest({
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
                   //rowKey={record => record.registered}
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
                        label="校区" >
                        {getFieldDecorator('campus', {})(
                            <Select style={{width: 200}}>
                                <Option value="玉泉校区">玉泉校区</Option>
                                <Option value="紫金港校区">紫金港校区</Option>
                                <Option value="西溪校区">西溪校区</Option>
                                <Option value="华家池校区">华家池校区</Option>
                                <Option value="之江校区">之江校区</Option>
                                <Option value="舟山校区">舟山校区</Option>
                            </Select>
                        )}
                    </FormItem>
                    <FormItem label="课程名称">
                        {
                            getFieldDecorator('courseName', { })(
                                <Input placeholder="请输入课程名称" style={{width: 200}}/>)
                        }
                    </FormItem>
                    <Button
                        icon="search"
                        type="primary"
                        htmlType="submit" >搜索
                    </Button>
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

export default class ManualSchedulingComponent extends Component<UserManageProps, UserState> {
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

