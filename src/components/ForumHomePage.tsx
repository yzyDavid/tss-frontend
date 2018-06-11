import { Menu, Breadcrumb, Icon,Form ,Button,Input,Select,Table} from 'antd';
import * as React from 'react';
import BrowserFrame from './ForumBrowserFrame';
import NavigationBar from './ForumNavigation';
import DvaProps from "../models/DvaProps";
import {Component,} from 'react'
import MyBoard from './ForumMyBoardComponent'

const SubMenu = Menu.SubMenu;
const Search = Input.Search;
const InputGroup = Input.Group;
const Option = Select.Option;

interface ForumHomeProps extends DvaProps {
    URL:string;
    alllist:any;
    mylist:any;
    uid: string;
    hot:any;
    latest:any;

}



export default class ForumHomePageComponent extends Component<ForumHomeProps>{

    constructor(props) {
        super(props);
        this.state={
            searchtype:'title',
        }
    }


    search(){


    }
    clickAllBoard= (e) =>{

        this.props.dispatch({type:'forumhome/gotoAllBoard', payload:{}})
    };
    render(){

        const columns = [{

            title: '版面',
            dataIndex: 'board',
            key: 'board',
            render: (text,record) => <a  href={this.props.URL+"#/forum/board/"+record.boardid+"/1"}>{text}</a>,width:150,
        }, {
            title: '标题',
            dataIndex: 'title',
            key: 'title',
            render: (text,record) => <a  href={this.props.URL+"#/forum/topic/"+record.topicid+"/1"}>{text}</a>,width:400,
        }, {
            title: '作者',
            dataIndex: 'author',
            key: 'author',
            render: text =>text,width:100,
        },
            {
                title: '回帖数',
                dataIndex: 'replyNUM',
                key: 'replyNUM',
                render: text =>text,width:100,
            },
            {
                title: '最后回复',
                dataIndex: 'time',
                key: 'time',
                render: text =>text,width:100,
            },

        ];



        return(
            <BrowserFrame>
                <div style={{height:"100%"}} className="ant-layout-topaside">
                    <NavigationBar current={"home"} dispatch={this.props.dispatch}/>



                    <div className="ant-layout-wrapper">
                        <div style={{width:"500px",margin: "10px 0 -7px 50px"}} className="ant-layout-breadcrumb">

                            <InputGroup compact >

                                <Select defaultValue="标题" onSelect={value => this.props.dispatch({type:'search/settype', payload:{type:value}})}>
                                    <Option value="标题">标题</Option>
                                    <Option value="用户">用户</Option>
                                    <Option value="版块">版块</Option>
                                </Select>
                                <Search
                                    placeholder="按回车搜索"
                                    style={{ width: 200 }}
                                    onSearch={value => this.props.dispatch({type:'search/query', payload:{key:value}})}
                                />

                            </InputGroup>

                        </div>
                        <div  style={{    background: "#fff",
                            margin: "24px 0 0",
                            position: "relative",
                            padding: "24px 0",

                            overflow: "hidden"}} className="ant-layout-container">
                            <aside style={{    width: "224px",
                                float:"left"}}  className="ant-layout-sider">
                                <MyBoard  mylist={this.props.mylist} dispatch={this.props.dispatch}/>
                                <div style={{backgroundColor:"rgb(255,255,255)"}}>
                                    <Menu onClick={this.clickAllBoard} style={{marginLeft:10}}>
                                        <Menu.Item >
                                            <Icon type="heart-o" />全部版块
                                        </Menu.Item>

                                    </Menu>
                                </div>
                            </aside>


                            <div style={{    borderLeft: "1px solid #e9e9e9",
                                padding: "0 24px",
                                overflow: "auto",
                                left: "-1px",
                                height: "700px"}} className="ant-layout-content">
                                <div style={{ height: 240 }}>
                                    <div style={{fontSize:23}}>热门话题
                                        <Select style={{marginLeft:20,marginBottom:16}} defaultValue="1" onSelect={value => this.props.dispatch({type:'forumhome/setHotType', payload:{type:value}})}>
                                            <Option value="1">24小时</Option>
                                            <Option value="7">最近7天</Option>
                                            <Option value="30">最近30天</Option>
                                        </Select>
                                        <Table columns={columns} dataSource={this.props.hot} pagination={false}/>
                                    </div>

                                    <div style={{marginTop:20,fontSize:23}}>最新发布
                                        <Table columns={columns} dataSource={this.props.latest} pagination={false}/>

                                    </div>


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </BrowserFrame>
        );
    }
}
