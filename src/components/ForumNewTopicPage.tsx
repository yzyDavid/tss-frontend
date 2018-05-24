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
    topicBoardInfo:any,
}

export default class NewTopicPageComponent extends Component<NewTopicProps>{
    uploadImageCallBack(){

    }
    render(){
        return(
            <BrowserFrame>
                <NavigationBar current={""} dispatch={this.props.dispatch}/>

                <div style={{marginLeft:300,fontSize:15,marginTop:10}}>
                    新帖版面：
                    <a href={"//localhost:3000/#/board="+this.props.topicBoardInfo.boardID}>{this.props.topicBoardInfo.boardName}</a>
                </div>
                <div style={{marginLeft:300, fontSize:25,marginTop:10}}>标题</div>
                <div style={{marginLeft:300, marginRight:300,marginTop:10,marginBottom:10}}><Input placeholder="请输入标题" /></div>
                <div style={{marginLeft:300, fontSize:25}}>内容</div>
                <div style={{marginLeft:300,marginTop:10,marginRight:300}}>
                    <div style={{backgroundColor:"rgb(255,255,255)",height:250}}>
                        <Editor
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
                <div style={{marginTop:20,marginLeft:window.innerWidth/2-10,marginBottom:20}}><Button type="primary" size="large">发布</Button></div>
            </BrowserFrame>

        )
    }
}