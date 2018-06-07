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
        return(
            <Menu mode="inline" onSelect={key=>this.props.dispatch({type:'board/gotoboard', payload:{boardid:key.key}})}>
                <SubMenu key="myboard" title={<span><Icon type="heart" />订阅版块</span>}  >
                    {
                        this.props.mylist.map(function(board){
                            return (
                                <Menu.Item key={board.id}>{board.boardname}</Menu.Item>
                            )
                        })
                    }

                </SubMenu>
            </Menu>

        )
    }
}