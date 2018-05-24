import {routerRedux} from 'dva/router';
import {tssFetch} from '../utils/tssFetch';

const model = {
    namespace: 'ForumBoard',
    state: {
        boardState:{
            "BoardID":123,
            "BoardName":"数据结构-陈越",
            "Notice":"这里用来发布通知，可以发表任意的全版内容",
            "totalnum":123,
            "isWatched": false,
            "topList":[{
                "id":132,
                "title":"这是一个标题",
                "time":"2018-05-01 12:12:12",
                "author":"这是发帖人ID",
                "replyNUM":123,

            },{
                "id":"5",
                "title":"这是一个标题",
                "time":"2018-05-01 12:12:12",
                "author":"这是发帖人ID",
                "replyNUM":123,

            },],

            "topicList":[{
                "id":"2",
                "title":"这是一个标题",
                "time":"2018-05-01 12:12:12",
                "author":"这是发帖人ID",
                "replyNUM":123,

            },{
                "id":"5",
                "title":"这是一个标题",
                "time":"2018-05-01 12:12:12",
                "author":"这是发帖人ID",
                "replyNUM":123,
            },{
                "id":"5",
                "title":"这是一个标题",
                "time":"2018-05-01 12:12:12",
                "author":"这是发帖人ID",
                "replyNUM":123,

            },{
                "id":"5",
                "title":"这是一个标题",
                "time":"2018-05-01 12:12:12",
                "author":"这是发帖人ID",
                "replyNUM":123,

            },{
                "id":"5",
                "title":"这是一个标题",
                "time":"2018-05-01 12:12:12",
                "author":"这是发帖人ID",
                "replyNUM":123,

            },{
                "id":"5",
                "title":"这是一个标题",
                "time":"2018-05-01 12:12:12",
                "author":"这是发帖人ID",
                "replyNUM":123,

            },]
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
                pathname: '/board='+payload.payload.boardid,
            }));

            return ;
        },

        *newtopic(payload:{},{put}){

            yield put(routerRedux.push({
                pathname: '/newpost',
            }));
            return;
        },
        *show({ payload },{select,call, put}){
            const name = yield select(state =>state);
            console.log("in show:",name.allboard.uid);

            return ;
        }
    }
};

export default model;
