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
}

export default class MyPostPageComponent extends Component<MyPostProps>{

    constructor(props) {
        super(props);


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


        var data = new postForm;
        data.page="1";
        data.uid="3150";

        this.props.dispatch({type:'mypost/getUserDataByPage', payload:data})
    }


    gotoAnotherPage=(page)=>{
        this.props.dispatch({type:'mypost/getDataByPage', payload:page})
    };

    render(){


        let display = new Array();

        for(var i =0;i<this.props.postList.titles.length;i++){
            display.push(
                <div style={{fontSize:22,borderStyle:"solid",marginTop:10,borderWidth:1,backgroundColor:"rgb(255,255,255)"}}>
                    <div style={{marginLeft:20,marginTop:10,marginBottom:10}}>
                        {this.props.postList.times[i]}:&nbsp;&nbsp;在
                        <a href={this.props.URL+"#/forum/board="+this.props.postList.boardIDs[i]}>{this.props.postList.boardNames[i]}</a>
                        发表了
                        <a href={this.props.URL+"#/forum/topic/"+this.props.postList.topicIDs[i]+"/1"}>{"《"+this.props.postList.titles[i]+"》"}</a>
                    </div>
                </div>

            )



        }






        return(
            <BrowserFrame>
                <NavigationBar current={"mypost"} dispatch={this.props.dispatch}/>
                <div style={{marginTop:10,marginLeft:300, marginRight:300, fontSize:30,fontWeight:"bold"}}><a>{this.props.postList.userName}</a>发表的帖子</div>
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