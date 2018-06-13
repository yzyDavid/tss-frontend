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
            return {...st, ...payload.payload, show:true};
        },
    },
    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(location => {
                if (location.pathname === '/user') {
                    dispatch({type: 'userInfo', payload: {uid: null}});
                }
            });
        }
    },
    effects: {
        * search(payload: {payload: {cid: any, name: any, dept: any}}, {call, put}){
            // console.log("search course");
            const msg = payload.payload;
            const response = yield call(tssFetch, '/course/query', 'POST', msg);
            if(response.status !== 200) {
                message.error('搜索院系信息失败');
                return;
            }
            const jsonBody = yield call(response.text.bind(response));
            const body = JSON.parse(jsonBody);
            let tmp:any = [];
            for(let i = 0; i < body.cids.length; i++){
                tmp.push({key: (tmp.length+1).toString(), name: body.names[i], credit: body.credits[i], dept: body.depts[i]});
            }
            yield put({
                type: 'updateCourseInfo',
                payload: {data: tmp}
            });
        },
        * modify(payload: { payload: {uid: null|string, email: null|string, telephone: null|string, intro: null|string} }, {call, put}) {
            // const msg = payload.payload;
            // const response = yield call(tssFetch, '/user/modify', 'POST', msg);
            // if(response.status === 400) {
            //     message.error('编辑个人信息失败');
            //     return;
            // }
            // yield put({type: 'userInfo', payload: {uid: null}});
            return;
        },
        * add(payload: {payload: {cid: string, name: string, credit: any, numLessonsEachWeek: any, department: any}},{call,put}){
            const msg = payload.payload;
            const response = yield call(tssFetch, '/course/add', 'PUT', msg);
            if(response.status !== 200) {
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
    }
};

export default model;
