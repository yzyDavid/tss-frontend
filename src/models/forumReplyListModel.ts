import {routerRedux} from 'dva/router';
import {tssFetch} from '../utils/tssFetch';

const model = {
    namespace: 'replyList',
    state: {

        replylist: {
            "currentPage":1,
            "totalPage":100,
            "times":["2016"],
            "userIDs":["315"],
            "userNames":["dasdas"],
            "topicIDs":["123"],
            "replyPos":["回复的内容在该贴中的楼层数"],
            "reads":["1"],
            "titles":["标题"]
        }
    },
    reducers: {
        updateAllBoardInfo(state, payload) {
            return {...state,...payload.payload};
        }
    },
    effects: {
        * getData(payload: {payload:any}, {call, put}) {
            const data = payload.payload;
            const response = yield call(tssFetch, '/reply/show', 'POST', data);
            const jsonBody = yield call(response.text.bind(response));
            const body = JSON.parse(jsonBody);
            yield put({type: 'updateAllBoardInfo', payload: {replylist:body}});

            return ;
        },

        * setReplyRead(payload: {payload:any}, {call, put}) {
            const data = payload.payload;
            const response = yield call(tssFetch, '/reply/confirm', 'POST', data);
            const jsonBody = yield call(response.text.bind(response));


            return ;
        },

    }
};

export default model;