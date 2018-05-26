import * as React from 'react';
import {Component} from 'react';
import {Redirect} from 'react-router';
import {Button, Form} from 'antd';
import DvaProps from '../types/DvaProps';
import {NavigationBar} from './TssPublicComponents';

interface NaviProps extends DvaProps {
    uid: string;
    level: string;
}

interface loadingState {
    loading : boolean;
}

class LoadButton extends Component<NaviProps,loadingState>{
    constructor(props){
        super(props);
        this.state = {
            loading : false,
        }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        if(this.state.loading)
            this.setState({loading : false});
        else
            this.setState({loading : true});
        //send the requirement of this to the
    }

    render() {
        return (
            <Button
                style={{marginLeft: 35}}
                type="primary"
                loading={this.state.loading}
                onClick={this.handleClick}>
            自动排课
            </Button>
        );
    }
}

const AutoSelectButton: any = Form.create({})(LoadButton);

export  default class AutoSchedulingComponent extends Component<NaviProps, {}> {
    handleClick = (e) => {
        this.props.dispatch({type:'navigation/jump', payload: {direction: e.direction}});
    };

    render() {
        console.log(this.props.level);

        return (
            <div>
                <NavigationBar current={"list"} dispatch={this.props.dispatch}/>
                <br/>
                <div>
                <h2 className={"ant-menu-item-group-title"} style={{fontSize: "large", marginLeft: "35px"}}>自动排课页面</h2>
                <div>
                    <AutoSelectButton/>
                </div>
                </div>
            </div>
        );
    }
}
