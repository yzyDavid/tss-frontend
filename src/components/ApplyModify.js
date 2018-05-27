import React, {Component} from 'react';
import './scoreButton.css'
import {Link} from 'react-router-dom'
import {tssFetch} from '../utils/tssFetch';

import DvaProps from '../types/DvaProps';


interface ScoreProps extends DvaProps {
    uid: string;
}


class applyModifyComponent extends Component<ScoreProps,{}>{

  constructor(props)
    {
        super(props)
        this.cid = ""
        this.uid = this.props.uid
        this.sid = ""
        this.score = ""
        this.reason = ""
        this.state = {class:["","","","","","","",""], cid:["","","","","","","",""]}
        this.year = ""
        this.semester = "S"

    }

  
   handleSubmit()
   {

     var _this = this
     tssFetch("/grade/modify", "POST", {  "uid": _this.uid, "cid": _this.cid, "score": _this.score, "studentid": _this.sid,"reasons": _this.reason})
   }


   changeClass(e)
    {
      
        var state = this.state
        var _this = this
        this.page = 0
        var className = e.target.value
        var cid = ""
        var flag = 0
        for(var p in className)
        {
            if(className[p] === "(")
            {
                flag = 1
                continue
            }
            else
                if(flag === 0)
                  continue
            if(className[p] === ")")
                break
            cid = cid + className[p]
        }

        this.cid = cid
    }

    changeSemester(e)
    {

        var state = this.state
        var identity = {"uid":this.uid, "semester":"S"}
        this.semester= e.target.value
        var _this=this
        tssFetch("/grade/getallclass", 'POST',  identity)
        .then(function(res)
        {
            res.json().then(function(obj)
            {
                for(var i = 0; i < 7; i++)
                {
                    state.class[i] = ""
                    state.cid[i] = ""
                }

                for(var i = 0; i < obj['courses_name'].length; i++)
                {
                    state.class[i] = obj['courses_name'][i]
                    state.cid[i] = obj['class_id'][i]
                }
                _this.forceUpdate()
            })
        })
    }

     changeYear(e)
    {

        var state = this.state
        var identity = {"uid":"123456", "semester":this.state.semester}
        this.year = e.target.value
        tssFetch("/grade/getallclass", 'POST',  identity)
        .then(function(res)
        {
            res.json().then(function(obj)
            {
                for(var i = 0; i < 7; i++)
                {
                    state.class[i] = ""
                    state.cid[i] = ""
                }

                for(var i = 0; i < obj['courses_name'].length; i++)
                {
                    state.class[i] = obj['courses_name'][i]
                    state.cid[i] = obj['cid'][i]
                }
            })
        })
    }



    changeStu(e)
    {
        this.sid = e.target.value
    }

    changeScore(e)
    {
        this.score = e.target.value
    }

    changeReason(e)
    {
        this.reason = e.target.value
    }

    render()
    {
        return (

        <div>
        

            <h1 align="center">成绩修改申请表</h1>
            <table id="applyTable" align="center" line-height="20px" border="solid #ccc 1px"  cellPadding="15px" margin="0px auto" width="50%">
               
                <tbody>
            
                    <tr>
                        <td  colspan="2">
                         <table >
                             <tbody>
                                <tr>

                                     <td><h2>学年</h2></td>
                                    <td><select onBlur={this.changeYear.bind(this)}>
                                            <option>2015学年</option>
                                            <option>2016学年</option>
                                            <option>2017学年</option>  
                                            <option>2018学年</option>
                                         </select></td>

                                    <td><h2>学期</h2></td>
                                    <td><select onBlur={this.changeSemester.bind(this)}>
                                        <option>第一学期</option>
                                        <option>第二学期</option>
                                        </select></td>

                                     <td><h2>课程</h2></td>
                                     <td><select width="100px"  onBlur={this.changeClass.bind(this)}>}
                                             <option>{this.state.class[0]+"("+this.state.cid[0]+")"}</option>
                                             <option>{this.state.class[1]+"("+this.state.cid[1]+")"}</option>
                                             <option>{this.state.class[2]+"("+this.state.cid[2]+")"}</option>
                                             <option>{this.state.class[3]+"("+this.state.cid[3]+")"}</option>
                                             <option>{this.state.class[4]+"("+this.state.cid[4]+")"}</option>
                                             <option>{this.state.class[5]+"("+this.state.cid[5]+")"}</option>
                                             <option>{this.state.class[6]+"("+this.state.cid[6]+")"}</option>
                                             <option>{this.state.class[7]+"("+this.state.cid[7]+")"}</option>
                                          </select></td>
                                </tr>

                             </tbody>
                        </table>
                        </td>
                    </tr>

                    <tr>
                        <td>
                                <h3>学生编号:</h3>
                                <input onBlur={this.changeStu.bind(this)}></input>
                        </td>
                        <td>
                                <h3>新成绩:</h3>
                                <input onBlur={this.changeScore.bind(this)}></input>
                        </td>

                    </tr>

                    <tr>
                        <td align="center"  colspan="2"><textarea onBlur={this.changeReason.bind(this)} placeholder="原因详述："></textarea></td>
                    </tr>
                </tbody>
            </table>


            <br/>
            <table align="center">
             <tbody>
               <tr>
                 <td><button><Link to='/navi' id="nav">返回</Link></button></td>
                 <td><button onClick={this.handleSubmit.bind(this)}>提交</button></td>
               </tr>
             </tbody>
           </table>

        </div>
            )
    }
}


export default applyModifyComponent



