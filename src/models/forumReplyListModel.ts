import {routerRedux} from 'dva/router';
import {tssFetch} from '../utils/tssFetch';

const model = {
    namespace: 'ForumReplyList',
    state: {
        
        replylist: {
            "currentPage":1,
            "totalPage":100,
            "data":[{
                "uid":"2",
                "name":"回复用户的ID",
                "title":"帖子标题",
                "topicID":123,
                "time":"2018-05-01 12:23:23"
            },{
                "uid":"3",
                "name":"回复用户的ID",
                "title":"帖子标题",
                "topicID":123,
                "time":"2018-05-01 12:23:23"
            },
                {
                    "uid":"4",
                    "name":"回复用户的ID",
                    "title":"帖子标题",
                    "topicID":123,
                    "time":"2018-05-01 12:23:23"
                },
                {
                    "uid":"5",
                    "name":"回复用户的ID",
                    "title":"帖子标题",
                    "topicID":123,
                    "time":"2018-05-01 12:23:23"
                }]
        }
    },
    reducers: {
        updateAllBoardInfo(state, payload) {
            return {...state,...payload.payload};
        }
    },
    effects: {
        * getallboard(payload: {payload:{newuser:string}}, {call, put}) {
            console.log(payload.payload.newuser);
            yield put({type: 'updateAllBoardInfo', payload: {uid :'test'}});

            return ;
        },

        *show({ payload },{select,call, put}){
            const name = yield select(state =>state);
            console.log("in show:",name.allboard.uid);

            return ;
        }
    }
};

export default model;
