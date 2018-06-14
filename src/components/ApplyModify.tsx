import * as React from 'react';
import { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { httpMethod, tssFetch } from '../utils/tssFetch';
import './ScoreUpload.css';
import './ScoreButton.css';
import DvaProps from '../types/DvaProps';


interface ScoreProps extends DvaProps {
    uid: string;
    _state: any;
}


class applyModifyComponent extends Component<ScoreProps, {}>{

    uid: string;
    constructor(props) {
        super(props)
        this.uid = this.props.uid
    }


    handleSubmit() {

        this.props.dispatch({ type: "applyModify/upload", payload: {} });

    }


    changeClass(e) {

        this.props.dispatch({ type: "applyModify/change_class", payload: { "uid": this.uid, "className" : e.target.value } });
        this.forceUpdate()
    }

    changeSemester(e) {
        this.props.dispatch({ type: "applyModify/change_semester", payload: { "uid": this.uid, "semester": e.target.value } });
        this.forceUpdate()
    }

    changeYear(e) {

        this.props.dispatch({ type: "applyModify/change_year", payload: { "uid": this.uid, "year": e.target.value } });
        this.forceUpdate()
    }


    changeStu(e) {
        this.props.dispatch({ type: "applyModify/update", payload: { "sid": e.target.value } });
    }

    changeScore(e) {
        this.props.dispatch({ type: "applyModify/update", payload: { "score": e.target.value } });
    }

    changeReason(e) {
        this.props.dispatch({ type: "applyModify/update", payload: { "reason": e.target.value } });
    }

    render() {

        const _state = this.props._state;

        return (

            <div>

                <div style={{ textAlign: "center" }}><h1>成绩修改申请表</h1>
                    <table className="scoreTable" style={{ border: "solid #000 2px", cellPadding:"15px", margin:"0px auto", width:"50%" }}>

                    <tbody>

                        <tr>
                                <td colSpan={2}>
                                    <table>
                                    <tbody>
                                        <tr>

                                            <td><h3 className="scoreh3">学年</h3></td>
                                            <td><select className="scoreSelect" onBlur={this.changeYear.bind(this)}>
                                                <option value="2015">2015学年</option>
                                                <option value="2016">2016学年</option>
                                                <option value="2017">2017学年</option>
                                                <option value="2018">2018学年</option>
                                                </select></td>

                                                <td><h3 className="scoreh3" style={{ marginLeft: "30px" }}>学期</h3></td>
                                            <td><select className="scoreSelect" onBlur={this.changeSemester.bind(this)}>
                                                <option value="FIRST">第一学期</option>
                                                <option value="SECOND">第二学期</option>
                                                </select></td>

                                                <td><h3 className="scoreh3" style={{ marginLeft: "30px" }}>课程</h3></td>
                                                <td><select className="scoreSelect" onBlur={this.changeClass.bind(this)}>
                                                <option>{_state.classes[0] + "(" + _state.cids[0] + ")"}</option>
                                                <option>{_state.classes[1] + "(" + _state.cids[1] + ")"}</option>
                                                <option>{_state.classes[2] + "(" + _state.cids[2] + ")"}</option>
                                                <option>{_state.classes[3] + "(" + _state.cids[3] + ")"}</option>
                                                <option>{_state.classes[4] + "(" + _state.cids[4] + ")"}</option>
                                                <option>{_state.classes[5] + "(" + _state.cids[5] + ")"}</option>
                                                <option>{_state.classes[6] + "(" + _state.cids[6] + ")"}</option>
                                                <option>{_state.classes[7] + "(" + _state.cids[7] + ")"}</option>
                                                </select></td>
                                        </tr>

                                     </tbody>
                                     </table>
                                 </td>
                        </tr>

                            <tr>

                                <td colSpan={2}>
                                <table>
                                    <tbody>
                                        <tr>

                                            <td><h3 className="scoreh3">学生编号：</h3>
                                                    <input style={{height:"50px"}} onBlur={this.changeStu.bind(this)}></input>
                                            </td>

                                                <td><h3 className="scoreh3" style={{ marginLeft:"30px" }}>新成绩</h3></td>
                                                <td><input style={{ height: "50px" }} onBlur={this.changeScore.bind(this)}></input></td>
                                        </tr>
                                    </tbody>
                                </table>
                                </td>
                            </tr>
                          
                       
                            <tr>
                                <td colSpan={2}><textarea style={{ textAlign: "center", marginTop:"30px" }} className="score_textarea" onBlur={this.changeReason.bind(this)} placeholder="原因详述："></textarea></td>
                            </tr>
                    </tbody>
                </table>

             
                    <table style={{ margin:"0px auto"}}>
                    <tbody>
                        <tr>
                            <td><button className="scoreButton"><Link to='/navi' className="nav">返回</Link></button></td>
                            <td><button className="scoreButton" onClick={this.handleSubmit.bind(this)}>提交</button></td>
                        </tr>
                    </tbody>
                </table>

                </div>
            </div>
        )
    }
}


export default applyModifyComponent



