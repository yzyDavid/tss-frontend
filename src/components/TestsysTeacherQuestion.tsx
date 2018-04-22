import * as React from 'react';
import {Component} from 'react';
import {Form, Button, Modal} from 'antd';
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

export default class TeacherQuestionPageComponent extends Component<UserProps, UserState> {
    constructor(props){
        super(props);
        this.state = {
            modalVisible: false
        };
    }
    formRef: any;


    handleInsertClick = (e) => {
        this.props.dispatch({type:'teacherquestion/jumpInsert', payload: {}});
    };

    handleSearchClick = (e) => {
        this.props.dispatch({type:'teacherquestion/jumpSearch', payload: {}});
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
                <FormItem {...formItemLayout}>
                    <Button icon="copy" type="primary" htmlType="submit" onClick={this.handleInsertClick.bind(this)}>
                        新增题目
                    </Button>
                    <Button icon="copy" type="primary" htmlType="submit" onClick={this.handleSearchClick.bind(this)}>
                        查询题目
                    </Button>
                </FormItem>
            </div>

        );
    }
}
