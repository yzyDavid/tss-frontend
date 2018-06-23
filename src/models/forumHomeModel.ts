import {routerRedux} from 'dva/router';
import {tssFetch} from '../utils/tssFetch';

const model = {
    namespace: 'forumhome',
    state: {
        URL:"localhost:3000/",
        HotList:{
            "boardNames":["编译原理"],
            "titles":["编译原理考试问题"],
            "authors":["JoeyYoung"],
            "boardids":["101"],
            "topicids":["44"],
            "times":["2018-06-13 19:47:03.0"],
            "replyNUMs":["5"],
            "lastReplyTimes":["最后回复时间"]
        },


        LatestList:{
            "boardNames":["编译原理"],
            "titles":["编译原理考试问题"],
            "authors":["JoeyYoung"],
            "boardids":["101"],
            "topicids":["44"],
            "times":["2018-06-13 19:47:03.0"],
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

        *gotoPage(payload: {payload:string}, {call, put}) {

            yield put(routerRedux.push({
                pathname: payload.payload,
            }));

            return ;
        },


        * gotoPageReload(payload: {payload:string}, {call, put}) {

            yield put(routerRedux.push({
                pathname: payload.payload,
            }));

            location.reload()
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