import * as React from 'react'
import {Component} from 'react'
import DvaProps from "../models/DvaProps";
import BrowserFrame from './ForumBrowserFrame';
import NavigationBar from './ForumNavigation';

import { Table, Icon, Modal, Pagination, Form ,Button,} from 'antd';
const FormItem = Form.Item;

interface BoardProps extends DvaProps{
    boardinfo:any,
}

export default class BoardPageComponent extends Component<BoardProps>{
    state = {

        selectedRowKeys:[],
        rowSelection: undefined,

    };

    onSelectChange = (selectedRowKeys) => {
       // console.log('selectedRowKeys changed: ', selectedRowKeys);

         this.setState({ selectedRowKeys: selectedRowKeys});

    };



    PostNewTopic = () => {
        this.props.dispatch({type:'board/newtopic', payload:{}})
    };

    ChangeWatch = () => {
        this.props.dispatch({type:'board/newtopic', payload:{}})
    };

    render(){

        const Topcolumns = [
            {
                title:"",
                key:"",
                render: (text, record) =>(<Icon type="pushpin" />),width:10,
            },
            {
            title: '标题',
            dataIndex: 'title',
            key: 'title',
            render: (text, record) => <a   href={"//localhost:3000/#/topic="+record.id}> {text}</a>,width:300,
        }, {
            title: '作者',
            dataIndex: 'author',
            key: 'author',
            render: (text, record) =>text,width:100,
        },{
                title:'回复',
                dataIndex:'replyNUM',
                render: (text, record) =>text,width:100,
            },{
            title:'发帖时间',
            dataIndex:'time',
            render: (text, record) =>text,width:100,
        },];

        const Listcolumns = [
            {
                title:"",
                key:"",
                render: (text, record) =>(<Icon type="book" />),width:10,
            },
            {
                title: '标题',
                dataIndex: 'title',
                key: 'title',
                render: (text, record) => <a  style={{float:"left"}} href={"//localhost:3000/#/topic="+record.id}> {text}</a>,width:300,
            }, {
                title: '作者',
                dataIndex: 'author',
                key: 'author',
                render: (text, record) =>text,width:100,
            },{
                title:'回复',
                dataIndex:'replyNUM',
                render: (text, record) =>text,width:100,
            },{
                title:'发帖时间',
                dataIndex:'time',
                render: (text, record) =>text,width:100,
            },

        ];


        let isWatch;
        if(this.props.boardinfo.isWatched === true){
            isWatch = <Button type="primary" onClick={this.ChangeWatch}>点击关注</Button>
        }else{
            isWatch = <Button onClick={this.ChangeWatch}>取消关注</Button>;
        }
        return(
            <BrowserFrame>
            <NavigationBar current={""} dispatch={this.props.dispatch}/>
                <div style={{marginLeft:280,marginRight:280,marginTop:10}}>
                    <div style={{fontWeight:"bold",fontSize:30}}>
                        <div style={{float:"left"}}>{this.props.boardinfo.BoardName}</div>
                        <div style={{marginLeft:200}}>{isWatch}
                        </div>
                    </div>

                    <div style={{backgroundColor:"rgb(255,255,255)",fontSize:20,marginTop:20,marginBottom:20,borderStyle:"solid",borderWidth:2,height:180,borderRadius:10}}>
                        {this.props.boardinfo.Notice}
                    </div>

                    <div style={{marginBottom:25,marginLeft:0,marginRight:0}}>
                        <div style={{float:"left"}}>
                            <Button type="primary" size="large" onClick={this.PostNewTopic}>发布新帖</Button>
                        </div>
                        <div style={{float:"right"}}>
                            <Button type="primary" size="large">管理公告</Button>
                        </div>

                    </div>

                    <div style={{marginTop:80,fontSize:20}}>置顶</div>

                    <div style={{marginTop:0,float:"none",backgroundColor:"#f9ecc6"}} >
                        <div style={{}}>
                            <Form layout="inline">


                                <Table  {...{pagination:false}}  columns={Topcolumns} dataSource={this.props.boardinfo.topList} />
                            </Form>
                        </div>
                    </div>

                    <div>
                        <div style={{marginTop:40,fontSize:20,float:"left"}}>帖子</div>
                        <div style={{marginTop:40,float:"right"}}> <Pagination showQuickJumper defaultCurrent={1} total={this.props.boardinfo.totalnum}  /></div>
                    </div>

                    <div style={{marginTop:75,float:"none",backgroundColor:"rgb(255,255,255)"}} >
                        <div style={{}}>

                            <Form layout="inline">
                                {/*帖子列表*/}
                                {/*<div style={{float:"right"}}>*/}
                                {/*<FormItem label="管理置顶">*/}
                                {/*<Switch checked={!!this.state.rowSelection} onChange={this.handleRowSelectionChange} />*/}
                                {/*</FormItem>*/}
                                {/*</div>*/}

                                <Table  {...{pagination:false}}   columns={Listcolumns} dataSource={this.props.boardinfo.topicList} />
                            </Form>
                        </div>
                    </div>
                    <div style={{marginTop:0,float:"right"}}> <Pagination showQuickJumper defaultCurrent={1} total={this.props.boardinfo.totalnum}  /></div>

                </div>
            </BrowserFrame>
        )
    }
}