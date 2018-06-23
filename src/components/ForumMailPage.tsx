import * as React from 'react'
import {Component} from 'react'
import NavigationBar from './ForumNavigation';
import BrowserFrame from './ForumBrowserFrame';
import DvaProps from "../models/DvaProps";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {Button,Modal, Input, Icon ,message,Pagination} from 'antd'
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';


export class checkBoxForm{
    page:string;
}

export class sendMailForm{
    destination:string;
    title:string;
    text:string;
}

export class setReadForm{
    letterId:string
}

interface letterProps extends DvaProps{
    inputList:any;
    outputList:any;
    unread:any;
}
export default class LetterPageComponent extends Component<letterProps>{

    state:{
        destination:string,
        visible:string,
        flag:number,
        title:string,
        editorState:any,
    };


    constructor(props) {
        super(props);
        this.state = {
            destination:"",
            title:"",
            visible:"-1",
            flag: 1,
            editorState:EditorState.createEmpty(),

        };


    }


    componentWillMount(){
        this.props.dispatch({type:"ForumNavigation/updateUnread",payload:{}})
    }
    setFlag2(e){
        this.setState({flag:2});
        const data = new checkBoxForm;
        data.page = "1";
        this.props.dispatch({type:'mail/checkInBox', payload:data})
    }
    setFlag1(e){
        this.setState({flag:1})
    }
    setFlag3(e){
        this.setState({flag:3});
        const data = new checkBoxForm;
        data.page = "1";
        this.props.dispatch({type:'mail/checkOutBox', payload:data})
    }


    showModal = (e) => {
        this.setState({visible:e.toString()});
        if(this.state.flag===2){
            if(this.props.inputList.reads[e]==="false"){
                const readID = new setReadForm;
                readID.letterId = this.props.inputList.letterIDs[e];
                this.props.dispatch({type:'mail/setLetterRead', payload:readID});
            }
        }
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


    gotoAnotherPage=(page)=>{

        const data = new checkBoxForm;
        data.page = page.toString();

        if(this.state.flag===2){
            this.props.dispatch({type:'mail/checkInBox', payload:data})
        }else if(this.state.flag===3){
            this.props.dispatch({type:'mail/checkOutBox', payload:data})
        }
    };

    gotoUserPage=(e)=>{

        this.props.dispatch({type:'forumhome/gotoPage', payload:e});
    };

    postMail=(e)=>{
        // console.log("私信内容如下")
        // console.log(this.state.destination);
        // console.log(this.state.title);
        const text = draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())).toString();
        // console.log(text);

        const data = new sendMailForm;
        data.destination = this.state.destination;
        data.title = this.state.title;
        data.text = text;

        if(data.destination===""){
            message.warning("收信人不能为空")
        }else if(data.title===""){
            message.warning("标题不能为空")
        }else if(data.text==="<p></p>\n"){
            message.warning("内容不能为空")
        }else{
            this.props.dispatch({type:'mail/sendMail', payload:data});
        }


        // if(true){
        //     message.success('发送成功');
        // }else{
        //     message.error('发送失败');
        // }
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
                    <div style={{marginTop:20,height:300,backgroundColor:"rgb(255,255,255)",width:800}}>
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

            if(this.props.inputList.titles.length===0){
                display.push(<div style={{fontSize:20}}>暂时没有您的私信</div>)
            }else{
                for(var i=0;i<this.props.inputList.titles.length;i++ ){
                    let unread;
                    if(this.props.inputList.reads[i]==="false"){
                        unread = <Icon  type="message" />;
                    }else{
                        unread =""
                    }
                    display.push( <div style={{marginTop:20,borderStyle:"solid",fontSize:20,borderWidth:1
                        ,backgroundColor:"rgb(255,255,255)"}}>
                        <div style={{marginTop:10,marginBottom:10,marginLeft:15}}>
                            <a onClick={this.gotoUserPage.bind(this,"/forum/uid/"+this.props.inputList.userIDs[i])}>{this.props.inputList.destinations[i]}</a>向您发送了私信<a type="primary" onClick={this.showModal.bind(this,i)}>{this.props.inputList.titles[i]}</a>，请点击标题查看&nbsp;&nbsp;&nbsp;&nbsp;{unread}
                            <Modal title={this.props.inputList.titles[i]} visible={parseInt(this.state.visible)===i}
                                   onOk={this.handleOk}
                                   onCancel={this.handleCancel}
                            >
                                <div dangerouslySetInnerHTML={{__html: this.props.inputList.texts[i]}}></div>
                                <div style={{marginTop:20 ,borderTopStyle:"dashed",borderTopWidth:1,width:300}}>{this.props.inputList.destinations[i]}&nbsp;于{this.props.inputList.times[i]}</div>
                            </Modal>
                        </div>
                    </div>);

                }
                display.push(<div style={{marginTop:20}}><Pagination showQuickJumper
                                                                     onChange={this.gotoAnotherPage}pageSize={20}
                                                                     defaultCurrent={parseInt("1")} total={parseInt(this.props.inputList.totalPage)*20}  /></div>);
            }




        }else if(this.state.flag===3){
            if(this.props.outputList.titles.length===0){
                display.push(<div style={{fontSize:20}}>您还没有发过私信</div>)
            }else{
                for(var i=0;i<this.props.outputList.titles.length;i++ ){
                    display.push(<div style={{marginTop:20,borderStyle:"solid",fontSize:20,borderWidth:1
                        ,backgroundColor:"rgb(255,255,255)"}}>
                        <div style={{marginTop:10,marginBottom:10,marginLeft:15}}>
                            您向<a  onClick={this.gotoUserPage.bind(this,"/forum/uid/"+this.props.outputList.userIDs[i])} >{this.props.outputList.destinations[i]}</a>发送了私信<a type="primary" onClick={this.showModal.bind(this,i)}>{this.props.outputList.titles[i]}</a>，请点击标题查看
                            <Modal title={this.props.outputList.titles[i]} visible={parseInt(this.state.visible)===i}
                                   onOk={this.handleOk}
                                   onCancel={this.handleCancel}
                            >
                                <div dangerouslySetInnerHTML={{__html: this.props.outputList.texts[i]}}></div>
                                <div style={{marginTop:20 ,borderTopStyle:"dashed",borderTopWidth:1,width:300}}>{this.props.outputList.destinations[i]}&nbsp;于{this.props.outputList.times[i]}</div>
                            </Modal>
                        </div>
                    </div>)
                }
                display.push(<div style={{marginTop:20}}><Pagination showQuickJumper
                                                                     onChange={this.gotoAnotherPage} pageSize={20} defaultCurrent={parseInt("1")} total={parseInt(this.props.outputList.totalPage)*20}  /></div>);

            }


        }


        return(
            <BrowserFrame>
                <NavigationBar unread={this.props.unread} current={"PrivateLetter"} dispatch={this.props.dispatch}/>
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