import {tssFetch} from '../utils/tssFetch';
import {message} from 'antd';

const model = {
    namespace: 'userinfo',
    state: {
        uid: '3152222222',
        email: 'haha@qq.com',
        tel: '23333',
        intro: 'hhhhh',
    },
    reducers: {
        updateUserInfo(st, payload) {
            return {...st, ...payload.payload};
        },
    },
    subscriptions: {
        setup({dispatch, history}) {
            return history.listen(({pathname}) => {
                if (pathname === '/user') {
                    dispatch({ type: 'userInfo', payload: {uid: ''} });
                }
            });
        }
    },
    effects: {
        * userInfo(payload: { payload: {uid: string} }, {call, put}) {
            const msg = payload.payload;
            const response = yield call(tssFetch, '/user/info', 'GET', msg);
            if(response.status === 400) {
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
        }
    }
};

export default model;
