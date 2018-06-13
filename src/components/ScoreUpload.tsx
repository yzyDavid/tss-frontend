import * as React from 'react';
import { Component} from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom'
import {Link} from 'react-router-dom'
import {httpMethod, tssFetch} from '../utils/tssFetch';
import './ScoreUpload.css';
import './ScoreButton.css';
import DvaProps from '../types/DvaProps';


interface ScoreProps extends DvaProps {
    uid: any;
    _state: any;
}


export default class scoreUploadComponent extends Component<ScoreProps,{}>{


    uid: string;

    constructor(props)
    {
    	super(props)
        this.uid = this.props.uid
    }

    changePage(step)
    {
        this.props.dispatch({ type: "scoreUpload/change_page", payload: {"count":step} });
        this.forceUpdate()
    }

    
    changeSemester(e)
    {
        this.props.dispatch({ type: "scoreUpload/change_semester", payload: { "uid": this.uid, "semester": e.target.value} });
        this.forceUpdate()
    }


    changeYear(e)
    {

        this.props.dispatch({ type: "scoreUpload/change_year", payload: { "uid": this.uid, "year": e.target.value }});
        this.forceUpdate()
    }

    
    changeClass(e)
    {
        this.props.dispatch({ type: "scoreUpload/change_class", payload: { "uid": this.uid, "classname": e.target.value} });
        this.forceUpdate()
    }

     changeScore(index, e)
    {
         console.log("bbb",e.target.innerHTML)
         console.log("ccc",index)

         this.props.dispatch({ type: "scoreUpload/change_score", payload: { "index": index, "value": e.target.innerHTML } });
    }


    upload()
    {

        this.props.dispatch({ type: "scoreUpload/upload", payload: { "uid": this.uid} });
    }

