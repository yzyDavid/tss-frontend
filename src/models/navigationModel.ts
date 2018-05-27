import {routerRedux} from 'dva/router';

const model = {
    namespace: 'navigation',
    state: {
    },
    reducers: {
        updateUserInfo(st, payload) {
            return {...st, ...payload.payload};
        }
    },
    effects: {
        * jump(payload: {payload: {direction: string}}, {call, put}) {
            const direction = payload.payload.direction;
            yield put(routerRedux.push("/"+direction));
            return;
        }
    }
};

export default model;
