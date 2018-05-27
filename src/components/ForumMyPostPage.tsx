import * as React from 'react'
import {Component} from 'react'
import NavigationBar from './ForumNavigation';
import BrowserFrame from './ForumBrowserFrame';
import DvaProps from "../models/DvaProps";
import {Form, Button, Pagination} from 'antd'

interface MyPostProps extends DvaProps {
    postList: any;
}

export default class MyPostPageComponent extends Component<MyPostProps> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <BrowserFrame>
                <NavigationBar current={"mypost"} dispatch={this.props.dispatch}/>
                <div style={{marginTop: 10, marginLeft: 300, marginRight: 300, fontSize: 30, fontWeight: "bold"}}>
                    <a>{this.props.postList.userName}</a>发表的帖子
                </div>
                <div style={{marginLeft: 300, marginRight: 300}}>
                    <Pagination style={{marginTop: 15}} showQuickJumper defaultCurrent={this.props.postList.currentPage}
                                total={this.props.postList.totalPage}/>
                    {
                        this.props.postList.data.map(function (post) {
                            return (

                                <div style={{
                                    fontSize: 22,
                                    borderStyle: "solid",
                                    marginTop: 10,
                                    borderWidth: 1,
                                    backgroundColor: "rgb(255,255,255)"
                                }}>
                                    <div style={{marginLeft: 20, marginTop: 10, marginBottom: 10}}>
                                        {post.time}:&nbsp;&nbsp;在
                                        <a href={"//localhost:3000/#/forum/board=" + post.boardID}>{post.boardName}</a>
                                        发表了
                                        <a href={"//localhost:3000/#/forum/topic=" + post.topicID}>{"《" + post.title + "》"}</a>
                                    </div>
                                </div>
                            )
                        })
                    }
                    <Pagination style={{marginTop: 10}} showQuickJumper defaultCurrent={this.props.postList.currentPage}
                                total={this.props.postList.totalPage}/>
                </div>
            </BrowserFrame>
        )
    }
}