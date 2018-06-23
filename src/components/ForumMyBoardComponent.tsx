import * as React from 'react'
import {Component} from 'react'
import { Menu, Breadcrumb, Icon } from 'antd';
import DvaProps from '../models/DvaProps'
const SubMenu = Menu.SubMenu;


interface MyBoardProps extends DvaProps {

    mylist:any;

}

export default class MyBoard extends Component<MyBoardProps>{
    constructor(props) {
        super(props);

    }


    render(){

        let display = new Array();
        for(var i=0;i<this.props.mylist.boardIDs.length;i++){
            display.push(<Menu.Item key={this.props.mylist.boardIDs[i]}>{this.props.mylist.boardNames[i]}</Menu.Item>)
        }

        return(
            <Menu mode="inline" onSelect={key=>this.props.dispatch({type:'board/gotoboard', payload:{boardid:key.key}})}>
                <SubMenu key="myboard" title={<span><Icon type="heart" />订阅版块</span>}  >
                    {
                        display
                    }

                </SubMenu>
            </Menu>

        )
    }
}