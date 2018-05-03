import * as React from 'react';
import {Component} from 'react';
import {Form, Button, Modal, Row, Col} from 'antd';
import DvaProps from '../types/DvaProps';
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

    handleBeginClick = (e) => {
        this.props.dispatch({type:'studentpaper/jumpQuestion', payload: {}});
    };

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
            <div>
                <h2>选择试卷</h2>
                <Row>
                    <Col span={4} offset={4}>章节</Col>
                    <Col span={4} offset={4}>时长</Col>
                </Row>
                <p/>
                <Row>
                    <Col span={4} offset={4}>Chap 1</Col>
                    <Col span={4} offset={4}>1:00:00</Col>
                    <Col>
                        <Button icon="copy"  type="primary" htmlType="submit" onClick={this.handleBeginClick.bind(this)}>开始答题</Button>
                    </Col>
                </Row>
                <Row>
                    <Col span={4} offset={4}>Chap 2</Col>
                    <Col span={4} offset={4}>1:30:00</Col>
                    <Col>
                        <Button  icon="copy"  type="primary" htmlType="submit" onClick={this.handleBeginClick.bind(this)}>开始答题</Button>
                    </Col>
                </Row>
            </div>

    );
    }
}
