import {tssFetch} from '../utils/tssFetch';
import {message} from 'antd';
import {apiBaseUrl} from "../configs/apiBaseUrl";
import {getAuthTokenFromLocalStorage} from '../utils/localStorage';

const model = {
    namespace: 'course',
    state: {
        data: [],
        cid: '0001',
        name: '软件工程',
        intro: 'This is an introduction.',
        weeklyNum: '4',
        semester: '长学期',
        dept: '计算机科学与技术学院',
        credit: '2.5',
    },
    reducers: {
        updateCourseInfo(st, payload) {
            return {...st, ...payload.payload, show: true};
        },
    },
    subscriptions: {
        setup({dispatch, history}) {
            history.listen(location => {
                if (location.pathname === '/user') {
                    dispatch({type: 'userInfo', payload: {uid: null}});
                }
            });
        }
    },
    effects: {
        * search(payload: { payload: { cid: any, name: any, department: any } }, {call, put}) {
            // console.log("search course");
            const msg = payload.payload;
            const response = yield call(tssFetch, '/course/query', 'POST', msg);
            if (response.status !== 200) {
                message.error('搜索课程信息失败');
                const jsonBody = yield call(response.text.bind(response));
                const body = JSON.parse(jsonBody);
                console.log(body);
                return;
            }
            const jsonBody = yield call(response.text.bind(response));
            const body = JSON.parse(jsonBody);
            console.log(body);
            let tmp: any = [];
            for (let i = 0; i < body.cids.length; i++) {
                tmp.push({
                    key: (tmp.length + 1).toString(),
                    name: body.names[i],
                    cid: body.cids[i],
                    dept: body.departments[i]
                });
            }
            yield put({
                type: 'updateCourseInfo',
                payload: {data: tmp}
            });
        },
        * modify(payload: { payload: { cid: string, name: string, credit: any, numLessonsEachWeek: any, department: any, intro: any, semester: any } }, {call, put}) {
            const msg = payload.payload;
            const response = yield call(tssFetch, '/course/modify', 'POST', msg);
            if(response.status !== 200) {
                message.error('编辑院系信息失败');
                return;
            }
            else message.success('ok');
            // yield put({type: 'userInfo', payload: {uid: null}});
            return;
        },
        * add(payload: { payload: { cid: string, name: string, credit: any, numLessonsEachWeek: any, department: any } }, {call, put}) {
            const msg = payload.payload;
            const response = yield call(tssFetch, '/course/add', 'PUT', msg);
            if (response.status !== 201) {
                message.error('添加课程失败');
                const jsonBody = yield call(response.text.bind(response));
                const body = JSON.parse(jsonBody);
                message.error(body.status);
                return;
            }
            const jsonBody = yield call(response.text.bind(response));
            const body = JSON.parse(jsonBody);
            message.success(body.status);
        },
        * get(payload: { payload: { cid: string } }, {call, put}) {
            const msg = payload.payload;
            const response = yield call(tssFetch, '/course/get/info', 'POST', msg);
            if (response.status !== 200) {
                message.error('查询课程信息失败');
                const jsonBody = yield call(response.text.bind(response));
                const body = JSON.parse(jsonBody);
                console.log(body);

                message.error(body.status);
                return;
            }
            const jsonBody = yield call(response.text.bind(response));
            const body = JSON.parse(jsonBody);
            message.success(body.status);
            yield put({
                type: 'updateCourseInfo',
                payload: {
                    cid: body.cid === null ? "" : body.cid,
                    dept: body.department === null ? "" : body.department,
                    name: body.name === null ? "" : body.name,
                    intro: body.intro === null ? "" : body.intro,
                    weeklyNum: body.numLessonsEachWeek === null ? "" : body.numLessonsEachWeek,
                    credit: body.credit === null ? "" : body.credit,
                    semester:body.semester===null?"":body.semester
                }
            });
        },
        * delete(payload: { payload: { cids: string[] } }, {call, put}) {
            const msg = payload.payload;
            console.log(msg);
            for(let i = 0; i < msg.cids.length; i++){
                const response = yield call(tssFetch, '/course/delete', 'DELETE', {cid: msg.cids[i]});
                if (response.status !== 200) {
                    message.error('删除课程失败');
                    return;
                }
            }
            message.success('删除课程成功');
        }
    }
};

export default model;