	render()
    {
        const _state = this.props._state;
        return (
        <div>

             <table>
                <tbody>
                <tr>
                    <td><h2 className="scoreh2">学年</h2></td>
                    <td><select className="scoreSelect" onBlur={this.changeYear.bind(this)}>
                        <option value="2015">2015学年</option>
                        <option value="2016">2016学年</option>
                        <option value="2017">2017学年</option>  
                        <option value="2018">2018学年</option>
                        </select></td>

                    <td><h2 className="scoreh2">学期</h2></td>
                    <td><select className="scoreSelect" onBlur={this.changeSemester.bind(this)}>
                        <option value= 'FIRST'>第一学期</option>
                        <option value= 'SECOND'>第二学期</option>
                        </select></td>

                    <td><h2 className="scoreh2">课程名</h2></td>
                            <td><select className="scoreSelect" style={{ width:"100px" }}  onBlur={this.changeClass.bind(this)}>
                    <option>{_state.classes[0]+"("+_state.cids[0]+")"}</option>
                    <option>{_state.classes[1]+"("+_state.cids[1]+")"}</option>
                    <option>{_state.classes[2]+"("+_state.cids[2]+")"}</option>
                    <option>{_state.classes[3]+"("+_state.cids[3]+")"}</option>
                    <option>{_state.classes[4]+"("+_state.cids[4]+")"}</option>
                    <option>{_state.classes[5]+"("+_state.cids[5]+")"}</option>
                    <option>{_state.classes[6]+"("+_state.cids[6]+")"}</option>
                        </select></td>
                    </tr>

                </tbody>
            </table>

                <div style={{ textAlign:"center" }}><h1 style={{ textSize: "60px" }}>课程成绩表</h1></div>
                <table className="scoreTable" style={{ align: "center", cellPadding:"15px", margin:"0px auto", width:"80%"}}>
          
                <tbody>
                    <tr className="scoreHead">
                        <td>学生编号</td>
                        <td>学生姓名</td>
                        <td >百分制成绩</td>
                    </tr>

                    <tr>
                        <td>{_state.ids[_state.page*12+0]}</td>
                        <td>{_state.names[_state.page*12+0]}</td>
                            <td><div contentEditable={true} onBlur={this.changeScore.bind(this,0)}>{_state.scores[_state.page*12+0]}</div></td>  
                    </tr>
   

                    <tr className="oddLine">
                            <td>{_state.ids[_state.page * 12 + 1]}</td>
                            <td>{_state.names[_state.page * 12 + 1]}</td>
                            <td><div contentEditable={true} onBlur={this.changeScore.bind(this, 1)}>{_state.scores[_state.page*12+1]}</div></td>  
                    </tr>

                    <tr>
                            <td>{_state.ids[_state.page * 12 + 2]}</td>
                            <td>{_state.names[_state.page * 12 + 2]}</td>
                            <td><div contentEditable={true} onBlur={this.changeScore.bind(this, 2)}>{_state.scores[_state.page * 12 + 2]}</div></td>   
                    </tr>
   

                    <tr className="oddLine">
                            <td>{_state.ids[_state.page * 12 + 3]}</td>
                            <td>{_state.names[_state.page * 12 + 3]}</td>
                            <td><div contentEditable={true} onBlur={this.changeScore.bind(this, 3)}>{_state.scores[_state.page * 12 + 3]}</div></td>  
                    </tr>

                    <tr>
                        <td>{_state.ids[_state.page*12+4]}</td>
                        <td>{_state.names[_state.page*12+4]}</td>
                            <td><div contentEditable={true} onBlur={this.changeScore.bind(this, 4)}>{_state.scores[_state.page*12+4]}</div></td> 
                    </tr>
   

                    <tr className="oddLine">
                            <td>{_state.ids[_state.page * 12 + 5]}</td>
                            <td>{_state.names[_state.page * 12 + 5]}</td>
                            <td><div contentEditable={true} onBlur={this.changeScore.bind(this, 5)}>{_state.scores[_state.page * 12 + 5]}</div></td>  
                    </tr>

                    <tr>
                            <td>{_state.ids[_state.page * 12 + 6]}</td>
                            <td>{_state.names[_state.page * 12 + 6]}</td>
                            <td><div contentEditable={true} onBlur={this.changeScore.bind(this, 6)}>{_state.scores[_state.page * 12 + 6]}</div></td>  
                    </tr>
   

                    <tr className="oddLine">
                            <td>{_state.ids[_state.page * 12 + 7]}</td>
                            <td>{_state.names[_state.page * 12 + 7]}</td>
                            <td><div contentEditable={true} onBlur={this.changeScore.bind(this, 7)}>{_state.scores[_state.page * 12 + 7]}</div></td>  
                    </tr>

                    <tr>
                            <td>{_state.ids[_state.page * 12 + 8]}</td>
                            <td>{_state.names[_state.page * 12 + 8]}</td>
                            <td><div contentEditable={true} onBlur={this.changeScore.bind(this, 8)}>{_state.scores[_state.page * 12 + 8]}</div></td>  
                    </tr>
   

                    <tr className="oddLine">
                            <td>{_state.ids[_state.page * 12 + 9]}</td>
                            <td>{_state.names[_state.page * 12 + 9]}</td>
                            <td><div contentEditable={true} onBlur={this.changeScore.bind(this, 9)}>{_state.scores[_state.page * 12 + 9]}</div></td>  
                    </tr>

                    <tr>
                            <td>{_state.ids[_state.page * 12 + 10]}</td>
                            <td>{_state.names[_state.page * 12 + 10]}</td>
                            <td><div contentEditable={true} onBlur={this.changeScore.bind(this, 10)}>{_state.scores[_state.page * 12 + 10]}</div></td>  
                    </tr>
   

                    <tr className="oddLine">
                            <td>{_state.ids[_state.page * 12 + 11]}</td>
                            <td>{_state.names[_state.page * 12 + 11]}</td>
                            <td><div contentEditable={true} onBlur={this.changeScore.bind(this, 11)}>{_state.scores[_state.page * 12 + 11]}</div></td>  
                    </tr>

                </tbody>
            </table>


                <table style={{ margin: "0px auto", cellPadding:"20px", width:"60%" }}>
                <tbody>
                    <tr>
                        <td><button className="scoreButton" onClick={this.changePage.bind(this, -1)} >上一页</button></td>
                        <td><button className="scoreButton" onClick={this.changePage.bind(this, 1)}>下一页</button></td>
                        <td><button className="scoreButton" onClick={this.upload.bind(this)}>确认提交</button></td>
                    </tr>
                </tbody>
           </table>
        
        </div>
		)
	}
}

