import {tssFetch} from '../utils/tssFetch';
import {message} from 'antd';

const model = {
    namespace: 'ForumUserInfo',
    state: {
        userInfo:{
            "photo":"https://wx3.sinaimg.cn/mw690/91e4a538gy1frcbj13o5oj20ku0kuta5.jpg",
            "UserName":"JoeyYoung",
            "email":"8678@163.com",
            "tel":"98465848",
            "postNum":7,
            "description":"这个人什么也没说",

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
        * userInfo(payload: { payload: {uid: string} }, {call, put}) {
            // const msg = payload.payload;
            // const response = yield call(tssFetch, '/user/info', 'GET', msg);
            // if(response.status === 400) {
            //     message.error('查询个人信息失败');
            //     return;
            // }
            // const jsonBody = yield call(response.text.bind(response));
            // const body = JSON.parse(jsonBody);
            // yield put({
            //     type: 'updateUserInfo',
            //     payload: {uid: body.uid, email: body.email, telephone: body.telephone, intro: body.intro}
            // });
            // return;
        }
    }
};

export default model;