import {routerRedux} from 'dva/router';
import {tssFetch} from '../utils/tssFetch';

const model = {
    namespace: 'mypost',
    state: {
        postList: {
            "userName":"用户名",
            "data":[{
                "id":"1",
                "title":"test_title1",
                "time":"2017-05-01 12:11:11",
                "topicID":"123",
                "boardID":"123",
                "boardName":"数据结构-陈越"
            },{
                "id":"2",
                "title":"test_title2",
                "time":"2017-05-01 12:11:11",
                "topicID":"123",
                "boardID":"123",
                "boardName":"编程语言原理-翁恺"

            }],
            "currentPage":1,
            "totalPage":100
        }


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


    }
};

export default model;
