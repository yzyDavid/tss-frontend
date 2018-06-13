import * as React from 'react';
import {Component} from 'react';
import {Form, Button, Modal, Layout, Col, Row} from 'antd';
import DvaProps from '../types/DvaProps';
import {WrappedInfoEditForm} from './InfoEditForm';
import {NavigationBar, TssFooter, TssHeader} from "./TssPublicComponents";

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
    majorClass: string,
    photo: null
}
interface UserState {
    modalVisible: boolean;
}
const FormItem = Form.Item;
const {Content} = Layout;
const formLayout1={
    labelCol: { span: 8, offset: 8},
    wrapperCol: { span: 8 }
};

const formLayout2={
    labelCol: { span: 4, offset: 0},
    wrapperCol: { span: 8 }
};

export default class UserPageComponent extends Component<UserProps, UserState> {
    constructor(props){
        super(props);
        this.state = {
            modalVisible: false
        };
    }
    formRef: any;
    setModalVisible(modalVisible) {
        if(this.formRef && modalVisible === true) this.formRef.refresh();
        this.setState({ modalVisible: modalVisible });
    };
    handleOk(e){
        if(!this.formRef.handleSubmit(e)) this.setModalVisible(false);
    }

    render() {
        return (
            <div>
                {/*<NavigationBar current={"user"} dispatch={this.props.dispatch}/>*/}
                <br/>
                <div>
                    <Col span={12} style={{display: 'block'}}>
                    <FormItem label="学号或教工号" {...formLayout1}>
                        <span className="ant-form-text" >{this.props.uid}</span>
                    </FormItem>
                    </Col>
                    <Col span={12} style={{display: 'block'}}>
                    <FormItem label="姓名" {...formLayout2}>
                        <span className="ant-form-text" >{this.props.name}</span>
                    </FormItem>
                    </Col>
                    <Col span={12} style={{display: 'block'}}>
                    <FormItem label="性别" {...formLayout1}>
                        <span className="ant-form-text" >{this.props.gender}</span>
                    </FormItem>
                    </Col>
                    <Col span={12} style={{display: 'block'}}>
                    <FormItem label="职务" {...formLayout2}>
                        <span className="ant-form-text" >{this.props.type}</span>
                    </FormItem>
                    </Col>
                    <Col span={12} style={{display: 'block'}}>
                    <FormItem label="入学年份" {...formLayout1}>
                        <span className="ant-form-text" >{this.props.year}</span>
                    </FormItem>
                    </Col>
                    <Col span={12} style={{display: 'block'}}>
                    <FormItem label="部门" {...formLayout2}>
                        <span className="ant-form-text" >{this.props.dept}</span>
                    </FormItem>
                    </Col>
                    <Col span={12} style={{display: 'block'}}>
                    <FormItem label="e-mail" {...formLayout1}>
                        <span className="ant-form-text">{this.props.email}</span>
                    </FormItem>
                    </Col>
                    <Col span={12} style={{display: 'block'}}>
                    <FormItem label="电话" {...formLayout2}>
                        <span className="ant-form-text">{this.props.telephone}</span>
                    </FormItem>
                    </Col>
                    <Col span={12} style={{display: 'block'}}>
                    <FormItem label="简介" {...formLayout1}>
                        <span className="ant-form-text" style={{whiteSpace: "pre-wrap"}}>{this.props.intro}</span>
                    </FormItem>
                    </Col>
                    <FormItem wrapperCol={{ span: 12, offset: 11 }}>
                        <Button icon="edit" type="primary" onClick={() => this.setModalVisible(true)}>编辑</Button>
                        <Modal
                            title="修改个人信息"
                            wrapClassName="vertical-center-modal"
                            visible={this.state.modalVisible}
                            onOk={(e) => this.handleOk(e)}
                            onCancel={() => this.setModalVisible(false)}
                        >
                            <WrappedInfoEditForm  wrappedComponentRef={(inst) => this.formRef = inst} dispatch={this.props.dispatch} uid={this.props.uid} email={this.props.email} tel={this.props.telephone} intro={this.props.intro}/>
                        </Modal>
                    </FormItem>
                </div>
            </div>
    );
    }
}
