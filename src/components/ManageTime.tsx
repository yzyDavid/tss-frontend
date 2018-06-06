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
    time1_1: string;
    time1_2: string;
    time2_1: string;
    time2_2: string;
    time3_1: string;
    time3_2: string;
    date1_1: string;
    date1_2: string;
    date2_1: string;
    date2_2: string;
    date3_1: string;
    date3_2: string;
}
export default class ManageTimeComponent extends Component<manageTimeProps, manageTimeState>{
    constructor(props){
        super(props);
        this.state = {
            time1_1: "",
            time1_2: "",
            time2_1: "",
            time2_2: "",
            time3_1: "",
            time3_2: "",
            date1_1: "",
            date1_2: "",
            date2_1: "",
            date2_2: "",
            date3_1: "",
            date3_2: "",
        }
        this.onChange1 = this.onChange1.bind(this);
        this.onChange2 = this.onChange2.bind(this);
        this.onChange3 = this.onChange3.bind(this);
        this.onChange4 = this.onChange4.bind(this);
        this.onChange5 = this.onChange5.bind(this);
        this.onChange6 = this.onChange6.bind(this);
        this.onChange7 = this.onChange7.bind(this);
        this.onChange8 = this.onChange8.bind(this);
        this.onChange9 = this.onChange9.bind(this);
        this.onChange10 = this.onChange10.bind(this);
        this.onChange11 = this.onChange11.bind(this);
        this.onChange12= this.onChange12.bind(this);
        this.setTime1 = this.setTime1.bind(this);
        this.setTime2 = this.setTime2.bind(this);
        this.setTime3 = this.setTime3.bind(this);
    }
    setTime1(){
        this.props.dispatch({type:"manageTime/setComplement",payload: {start:this.state.date1_1 + " " + this.state.time1_1, end: this.state.date1_2+ " " + this.state.time1_2}})
    }
    setTime2(){
        this.props.dispatch({type:"manageTime/setDropTime",payload: {start:this.state.date2_1 + " " + this.state.time2_1, end: this.state.date2_2+ " " + this.state.time2_2}})
    }
    setTime3(){
        this.props.dispatch({type:"manageTime/setFirstSelection",payload: {start:this.state.date3_1 + " " + this.state.time3_1, end: this.state.date3_2+ " " + this.state.time3_2}})
    }
    onChange1(time, timeString) {
        console.log(time, timeString);
        this.setState({time1_1: timeString})
    }
    onChange2(time, timeString) {
        console.log(time, timeString);
        this.setState({time1_2: timeString})
    }
    onChange3(time, timeString) {
        console.log(time, timeString);
        this.setState({time2_1: timeString})
    }
    onChange4(time, timeString) {
        console.log(time, timeString);
        this.setState({time2_2: timeString})
    }
    onChange5(time, timeString) {
        console.log(time, timeString);
        this.setState({time3_1: timeString})
    }
    onChange6(time, timeString) {
        console.log(time, timeString);
        this.setState({time3_2: timeString})
    }
    onChange7(date, dateString) {
        console.log(date, dateString);
        this.setState({date1_1: dateString})
    }
    onChange8(date, dateString) {
        console.log(date, dateString);
        this.setState({date1_2: dateString})
    }
    onChange9(date, dateString) {
        console.log(date, dateString);
        this.setState({date2_1: dateString})
    }
    onChange10(date, dateString) {
        console.log(date, dateString);
        this.setState({date2_2: dateString})
    }
    onChange11(date, dateString) {
        console.log(date, dateString);
        this.setState({date3_1: dateString})
    }
    onChange12(date, dateString) {
        console.log(date, dateString);
        this.setState({date3_2: dateString})
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
                    <span style={{margin: 8}}>初选开始时间</span>
                    <DatePicker onChange={this.onChange11}></DatePicker>
                    <TimePicker onChange={this.onChange5} style={{margin: 8}}></TimePicker>
                    <span style={{margin: 8}}>初选结束时间</span>
                    <DatePicker onChange={this.onChange12}></DatePicker>
                    <TimePicker onChange={this.onChange6} style={{margin: 8}}></TimePicker>
                    <Button type ="primary" style={{margin: 4}} onClick={this.setTime3}>设置初选时间</Button>
                </div>
                <div>
                    <span style={{margin: 8}}>补选开始时间</span>
                    <DatePicker onChange={this.onChange7}></DatePicker>
                    <TimePicker onChange={this.onChange1} style={{margin: 8}}></TimePicker>
                    <span style={{margin: 8}}>补选结束时间</span>
                    <DatePicker onChange={this.onChange8}></DatePicker>
                    <TimePicker onChange={this.onChange2} style={{margin: 8}}></TimePicker>
                    <Button type ="primary" style={{margin: 4}} onClick={this.setTime1}>设置补选时间</Button>
                </div>
                <div>
                    <span style={{margin: 8}}>退选开始时间</span>
                    <DatePicker onChange={this.onChange9}></DatePicker>
                    <TimePicker onChange={this.onChange3} style={{margin: 8}}></TimePicker>
                    <span style={{margin: 8}}>退选结束时间</span>
                    <DatePicker onChange={this.onChange10}></DatePicker>
                    <TimePicker onChange={this.onChange4} style={{margin: 8}}></TimePicker>
                    <Button type ="primary" style={{margin: 4}} onClick={this.setTime2}>设置退选时间</Button>
                </div>
            </div>
                </Content>
            </Layout>
        </div>

        )
    }
}