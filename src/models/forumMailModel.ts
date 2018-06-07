import {routerRedux} from 'dva/router';
import {tssFetch} from '../utils/tssFetch';





const model = {
    namespace: 'mail',
    state: {

        input: {
            "currentPage":"1",
            "totalPage":"123",
            "destinations":["发信人/收信人"],
            "titles":["私信标题"],
            "texts": ["<p>Hey this <strong>editor</strong> rocks 😀</p>\n"],
            "times":["time"]
},
    },
    reducers: {
        updateInfo(state, payload) {
            return {...state,...payload.payload};
        }
    },
    effects: {
        * getallboard(payload: {payload:{newuser:string}}, {call, put}) {
            console.log(payload.payload.newuser);
            yield put({type: 'updatedInfo', payload: {uid :'test'}});



            return ;
        },

        *sendMail(payload:{payload:any} ,{select,call, put}){
            const response = yield call(tssFetch, '/imessage/send', 'POST', payload.payload);
            const jsonBody = yield call(response.text.bind(response));
            const body = JSON.parse(jsonBody);
            console.log("私信发送状态");
            console.log(body);
            return ;
        },

        *checkInBox(payload:{payload:any} ,{select,call, put}){
            const response = yield call(tssFetch, '/imessage/inbox', 'POST', payload.payload);
            const jsonBody = yield call(response.text.bind(response));
            const body = JSON.parse(jsonBody);
            console.log("收件箱信息");
            console.log(body);
            yield put({type: 'updateInfo', payload: {input:body}});

            return ;
        },
        *checkOutBox(payload:{payload:any} ,{select,call, put}){
            const response = yield call(tssFetch, '/imessage/outbox', 'POST', payload.payload);
            const jsonBody = yield call(response.text.bind(response));
            const body = JSON.parse(jsonBody);

            console.log("发件箱信息");
            console.log(body);
            yield put({type: 'updateAllBoardInfo', payload: {input:body}});

            return ;
        },
    }
};

export default model;