import {tssFetch} from '../utils/tssFetch';
import {message} from 'antd';
import {apiBaseUrl} from "../configs/apiBaseUrl";
import {getAuthTokenFromLocalStorage} from '../utils/localStorage';

const model = {
    namespace: 'userinfo',
    state: {
        data: [],
        uid: '3150104405',
        name: '小天使',
        telephone: '18888888888',
        email: 'email@mail.cn',
        intro: 'This is an introduction.',
        dept: '教务处',
        year: '2015',
        type: '管理员',
        gender: '男',
        majorClass: '教务处',
        show: false,
    },
    reducers: {
        updateUserInfo(st, payload) {
            return {...st, ...payload.payload, show: true};
        },
    },
    // subscriptions: {
    //     setup({dispatch, history}) {
    //         history.listen(location => {
    //             if (location.pathname === '/user') {
    //                 dispatch({type: 'userInfo', payload: {uid: null}});
    //             }
    //         });
    //     }
    // },
    effects: {
        * userInfo(payload: { payload: null }, {call, put}) {
            const msg = payload.payload;
            const response = yield call(tssFetch, '/user/get/own/info', 'POST', msg);
            if (response.status !== 200) {
                message.error('查询个人信息失败');
                const jsonBody = yield call(response.text.bind(response));
                const body = JSON.parse(jsonBody);
                message.error(body.status);
                return;
            }
            const jsonBody = yield call(response.text.bind(response));
            const body = JSON.parse(jsonBody);
            // message.success(body.status);
            console.log("body", body);
            yield put({
                type: 'updateUserInfo',
                payload: {
                    uid: body.uid,
                    email: body.email,
                    telephone: body.telephone,
                    intro: body.intro,
                    name: body.name,
                    dept: body.department,
                    gender: body.gender,
                    majorClass: body.majorClass,
                    type: body.type
                }
            });
            return;
        },
        * modify(payload: { payload: { email: null | string, telephone: null | string, intro: null | string } }, {call, put}) {
            const msg = payload.payload;
            const response = yield call(tssFetch, '/user/modify/own/info', 'POST', msg);
            if (response.status === 400) {
                message.error('编辑个人信息失败');
                const jsonBody = yield call(response.text.bind(response));
                const body = JSON.parse(jsonBody);
                message.error(body.status);
                return;
            }
            yield put({type: 'userInfo', payload: {uid: null}});
            return;
        },
        * resetUser(payload: { payload: {} }, {call, put}) {
            yield put({
                type: 'updateUserInfo',
                payload: {
                    uid: "",
                    email: "",
                    telephone: "",
                    intro: "",
                    name: "",
                    dept: "",
                    gender: "",
                    majorClass: "",
                    type: ""
                }
            });
        },
        * searchUser(payload: { payload: { uid: any, name: any, type: any, dept: any } }, {call, put}) {
            console.log("searchUser", payload.payload);
            const msg = payload.payload;
            const response = yield call(tssFetch, '/user/query', 'POST', {
                uid: msg.uid,
                name: msg.name,
                department: msg.dept,
                type: msg.type
            });
            if(response.status !== 200) {
                message.error('搜索用户失败');
                const jsonBody = yield call(response.text.bind(response));
                const body = JSON.parse(jsonBody);
                message.error(body.status);
                return;
            }
            const jsonBody = yield call(response.text.bind(response));
            const body = JSON.parse(jsonBody);
            console.log(body);
            message.success(body.status);
            let tmp: any = [];
            for (let i = 0; i < body.uids.length; i++) {
                tmp.push({
                    key: (tmp.length + 1).toString(),
                    uid: body.uids[i],
                    name: body.names[i],
                    dept: body.departments[i],
                    type: body.types[i],
                    gender: body.genders[i],
                    year: body.years[i]
                });
            }
            yield put({
                type: 'updateUserInfo',
                payload: {data: tmp}
            });
            // console.log("tmp", tmp);
        },
        * showUser(payload: { payload: { uid: string } }, {call, put}) {
            const msg = payload.payload;
            const response = yield call(tssFetch, '/user/get/info', 'POST', msg);
            if (response.status === 401) {
                message.error('查询用户信息失败');
                return;
            }
            const jsonBody = yield call(response.text.bind(response));
            const body = JSON.parse(jsonBody);
            message.success(body.status);
            console.log("body", body);
            yield put({
                type: 'updateUserInfo',
                payload: {
                    uid: body.uid,
                    email: body.email === null ? '' : body.email,
                    telephone: body.telephone === null ? '' : body.telephone,
                    intro: body.intro === null ? '' : body.intro,
                    name: body.name === null ? '' : body.name,
                    dept: body.department === null ? '' : body.department,
                    gender: body.gender === null ? '' : body.gender,
                    majorClass: body.majorClass === null ? '' : body.majorClass,
                    type: body.type === null ? '' : body.type
                }
            });
        },
        * modifyUser(payload: { payload: { uid: string, name: string, type: string, dept: string, gender: string, year: string, majorClass: string, email: string, telephone: string, intro: string } }, {call, put}) {
            const msg = payload.payload;
            const response = yield call(tssFetch, '/user/modify/info', 'POST', msg);
            if (response.status === 400) {
                message.error('编辑用户信息失败');
                const jsonBody = yield call(response.text.bind(response));
                const body = JSON.parse(jsonBody);
                message.error(body.status);
                return;
            }
            const jsonBody = yield call(response.text.bind(response));
            const body = JSON.parse(jsonBody);
            message.success(body.status);
        },
        * addUser(payload: { payload: { uids: string[], names: string[], type: string, genders: string[], passwords: string | null[] } }, {call, put}) {
            const msg = payload.payload;
            const response = yield call(tssFetch, '/user/add', 'PUT', msg);
            if (response.status === 400) {
                message.error('添加用户失败');
                const jsonBody = yield call(response.text.bind(response));
                const body = JSON.parse(jsonBody);
                message.error(body.status);
                return;
            }
            const jsonBody = yield call(response.text.bind(response));
            const body = JSON.parse(jsonBody);
            message.success(body.status);
        },
        * deleteUser(payload: { payload: { uids: string[] } }, {call, put}) {
            const msg = payload.payload;
            const response = yield call(tssFetch, '/user/delete', 'DELETE', msg);
            if (response.status !== 200) {
                message.error('删除用户失败');
                const jsonBody = yield call(response.text.bind(response));
                const body = JSON.parse(jsonBody);
                message.error(body.status);
                return;
            }
            const jsonBody = yield call(response.text.bind(response));
            const body = JSON.parse(jsonBody);
            message.success(body.status);
        },
        * modifyPhoto(payload: { payload: { file: any } }, {call, put}) {
            const msg = payload.payload;
            const response = yield call(tssFetch, '/user/photo', 'PUT', msg);
            if (!response.ok) {
                message.error('上传照片失败');
                const jsonBody = yield call(response.text.bind(response));
                const body = JSON.parse(jsonBody);
                message.error(body.status);
                return;
            }
            const jsonBody = yield call(response.text.bind(response));
            const body = JSON.parse(jsonBody);
            message.success(body.status);
        }
    }
};

export default model;
