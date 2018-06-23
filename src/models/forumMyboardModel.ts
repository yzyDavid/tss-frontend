import {routerRedux} from 'dva/router';
import {tssFetch} from '../utils/tssFetch';

const model = {
    namespace: 'myboard',
    state: {

        bookList:{
            "boardNames": ["版面名"],
            "boardIDs":["123"]
        }
    },
    reducers: {
        updateAllBoardInfo(state, payload) {
            return {...state,...payload.payload};
        }
    },
    effects: {
        * getMyBoard(payload: {payload:any}, {call, put}) {
            console.log("我在关注")
            const response = yield call(tssFetch, '/section/showbook', 'GET', {});
            const jsonBody = yield call(response.text.bind(response));
            const body = JSON.parse(jsonBody);
            console.log("我的关注列表");
            console.log(body)
            yield put({type: 'updateAllBoardInfo', payload: {bookList:body}});

            return ;
        },


    }
};

export default model;