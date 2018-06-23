import * as React from 'react'
import {Component} from 'react'
import { Menu, Button,Pagination ,Card} from 'antd';
import DvaProps from '../models/DvaProps'
import NavigationBar from './ForumNavigation';
import {Simulate} from "react-dom/test-utils";
import compositionStart = Simulate.compositionStart;
import any = jasmine.any;
import input = Simulate.input;



const SubMenu = Menu.SubMenu;

export class searchForm{
    key:string;
}


export class searchTopicForm{
    key:string;
    page:string;
}
interface SearchProps extends DvaProps {
    URL:string;
    typeList:any;
    keyList:any;
    topicData:any;
    boardData:any;
    userData:any;
    unread:any;
}

export default class SearchPage extends Component<SearchProps>{

    state:{
        key:string
        type:string
    }
    constructor(props){
        super(props);

    }



    componentWillMount(){
        this.props.dispatch({type:"ForumNavigation/updateUnread",payload:{}});
        var location = document.location.hash.toString();
        const temp = "#/forum/search/";
        location = location.substring(temp.length);

        var type="";
        var pos;
        for(var i =0;;i++){
            if(location[i]==='/'){
                pos= i+1;
                break;
            }else{
                type = type+location[i];
            }
        }

        this.setState({type:type})

        if(type==="topic"){
            console.log("in title")
            var key ="";
            var page="";
            var pos2;
            for(var j=location.length-1;;j--){
                if(location[j]==='/'){
                    pos2 = j;
                    break;
                }
            }

            page = location.substring(pos2+1);

            for(var k=pos;k<pos2;k++){
                key = key+location[k];
            }


            let data = new searchTopicForm;
            key = decodeURI(key);
            data.key = key;
            data.page = page;
            console.log("下面是search topic的关键字");
            this.setState({key:key})
            console.log(data);
            this.props.dispatch({type:'search/getSearchData', payload:{key:data,type:type}})
        }else if(type==="board" || type==="user"){

            var key = location.substring(pos);

            var data = new searchForm;
            key = decodeURI(key);
            data.key = key;
            this.setState({key:key})
            this.props.dispatch({type:'search/getSearchData', payload:{key:data,type:type}})

        }


    }

    gotoPage=(e)=>{
        this.props.dispatch({type:'forumhome/gotoPage', payload:e})
    };

    render(){

        let resultNum;
        let display = new Array();

        if(this.state.type==="topic"){
            resultNum = this.props.topicData.titles.length;
            if(resultNum===0){

            }else{

                display.push(
                    <Pagination style={{marginTop:15}} pageSize={20} showQuickJumper defaultCurrent={parseInt(this.props.topicData.currentPage)}
                                total={parseInt(this.props.topicData.totalPage)*20}
                    />
                );

                for(var i =0;i<this.props.topicData.titles.length;i++){
                    display.push(
                        <div style={{fontSize:22,borderStyle:"solid",marginTop:10,borderWidth:1,backgroundColor:"rgb(255,255,255)"}}>
                            <div style={{marginLeft:20,marginTop:10,marginBottom:10}}>
                                {this.props.topicData.times[i]}:&nbsp;&nbsp;在
                                <a onClick={this.gotoPage.bind(this,"/forum/board"+this.props.topicData.boardIDs[i]+"/1")} >{this.props.topicData.boardNames[i]}</a>
                                发表了
                                <a onClick={this.gotoPage.bind(this,"/forum/topic/"+this.props.topicData.topicIDs[i]+"/1")} >{"《"+this.props.topicData.titles[i]+"》"}</a>
                            </div>
                        </div>

                    )
                }



                display.push(
                    <Pagination style={{marginTop:15}} pageSize={20} showQuickJumper defaultCurrent={parseInt(this.props.topicData.currentPage)}
                                total={parseInt(this.props.topicData.totalPage)*20}
                    />
                )
            }

        }else if(this.state.type==="board"){
            resultNum = this.props.boardData.boardNames.length;
            for(var i=0; i<resultNum;i++){

                var boardName = this.props.boardData.boardNames[i];
                display.push(    <div>
                    <Button href={this.props.URL+"#/forum/board/"+this.props.boardData.boardIDs[i]+"/1"}  type="primary" style={{width:160,float:"left",marginLeft:20,marginTop:20}}>{boardName}</Button>
                </div>)
            }



        }else if(this.state.type==="user"){
            resultNum = this.props.userData.userIDs.length;
            for(var i=0; i<resultNum;i++){

                var name = this.props.userData.userNames[i];
                display.push(    <div>
                    <Card style={{ width: 240 ,float:"left",marginLeft:20,marginTop:20}} bodyStyle={{ padding: 0 }}>
                        <div >
                            <img  width="100%" src={this.props.userData.photoURLs[i]} />
                        </div>
                        <div >
                            <a onClick={this.gotoPage.bind(this,"/forum/uid/"+this.props.userData.userIDs[i])}>{this.props.userData.userNames[i]}</a>

                        </div>
                    </Card>
                </div>)
            }
        }




        return(
            <div>
                <NavigationBar  unread={this.props.unread} current={""} dispatch={this.props.dispatch}/>
                <div style={{fontSize:25,marginLeft:200,marginTop:10}}>按{this.props.typeList.type}搜索"{this.state.key}"</div>
                <div style={{marginLeft:200,marginTop:10}}>↓共有记录{resultNum}条</div>
                <div style={{marginLeft:200,marginRight:200,marginTop:20,}}>
                    {
                        display
                    }
                </div>
            </div>
        )

    }
}