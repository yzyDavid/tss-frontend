import * as React from 'react'
import {Component} from 'react'
import NavigationBar from './TssPublicComponents';
import BrowserFrame from './ForumBrowserFrame';
import DvaProps from "../models/DvaProps";

export default class LetterPageComponent extends Component<DvaProps>{

    constructor(props) {
        super(props);


    }

    render(){
        return(
            <BrowserFrame>
                <NavigationBar current={"PrivateLetter"} dispatch={this.props.dispatch}/>
            </BrowserFrame>
        )
    }
}