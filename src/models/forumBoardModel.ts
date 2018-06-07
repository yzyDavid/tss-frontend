import {routerRedux} from 'dva/router';
import {tssFetch} from '../utils/tssFetch';


export class boardForm{
    boardID:string
}

const model = {
    namespace: 'board',
    state: {
        publicData:{
            "boardName":"版块名称",
            "boardID":"123",
            "boardText":"全版公告",
            "topTitles":["置顶帖标题"],
            "topAuthors":["置顶帖作者"],
            "topTimes":["置顶帖发帖时间"],
            "topReplys":["置顶帖回复数"],
            "topTopicIDs":["置顶帖的ID"],
            "topLastReplyTimes":["最后回复的时间"],

            "isWatched":"true"
        },

        topicData:{
            "currntPage":"1",
            "totalPage":"1",

            "topicTitles":["置顶帖标题"],
            "topicAuthors":["置顶帖作者"],
            "topicTimes":["置顶帖发帖时间"],
            "topicReplys":["置顶帖回复数"],
            "topicIDs":["置顶帖的ID"],
            "topicLastReplyTimes":["最后回复的时间"]
        }

},
    reducers: {
        updateBoardInfo(state, payload) {
            return {...state,...payload.payload};
        }
    },
    effects: {
        * gotoboard(payload: {payload:{boardid:string}}, {call, put}) {
            //console.log(payload.payload.boardid);
            yield put({type: 'updateBoardInfo', payload: {BoardId :payload.payload.boardid}});
            yield put(routerRedux.push({
                pathname: '/forum/board/'+payload.payload.boardid+"/1",
            }));

            return ;
        },

        *getPublicData(payload: {payload:any}, {call, put}){

            const data = payload.payload;

            const response = yield call(tssFetch, '/topic/topinfo', 'POST', data);
            const jsonBody = yield call(response.text.bind(response));
            const body = JSON.parse(jsonBody);
            // console.log("下面是publicData in forumBoardModel");
            // console.log(body);
            yield put({type: 'updateBoardInfo', payload: {publicData:body}});

        },

        *getTopicData(payload: {payload:any}, {call, put}){

            const data = payload.payload;

            const response = yield call(tssFetch, '/topic/info', 'POST', data);
            const jsonBody = yield call(response.text.bind(response));
            const body = JSON.parse(jsonBody);

           // yield put({type: 'updateBoardInfo', payload: {topicData:body}});

        },


        *changeBoardInfo(payload: {payload:any}, {call, put}){

            const data = payload.payload;
            console.log("test123")
            console.log(data);
            const response = yield call(tssFetch, '/section/addnotice', 'POST', data);
            const jsonBody = yield call(response.text.bind(response));
            const body = JSON.parse(jsonBody);

            location.reload();
           // yield put({type: 'updateBoardInfo', payload: {topicData:body}});

        },

        *newtopic(payload: {payload:any}, {call, put}){

            const data = payload.payload;

            yield put(routerRedux.push({
                pathname: '/forum/newpost='+data,
            }));

        },



    },
    subscriptions: {
        setup({dispatch, history,call,put}) {

        },



    }
};

export default model;