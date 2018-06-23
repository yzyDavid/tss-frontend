import * as React from 'react'
import {Component} from 'react'
import NavigationBar from './ForumNavigation';
import BrowserFrame from './ForumBrowserFrame';
import DvaProps from "../models/DvaProps";
import {Form,Button,Pagination} from 'antd'


import any = jasmine.any;

interface MyPostProps extends DvaProps {
    URL:string;
    postList:any;
    unread:any;
}

export default class MyPostPageComponent extends Component<MyPostProps>{

    constructor(props) {
        super(props);


    }


    componentWillMount(){
        var pageNum = document.location.hash;
        var offset = "/forum/mypost/page="
        pageNum = pageNum.substring(offset.length+1);
        this.props.dispatch({type:'mypost/getMyDataByPage', payload:pageNum})
        this.props.dispatch({type:"ForumNavigation/updateUnread",payload:{}});
    }


    gotoAnotherPage=(page)=>{
        var newpath = "/forum/mypost/page="+page.toString()
        this.props.dispatch({type:'forumhome/gotoPageReload', payload:newpath})
    };

    gotoPage=(e)=>{
        this.props.dispatch({type:'forumhome/gotoPage', payload:e})
    };

    render(){


        let display = new Array();

        for(var i =0;i<this.props.postList.titles.length;i++){
            display.push(
                <div style={{fontSize:22,borderStyle:"solid",marginTop:10,borderWidth:1,backgroundColor:"rgb(255,255,255)"}}>
                    <div style={{marginLeft:20,marginTop:10,marginBottom:10}}>
                        {this.props.postList.times[i]}:&nbsp;&nbsp;在
                        <a onClick={this.gotoPage.bind(this,"/forum/board/"+this.props.postList.boardIDs[i]+"/1")} >{this.props.postList.boardNames[i]}</a>
                        发表了
                        <a onClick={this.gotoPage.bind(this,"/forum/topic/"+this.props.postList.topicIDs[i]+"/1")} >{"《"+this.props.postList.titles[i]+"》"}</a>
                    </div>
                </div>

            )
        }






        return(
            <BrowserFrame>
                <NavigationBar unread={this.props.unread} current={"mypost"} dispatch={this.props.dispatch}/>
                <div style={{marginTop:10,marginLeft:300, marginRight:300, fontSize:30,fontWeight:"bold"}}>我发表的帖子</div>
                <div style={{marginLeft:300, marginRight:300}}>
                    <Pagination style={{marginTop:15}} pageSize={20} showQuickJumper defaultCurrent={parseInt(this.props.postList.currentPage)}
                                onChange={this.gotoAnotherPage}
                                total={this.props.postList.totalPage} />
                    {

                        display
                    }
                    <Pagination style={{marginTop:10}} pageSize={20} showQuickJumper defaultCurrent={parseInt(this.props.postList.currentPage)}
                                onChange={this.gotoAnotherPage}
                                total={this.props.postList.totalPage} />
                </div>
            </BrowserFrame>
        )
    }
}