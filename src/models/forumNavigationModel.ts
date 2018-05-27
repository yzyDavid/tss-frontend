import {routerRedux} from 'dva/router';

const model = {
    namespace: 'ForumNavigation',
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
                case "userinfo": yield put(routerRedux.push('/userinfo')); break;
                case "home": yield put(routerRedux.push('/home')); break;
                case "Reply": yield put(routerRedux.push('/reply')); break;
                case "PrivateLetter": yield put(routerRedux.push('/privateLetter')); break;
                case "mypost" : yield put(routerRedux.push('/mypost')); break;

            }
            return;
        }
    }
};

export default model;