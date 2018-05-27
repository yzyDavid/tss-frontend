import * as React from 'react'
import {Component} from 'react'
import BrowserFrame from './ForumBrowserFrame';
import DvaProps from "../models/DvaProps";
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Pagination,Button} from "antd";
import NavigationBar from './ForumNavigation';





interface TopicProps extends DvaProps{
    allstate:any,
}


export class ReplyFormData {
    tid:string;
    text: string;
    quoteIndex: string;
}

export default class TopicPageComponent extends Component<TopicProps>{

    state = {
        editorState: EditorState.createEmpty(),
        showQuote:false,
        replyNum:0
    };

    constructor(props) {
        super(props);

    }
    onEditorStateChange: Function = (editorState) => {
        this.setState({
            editorState:editorState,

        });
    };

    onPageChange(pageNumber) {
        console.log('Page: ', pageNumber);
    };

    replyFloor=(e)=>{
        this.setState({showQuote:true,replyNum:e})
    };

    disappearQuote=(e)=>{
        this.setState({showQuote:false,replyNum:0});
    }
    uploadImageCallBack(){

    }

    postReply =(e)=>{

        var postData = new ReplyFormData;
        postData.tid = this.props.allstate.topicID;
        postData.quoteIndex = this.state.replyNum.toString();
        postData.text =  draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())).toString();
        this.props.dispatch({type:'topic/postReply', payload:postData})
    };

    render(){
        const { editorState } = this.state;

        let replylist = new Array();

        for(var i=0; i<this.props.allstate.id.length;i++){
            var author = this.props.allstate.id[i];
            var replyKey = this.props.allstate.index[i];
            var headurl = this.props.allstate.photo[i];
            var time = this.props.allstate.time[i];
            var quote = this.props.allstate.quote[i];
            var text = this.props.allstate.text[i];

            var quoteIndex = this.props.allstate.quoteIndex[i];
            var quoteAuthor = this.props.allstate.quoteAuthor[i];
            var quoteTime  = this.props.allstate.quoteTime[i];
            var q ;
            if(quote===""){
            }else{
                q=  <div  style={{marginTop:45 , marginBottom:20, borderStyle:"solid" ,borderWidth:1,backgroundColor:"rgb(200, 200, 200)"}}>
                    <div style={{fontWeight:"bold",marginTop:10,marginLeft:10,fontSize:10}}>以下是引用{quoteIndex}楼用户&nbsp;{quoteAuthor}&nbsp;在{quoteTime}发表的内容</div>
                    <div style={{ marginTop:10,marginLeft:10,fontSize:18}} dangerouslySetInnerHTML={{__html: quote}}></div>
                </div>;
            }



            replylist.push(
                <div style={{ marginLeft:200, marginRight:200, marginBottom:20,
                    borderStyle:"solid",backgroundColor: "rgb(255,255,255)",
                    borderWidth:1,
                }}>
                    <div style={{fontSize:15}}>{replyKey}楼</div>
                    <div style={{width:"96%", marginLeft:"auto",marginRight:"auto",marginTop:10}}>

                        <div style={{float:"left"}}>
                            <img src={headurl} width="60" height="60" />
                        </div>
                        <div >
                            <div style={{fontSize:16,fontWeight:"bold",marginLeft:70,marginTop:40}}>
                                {author}
                            </div>
                            <div style={{marginLeft:70, fontSize:12 ,borderBottomStyle:"solid", borderBottomWidth:1,}}>发布于{time}</div>
                            {/*<div style={{marginTop:20 , fontSize:18,borderStyle:"solid"}} dangerouslySetInnerHTML={{__html: draftToHtml(reply.quote)}} />*/}
                            {q}
                            <div style={{marginTop:45 , marginBottom:20,fontSize:18}} dangerouslySetInnerHTML={{__html: text}} /></div>
                        <div onClick={this.replyFloor.bind(this,replyKey)} style={{textDecoration:"underline"}}>回复</div>

                    </div>
                </div>


            )
        }

        quoteIndex = this.props.allstate.quoteIndex[this.state.replyNum-1];
        quoteAuthor = this.props.allstate.quoteAuthor[this.state.replyNum-1];
        quoteTime = this.props.allstate.quoteTime[this.state.replyNum-1];
        text = this.props.allstate.text[this.state.replyNum-1];
        let quoteZone;
        if(this.state.showQuote==true){
            quoteZone = <div  style={{marginTop:45 , marginBottom:20, borderStyle:"solid" ,borderWidth:1,backgroundColor:"rgb(200, 200, 200)"}}>
                <div style={{fontWeight:"bold",marginTop:10,marginLeft:10,fontSize:10}}>您将引用{quoteIndex}楼用户&nbsp;{quoteAuthor}&nbsp;在{quoteTime}发表的内容</div>
                <div style={{ marginTop:10,marginLeft:10,fontSize:18}} dangerouslySetInnerHTML={{__html: text}}></div>
                <div style={{marginTop:10,marginLeft:10,fontSize:10}} onClick={this.disappearQuote}>点击取消引用</div>
            </div>
        }else{
            quoteZone = <div></div>
        }
        return(
            <BrowserFrame>
                {/*<div dangerouslySetInnerHTML={{__html: draftToHtml(this.props.testreply)}} />*/}

                <NavigationBar current={""} dispatch={this.props.dispatch}/>
                <div style={{marginLeft:200,marginTop:10,fontSize:20}}><a href={"//localhost:3000/#/forum/board="+this.props.allstate.boardID}>{this.props.allstate.boardName}</a></div>
                <Pagination style={{marginTop:20,marginLeft:200,marginBottom:20}} showQuickJumper defaultCurrent={this.props.allstate.currentPage} total={this.props.allstate.totalPage*10} onChange={this.onPageChange}/>
                <div style={{marginLeft:200, marginRight:200,marginBottom:20,
                    backgroundColor: "rgb(255,255,255)",fontSize:30,borderStyle:"solid",
                    borderWidth:2,
                }}>
                    <div style={{marginLeft:20,marginTop:10,marginBottom:10}}>
                        <div>{this.props.allstate.title}</div>
                        <div style={{fontSize: 10}}>发帖时间: {this.props.allstate.postTime}</div>
                    </div>

                </div>
                {
                    replylist

                }

                <Pagination style={{marginLeft:200,marginBottom:20,}} showQuickJumper defaultCurrent={this.props.allstate.currentPage} total={this.props.allstate.totalPage*10} onChange={this.onPageChange}/>
                <div style={{marginLeft:200,marginTop:10,fontSize:20,marginBottom:20}}><a href={"//localhost:3000/#/forum/board="+this.props.allstate.boardID}>{this.props.allstate.boardName}</a></div>

                <div style={{marginBottom:20,marginLeft:200,marginRight:200,backgroundColor: "rgb(255,255,255)",height:300}}>
                    {quoteZone}
                    <Editor
                        wrapperClassName="demo-wrapper  "
                        editorClassName="demo-editor"
                        localization={{
                            locale: 'zh',
                        }}
                        toolbar={{
                            image: { uploadCallback: this.uploadImageCallBack, alt: { present: true, mandatory: true } },
                        }}

                        onEditorStateChange={this.onEditorStateChange}
                    />

                </div>
                <div style={{marginLeft:window.innerWidth/2-10}}> <Button type="primary" onClick={this.postReply}>回复</Button></div>

            </BrowserFrame>
        )

    }



}