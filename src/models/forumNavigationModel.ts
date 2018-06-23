import {routerRedux} from 'dva/router';
import {tssFetch} from "../utils/tssFetch";

const model = {
    namespace: 'ForumNavigation',
    state: {
        unread:{
            "letterNum":"12",
            "replyNum":"123"
        }
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
                case "Reply": yield put(routerRedux.push('/forum/reply/1')); break;
                case "PrivateLetter": yield put(routerRedux.push('/forum/privateLetter')); break;
                case "mypost" : yield put(routerRedux.push('/forum/mypost/page=1')); break;

            }
            return;
        },

        *updateUnread(payload: {payload: any}, {call, put}){
            const response = yield call(tssFetch, '/reply/unread', 'GET', {});
            const jsonBody = yield call(response.text.bind(response));
            const body = JSON.parse(jsonBody);
            yield put({type: 'updateUserInfo', payload: {unread:body}});
        }
    }
};

export default model;