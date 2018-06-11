import * as React from 'react'
import {Component} from 'react'
import DvaProps from "../models/DvaProps";
import BrowserFrame from './ForumBrowserFrame';
import NavigationBar from './ForumNavigation';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Table, Icon, Modal, Pagination, Form ,Button,} from 'antd';
import any = jasmine.any;
const FormItem = Form.Item;



export class updateBoardInfoForm{
    boardID:string;
    boardText:string;
}

export class getTopicDataForm{
    boardID:string;
    currentPage:string;
}

export class getPublicDataForm{
    boardID:string;
}

interface BoardProps extends DvaProps{
    URL:string;
    publicData:any,
    topicData:any;
}

export default class BoardPageComponent extends Component<BoardProps>{
    state = {

        selectedRowKeys:[],
        rowSelection: undefined,
        boardID:"",
        showModal:"false",
        editorState: EditorState.createEmpty(),

    };




    changeInfo(){
        //"boardText":"全版公告",
        this.setState({showModal:"true"});
    }

    componentWillMount(){

        var location = document.location.hash.toString();
        const temp = "#/forum/board/";
        location = location.substring(temp.length);

        var boardID="";
        var pos;
        for(var i =0;;i++){
            if(location[i]==='/'){
                pos= i+1;
                break;
            }else{
                boardID = boardID+location[i];
            }
        }

        var pageNum = location.substring(pos);


        var publicData = new getPublicDataForm;
        publicData.boardID = boardID;

        var topicData = new getTopicDataForm;
        topicData.boardID = boardID;
        topicData.currentPage = pageNum;

        this.setState({boardID:boardID});

        this.props.dispatch({type:'board/getPublicData', payload:publicData});
        this.props.dispatch({type:'board/getTopicData', payload:topicData});
    }

    gotoAnotherPage=(page)=>{

        var data = new getTopicDataForm;
        data.currentPage = page.toString();
        data.boardID = this.state.boardID;
        this.props.dispatch({type:'board/getTopicData', payload:data})
    };

    PostNewTopic = () => {
       // console.log(this.props.boardinfo.boardID);
        this.props.dispatch({type:'board/newtopic', payload:this.props.publicData.boardID})
    };

    ChangeWatch = () => {
        this.props.dispatch({type:'board/newtopic', payload:{}})
    };


    onEditorStateChange: Function = (editorState) => {
        this.setState({
            editorState,
        });
    };


    handleOk = (e) => {
        this.setState({
            showModal: false,
        });
        console.log("下面是公告内容")
        console.log( draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())).toString())
        const data = new updateBoardInfoForm;
        data.boardID = this.props.publicData.boardID;
        data.boardText = draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())).toString();
        console.log("in board page OK")
        this.props.dispatch({type:'board/changeBoardInfo', payload:data});
    };

    handleCancel = (e) => {
        console.log(e);
        this.setState({
            showModal: false,
        });
    };
    render(){


        const Topcolumns = [
            {
                title: '标题',
                dataIndex: 'title',
                key: 'title',
                render: (text, record) => <a   href={this.props.URL+"#/forum/topic/"+record.id+"/1"}> {text}</a>,width:300,
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
                render: (text, record) => <a  style={{float:"left"}} href={this.props.URL+"#/forum/topic/"+record.id+"/1"}> {text}</a>,width:300,
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
        if(this.props.publicData.isWatched === "false"){
            isWatch = <Button type="primary" onClick={this.ChangeWatch}>点击关注</Button>
        }else{
            isWatch = <Button onClick={this.ChangeWatch}>取消关注</Button>;
        }

        let topList = new Array();

        for(var i=0;i<this.props.publicData.topTitles.length;i++){
            topList.push({
                title:this.props.publicData.topTitles[i],
                author:this.props.publicData.topAuthors[i],
                replyNUM:this.props.publicData.topReplys[i],
                time:this.props.publicData.topTimes[i],
                id:this.props.publicData.topTopicIDs[i]

            })

        }

        let topicList = new Array();
        for(var i=0;i<this.props.topicData.topicTitles.length;i++){
            topicList.push({
                title:this.props.topicData.topicTitles[i],
                author:this.props.topicData.topicAuthors[i],
                replyNUM:this.props.topicData.topicReplys[i],
                time:this.props.topicData.topicTimes[i],
                id:this.props.topicData.topicIDs[i],

            })
        }



        return(
            <BrowserFrame>
                <NavigationBar current={""} dispatch={this.props.dispatch}/>
                <div style={{marginLeft:280,marginRight:280,marginTop:10}}>
                    <div style={{fontWeight:"bold",fontSize:30}}>
                        <div style={{float:"left"}}>{this.props.publicData.boardName}</div>
                        <div style={{marginLeft:200}}>{isWatch}
                        </div>
                    </div>

                    <div style={{backgroundColor:"rgb(255,255,255)",fontSize:20,marginTop:20,marginBottom:20,borderStyle:"solid",borderWidth:2,height:180,borderRadius:10}}
                         dangerouslySetInnerHTML={{__html: this.props.publicData.boardText}}
                    >
                    </div>

                    <div style={{marginBottom:25,marginLeft:0,marginRight:0}}>
                        <div style={{float:"left"}}>
                            <Button type="primary" size="large" onClick={this.PostNewTopic}>发布新帖</Button>
                        </div>
                        <div style={{float:"right"}}>
                            <Button type="primary" size="large" onClick={this.changeInfo.bind(this)}>管理公告</Button>
                        </div>

                    </div>

                    <div style={{marginTop:80,fontSize:20}}>置顶</div>

                        <Modal title="发布公告" visible={this.state.showModal==="true"} width={1000}
                               onOk={this.handleOk}
                               onCancel={this.handleCancel}
                               okText={"发布"}
                               cancelText={"取消发布"}
                        >
                            <div style={{height:200}}>
                                <Editor

                                    wrapperClassName="demo-wrapper  "
                                    editorClassName="demo-editor"
                                    localization={{
                                        locale: 'zh',
                                    }}
                                    onEditorStateChange={this.onEditorStateChange}
                                />
                            </div>
                        </Modal>


                    <div style={{marginTop:0,float:"none",backgroundColor:"#f9ecc6"}} >
                        <div style={{}}>
                            <Form layout="inline">


                                <Table  {...{pagination:false}}  columns={Topcolumns} dataSource={topList} />
                            </Form>
                        </div>
                    </div>

                    <div>
                        <div style={{marginTop:40,fontSize:20,float:"left"}}>帖子</div>
                        <div style={{marginTop:40,float:"right"}}> <Pagination showQuickJumper
                                                                               onChange={this.gotoAnotherPage}
                                                                               defaultCurrent={parseInt(this.props.topicData.currntPage)} total={parseInt(this.props.topicData.totalPage)*20}  /></div>
                    </div>

                    <div style={{marginTop:75,float:"none",backgroundColor:"rgb(255,255,255)"}} >
                        <div style={{}}>

                            <Form layout="inline">
                                <Table  {...{pagination:false}}   columns={Listcolumns} dataSource={topicList} />
                            </Form>
                        </div>
                    </div>
                    <div style={{marginTop:0,float:"right"}}> <Pagination showQuickJumper
                                                                          onChange={this.gotoAnotherPage}
                                                                          defaultCurrent={parseInt(this.props.topicData.currntPage)} total={parseInt(this.props.topicData.totalPage)*20}  /></div>

                </div>
            </BrowserFrame>
        )
    }
}