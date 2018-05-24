import {routerRedux} from 'dva/router';
import {tssFetch} from '../utils/tssFetch';

const model = {
    namespace: 'ForumHome',
    state: {

        HotList : [{
            key: '1',
            board: '数据库-高云君',
            title: "这是一个帖子的标题",
            author: "我是发帖人ID",
            boardid:'123',
            topicid:'123',
            time:"2018-05-01 12:00:00",
            replyNUM:"5"
        }, {
            key: '2',
            board: '数据结构基础-陈越',
            title: "这是一个帖子的标题",
            author: "我是发帖人ID",
            boardid:'123',
            topicid:'123',
            time:"2018-05-01 12:00:00",
            replyNUM:"5"
        }, {
            key: '3',
            board: '计算机组成-楼学庆',
            title: "这是一个帖子的标题",
            author: "我是发帖人ID",
            boardid:'123',
            topicid:'123',
            time:"2018-05-01 12:00:00",
            replyNUM:"5"
        }],


        LatestList: [{
            key: '1',
            board: '数据库-高云君',
            title: "这是一个帖子的标题",
            author: "我是发帖人ID",
            boardid:'123',
            topicid:'123',
            time:"2018-05-01 12:00:00",
            replyNUM:"5"
        }, {
            key: '2',
            board: '数据结构基础-陈越',
            title: "这是一个帖子的标题",
            author: "我是发帖人ID",
            boardid:'123',
            topicid:'123',
            time:"2018-05-01 12:00:00",
            replyNUM:"5"
        }, {
            key: '3',
            board: '计算机组成-楼学庆',
            title: "这是一个帖子的标题",
            author: "我是发帖人ID",
            boardid:'123',
            topicid:'123',
            time:"2018-05-01 12:00:00",
            replyNUM:"5"
        }],


    },

    reducers: {
        updateAllBoardInfo(state, payload) {
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
                pathname: "/allboard",
            }));

            return ;
        },

        *show({ payload },{select,call, put}){
            const name = yield select(state =>state);
            console.log("in show:",name.allboard.uid);

            return ;
        },

        *setHotType(payload: {payload: {type:string}}, {call, put}) {

            const selected = payload.payload.type;
            if(selected=="1"){

            }else if(selected=="7"){

            }else if(selected=="30"){

            }

        },
    }
};

export default model;
