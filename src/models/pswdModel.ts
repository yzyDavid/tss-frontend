import {tssFetch} from '../utils/tssFetch';
import {message} from 'antd';
import {apiBaseUrl} from "../configs/apiBaseUrl";
import {getAuthTokenFromLocalStorage} from '../utils/localStorage';
import {puts} from "util";

const model = {
    namespace: 'pswd',
    state: {
        show: false,
    },
    reducers: {
        changeVisible(st, payload) {
            return {...st, ...payload.payload};
        },
    },
    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(location => {
                if (location.pathname === '/') {
                    dispatch({type: 'changeVisible', payload: {show: false}});
                }
                else dispatch({type: 'changeVisible', payload: {show: false}});
            });
        }
    },
    effects: {
        * showWindow(payload: {payload: {show: boolean}}, {call, put}){
            yield put({
                type: 'changeVisible',
                payload: {show: payload.payload.show}
            })
        },
        * modify(payload: { payload: {old: string, new: string} }, {call, put}) {
            const msg = payload.payload;
            const response = yield call(tssFetch, '/user/modify/pwd', 'POST', msg);
            if(response.status === 400) {
                message.error('编辑密码失败');
                return;
            }
            const jsonBody = yield call(response.text.bind(response));
            const body = JSON.parse(jsonBody);
            message.success(body.status);
            yield put({type: 'changeVisible', payload: {show: false}});
            return;
        }
    }
};

export default model;
