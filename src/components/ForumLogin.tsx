import {Form, Icon, Input, Button, Checkbox, message} from 'antd';
import {Component, FormEvent,} from 'react'
import * as React from 'react'
import './css/ForumLogin.css'
import FormItem from "antd/es/form/FormItem";
import DvaProps from "../models/DvaProps";
import {Router, Route, Switch, routerRedux, browserHistory,hashHistory} from 'dva/router';
import PropTypes from 'prop-types';


interface FormProps extends DvaProps {
    form: any;
    router: PropTypes.object;
}


export class LoginFormData {
    uid: string;
    password: string;
}
export class ForumLoginComponent extends React.Component<FormProps,LoginFormData> {

    constructor(props,context){
        super(props,context);
       // console.log("context",this.context) //=> object
       //
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount(){

    }
    // propTypes: {
    //     router: PropTypes.object;
    // };

    handleSubmit = (e: FormEvent<{}>) => {
        e.preventDefault();
        const formProps = this.props.form;
        formProps.validateFieldsAndScroll((err: any, values: LoginFormData) => {

            this.props.dispatch({type:'ForumLogin/login', payload: values});

        });
    };


    fetchDemo() {

        fetch('http://10.180.117.6:8080/test/get', {
            method: "post"
        }).then(function(response) {
            if(response.status!==200){
                alert("fetch failed")   ;
            }else if(response.status===200){
                alert("fetch success");
                response.json().then(function(json){
                    //alert("打印json中")
                    console.log(json);
                });
            }

        }).catch(function (e) {
            alert("error!"+e);

        })



    }


    render() {

        const {getFieldDecorator} = this.props.form;

        return (
        <Form  onSubmit={this.handleSubmit} className="login-form">
            <FormItem>

                {getFieldDecorator('user', {
                    rules: [{ required: true, message: '请输入学号!' },
                    ],
                })(
                    <Input  prefix={<Icon type="user" style={{ fontSize: 13 }} />} type="user" placeholder="学号" />
                )}
            </FormItem>
            <FormItem>
                {getFieldDecorator('password', {
                    rules: [{ required: true, message: '请输入密码!' }],
                })(
                    <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码" />
                )}
            </FormItem>
            <FormItem>
                <Checkbox>记住我</Checkbox>
                <a style={{float:150}} className="login-form-forgot">忘记密码</a>
                <Button  type="primary" htmlType="submit" className="login-form-button"  >
                    登录
                </Button>
            </FormItem>

        </Form>

        );
    }
}



const ForumLoginForm: any = Form.create({})(ForumLoginComponent);

export {ForumLoginForm};
