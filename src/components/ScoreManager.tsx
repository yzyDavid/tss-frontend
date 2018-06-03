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

class scoreManagerComponent extends Component<ScoreProps, {}>{


    componentDidMount() {

        this.props.dispatch({ type: "scoreManager/getModify", payload: {} });
    }


    handleSubmit(res) {
        this.props.dispatch({ type: "scoreManager/submit", payload: { "res": res } });
        this.forceUpdate()
    }




    render() {

        const state = this.props._state

        return (

            <div>

                <div style={{ textAlign:"center" }}><h1>成绩修改申请表</h1></div>
                <table className="scoreTable" style={{ border: "solid #000 2px", cellPadding: "15px", margin: "0px auto", width: "50%" }}>

                    <tbody>

                        <tr>
                            <td>
                                <h3 className="scoreh3">学生编号:</h3>
                                <div>{state.uid}</div>
                            </td>
                            <td>
                                <h3 className="scoreh3">新成绩:</h3>
                                <div>{state.score}</div>
                            </td>

                        </tr>

                        <tr>
                            <td colSpan={2}>
                                <h3 className="scoreh3">课程编号:</h3>
                                <div>{state.cid}</div>
                            </td>

                        </tr>

                        <tr>

                            <td colSpan={2}><textarea style={{ textAlign: "center", marginTop: "30px" }} className="score_textarea" readOnly={true} value={state.reason}></textarea></td>
                        </tr>
                    </tbody>
                </table>


                <br />
                <table style={{margin:'0px auto'}}>
                    <tbody>
                        <tr>
                            <td><button className="scoreButton" onClick={this.handleSubmit.bind(this, true)}>同意</button></td>
                            <td><button className="scoreButton" onClick={this.handleSubmit.bind(this, false)}>拒绝</button></td>
                            <td><button className="scoreButton"><Link to='/navi' className="nav">返回</Link></button></td>

                        </tr>
                    </tbody>
                </table>

            </div>
        )
    }
}


export default scoreManagerComponent


