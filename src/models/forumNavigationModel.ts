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
                case "userinfo": yield put(routerRedux.push('/forum/userinfo')); break;
                case "home": yield put(routerRedux.push('/forum/home')); break;
                case "Reply": yield put(routerRedux.push('/forum/reply')); break;
                case "PrivateLetter": yield put(routerRedux.push('/forum/privateLetter')); break;
                case "mypost" : yield put(routerRedux.push('/forum/mypost')); break;

            }
            return;
        }
    }
};

export default model;