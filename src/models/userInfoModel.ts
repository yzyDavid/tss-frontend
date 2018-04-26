import {tssFetch} from '../utils/tssFetch';
import {message} from 'antd';

const model = {
    namespace: 'userinfo',
    state: {
        uid: '3152222222',
        email: 'haha@qq.com',
        tel: '23333',
        intro: 'hhhhh',
        level: 'student',
    },
    reducers: {
        updateUserInfo(st, payload) {
            return {...st, ...payload.payload};
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
        * userInfo(payload: { payload: {uid: null|string} }, {call, put}) {
            const msg = payload.payload;
            const response = yield call(tssFetch, '/user/get', 'POST', msg);
            if(response.status === 401) {
                message.error('查询个人信息失败');
                return;
            }
            const jsonBody = yield call(response.text.bind(response));
            const body = JSON.parse(jsonBody);
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
        }
    }
};

export default model;
