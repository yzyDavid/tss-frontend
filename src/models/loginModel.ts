import {message} from 'antd';
import {routerRedux} from 'dva/router';
import GlobalState from '../types/globalState';
import {loadSession, saveSession} from '../utils/localStorage';
import {LoginFormData} from '../components/LoginForm';
import {tssFetch} from '../utils/tssFetch';

const state: GlobalState = {
    token: '',
    uid: '',
    username: ''
};

const model = {
    namespace: 'login',
    state: {
        ...state,
        type: 'Teaching Administrator'
    },
    reducers: {
        saveSession(st) {
            saveSession({token: st.token, username: st.username, uid: st.uid});
            return {...st};
        },
        loadSession(st) {
            return loadSession(st)
        },
        updateSession(st, payload) {
            return {...st, ...payload.payload};
        }
    },
    effects: {
        * login(payload: { payload: LoginFormData }, {call, put}) {
            const msg = payload.payload;
            const response = yield call(tssFetch, '/session/login', 'POST', msg);
            console.log(response);
            if (response.status === 400) {
                message.error('用户名或密码错误');
                return;
            }
            const jsonBody = yield call(response.text.bind(response));
            const body = JSON.parse(jsonBody);
            yield put({type: 'updateSession', payload: {uid: body.uid, password: msg.password, token: body.token, type: body.type}});
            message.success('登录成功');
            yield put(routerRedux.push('/navi'));
            yield put({type: 'saveSession'});
            return;
        },
        * echo(payload: {}, {call, put}) {
            const response = yield call(tssFetch, '/echo', 'GET', {});
            console.log(response);
        }
    },
    subscriptions: {}
};

export default model;
