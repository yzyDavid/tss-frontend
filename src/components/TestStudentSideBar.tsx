import * as React from 'react';
import {Component} from 'react';
import {Form, Button,  Menu, Dropdown, Icon, Layout, Breadcrumb} from 'antd';
import DvaProps from '../types/DvaProps';

interface BarProp extends DvaProps {
    // current: string;
}
const SubMenu = Menu.SubMenu;
const { Header, Content, Sider } = Layout;

export default  class TestStudentSideBar extends Component<BarProp>{
    constructor(props){
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick =  ({ key })=> {
        var content = document.getElementById("content");

        if(content)
            if (key == "1") {
                this.props.dispatch({type: 'testsys_student/jump', payload: {direction: "student_paper"}});
            } else if (key == "2") {
                this.props.dispatch({type: 'testsys_student/jump', payload: {direction: "student_score"}});
            }

    };

    render(){
        return(<Sider width={200} style={{ background: '#fff' }}>
            <Menu onClick={this.onClick}
                  mode="inline"
                  defaultOpenKeys={['paper','result']}
                  style={{ height: '100%', borderRight: 0 }}>
                <SubMenu key="paper"  title={<span><Icon type="laptop" />我要答题</span>}>
                    <Menu.Item key="1">查看试卷</Menu.Item>
                </SubMenu>
                <SubMenu key="result"  title={<span><Icon type="notification" />成绩查询</span>}>
                    <Menu.Item key="2">试卷成绩查询</Menu.Item>
                </SubMenu>
            </Menu>
        </Sider>);

    };

}