import * as React from 'react';
import { Component} from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom'
import {Link} from 'react-router-dom'
import {httpMethod, tssFetch} from '../utils/tssFetch';
import DvaProps from '../types/DvaProps';
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import  'echarts/lib/chart/bar';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';


import "./ScoreFetch.css";

interface ScoreProps extends DvaProps {
    uid: any;
    _state: any;
}

export default class scoreFetchComponent extends Component<ScoreProps,{}>{

    uid: string;

    constructor(props)
    {
        super(props);
        this.uid = this.props.uid;
        this.props.dispatch({type: "scoreFetch/clear_score", payload: {}})
        this.props.dispatch({ type: "scoreFetch/change_identity", payload: { "uid": this.props.uid}});        
    }

    changeYear(e)
    {
        this.props.dispatch({ type: "scoreFetch/change_year", payload: { "uid": this.props.uid, "year": e.target.value }});
        this.forceUpdate();
    }

    changeSemester(e) {
        console.log("seme:"+e.target.value);
        this.props.dispatch({ type: "scoreFetch/change_semester", payload: { "uid": this.props.uid, "semester": e.target.value }});
        this.forceUpdate();
    }

    changeClass(_classid,_score,_classname) {
        console.log("click"+_classid+" "+_score+" "+_classname);

        this.props.dispatch({ type: "scoreFetch/change_class", payload: {"uid": this.props.uid, "classid": _classid, "score":_score, "classname": _classname }});
        this.forceUpdate();
    }

    changeClass_t(e)
    {
        console.log("e:"+e.target.value);
        this.props.dispatch({ type: "scoreFetch/change_class_t", payload: { "uid": this.uid, "classname": e.target.value} });
        this.forceUpdate()
    }

    set_back(e) {
        console.log("button");
        this.props.dispatch({ type:"scoreFetch/set_back_status", payload: {}});
        this.forceUpdate();
    }



