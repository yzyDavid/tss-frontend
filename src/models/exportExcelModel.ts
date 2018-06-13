import {httpMethod, tssFetch} from '../utils/tssFetch';
import {message} from 'antd';
import {Router, Route, Switch, routerRedux, browserHistory} from 'dva/router';

const model = {
    namespace: 'export',
    state: {
        dataSource: [
            {key: 1, courseId: '00001', classId: '201001',courseName: "My Plan",year: "2018", semester: "SECOND", timeSlot: "SUN_3_5", capacity: 100, numStudent: 0, brief: "asdf"},
            {key: 2, courseId: '00002', classId: '201003',courseName: "your Plan",year: "2018", semester: "SECOND", timeSlot: "SUN_3_5", capacity: 100, numStudent: 0, brief: "bbbb"},
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
            });
        }
    },
    effects: {
        * fetchClassLists(payload:{},{call,put}){
            const response = yield call(tssFetch, '/classes/search', 'POST', {'teacherName': "吴博翔"});
            if(response.status === 401) {
                console.log("error")
                message.error("没有课程可选");
                return;
            }
            const jsonBody = yield call(response.text.bind(response));
            const body = JSON.parse(jsonBody);
            yield put({
                type: 'updateCourseInfo',
                payload: {dataSource: body["classes"]}
            });
        },
        * export(payload: { payload: {payload: {classId: number}}},{call,put}){
            var value = payload.payload.toString();
            console.log("value" +value);
            if(value!="-1") {
                console.log("选择了：" + value)
                const response = yield call(tssFetch, '/download/classes/'+value, 'GET');
                if (response.status === 409) {
                    message.success("选课成功");
                    return;
                }
                else {
                    const jsonBody = yield call(response.text.bind(response));
                    const body = JSON.parse(jsonBody);
                    message.success("选课成功");
                }
            }
        },
    }
};

export default model;
