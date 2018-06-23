import * as React from 'react'
import {Component} from 'react'
import BrowserFrame from './ForumBrowserFrame';
import DvaProps from "../models/DvaProps";
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Input,Button} from "antd";
import NavigationBar from './ForumNavigation';


interface NewTopicProps extends DvaProps{
    URL:string;
    topicBoardInfo:any,
    unread:any
}

export default class NewTopicPageComponent extends Component<NewTopicProps>{

    state = {
        editorState: EditorState.createEmpty(),
        title:"",
        boardID:""
    };

    onEditorStateChange: Function = (editorState) => {
        this.setState({
            editorState,
        });
    };



    componentWillMount(){
        var boardID = document.location.hash.toString();

        const temp = "#/forum/newpost=";
        boardID = boardID.substring(temp.length);
        this.props.dispatch({type:'ForumNewTopic/getName', payload:boardID});
        this.setState({boardID:boardID});

        this.props.dispatch({type:"ForumNavigation/updateUnread",payload:{}});

    }

    titleChange=(e)=>{
        this.setState({title:e.target.value})
    };

    uploadImageCallBack(){

    }

    postNewTopic=(e)=>{
        const data = {boardID:this.state.boardID,title:this.state.title,text:draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())).toString()};
        this.props.dispatch({type:'ForumNewTopic/postNewTopic', payload:data})
    };

    gotoPage=(e)=>{
        this.props.dispatch({type:'forumhome/gotoPage', payload:e})
    };

    render(){
        return(
            <BrowserFrame>
                <NavigationBar unread={this.props.unread} current={""} dispatch={this.props.dispatch}/>

                <div style={{marginLeft:300,fontSize:15,marginTop:10}}>
                    新帖版面：
                    <a  onClick={this.gotoPage.bind(this,"/forum/board/"+this.props.topicBoardInfo.boardID+"/1")}>{this.props.topicBoardInfo.boardName}</a>
                </div>
                <div style={{marginLeft:300, fontSize:25,marginTop:10}}>标题</div>
                <div style={{marginLeft:300, marginRight:300,marginTop:10,marginBottom:10}}><Input onChange={value=>this.titleChange(value)} placeholder="请输入标题" /></div>
                <div style={{marginLeft:300, fontSize:25}}>内容</div>
                <div style={{marginLeft:300,marginTop:10,marginRight:300}}>
                    <div style={{backgroundColor:"rgb(255,255,255)",height:250}}>
                        <Editor
                            onEditorStateChange={this.onEditorStateChange}
                            wrapperClassName="demo-wrapper  "
                            editorClassName="demo-editor"
                            localization={{
                                locale: 'zh',
                            }}
                            toolbar={{
                                image: { uploadCallback: this.uploadImageCallBack, alt: { present: true, mandatory: true } },
                            }}
                        />
                    </div >

                </div>
                <div style={{marginTop:20,marginLeft:window.innerWidth/2-10,marginBottom:20}}><Button type="primary" size="large" onClick={this.postNewTopic}>发布</Button></div>
            </BrowserFrame>

        )
    }
}