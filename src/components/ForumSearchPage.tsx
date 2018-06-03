import * as React from 'react'
import {Component} from 'react'
import { Menu, Button,Form ,Input} from 'antd';
import DvaProps from '../models/DvaProps'
import NavigationBar from './ForumNavigation';
import {Simulate} from "react-dom/test-utils";
import compositionStart = Simulate.compositionStart;
import any = jasmine.any;
import input = Simulate.input;



const SubMenu = Menu.SubMenu;


interface SearchProps extends DvaProps {

    boardList:any;
}

export default class SearchPage extends Component<SearchProps>{

    state={
        reader: new FileReader()
    };
    constructor(props){
        super(props);

    }

    uploadFiles=(e)=>{

     //   var uploadFile = new FormData($("#file")[0]);

    };



    test(){
        const  data =this.state.reader.result;
        //const temp = new String(this.state.reader.result).toString();
        //console.log(this.state.reader.result)
        this.props.dispatch({type:'forumUser/changePhoto', payload:data})
    }

    handleChange=(e)=>{

        //var reader =  new FileReader();
        this.state.reader.readAsBinaryString(e.target.files[0]);
       // this.state.reader.readAsArrayBuffer();
        this.state.reader.onload = function (e) {
            console.log("OK");
               // return this.result;
        };

       // console.log(e.target.files[0]);
       //  var flag=false;
       //  let temp;

        // var promise =  new Promise(function(resolve, reject) {
        //     let reader = new FileReader();
        //     reader.readAsArrayBuffer(e.target.files[0]);
          //     reader.onload = function() {
        //         resolve(reader.result)
        //     }
        // }).then(function(successLoad){
        //     // console.log(successLoad)
        // });



    };





    render(){

        let replylist = new Array();
        for(var i=0; i<this.props.boardList.result.length;i++){

            var boardName = this.props.boardList.result[i];
            replylist.push(    <div>
                <Button type="primary" style={{width:160,float:"left",marginLeft:20,marginTop:20}}>{boardName}</Button>
            </div>)
        }


        return(
            <div>
                <h3>选择一个文件:</h3>
                <Form >

                    <input type="file"   name="uploadFile" onChange={this.handleChange.bind(this)}/>
                    {/*<input onClick= {this.uploadFiles.bind(this)}  type="button" value="上传" />*/}
                </Form>

                <Button onClick={this.test.bind(this)}>上传</Button>


                {/*<div>*/}
                {/*<NavigationBar current={""} dispatch={this.props.dispatch}/>*/}
                {/*<div style={{fontSize:25,marginLeft:200,marginTop:10}}>按{this.props.boardList.type}搜索"{this.props.boardList.key}"</div>*/}
                {/*<div style={{marginLeft:200,marginTop:10}}>↓共有记录{this.props.boardList.num}条</div>*/}
                {/*<div style={{marginLeft:200,marginRight:200,marginTop:20,}}>*/}
                {/*{*/}
                {/*replylist*/}
                {/*}*/}
                {/*</div>*/}
                {/*</div>*/}


            </div>
        )

    }
}

