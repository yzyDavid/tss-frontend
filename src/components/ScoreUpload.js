import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route} from 'react-router-dom'
import {Link} from 'react-router-dom'
import {httpMethod, tssFetch} from '../utils/tssFetch';
import {loadSession} from '../utils/localStorage';
import './ScoreUpload.css';
import './scoreButton.css';
import GlobalState from '../types/globalState';
import DvaProps from '../types/DvaProps';


interface ScoreProps extends DvaProps {
    uid: string;
   
}


export default class scoreUploadComponent extends Component<ScoreProps,{}>{

    constructor(props)
    {
    	super(props)
        this.cid = ""
        this.page = 0
        this.last_page = 0
        this.state = {id:[], 
                      name:[],
                      score:[],
                      class:["","","","","","","",""],
                      cid:["","","","","","",""]}

        this.uid = this.props.uid //JSON.parse(localStorage.getItem("fuck"))['uid']
        console.log(this.props)
        this.semester = "S"
        this.year = "2015学年"
    }


    changePage(step)
    {


    	if(this.page === 0 && step < 0)
    	{
    		alert('已经是第一页了！')
    		return;
    	}

    	if(this.last_page === this.page && step > 0)
    	{
    		alert('已经是最后一页了！')
    		return;
    	}

    	this.page += step

        this.forceUpdate()
    }

    
    changeSemester(e)
    {

        var state = this.state
        var identity = {"uid": this.uid, "semester":e.target.value}
        this.semester = e.target.value
        console.log(JSON.stringify(identity))
        var _this = this
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
                // console.log(obj.toString())
                console.log("length",obj['courses_name'].length)
                for(var i = 0; i < obj['courses_name'].length; i++)
                {
                    state.class[i] = obj['courses_name'][i]
                    state.cid[i] = obj['class_id'][i]
                }

            _this.forceUpdate()
            }
            )
        })

    }

    changeYear(e)
    {

        var state = this.state
        var identity = {"uid": this.uid, "semester":this.semester}
        this.year = e.target.value
        console.log(JSON.stringify(identity))
        var _this = this
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
                // console.log(obj.toString())
                console.log("length",obj['courses_name'].length)
                for(var i = 0; i < obj['courses_name'].length; i++)
                {
                    state.class[i] = obj['courses_name'][i]
                    state.cid[i] = obj['class_id'][i]
                }

            _this.forceUpdate()
            }
            )
        })

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
        console.log("cid",this.cid);
        var data =  {"uid":this.uid,"cid":_this.cid}
        var _this = this
        tssFetch('/grade/getclassstudent', 'POST',data).then(function(res)
        {
            res.json().then(function(obj)
            {
                state.id = []
                state.name = []
                state.score = []
                var i = 0
                for(var p in  obj["students"])
                {
                    state.id.push(p)
                    state.name.push(obj.name[i])
                    state.score.push("0")
                    i++
                }

                _this.forceUpdate()
                _this.last_page = Math.ceil(i / 12) 

                for(var j = 0; j < (_this.last_page*12-i); j++)
                {
                    state.id.push("")
                    state.name.push("")
                    state.score.push("")
                }
                
            })
        })
        
    }

     changeScore(index, e)
    {
        this.state.score[12*this.page+index] = e.target.innerHTML
        this.forceUpdate()
    }


    upload()
    {
        for(var p in this.state.score)
        {
            if(p === "")
            {
                alert("还有尚未填写的成绩！")
                return
            }
        }

   
        var permission = 0


        identity = {"uid":this.uid, "cid":this.cid}
        tssfetch("/grade/getclassstudentscore", "GET", identity) 
        .then(function(res)
        {
            res.json().then(function(obj)
            {
                var i = 0
                for(i = 0; i < 5; i++)
                {
                    if(obj['score'][i] == 1)
                        break
                }
                if(i === 5)
                    permission == 1
            })
        })

        if(permission === 0)
        {
            alert('该课程已经被登记，不能再进行操作！')
            return
        }

        tssfetch("/grade/add", "PUT", {"uid":this,uid, "cid":_this.cid, "studentid":_this.state.students, "score":_this.state.score})
        alert("登记成功！")
    }

	render()
	{
		return (
        <div>

             <table>
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
                        <option value= 'S'>第一学期</option>
                        <option value= 'S'>第二学期</option>
                        </select></td>

                    <td><h2>课程名</h2></td>
                     <td><select width="100px"  onBlur={this.changeClass.bind(this)}>
                    <option>{this.state.class[0]+"("+this.state.cid[0]+")"}</option>
                    <option>{this.state.class[1]+"("+this.state.cid[1]+")"}</option>
                    <option>{this.state.class[2]+"("+this.state.cid[2]+")"}</option>
                    <option>{this.state.class[3]+"("+this.state.cid[3]+")"}</option>
                    <option>{this.state.class[4]+"("+this.state.cid[4]+")"}</option>
                    <option>{this.state.class[5]+"("+this.state.cid[5]+")"}</option>
                    <option>{this.state.class[6]+"("+this.state.cid[6]+")"}</option>
                        </select></td>
                    </tr>

                </tbody>
            </table>

            <h1 align="center" textSize="60px">课程成绩表</h1>
            <table ref={(scoreTable) => this.scoreTable = scoreTable} id="scoreTable" align="center" line-height="20px" cellPadding="15px" margin="0px auto" width="80%">
                
                <tbody>
                    <tr className="scoreHead">
                        <td>学生编号</td>
                        <td>学生姓名</td>
                        <td >百分制成绩</td>
                    </tr>

                    <tr>
                        <td>{this.state.id[this.page*12+0]}</td>
                        <td>{this.state.name[this.page*12+0]}</td>
                        <td><div contentEditable="true" onBlur={this.changeScore.bind(this,0)}>{this.state.score[this.page*12+0]}</div></td>  
                    </tr>
   

                    <tr className="oddLine">
                        <td>{this.state.id[this.page*12+1]}</td>
                        <td>{this.state.name[this.page*12+1]}</td>
                        <td><div contentEditable="true" onBlur={this.changeScore.bind(this, 1)}>{this.state.score[this.page*12+1]}</div></td>  
                    </tr>

                    <tr>
                        <td>{this.state.id[this.page*12+2]}</td>
                        <td>{this.state.name[this.page*12+2]}</td>
                        <td><div contentEditable="true" onBlur={this.changeScore.bind(this, 2)}>{this.state.score[this.page*12+2]}</div></td>  
                    </tr>
   

                    <tr className="oddLine">
                        <td>{this.state.id[this.page*12+3]}</td>
                        <td>{this.state.name[this.page*12+3]}</td>
                        <td><div contentEditable="true" onBlur={this.changeScore.bind(this, 3)}>{this.state.score[this.page*12+3]}</div></td> 
                    </tr>

                    <tr>
                        <td>{this.state.id[this.page*12+4]}</td>
                        <td>{this.state.name[this.page*12+4]}</td>
                        <td><div contentEditable="true" onBlur={this.changeScore.bind(this, 4)}>{this.state.score[this.page*12+4]}</div></td> 
                    </tr>
   

                    <tr className="oddLine">
                        <td>{this.state.id[this.page*12+5]}</td>
                        <td>{this.state.name[this.page*12+5]}</td>
                        <td><div contentEditable="true" onBlur={this.changeScore.bind(this, 5)}>{this.state.score[this.page*12+5]}</div></td> 
                    </tr>

                    <tr>
                        <td>{this.state.id[this.page*12+6]}</td>
                        <td>{this.state.name[this.page*12+6]}</td>
                        <td><div contentEditable="true" onBlur={this.changeScore.bind(this, 6)}>{this.state.score[this.page*12+6]}</div></td> 
                    </tr>
   

                    <tr className="oddLine">
                        <td>{this.state.id[this.page*12+7]}</td>
                        <td>{this.state.name[this.page*12+7]}</td>
                        <td><div contentEditable="true" onBlur={this.changeScore.bind(this, 7)}>{this.state.score[this.page*12+7]}</div></td> 
                    </tr>

                    <tr>
                        <td>{this.state.id[this.page*12+8]}</td>
                        <td>{this.state.name[this.page*12+8]}</td>
                        <td><div contentEditable="true" onBlur={this.changeScore.bind(this, 8)}>{this.state.score[this.page*12+8]}</div></td> 
                    </tr>
   

                    <tr className="oddLine">
                        <td>{this.state.id[this.page*12+9]}</td>
                        <td>{this.state.name[this.page*12+9]}</td>
                        <td><div contentEditable="true" onBlur={this.changeScore.bind(this, 9)}>{this.state.score[this.page*12+9]}</div></td> 
                    </tr>

                    <tr>
                        <td>{this.state.id[this.page*12+10]}</td>
                        <td>{this.state.name[this.page*12+10]}</td>
                        <td><div contentEditable="true" onBlur={this.changeScore.bind(this, 10)}>{this.state.score[this.page*12+10]}</div></td> 
                    </tr>
   

                    <tr className="oddLine">
                        <td>{this.state.id[this.page*12+11]}</td>
                        <td>{this.state.name[this.page*12+11]}</td>
                        <td><div contentEditable="true" onBlur={this.changeScore.bind(this, 11)}>{this.state.score[this.page*12+11]}</div></td> 
                    </tr>

                </tbody>
            </table>


            <table align="center" cellPadding="20px" width="30%">
                <tbody>
                    <tr>
                        <td><button className='btn' onClick={this.changePage.bind(this, -1)} >上一页</button></td>
                        <td><button className='btn' onClick={this.changePage.bind(this, 1)}>下一页</button></td>
                        <td><button className='btn' onClick={this.upload.bind(this)}>确认提交</button></td>
                    </tr>
                </tbody>
           </table>
        
        </div>
		)
	}
}

