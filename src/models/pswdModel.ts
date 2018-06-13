import {tssFetch} from '../utils/tssFetch';
import {message} from 'antd';
import {apiBaseUrl} from "../configs/apiBaseUrl";
import {getAuthTokenFromLocalStorage} from '../utils/localStorage';
import {puts} from "util";

const model = {
    namespace: 'pswd',
    state: {
        show: false,
        visible: false,
        naviVisible: false,
        current: ""
    },
    reducers: {
        changeVisible(st, payload) {
            return {...st, ...payload.payload};
        },
    },
    subscriptions: {
        setup({dispatch, history}) {
            history.listen(location => {
                dispatch({type: 'changeVisible', payload: {current: location.pathname.substring(1)}});
                console.log(location.pathname.substring(1));
                if (location.pathname === '/') {
                    dispatch({type: 'changeVisible', payload: {visible: false, naviVisible: false}});
                }
                else if (location.pathname === '/navi') {
                    dispatch({type: 'changeVisible', payload: {visible: true, naviVisible: false}});
                }
                else dispatch({type: 'changeVisible', payload: {visible: true, naviVisible: true}});
            });
        }
    },
    effects: {
        * showWindow(payload: { payload: { show: boolean } }, {call, put}) {
            yield put({
                type: 'changeVisible',
                payload: {show: payload.payload.show}
            })
        },
        * modify(payload: { payload: { oldPwd: string, newPwd: string } }, {call, put}) {
            const msg = payload.payload;
            const response = yield call(tssFetch, '/user/modify/pwd', 'POST', msg);
            if (response.status !== 200) {
                message.error('编辑密码失败');
                const jsonBody = yield call(response.text.bind(response));
                const body = JSON.parse(jsonBody);
                message.error(body.status);
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
