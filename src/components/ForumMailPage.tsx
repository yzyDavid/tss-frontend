import * as React from 'react'
import {Component} from 'react'
import NavigationBar from './ForumNavigation';
import BrowserFrame from './ForumBrowserFrame';
import DvaProps from "../models/DvaProps";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {Button,Modal, Input, Icon } from 'antd'
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
interface letterProps extends DvaProps{
    allstate:any;
}
export default class LetterPageComponent extends Component<letterProps>{

    state:{
        destination:string,
        visible:boolean,
        flag:number,
        title:string,
        editorState:any
    };


    constructor(props) {
        super(props);
        this.state = {
            destination:"",
            title:"",
            visible:false,
            flag: 1,
            editorState:EditorState.createEmpty(),
        };


    }

    setFlag2(e){
        this.setState({flag:2})
    }
    setFlag1(e){
        this.setState({flag:1})
    }
    setFlag3(e){
        this.setState({flag:3})
    }


    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = (e) => {
        this.setState({
            visible: false,
        });
    };

    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleUserName=(e)=>{
        this.setState({destination:e.target.value});
    };

    handleTitle=(e)=>{
        this.setState({title:e.target.value});
    };


    onEditorStateChange: Function = (editorState) => {
        this.setState({
            editorState:editorState,
        });
    };


    postMail=(e)=>{
        console.log(this.state.destination);
        console.log(this.state.title);
       const text = draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())).toString();
        this.props.dispatch({type:'mail/sendMail', payload:{}})

    };

    render(){

        let display = new Array();

        if(this.state.flag===1){
            display.push(

                <div>
                    <div>
                        <Input
                            style={{width:300}}
                            placeholder="输入收件人用户名"
                            prefix={<Icon type="user" />}
                            onChange={value=>this.handleUserName(value)}
                        />
                    </div>
                    <div style={{marginTop:20}}>
                        <Input
                            style={{width:300}}
                            placeholder="输入标题"
                            prefix={<Icon type="book" />}
                            onChange={value=>this.handleTitle(value)}
                        />
                    </div>
                    <div style={{marginTop:20,height:300,backgroundColor:"rgb(255,255,255)",width:1000}}>
                        <Editor
                            wrapperClassName="demo-wrapper  "
                            editorClassName="demo-editor"
                            localization={{
                                locale: 'zh',
                            }}

                            onEditorStateChange={this.onEditorStateChange}
                        />
                    </div>
                    <div style={{marginTop:20}}>
                        <Button icon="mail" type="primary" onClick={this.postMail}>发送</Button>
                    </div>
                </div>


            )

        }else if(this.state.flag===2){

            for(var i=0;i<this.props.allstate.length;i++ ){

                var test = this.props.allstate[i];

                display.push(                    <div style={{marginTop:20,borderStyle:"solid",fontSize:20,borderWidth:1
                    ,backgroundColor:"rgb(255,255,255)"}}>
                    <div style={{marginTop:10,marginBottom:10,marginLeft:15}}>
                        <a>{test.user}</a>向您发送了私信<a type="primary" onClick={this.showModal}>{test.title}</a>，请点击标题查看
                        <Modal title={test.title} visible={this.state.visible}
                               onOk={this.handleOk}
                               onCancel={this.handleCancel}
                        >
                            <div>{test.contents}</div>
                            <div style={{marginTop:20 ,borderTopStyle:"dashed",borderTopWidth:1,width:300}}>{test.user}&nbsp;于{test.time}</div>
                        </Modal>
                    </div>
                </div>)
            }




        }else if(this.state.flag===3){
            for(var i=0;i<this.props.allstate.length;i++ ){

                var test = this.props.allstate[i];

                display.push(                    <div style={{marginTop:20,borderStyle:"solid",fontSize:20,borderWidth:1
                    ,backgroundColor:"rgb(255,255,255)"}}>
                    <div style={{marginTop:10,marginBottom:10,marginLeft:15}}>
                        您向<a>{test.user}</a>发送了私信<a type="primary" onClick={this.showModal}>{test.title}</a>，请点击标题查看
                        <Modal title={test.title} visible={this.state.visible}
                               onOk={this.handleOk}
                               onCancel={this.handleCancel}
                        >
                            <div>{test.contents}</div>
                            <div style={{marginTop:20 ,borderTopStyle:"dashed",borderTopWidth:1,width:300}}>{test.user}&nbsp;于{test.time}</div>
                        </Modal>
                    </div>
                </div>)
            }
        }


        return(
            <BrowserFrame>
                <NavigationBar current={"PrivateLetter"} dispatch={this.props.dispatch}/>
                <div style={{ marginLeft:300,marginRight:300}}>
                    <div  style={{float:"left"}}>
                        <div style={{marginTop:20}}>
                            <Button type="primary" style={{width:80}}  onClick={this.setFlag1.bind(this)}>写信</Button>
                        </div>
                        <div style={{marginTop:20}}>
                            <Button type="primary" style={{width:80}} onClick={this.setFlag2.bind(this)}>收件箱</Button>
                        </div>
                        <div style={{marginTop:20}}>
                            <Button type="primary" style={{width:80}}  onClick={this.setFlag3.bind(this)}>发件箱</Button>
                        </div>
                    </div>
                    <div style={{marginLeft:100,marginTop:20,borderLeftStyle:"dashed",borderLeftWidth:1}}>
                        <div style={{marginLeft:10}}>
                            {
                                display

                            }
                        </div>
                    </div>
                </div>
            </BrowserFrame>
        )
    }
}