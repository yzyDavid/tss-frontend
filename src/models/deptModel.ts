import {tssFetch} from '../utils/tssFetch';
import {message} from 'antd';
import {apiBaseUrl} from "../configs/apiBaseUrl";
import {getAuthTokenFromLocalStorage} from '../utils/localStorage';

const model = {
    namespace: 'dept',
    state: {
        data: [],
        majorData: [{key:"1", name:"计算机科学与技术"},
            {key:"2", name:"软件工程"},
            {key:"3", name:"数字媒体"}],
        classData: [{key:"1", name:"计算机科学与技术1501"},
            {key:"2", name:"计算机科学与技术1502"},
            {key:"3", name:"计算机科学与技术1503"},
            {key:"4", name:"计算机科学与技术1504"}],
        name: "计算机科学与技术学院",
        majorName: "计算机科学与技术",
        className: "计算机科学与技术1504",
        pswdShow: false,
        year: "2015"
    },
    reducers: {
        updateUserInfo(st, payload) {
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
        * search(payload: {id: any}, {call, put}){
            let tmp = [{key:"1", name:"计算机科学与技术学院"}];
            yield put({
                type: 'updateUserInfo',
                payload: {data: tmp}
            });
        },
        * userInfo(payload: { payload: {uid: null|string} }, {call, put}) {
            const msg = payload.payload;
            const response = yield call(tssFetch, '/user/get', 'POST', msg);
            if(response.status === 401) {
                message.error('查询个人信息失败');
                return;
            }
            const jsonBody = yield call(response.text.bind(response));
            const body = JSON.parse(jsonBody);
            // message.success(body.status);
            yield put({
                type: 'updateUserInfo',
                payload: {uid: body.uid, email: body.email, telephone: body.telephone, intro: body.intro}
            });
            return;
        },
        * modify(payload: { payload: {uid: null|string, email: null|string, telephone: null|string, intro: null|string} }, {call, put}) {
            const msg = payload.payload;
            const response = yield call(tssFetch, '/user/modify', 'POST', msg);
            if(response.status === 400) {
                message.error('编辑个人信息失败');
                return;
            }
            yield put({type: 'userInfo', payload: {uid: null}});
            return;
        },
        * getPhoto(payload: {payload: {uid: null|string}}, {call, put}){
            // const msg = payload.payload;
            //
            // const response = yield call(tssFetch, '/user/getPhoto', 'POST', msg);
            // if(response.status === 401) {
            //     message.error('照片加载失败');
            //     return;
            // }
            // const jsonBody = yield call(response.text.bind(response));
            // const body = JSON.parse(jsonBody);
            // message.success(body.status);
            // yield put({
            //     type: 'updateUserInfo',
            //     payload: {photo: body.resource}
            // });
        },
        * modifyPhoto(payload:{payload: {file: any, uid: null|string}}, {call, put}) {
            // const msg = payload.payload;
            // console.log("msg", msg);
            // const f = {name: msg.file.name, uid:msg.file.uid, size:msg.file.size, type:msg.file.type};
            // console.log('json test:', JSON.stringify(f));
            // // const response = yield call(tssFetch, '/user/modifyPhoto', 'POST', msg);
            // const auth: string = getAuthTokenFromLocalStorage();
            // let url = '/user/modifyPhoto';
            // console.log("aa", payload);
        }
    }
};

export default model;
