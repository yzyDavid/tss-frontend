import * as React from 'react';
import {Component} from 'react';
import {Form, Button, Modal, Layout, Col, Row} from 'antd';
import DvaProps from '../types/DvaProps';
import {WrappedInfoEditForm} from './InfoEditForm';
import {getType} from "../utils/localStorage";
import {apiBaseUrl} from "../configs/apiBaseUrl";
import {getUid} from "../utils/localStorage";


interface UserProps extends DvaProps {
    uid: string;
    email: string;
    telephone: string;
    intro: string;
    pswdShow: boolean;
    name: string,
    dept: string,
    year: string,
    type: string,
    gender: string,
    majorClass: string
}

interface UserState {
    modalVisible: boolean;
    photo: string;
}

const FormItem = Form.Item;
const {Content} = Layout;
const formLayout1 = {
    labelCol: {span: 8, offset: 8},
    wrapperCol: {span: 8}
};

const formLayout2 = {
    labelCol: {span: 4, offset: 4},
    wrapperCol: {span: 8}
};

export default class UserPageComponent extends Component<UserProps, UserState> {
    componentDidMount() {
        const type = getType();
        if(type != 'Teaching Administrator' && type != 'System Administrator' && type != 'Teacher' && type != 'Student'){
            this.props.dispatch({type: "navigation/jump", payload:{direction: ''}});
            return;
        }
        this.props.dispatch({type: 'userinfo/userInfo', payload: {uid: null}});
        this.setState({photo: apiBaseUrl+"/user/"+getUid()+'/photo'});
    }

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            photo: require("src/img/User.png")
        };
    }

    formRef: any;

    setModalVisible(modalVisible) {
        if (this.formRef && modalVisible === true) this.formRef.refresh();
        this.setState({modalVisible: modalVisible});
    };

    handleOk(e) {
        if (!this.formRef.handleSubmit(e)) this.setModalVisible(false);
    }

    render() {
        return (
            <div>
                <br/>
                <div>
                    <Col span={8} style={{display: 'block'}}>
                        <FormItem label="学号或教工号" {...formLayout1}>
                            <span className="ant-form-text">{this.props.uid}</span>
                        </FormItem>
                        <FormItem label="性别" {...formLayout1}>
                            <span className="ant-form-text">{this.props.gender}</span>
                        </FormItem>
                        <FormItem label="e-mail" {...formLayout1}>
                            <span className="ant-form-text">{this.props.email}</span>
                        </FormItem>
                        <FormItem label="入学年份" {...formLayout1}>
                            <span className="ant-form-text">{this.props.year}</span>
                        </FormItem>
                        <FormItem label="简介" {...formLayout1}>
                            <span className="ant-form-text" style={{whiteSpace: "pre-wrap"}}>{this.props.intro}</span>
                        </FormItem>
                    </Col>
                    <Col span={8} style={{display: 'block'}}>
                        <FormItem label="姓名" {...formLayout2}>
                            <span className="ant-form-text">{this.props.name}</span>
                        </FormItem>
                        <FormItem label="职务" {...formLayout2}>
                            <span className="ant-form-text">{this.props.type}</span>
                        </FormItem>
                        <FormItem label="部门" {...formLayout2}>
                            <span className="ant-form-text">{this.props.dept}</span>
                        </FormItem>
                        <FormItem label="电话" {...formLayout2}>
                            <span className="ant-form-text">{this.props.telephone}</span>
                        </FormItem>
                    </Col>
                    <Col span={8} style={{display: 'block'}}>
                        <p>照片：</p>
                        <img src={this.state.photo} style={{width: 80, height:80}} onError={()=>{this.setState({photo: require('src/img/User.png')});console.log('error');}}/>
                    </Col>
                    <FormItem wrapperCol={{span: 12, offset: 11}}>
                        <Button icon="edit" type="primary" onClick={() => this.setModalVisible(true)}>编辑</Button>
                        <Modal
                            title="修改个人信息"
                            wrapClassName="vertical-center-modal"
                            visible={this.state.modalVisible}
                            onOk={(e) => this.handleOk(e)}
                            onCancel={() => this.setModalVisible(false)}
                        >
                            <WrappedInfoEditForm wrappedComponentRef={(inst) => this.formRef = inst}
                                                 dispatch={this.props.dispatch} uid={this.props.uid}
                                                 email={this.props.email} tel={this.props.telephone}
                                                 intro={this.props.intro}/>
                        </Modal>
                    </FormItem>
                </div>
            </div>
        );
    }
}
