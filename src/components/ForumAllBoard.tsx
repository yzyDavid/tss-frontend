import * as React from 'react'
import {Component} from 'react'
import { Menu, Button } from 'antd';
import DvaProps from '../models/DvaProps'
import NavigationBar from './ForumNavigation';
import {Simulate} from "react-dom/test-utils";
import compositionStart = Simulate.compositionStart;
import change = Simulate.change;



const SubMenu = Menu.SubMenu;


interface AllBoardProps extends DvaProps {

    boardList:any; 
}

export default class AllBoard extends Component<AllBoardProps>{
    state = {
        id:String
    };
    constructor(props) {
        super(props);
    }

    goToBoard = (e) => {
        this.props.dispatch({type:'ForumAllBoard/goToBoard', payload:e.toString()})
    };


    componentWillMount(){
        this.props.dispatch({type:'ForumAllBoard/getData', payload:{}});
    }
    render(){

        let replylist = new Array();
        for(var i=0; i<this.props.boardList.boardIDs.length;i++){
            var boardID = this.props.boardList.boardIDs[i];
            var boardName = this.props.boardList.boardNames[i];
            replylist.push(    <div>
                <Button type="primary" style={{width:160,float:"left",marginLeft:20,marginTop:20}}  onClick={this.goToBoard.bind(this,boardID)}>{boardName}</Button>
            </div>)
        }


        return(
            <div>
                {/*<NavigationBar current={""} dispatch={this.props.dispatch}/>*/}
                <div style={{fontSize:25,marginLeft:200,marginTop:10}}>全部版块</div>
                <div style={{marginLeft:200,marginRight:200,marginTop:20,}}>
                    {
                        replylist
                    }
                </div>
            </div>

        )
    }
}

//DONE