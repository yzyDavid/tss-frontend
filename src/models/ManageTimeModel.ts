import {Router, Route, Switch, routerRedux, browserHistory} from 'dva/router';
import {CourseFormData} from "../components/ManualScheduling";
import {tssFetch} from "../utils/tssFetch";
import {Modal} from "antd";

const model = {
    namespace: "manageTime",
    state: {
        time1_1: "",
        time1_2: "",
        time2_1: "",
        time2_2: "",
        time3_1: "",
        time3_2: "",
        date1_1: "",
        date1_2: "",
        date2_1: "",
        date2_2: "",
        date3_1: "",
        date3_2: "",
    },
    reducers: {
        updateStudentList(st, payload) {
            return {...st, ...payload.payload};
        },
    },
    subscriptions: {
        setup({dispatch, history}) {
            return history.listen(({pathname}) => {
                if (pathname === '/manageTime') {
                    dispatch({ type: 'setFirstTime', payload: {start: "", end: ""} });
                }
            });
        }
    },
    effects: {
         * setFirstSelection(payload: {start: string, end: string},{call, put} ){
            var startTime = payload["payload"]["start"];
            var endTime = payload["payload"]["end"];
            //console.log(startTime+endTime);
             if(startTime!="") {
                 const response = yield call(tssFetch, '/selection_time/register', 'POST', {
                     'start': startTime,
                     'end': endTime
                 });
                 if (response.status != 201) {
                     Modal.error({
                         content: "初选时间设置失败！"
                     })
                 }
                 else {
                     Modal.success({
                         content: "初选时间设置成功！"
                     })
                 }
             }
         },
        * setDropTime(payload: {start: string, end: string},{call, put} ){
            var startTime = payload["payload"]["start"];
            var endTime = payload["payload"]["end"];
            if(startTime!="") {
                const response = yield call(tssFetch, '/selection_time/drop', 'POST', {
                    'start': startTime,
                    'end': endTime
                });
                if (response.status != 201) {
                    Modal.error({
                        content: "退选时间设置失败！"
                    })
                }
                else {
                    Modal.success({
                        content: "退选时间设置成功！"
                    })
                }
            }
        },
        * setComplement(payload: {start: string, end: string},{call, put} ){
            var startTime = payload["payload"]["start"];
            var endTime = payload["payload"]["end"];
            if(startTime!="") {
                const response = yield call(tssFetch, '/selection_time/complement', 'POST', {
                    'start': startTime,
                    'end': endTime
                });
                if (response.status != 201) {
                    Modal.error({
                        content: "补选时间设置失败！"
                    })
                }
                else {
                    Modal.success({
                        content: "补选时间设置成功！"
                    })
                }
            }
        }

    }
}

export default model;