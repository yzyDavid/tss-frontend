import {routerRedux} from 'dva/router';
import {message} from 'antd';
import {tssFetch} from '../utils/tssFetch';





const model = {
    namespace: 'mail',
    state: {

        input: {
            "currentPage":"1",
            "totalPage":"123",
            "destinations":["发信人1","发信人2","man3"],
            "titles":["私信标题","私信标题2","title3"],
            "texts": ["<p>Hey this <strong>editor</strong> rocks 😀</p>\n","\"<p>Hey this <strong>editor</strong> rocks 😀</p>\\n\"","fuck you"],
            "times":["time","2012","2018"],
            "letterIDs":["123","456","789"],
            "userIDs":["123","456","789"],
            "reads":["false","true","false"]
        },
        output:{

            "currentPage":"1",
            "totalPage":"123",
            "destinations":["收信人"],
            "titles":["私信标题"],
            "texts": ["<p>Hey this <strong>editor</strong> rocks 😀</p>\n"],
            "times":["time"],
            "userIDs":["123"]

        }
    },
    reducers: {
        updateInfo(state, payload) {
            return {...state,...payload.payload};
        }
    },
    effects: {


        *sendMail(payload:{payload:any} ,{select,call, put}){
            console.log("In sendMail model,看看发的什么鬼");
            console.log(payload.payload)
            const response = yield call(tssFetch, '/imessage/send', 'POST', payload.payload);
            const jsonBody = yield call(response.text.bind(response));
            const body = JSON.parse(jsonBody);
            console.log("私信发送状态");
            console.log(body);
            if(body.status.toString()==="send ok!"){
                message.success('发送成功');
            }else {
                message.warning("发送失败，请重新尝试");
            }

            return ;
        },

        *checkInBox(payload:{payload:any} ,{select,call, put}){
            const response = yield call(tssFetch, '/imessage/inbox', 'POST', payload.payload);
            const jsonBody = yield call(response.text.bind(response));
            const body = JSON.parse(jsonBody);
            yield put({type: 'updateInfo', payload: {input:body}});
            console.log("收件箱内容");
            console.log(body)
            return ;
        },
        *checkOutBox(payload:{payload:any} ,{select,call, put}){
            const response = yield call(tssFetch, '/imessage/outbox', 'POST', payload.payload);
            const jsonBody = yield call(response.text.bind(response));
            const body = JSON.parse(jsonBody);
            yield put({type: 'updateInfo', payload: {output:body}});

            return ;
        },

        *setLetterRead(payload:{payload:any},{call,put}){
            const response = yield call(tssFetch, '/imessage/read', 'POST', payload.payload);
            const jsonBody = yield call(response.text.bind(response));

        }
    }
};

export default model;