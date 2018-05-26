import {httpMethod, tssFetch} from '../utils/tssFetch';
import {message} from 'antd';
import {CourseFormData,CourseInfo} from '../components/ManualScheduling';
import {Router, Route, Switch, routerRedux, browserHistory} from 'dva/router';
import {log} from "util";

const model = {
    namespace: 'selectCourse',
    state: {
        dataSource: [
            {key: 1, courseNumber: '00001', courseTitle: '线性代数', courseAddress: '3150100001', courseTime: '16:30-18:30', semester: '秋冬', credit: 2},
            {key: 2, courseNumber: '00002', courseTitle: '微积分', courseAddress: '3150100002', courseTime: '16:30-18:30', semester: '秋', credit: 3},
        ]
    },
    reducers: {
        updateCourseInfo(st, payload) {
            return {...st, ...payload.payload};
        },
    },
    subscriptions: {
        setup({dispatch, history}) {
            return history.listen(({pathname}) => {
                if (pathname === '/selection') {
                    dispatch({ type: 'courseInfo', payload: {key: 1, courseNumber: '', courseTitle: '', courseAddress: '', courseTime: ''} });
                }
                if (pathname === '/stuSelect'){
                    dispatch({type: 'showAll', payload: {courseId: -1}})
                }
                if (pathname === '/stuSelect'){
                    dispatch({type: 'search', payload: {value: "", searchIndex: ""}})
                }
            });
        }
    },
    effects: {
        * showAll(payload: { payload: {payload: {courseId: number}}}, {call, put}) {
            var value = payload.payload["courseId"].toString();
            console.log(payload.payload["courseId"]);
            //fetch the data of the case and add to the query
            if(value!="-1")
            yield put(routerRedux.push({pathname:'/classSelect/'+value,query: payload.payload,}));
            return;
        },
        * search(payload: { payload: {payload: {value: string, searchIndex: string}}}, {call, put}){
            var value = payload.payload["value"];
            var index = payload.payload["searchIndex"];
            if(index=="教师")
            {
                const response = yield call(tssFetch, '/classes/action/search-by-teacher/'+value, 'GET' );
                if(response.status === 401) {
                    message.error("不存在该课程");
                    return;
                }
                const jsonBody = yield call(response.text.bind(response));
                const body = JSON.parse(jsonBody);
                // message.success(body.status);
                yield put({
                    type: 'updateCourseInfo',
                    payload: {dataSource: body}
                });
            }
            else if(index=="课程名"){
                const response = yield call(tssFetch, '/classes/action/search-by-course/'+value, 'GET');
                if(response.status === 401) {
                    message.error("不存在该课程");
                    return;
                }
                const jsonBody = yield call(response.text.bind(response));
                const body = JSON.parse(jsonBody);
                // message.success(body.status);
                yield put({
                    type: 'updateCourseInfo',
                    payload: {dataSource: body}
                });
            }
        },
        * select(payload: { payload: {payload: {courseId: number}}},{call,put}){
            var value = payload.payload.toString();
            console.log("选择了："+value)
            const response = yield call(tssFetch, '/classes/action/select/'+value, 'GET');
            if(response.status === 401) {
                message.error("不存在该课程");
                return;
            }
            //const jsonBody = yield call(response.text.bind(response));
            //const body = JSON.parse(jsonBody);
            else{
                console.log("选课成功");
            }
        }
    }
};

export default model;