    render()
    {       
        const _state = this.props._state;
        console.log("_state:"+_state._status);
        console.log("_identity:"+_state._identity);      
        if (_state._status === "1" && _state._identity === "student") {
            return (            
                <div>
                    <table style={{align:"center",cellPadding:"10px",margin:"0px auto", width:"60%"}}>
                        <tbody>
                        <tr>
                            <td><h2>学年</h2></td>
                            <td>{<select onBlur={this.changeYear.bind(this)}>
                                <option value="2015">2015学年</option>
                                <option value="2016">2016学年</option>
                                <option value="2017">2017学年</option>
                                <option value="2018">2018学年</option>
                            </select>}</td>

                            <td><h2>学期</h2></td>
                            <td><select onBlur={this.changeSemester.bind(this)}>
                                <option value="FIRST">第一学期</option>
                                <option value="SECOND">第二学期</option>
                            </select></td>
                        </tr>
                        </tbody>
                    </table>
                    <h1 style={{ textAlign:"center" , textSize: "60px" }}>成绩单</h1>
                    <table  style={{ textAlign:"center" ,  cellPadding:"15px",margin:"0px auto", width:"80%", lineHeight:"40px"}}>
                        <tbody>
                        <tr className="scoreHead">
                            <th>课程编号</th>
                            <th>课程名称</th>
                            <th>课程成绩</th>
                        </tr>

                        <tr className="evenrowcolor">
                            <td onClick={this.changeClass.bind(this,_state.classid[0],_state.score[0],_state.class[0])}>{_state.cid[0]}</td>
                            <td>{_state.class[0]}</td>
                            <td>{_state.score[0]}</td>
                        </tr>

                        <tr className="oddrowcolor">
                            <td onClick={this.changeClass.bind(this,_state.classid[1],_state.score[1],_state.class[1])}>{_state.cid[1]}</td>
                            <td>{_state.class[1]}</td>
                            <td>{_state.score[1]}</td>
                        </tr>

                        <tr className="evenrowcolor">
                            <td onClick={this.changeClass.bind(this,_state.classid[2],_state.score[2],_state.class[2])}>{_state.cid[2]}</td>
                            <td>{_state.class[2]}</td>
                            <td>{_state.score[2]}</td>
                        </tr>

                        <tr className="oddrowcolor">
                            <td onClick={this.changeClass.bind(this,_state.classid[3],_state.score[3],_state.class[3])}>{_state.cid[3]}</td>
                            <td>{_state.class[3]}</td>
                            <td>{_state.score[3]}</td>
                        </tr>

                        <tr className="evenrowcolor">
                            <td onClick={this.changeClass.bind(this,_state.classid[4],_state.score[4],_state.class[4])}>{_state.cid[4]}</td>
                            <td>{_state.class[4]}</td>
                            <td>{_state.score[4]}</td>
                        </tr>

                        <tr className="oddrowcolor">
                            <td onClick={this.changeClass.bind(this,_state.classid[5],_state.score[5],_state.class[5])}>{_state.cid[5]}</td>
                            <td>{_state.class[5]}</td>
                            <td>{_state.score[5]}</td>
                        </tr>


                        </tbody>
                    </table>
                </div>
            )
        }
        else if (_state._identity==="student"){
            return (
                <div>
                    <h1 style={{ textAlign:"center" , textSize: "60px" }}> 成绩分析 </h1>
                    <table className="scoreTable" style={{ align: "center", cellPadding:"20px", margin:"0px auto",width:"60%"}}>

                        <tbody>
                        <tr>
                            <td className="scoreHead" style={{width:"40%"}}>课程名称</td>
                            <td className="evenrowcolor" style={{width:"60%"}}>
                                {_state.class_score.classname}
                            </td>
                        </tr>
                        <tr>
                            <td className="scoreHead">课程成绩</td>
                            <td className="oddrowcolor">{_state.class_score.current_score}</td>
                        </tr>
                        <tr>
                            <td className="scoreHead">课程排名</td>
                            <td className="oddrowcolor">
                                {_state.class_score.ranking}
                            </td>
                        </tr>
                        <tr>
                            <td className="scoreHead">课程平均成绩</td>
                            <td className="evenrowcolor">{_state.class_score.avg}</td>
                        </tr>
                        <tr>
                            <td className="scoreHead">课程百分比排名</td>
                            <td className="oddrowcolor">{_state.class_score.ranking_per}%</td>
                        </tr>
                        <tr>
                            <td className="scoreHead">课程成绩直方图</td>
                            <td className="evenrowcolor">
                            <img src={require('../img/score.png')} alt="" />                                              
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <table style={{ align:"center", margin: "0px auto", cellPadding:"10px", width:"20%" }}>
                        <tbody>
                        <tr>
                            <button className="scoreButton" value="返回" onClick={this.set_back.bind(this)}>返回</button>
                        </tr>
                        </tbody>
                    </table>

                </div>
            )
        }
        else if (_state._identity==="teacher" && _state._status==="1")
        {                    
            return (

                <div>
                        <table style={{align:"center",cellPadding:"10px",margin:"0px auto", width:"60%"}}>
                        <tbody>
                        <tr>
                            <td><h2>学年</h2></td>
                            <td><select onBlur={this.changeYear.bind(this)}>
                                <option value="2015">2015学年</option>
                                <option value="2016">2016学年</option>
                                <option value="2017">2017学年</option>
                                <option value="2018">2018学年</option>
                            </select></td>

                            <td><h2>学期</h2></td>
                            <td><select onBlur={this.changeSemester.bind(this)}>
                                <option value= 'FIRST'>第一学期</option>
                                <option value= 'SECOND'>第二学期</option>
                            </select></td>

                            <td><h2>课程名</h2></td>
                            <td><select onBlur={this.changeClass_t.bind(this)}>
                                <option>{_state.class[0]+"("+_state.cid[0]+")"}</option>
                                <option>{_state.class[1]+"("+_state.cid[1]+")"}</option>
                                <option>{_state.class[2]+"("+_state.cid[2]+")"}</option>
                                <option>{_state.class[3]+"("+_state.cid[3]+")"}</option>
                                <option>{_state.class[4]+"("+_state.cid[4]+")"}</option>
                                <option>{_state.class[5]+"("+_state.cid[5]+")"}</option>
                                <option>{_state.class[6]+"("+_state.cid[6]+")"}</option>
                            </select></td>
                        </tr>

                        </tbody>
                    </table>        
                    <div style={{ textAlign:"center" }}>
                    <h1 style={{ textSize: "60px" }}>课程成绩表</h1></div>                    
                    <table className="scoreTable" style={{ align: "center", cellPadding:"15px", margin:"0px auto", width:"80%"}}>

                        <tbody>
                        <tr className="scoreHead">
                            <td>学生编号</td>
                            <td>学生姓名</td>
                            <td >百分制成绩</td>
                        </tr>

                        <tr>
                            <td >{_state.class_score.ids[0]}</td>
                            <td>{_state.class_score.names[0]}</td>
                            <td>{_state.class_score.scores[0]}</td>
                        </tr>


                        <tr className="oddLine">
                            <td>{_state.class_score.ids[1]}</td>
                            <td>{_state.class_score.names[1]}</td>
                            <td>{_state.class_score.scores[1]}</td>
                        </tr>

                        <tr>
                            <td>{_state.class_score.ids[2]}</td>
                            <td>{_state.class_score.names[2]}</td>
                            <td>{_state.class_score.scores[2]}</td>
                        </tr>


                        <tr className="oddLine">
                            <td>{_state.class_score.ids[3]}</td>
                            <td>{_state.class_score.names[3]}</td>
                            <td>{_state.class_score.scores[3]}</td>
                        </tr>

                        <tr>
                            <td>{_state.class_score.ids[4]}</td>
                            <td>{_state.class_score.names[4]}</td>
                            <td>{_state.class_score.scores[4]}</td>
                        </tr>


                        <tr className="oddLine">
                            <td>{_state.class_score.ids[5]}</td>
                            <td>{_state.class_score.names[5]}</td>
                            <td>{_state.class_score.scores[5]}</td>
                        </tr>

                        <tr>
                            <td>{_state.class_score.ids[6]}</td>
                            <td>{_state.class_score.names[6]}</td>
                            <td>{_state.class_score.scores[6]}</td>
                        </tr>
                        <tr className="oddLine">
                            <td>{_state.class_score.ids[7]}</td>
                            <td>{_state.class_score.names[7]}</td>
                            <td>{_state.class_score.scores[7]}</td>
                        </tr>
                        <tr>
                            <td>{_state.class_score.ids[8]}</td>
                            <td>{_state.class_score.names[8]}</td>
                            <td>{_state.class_score.scores[8]}</td>
                        </tr>
                        <tr className="oddLine">
                            <td>{_state.class_score.ids[9]}</td>
                            <td>{_state.class_score.names[9]}</td>
                            <td>{_state.class_score.scores[9]}</td>
                        </tr>
                        <tr>
                            <td>{_state.class_score.ids[10]}</td>
                            <td>{_state.class_score.names[10]}</td>
                            <td>{_state.class_score.scores[10]}</td>
                        </tr>
                        <tr className="oddLine">
                            <td>{_state.class_score.ids[11]}</td>
                            <td>{_state.class_score.names[11]}</td>
                            <td>{_state.class_score.scores[11]}</td>
                        </tr>
                        <tr>
                            <td>{_state.class_score.ids[12]}</td>
                            <td>{_state.class_score.names[12]}</td>
                            <td>{_state.class_score.scores[12]}</td>
                        </tr>
                        <tr className="oddLine">
                            <td>{_state.class_score.ids[13]}</td>
                            <td>{_state.class_score.names[13]}</td>
                            <td>{_state.class_score.scores[13]}</td>
                        </tr>
                        <tr>
                            <td>{_state.class_score.ids[14]}</td>
                            <td>{_state.class_score.names[14]}</td>
                            <td>{_state.class_score.scores[14]}</td>
                        </tr>
                        <tr className="oddLine">
                            <td>{_state.class_score.ids[15]}</td>
                            <td>{_state.class_score.names[15]}</td>
                            <td>{_state.class_score.scores[15]}</td>
                        </tr>                                                
                        </tbody>
                    </table>
                </div>
            )
        }
        else
        {
            return (
                <div>
                    <h1 style={{ textAlign:"center" , textSize: "60px" }}> 成绩分析 </h1>
                    <table className="scoreTable" style={{ align: "center", cellPadding:"20px", margin:"0px auto",width:"60%"}}>

                        <tbody>
                        <tr>
                            <td className="scoreHead" style={{width:"40%"}}>课程名称</td>
                            <td className="evenrowcolor" style={{width:"60%"}}>
                                {_state.class_score.classname}
                            </td>
                        </tr>
                        <tr>
                            <td className="scoreHead" style={{width:"40%"}}>课程编号</td>
                            <td className="evenrowcolor" style={{width:"60%"}}>
                                {_state.class_score.classid}
                            </td>
                        </tr>
                        <tr>
                            <td className="scoreHead">课程平均成绩</td>
                            <td className="evenrowcolor">{_state.class_score.avg}</td>
                        </tr>

                        </tbody>
                    </table>
                    <table style={{ align:"center", margin: "0px auto", cellPadding:"10px", width:"20%" }}>
                        <tbody>
                        <tr>
                            <button className="scoreButton" value="返回" onClick={this.set_back.bind(this)}>返回</button>
                        </tr>
                        </tbody>
                    </table>

                </div>
            )
        }
    }
}
