import {Router, Route, Switch, routerRedux, browserHistory} from 'dva/router';
import {CourseFormData} from "../components/ManualScheduling";
import {tssFetch} from "../utils/tssFetch";
import {message} from "antd";

const model = {
    namespace: "courseTable",
    state: {
        dataSource: []
    },
    reducers: {
        updateCourseTable(st, payload) {
            return {...st, ...payload.payload};
        },
    },
    subscriptions: {
        setup({dispatch, history}) {
            return history.listen(({pathname}) => {
                if (pathname === '/courseTable') {
                    dispatch({ type: 'search', payload: {year: "", semester: ""} });
                }
            });
        }
    },
    effects: {
        * refreshCourseTable(payload: { payload: {classNumber: string} }, {call, put}){

        },
        * search(payload: {year: string, semester: string}, {call, put}){
            var a = payload["payload"]["year"];
            var b = payload["payload"]["semester"];
            if(a!="" || b!="") {
                //fetch the courseTable
                //TODO
                const response = yield call(tssFetch, '/classes/get_selected/' + a + '/' + b, 'GET');
                if (response.status != 200) {
                    return;
                }
                else{
                //refresh the dataSource
                //TODO
                    const jsonBody = yield call(response.text.bind(response));
                    const body = JSON.parse(jsonBody);
                    //console.log(body["classes"]);
                    yield put({
                        type: "updateCourseTable",
                        payload: {dataSource:body["classes"]}
                    })
                }
            }
        }
    }
}

export default model;