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


    constructor(props) {
        super(props);

    }

    uploadFiles=(e)=>{

     //   var uploadFile = new FormData($("#file")[0]);

    };

    handleChange=(e)=>{
    //    var flag = false;
  //      var reader = new FileReader();
        //this.props.dispatch({type:'forumUser/changePhoto', payload:e.target.files[0]})
//        reader.readAsArrayBuffer(e.target.files[0]);
       // console.log(e.target.files[0]);
       //  var flag=false;
       //  let temp;

        var promise =  new Promise(function(resolve, reject) {
            let reader = new FileReader();
            reader.readAsArrayBuffer(e.target.files[0]);
            reader.onload = function() {
                resolve(reader.result)
            }
        });
        // reader.onload = function(e){
        //     console.log("读取成功");
        //     console.log(reader.result.byteLength);
        //     temp =  new Uint8Array(reader.result);
        //     flag = true;
        //     return temp;
        //
        // };
        var temp;
        promise.then(function(successLoad){
           // console.log(successLoad)

            temp = successLoad;
        });

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

