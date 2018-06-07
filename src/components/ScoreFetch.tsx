import * as React from 'react';
import { Component} from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom'
import {Link} from 'react-router-dom'
import {httpMethod, tssFetch} from '../utils/tssFetch';
import DvaProps from '../types/DvaProps';
import "./ScoreFetch.css";
import './scoreUpload.css';


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
    }

    changeYear(e)
    {
        this.props.dispatch({ type: "scoreFetch/change_year", payload: { "uid": this.props.uid, "year": e.target.value }});
        this.forceUpdate()
    }

    changeSemester(e) {
        this.props.dispatch({ type: "scoreFetch/change_semester", payload: { "uid": this.props.uid, "semester": e.target.value }});
        this.forceUpdate()
    }

    changeClass(_classid,_score,_classname) {
        console.log("click"+_classid+" "+_score+" "+_classname);

        this.props.dispatch({ type: "scoreFetch/change_class", payload: {"uid": this.props.uid, "classid": _classid, "score":_score, "classname": _classname }});
        this.forceUpdate();
    }

    render()
    {
        const _state = this.props._state;
        if (_state._status === "1") {
            return (
                <div>
                    <table style={{align:"center",cellPadding:"10px",margin:"0px auto", width:"60%"}}>
                        <tbody>
                        <tr>
                            <td><h2>学年</h2></td>
                            <td>{<select id="select_year" onBlur={this.changeYear.bind(this)}>
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
                            <td>{_state.cid[1]}</td>
                            <td>{_state.class[1]}</td>
                            <td>{_state.score[1]}</td>
                        </tr>

                        <tr className="evenrowcolor">
                            <td>{_state.cid[2]}</td>
                            <td>{_state.class[2]}</td>
                            <td>{_state.score[2]}</td>
                        </tr>

                        <tr className="oddrowcolor">
                            <td>{_state.cid[3]}</td>
                            <td>{_state.class[3]}</td>
                            <td>{_state.score[3]}</td>
                        </tr>

                        <tr className="evenrowcolor">
                            <td>{_state.cid[4]}</td>
                            <td>{_state.class[4]}</td>
                            <td>{_state.score[4]}</td>
                        </tr>

                        <tr className="oddrowcolor">
                            <td>{_state.cid[5]}</td>
                            <td>{_state.class[5]}</td>
                            <td>{_state.score[5]}</td>
                        </tr>


                        </tbody>
                    </table>
                </div>
            )
        }
        else {
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
                        <td className="evenrowcolor">{
                            {_state.class_score.chart}
                        }
                        </td>
                    </tr>
                    </tbody>
                </table>
                </div>
            )
        }
    }
}
