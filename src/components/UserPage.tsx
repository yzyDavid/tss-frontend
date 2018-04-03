import * as React from 'react';
import {Component} from 'react';
import {Form, Button, Modal} from 'antd';
import DvaProps from '../types/DvaProps';
import {WrappedInfoEditForm} from './InfoEditForm';
import NavigationBar from './TssPublicComponents';

interface UserProps extends DvaProps {
    uid: string;
    email: string;
    tel: string;
    intro: string;
}
interface UserState {
    modalVisible: boolean;
}
const FormItem = Form.Item;

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
                <NavigationBar current={"user"} dispatch={this.props.dispatch}/>
                <div>
                    <FormItem label="学号" labelCol={{ span: 8 }} wrapperCol={{ span: 10 }}>
                        <span className="ant-form-text" >{this.props.uid}</span>
                    </FormItem>
                    <FormItem label="e-mail" labelCol={{ span: 8 }} wrapperCol={{ span: 10 }}>
                        <span className="ant-form-text">{this.props.email}</span>
                    </FormItem>
                    <FormItem label="电话" labelCol={{ span: 8 }} wrapperCol={{ span: 10 }}>
                        <span className="ant-form-text">{this.props.tel}</span>
                    </FormItem>
                    <FormItem label="简介" labelCol={{ span: 8 }} wrapperCol={{ span: 10 }}>
                        <span className="ant-form-text" style={{whiteSpace: "pre-wrap"}}>{this.props.intro}</span>
                    </FormItem>
                    <FormItem wrapperCol={{ span: 12, offset: 8 }}>
                        <Button icon="edit" type="primary" onClick={() => this.setModalVisible(true)}>编辑</Button>
                        <Modal
                            title="修改个人信息"
                            wrapClassName="vertical-center-modal"
                            visible={this.state.modalVisible}
                            onOk={(e) => this.handleOk(e)}
                            onCancel={() => this.setModalVisible(false)}
                        >
                            <WrappedInfoEditForm  wrappedComponentRef={(inst) => this.formRef = inst} dispatch={this.props.dispatch} uid={this.props.uid} email={this.props.email} tel={this.props.tel} intro={this.props.intro}/>
                        </Modal>
                    </FormItem>
                </div>
            </div>

    );
    }
}
