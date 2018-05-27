import React, {Component} from 'react';
import './scoreButton.css'
import {Link} from 'react-router-dom'
import {tssFetch} from '../utils/tssFetch';

import DvaProps from '../types/DvaProps';



class scoreManagerComponent extends Component<ScoreProps,{}>{

  constructor()
    {
        super()
        this.page = 0
        this.num = 0
        this.process = []
        this.scores = []
        this.uids = []
        this.cids = []
        this.ids = []
        this.reasons = []
        this.score = null
        this.uid = null
        this.cid = null
        this.tid = null
        this.reason=null
        this.id = null
        

    }

    componentDidMount(){
        var  _this = this
        tssFetch("/grade/getprocessmodify", "POST", {"uid": "root"})  
        .then(function(res)
        {
            res.json().then(function(obj)
            {
               var i = 0
               for(i=0;i<obj['cids'].length;i++)
               {
                  _this.ids.push(obj['ids'][i])
                  _this.reasons.push(obj['reasons'][i])
                  _this.scores.push(obj['scores'][i])
                  _this.uids.push(obj['uids'][i])
                  _this.cids.push(obj['cids'][i])
              
               }

               if(_this.uids.length > 0)
               {
                  _this.num = i
                  _this.id = _this.ids[0]
                  _this.uid = _this.uids[0]
                  _this.cid = _this.cids[0]
                  _this.reason = _this.reasons[0]
                  _this.score = _this.scores[0]
                  _this.forceUpdate()
               }
               else
               {
                alert('当前无修改成绩请求！')
               }
            })
        })
    }


    handleSubmit(res)
    {
       var _this = this
       tssFetch("/grade/processmodify","POST",  {"id": _this.id, "uids":_this.uid, "cids":_this.cid, "score":_this.score, "agree":res})        
    }

    nextPage()
    {
        if(this.page === this.num)
        {
            alert('没有更多的修改请求了！')
            return
        }

        this.page = this.page + 1
        this.id = this.ids[this.page]
        this.uid = this.uids[this.page]
        this.cid = this.cids[this.page]
        this.score = this.scores[this.page]
        this.reason = this.reasons[this.page]
        this.forceUpdate()

    }
  
  
    render()
    {
        return (

        <div>
        

            <h1 align="center">成绩修改申请表</h1>
            <table id="applyTable" align="center" line-height="20px" border="solid #ccc 1px"  cellPadding="15px" margin="0px auto" width="50%">
               
                <tbody>

                    <tr>
                        <td>
                                <h3>学生编号:</h3>
                                <div>{this.uid}</div>
                        </td>
                        <td>
                                <h3>新成绩:</h3>
                                <div>{this.score}</div>
                        </td>

                    </tr>
            
                    <tr>
                        <td colspan="2">
                                <h3>课程编号:</h3>
                                <div>{this.cid}</div>
                        </td>
    
                    </tr>

                    <tr>

                        <td align="center"  colspan="3"><textarea value= { this.reason}></textarea></td>
                    </tr>
                </tbody>
            </table>


            <br/>
            <table align="center">
             <tbody>
               <tr>
                 <td><button onClick={this.handleSubmit.bind(this,true)}>同意</button></td>
                 <td><button onClick={this.handleSubmit.bind(this,false)}>拒绝</button></td>
                 <td><button onClick={this.nextPage.bind(this)}>下一个</button></td>
                 <td><button><Link to='/navi' id="nav">返回</Link></button></td>
                
               </tr>
             </tbody>
           </table>

        </div>
            )
    }
}


export default scoreManagerComponent



