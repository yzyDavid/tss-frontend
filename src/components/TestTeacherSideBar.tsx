import * as React from 'react';
import {Component} from 'react';
import {Form, Button,  Menu, Dropdown, Icon, Layout, Breadcrumb} from 'antd';
import DvaProps from '../types/DvaProps';

interface BarProp extends DvaProps {
   // current: string;
}
const SubMenu = Menu.SubMenu;
const { Header, Content, Sider } = Layout;

export default  class TestTeacherSideBar extends Component<BarProp>{
    constructor(props){
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick =  ({ key })=> {
        var content = document.getElementById("content");

        if(content)
            if (key == "1") {
                /*
                var p = this.props.dispatch;
                content.innerHTML = "<WrappedPaperInsertForm dispatch="+p+"/>;" ;
                *///<WrappedPaperInsertForm dispatch={this.props.dispatch}/>
                this.props.dispatch({type: 'teacherquestion/jump', payload: {direction: "Insert"}});
            } else if (key == "2") {
                this.props.dispatch({type: 'teacherquestion/jump', payload: {direction: "Search"}});
            } else if (key == "3") {
                this.props.dispatch({type: 'teacherpaper/jump', payload: {direction: "Insert"}});
            } else if (key == "4") {
                this.props.dispatch({type: 'teacherpaper/jump', payload: {direction: "Search"}});
            } else if (key == "5") {
                this.props.dispatch({type: 'teacherresult/jump', payload: {direction: "sid"}});
            } else if (key == "6") {
                this.props.dispatch({type: 'teacherresult/jump', payload: {direction: "pid"}});
            } else if (key == "7") {
                this.props.dispatch({type: 'teacherresult/jump', payload: {direction: "qtype"}});
            } else if (key == "8") {
                this.props.dispatch({type: 'teacherresult/jump', payload: {direction: "qunit"}});
            }

    }

    render(){
        return(<Sider width={200} style={{ background: '#fff' }}>
            <Menu onClick={this.onClick}
                  mode="inline"

                  defaultOpenKeys={['question','paper','result']}
                  style={{ height: '100%', borderRight: 0 }}
            >
                <SubMenu key="question"  title={<span><Icon type="user" />新增/查询题目</span>}>
                    <Menu.Item key="1">新增题目</Menu.Item>
                    <Menu.Item key="2">查询/修改题目</Menu.Item>
                </SubMenu>
                <SubMenu key="paper"  title={<span><Icon type="laptop" />新增/查询试卷</span>}>
                    <Menu.Item key="3">新增试卷</Menu.Item>
                    <Menu.Item key="4">查询/修改试卷</Menu.Item>
                </SubMenu>
                <SubMenu key="result"  title={<span><Icon type="notification" />成绩查询</span>}>
                    <Menu.Item key="5">按学号查询</Menu.Item>
                    <Menu.Item key="6">按试卷号查询</Menu.Item>
                    <Menu.Item key="7">按题型查询</Menu.Item>
                    <Menu.Item key="8">按单元号查询</Menu.Item>
                </SubMenu>
            </Menu>
        </Sider>);

    };
    
    
}