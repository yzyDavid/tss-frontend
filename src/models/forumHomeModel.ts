import {routerRedux} from 'dva/router';
import {tssFetch} from '../utils/tssFetch';

const model = {
    namespace: 'forumhome',
    state: {
        URL:"localhost:3000/",
        HotList:{
            "boardNames":["数据结构"],
            "titles":["这是一个帖子的标题"],
            "authors":["作者名"],
            "boardids":["123"],
            "topicids":["123"],
            "times":["这里是时间"],
            "replyNUMs":["5"],
            "lastReplyTimes":["最后回复时间"]
        },


        LatestList:{
            "boardNames":["数据结构"],
            "titles":["这是一个帖子的标题"],
            "authors":["作者名"],
            "boardids":["123"],
            "topicids":["123"],
            "times":["这里是时间"],
            "replyNUMs":["5"],
            "lastReplyTimes":["最后回复时间"]
        }


    },

    reducers: {
        updateInfo(state, payload) {
            return {...state,...payload.payload};
        }
    },
    effects: {
        * getallboard(payload: {payload:{newuser:string}}, {call, put}) {

            yield put({type: 'updateAllBoardInfo', payload: {uid :'test'}});

            return ;
        },

        * gotoAllBoard(payload: {payload:{}}, {call, put}) {

            yield put(routerRedux.push({
                pathname: "/forum/allboard",
            }));

            return ;
        },
        *get24(payload:{payload:{}},{call,put}){

            const response = yield call(tssFetch, '/section/info', 'GET', {});
            const jsonBody = yield call(response.text.bind(response));
            const body = JSON.parse(jsonBody);
            yield put({type: 'updateInfo', payload: {list:body}});


        },



        *setHotType(payload: {payload: {type:string}}, {call, put}) {

            const selected = payload.payload.type;

            if(selected=="1"){
                const response = yield call(tssFetch, '/section/info', 'GET', {});
                const jsonBody = yield call(response.text.bind(response));
                const body = JSON.parse(jsonBody);
                yield put({type: 'updateInfo', payload: {list:body}});
            }else if(selected=="7"){
                const response = yield call(tssFetch, '/section/info', 'GET', {});
                const jsonBody = yield call(response.text.bind(response));
                const body = JSON.parse(jsonBody);
                yield put({type: 'updateInfo', payload: {list:body}});
            }else if(selected=="30"){
                const response = yield call(tssFetch, '/section/info', 'GET', {});
                const jsonBody = yield call(response.text.bind(response));
                const body = JSON.parse(jsonBody);
                yield put({type: 'updateInfo', payload: {list:body}});
            }

        },
    }
};

export default model;