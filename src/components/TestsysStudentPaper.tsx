import * as React from 'react';
import {Component} from 'react';
import {Form, Button, Modal, Row, Col} from 'antd';
import DvaProps from '../types/DvaProps';
import {NavigationBar} from './TssPublicComponents';
import {WrappedPaperDisplayForm} from "./TestsysStudentPaperForm";
import TestStudentSideBar from "./TestStudentSideBar";
import Layout from "antd/es/layout/layout";

class HomePageProps implements DvaProps {
    public dispatch: any;
}

interface UserProps extends DvaProps {
    uid: string;
    email: string;
    tel: string;
    intro: string;
    papers: any[];
    pids: string[];
}
interface UserState {
    modalVisible: boolean;
}
const FormItem = Form.Item;

export default class StudentPaperPageComponent extends Component<UserProps, UserState> {
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

        return (
            <Layout>
                <TestStudentSideBar dispatch={this.props.dispatch} />
                <Layout id = "content" style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
                    <WrappedPaperDisplayForm
                        dispatch={this.props.dispatch}
                        papers={this.props.papers}
                        pids={this.props.pids}
                        uid={this.props.uid}/>
                </Layout>
            </Layout>

    );
    }
}
