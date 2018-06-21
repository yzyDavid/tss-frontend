import {message} from 'antd';
import {routerRedux} from 'dva/router';
import GlobalState from '../types/globalState';
import {getType, loadSession, logOut, saveSession} from '../utils/localStorage';
import {LoginFormData} from '../components/LoginForm';
import {tssFetch} from '../utils/tssFetch';

const state: GlobalState = {
    token: '',
    uid: '',
    username: '',
};

const model = {
    namespace: 'login',
    state: {
        ...state,
        type: ''
        // type: 'Teaching Administrator',
        // type: 'System Administrator'
        // type: 'Teacher'
        // type: 'Student'
    },
    reducers: {
        saveSession(st) {
            saveSession({token: st.token, uid: st.uid, type: st.type});
            return {...st};
        },
        loadSession(st) {
            return loadSession(st)
        },
        updateSession(st, payload) {
            return {...st, ...payload.payload};
        }
    },
    subscriptions: {
        setup({dispatch, history}) {
            history.listen(location => {
                let t = getType();
                if (t) {
                    dispatch({
                        type: 'updateSession',
                        payload: {type: t}
                    })
                }
            });
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
            yield put({type: 'updateSession', payload: {uid: body.uid, token: body.token, type: body.type}});
            message.success('登录成功');
            yield put({type: 'saveSession'});
            yield put(routerRedux.push('/navi'));
            return;
        },
        * echo(payload: {}, {call, put}) {
            const response = yield call(tssFetch, '/echo', 'GET', {});
            console.log(response);
        },
        * logout(payload: {}, {call, put}) {
            logOut();
            yield put({type: 'updateSession', payload: {uid: '', token: '', type: '', username: ''}});
        }
    },
};

export default model;
