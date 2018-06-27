import {tssFetch} from '../utils/tssFetch';
import {message} from 'antd';

const model = {
    namespace: 'ForumUserInfo',
    state: {
        userInfo:{
            "photo":"https://wx3.sinaimg.cn/mw690/91e4a538gy1frcbj13o5oj20ku0kuta5.jpg",
            "userName":"JoeyYoung",
            "email":"8678@163.com",
            "tel":"98465848",
            "postNum":7,
            "description":"这个人什么也没说",
        },
        photo:{
            "url":"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1530093909792&di=2a71adf1c19fbdd43cb3c33213384d4c&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F01%2F48%2F88%2F2757444507812f6.jpg"
        }
    },
    reducers: {
        updateUserInfo(st, payload) {
            return {...st, ...payload.payload};
        },
    },
    subscriptions: {
        // setup({dispatch, history}) {
        //     return history.listen(({pathname}) => {
        //         if (pathname === '/user') {
        //             dispatch({ type: 'userInfo', payload: {uid: ''} });
        //         }
        //     });
        // }
    },
    effects: {
        * getMyInfo(payload: { payload: any }, {call, put}) {
            const response = yield call(tssFetch, '/search/selfinfo', 'GET', {});
            const jsonBody = yield call(response.text.bind(response));
            const body = JSON.parse(jsonBody);
            yield put({type: 'updateUserInfo', payload: {userInfo:body}});
        },
        * getUserInfo(payload: { payload: any }, {call, put}){
            console.log("2324")
            console.log(payload.payload)
            const response = yield call(tssFetch, '/search/userinfo', 'POST', payload.payload);
            const jsonBody = yield call(response.text.bind(response));
            const body = JSON.parse(jsonBody);
            console.log(body)
            yield put({type: 'updateUserInfo', payload: {userInfo:body}});
        }
    }
};

export default model;