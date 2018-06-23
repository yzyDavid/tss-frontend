import * as React from 'react'
import {Component} from 'react'
import NavigationBar from './ForumNavigation';
import BrowserFrame from './ForumBrowserFrame';
import DvaProps from "../models/DvaProps";
import {Form,Button,Pagination} from 'antd'


export class postForm{
    uid:string;
    page:string;

}

interface MyPostProps extends DvaProps {
    URL:string;
    postList:any;
    unread:any;

}

export default class MyPostPageComponent extends Component<MyPostProps>{

    state:{
        uid:""
    };
    constructor(props) {
        super(props);


    }

    gotoPage=(e)=>{
        this.props.dispatch({type:'forumhome/gotoPage', payload:e})
    };

    componentWillMount(){

        var location = document.location.hash.toString();
        const temp = "#/forum/userpost/";
        location = location.substring(temp.length);

        var UID="";
        var pos;
        for(var i =0;;i++){
            if(location[i]==='/'){
                pos= i+1;
                break;
            }else{
                UID = UID+location[i];
            }
        }

        var pageNum = location.substring(pos);


        var data = new postForm;
        data.page=pageNum;
        data.uid=UID;
        this.setState({uid:UID})
        this.props.dispatch({type:'mypost/getUserDataByPage', payload:data})
        this.props.dispatch({type:"ForumNavigation/updateUnread",payload:{}});
    }


    gotoAnotherPage=(page)=>{
        var newpath = "/forum/userpost/"+this.state.uid+"/"+page.toString()
        this.props.dispatch({type:'forumhome/gotoPageReload', payload:newpath})
    };

    render(){

        let UID = this.state.uid  ;
        let display = new Array();

        if(this.props.postList.titles===null){
            display.push(<div>暂时没有发帖纪录</div>)
        }else{
            display.push(                    <Pagination style={{marginTop:15}} pageSize={20} showQuickJumper defaultCurrent={parseInt(this.props.postList.currentPage)}
                                                         onChange={this.gotoAnotherPage}
                                                         total={this.props.postList.totalPage} />)
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

            display.push(<Pagination style={{marginTop:10}} pageSize={20} showQuickJumper defaultCurrent={parseInt(this.props.postList.currentPage)}
                                     onChange={this.gotoAnotherPage}
                                     total={this.props.postList.totalPage} />)
        }






        return(
            <BrowserFrame>
                <NavigationBar  unread={this.props.unread} current={"mypost"} dispatch={this.props.dispatch}/>
                <div style={{marginTop:10,marginLeft:300, marginRight:300, fontSize:30,fontWeight:"bold"}}><a onClick={this.gotoPage.bind(this,"/forum/uid/"+UID)} >{ this.props.postList.userName}</a>发表的帖子</div>
                <div style={{marginLeft:300, marginRight:300}}>

                    {

                        display
                    }

                </div>
            </BrowserFrame>
        )
    }
}