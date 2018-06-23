import * as React from 'react'
import {Component} from 'react'
import NavigationBar from './ForumNavigation';
import BrowserFrame from './ForumBrowserFrame';
import DvaProps from "../models/DvaProps";
import { Menu, Breadcrumb, Icon ,Pagination } from 'antd';
const SubMenu = Menu.SubMenu;


export class DataForm{
    page:string;
}

export class  readDataForm{
    topicID:string;
    replyPos:string;
}
interface ReplyListProps extends DvaProps {
    URL:string;
    ReplyList:any;
    unread:any;
}

export default class ReplyPageComponent extends Component<ReplyListProps>{

    constructor(props) {
        super(props);


    }

    componentWillMount(){
        const data = new DataForm;
        data.page="1";
        this.props.dispatch({type:'replyList/getData', payload:data});
        this.props.dispatch({type:"ForumNavigation/updateUnread",payload:{}});
    }

    setRead=(e)=>{
        const data = new readDataForm;
        data.topicID = this.props.ReplyList.topicIDs[e];
        data.replyPos = this.props.ReplyList.replyPos[e];
        this.props.dispatch({type:"replyList/setReplyRead",payload:data});

        this.props.dispatch({type:"forumhome/gotoPage",payload:"/forum/topic/"+this.props.ReplyList.topicIDs[e]+"/1"});
    };

    gotoPage=(e)=>{
        this.props.dispatch({type:"forumhome/gotoPage",payload:e});
    };


    gotoAnotherPage=(page)=>{
        var newpath = "/forum/reply/"+page.toString()
        this.props.dispatch({type:'forumhome/gotoPageReload', payload:newpath});
    }
    render(){
        let url = this.props.URL;

        let display = new Array();
        for(var i=0;i<this.props.ReplyList.userIDs.length;i++){

            let unread;
            if(this.props.ReplyList.reads[i]==='0'){
                unread = <Icon type="info-circle-o" />;
            }else{
                unread = ""
            }
            display.push(
                <div style={{fontSize:22,borderStyle:"solid",marginTop:15,borderWidth:1,backgroundColor:"rgb(255,255,255)"}}>
                    <div style={{marginLeft:20,marginTop:10,marginBottom:10}}>
                        {this.props.ReplyList.times[i]}:&nbsp;&nbsp;
                        <a onClick={this.gotoPage.bind(this,"/forum/uid/"+this.props.ReplyList.userIDs[i])} >{this.props.ReplyList.userNames[i]}</a>在帖子
                        <a onClick={this.setRead.bind(this,i)} >{this.props.ReplyList.titles[i]}</a>
                        中回复了你&nbsp;&nbsp;&nbsp;&nbsp;{unread}
                    </div>
                </div>)
        }
        return(
            <BrowserFrame>
                <NavigationBar  unread={this.props.unread} current={"Reply"} dispatch={this.props.dispatch}/>
                <div style={{marginTop:10,marginLeft:300, marginRight:300, fontSize:30,fontWeight:"bold"}}>回复我的</div>

                <div style={{marginLeft:300, marginRight:300,marginBottom:20}}>
                    <Pagination style={{marginTop:15}} showQuickJumper defaultCurrent={parseInt(this.props.ReplyList.currentPage)} total={parseInt(this.props.ReplyList.totalPage)} onChange={this.gotoAnotherPage}/>
                    {
                        display
                    }
                    <Pagination style={{marginTop:15}} showQuickJumper defaultCurrent={parseInt(this.props.ReplyList.currentPage)} total={parseInt(this.props.ReplyList.totalPage)} onChange={this.gotoAnotherPage} />
                </div>

            </BrowserFrame>
        )
    }
}