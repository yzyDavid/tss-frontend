import * as React from 'react';
import {Component} from 'react';
import 'antd/dist/antd.css';
import {NavigationBar} from './TssPublicComponents'
import DvaProps from '../types/DvaProps';
import {Form, DatePicker, TimePicker, Layout, Button, Modal} from 'antd'

const FormItem = Form.Item
const {Content} = Layout
interface manageTimeProps extends DvaProps{
    form: any
}

interface manageTimeState {

}
export default class ManageTimeComponent extends Component<manageTimeProps, manageTimeState>{
    constructor(props){
        super(props);
        this.state = {

        }
    }
    setTime(){
        //TODO
        Modal.success({
            content: "时间设置成功！"
        })
    }
    componentDidMount(){

    };

    render(){
        return(
        <div>
            <NavigationBar current={"manageTime"} dispatch={this.props.dispatch}/>
            <br/>
            <Layout>
                <Content style={{margin: '0 16px'}}>
            <div style = {{ padding: 24, background: '#fff', minHeight: 780 }}>
                <div>
                <span style={{margin: 8}}>补选开始时间</span>
                <DatePicker></DatePicker>
                <TimePicker style={{margin: 8}}></TimePicker>
                <span style={{margin: 8}}>补选结束时间</span>
                <DatePicker></DatePicker>
                <TimePicker style={{margin: 8}}></TimePicker>
                </div>
                <div>
                    <span style={{margin: 8}}>退选开始时间</span>
                    <DatePicker></DatePicker>
                    <TimePicker style={{margin: 8}}></TimePicker>
                    <span style={{margin: 8}}>退选结束时间</span>
                    <DatePicker></DatePicker>
                    <TimePicker style={{margin: 8}}></TimePicker>
                </div>
                <Button type ="primary" style={{margin: 4}} onClick={this.setTime}>设置时间</Button>
            </div>
                </Content>
            </Layout>
        </div>

        )
    }
}