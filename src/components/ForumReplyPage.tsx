import * as React from 'react'
import {Component} from 'react'
import NavigationBar from './ForumNavigation';
import BrowserFrame from './ForumBrowserFrame';
import DvaProps from "../models/DvaProps";
import { Menu, Breadcrumb, Icon ,Pagination } from 'antd';
const SubMenu = Menu.SubMenu;


interface ReplyListProps extends DvaProps {

    ReplyList:any;

}

export default class ReplyPageComponent extends Component<ReplyListProps>{

    constructor(props) {
        super(props);


    }

    render(){
        return(
            <BrowserFrame>
                <NavigationBar current={"Reply"} dispatch={this.props.dispatch}/>
                <div style={{marginTop:10,marginLeft:300, marginRight:300, fontSize:30,fontWeight:"bold"}}>回复我的</div>

                <div style={{marginLeft:300, marginRight:300,marginBottom:20}}>
                    <Pagination style={{marginTop:15}} showQuickJumper defaultCurrent={this.props.ReplyList.currentPage} total={this.props.ReplyList.totalPage} />
                    {
                        this.props.ReplyList.data.map(function(reply){

                        return(

                            <div style={{fontSize:22,borderStyle:"solid",marginTop:15,borderWidth:1,backgroundColor:"rgb(255,255,255)"}}>
                                <div style={{marginLeft:20,marginTop:10,marginBottom:10}}>
                                    {reply.time}:&nbsp;&nbsp;
                                    <a href={"//localhost:3000/#/uid="+reply.uid}>{reply.name}</a>在帖子
                                     <a href={"//localhost:3000/#/topic="+reply.topicID}>{reply.title}</a>
                                     中回复了你
                                </div>
                            </div>
                        )


                        })
                    }
                    <Pagination style={{marginTop:15}} showQuickJumper defaultCurrent={this.props.ReplyList.currentPage} total={this.props.ReplyList.totalPage} />
                </div>

            </BrowserFrame>
        )
    }
}