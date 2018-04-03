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
            switch(direction){
                case "user": yield put(routerRedux.push('/user')); break;
            }
            return;
        }
    }
};

export default model;
