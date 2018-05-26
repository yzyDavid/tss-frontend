import * as React from 'react';
import {Component} from 'react';
import {Layout, Modal, Breadcrumb, Icon, Table, Button, Input, Select, Form} from 'antd';
import 'antd/dist/antd.css';
import {NavigationBar} from './TssPublicComponents'
import DvaProps from '../types/DvaProps';

const { Column } = Table;

interface PlanProps extends DvaProps{
    uid: string;
}

const data = [{
    key: '1',
    id: 20102,
    name: '数据结构基础',
    teacher: 'Mike',
    brief: '重点介绍算法设计、算法描述和相应C程序编码，并给出相应的数据结构应用实例',
    credit: 3.0,
    semester: '春夏',
}, {
    key: '2',
    id: 20104,
    name: '软件工程',
    teacher: 'Mary',
    brief: 'ddd',
    credit: 2.0,
    semester: '春',
}, {
    key: '3',
    id: 20106,
    name: '计算机网络',
    teacher: 'Joe',
    brief: 'ccc',
    credit: 3.5,
    semester: '夏',
},{
    key: '4',
    id: 20109,
    name: '人工智能',
    teacher: 'Kathy',
    brief: 'bbb',
    credit: 3.5,
    semester: '夏',
},{
    key: '5',
    id: 20111,
    name: 'B/S体系设计',
    teacher: 'Steve',
    brief: 'aaa',
    credit: 4,
    semester: '春夏',
}

];

export default class PlanComponent extends Component<PlanProps>{
    constructor(props) {
        super(props)
    }

    render(){
        const columns = [{
            title: "课程代码",
            dataIndex: "id",
        },{
            title: "课程名称",
            dataIndex: "name",
        },{
            title: "学分",
            dataIndex: "credit"
        },{
            title: "学期",
            dataIndex: 'semester'
        }];
        return(
            <div>
               <NavigationBar current={'plan'} dispatch={this.props.dispatch}/>
                <div style={{ padding: 24, background: '#fff', minHeight: 780 }}>
                    <Table dataSource={data} columns={columns}>
                    </Table>
                </div>

            </div>

        );
    }
}
