import {routerRedux} from 'dva/router';
import {tssFetch} from '../utils/tssFetch';
import * as React from 'react'
const model = {
    namespace: 'forumUser',
    state: {

        list: {
            "ids":["303","404"],
            "names":["test1","test2"]
        }
    },
    reducers: {
        updateAllBoardInfo(state, payload) {
            return {...state,...payload.payload};
        }
    },
    effects: {
        *changePhoto(payload: {payload:any}, {call, put}) {
            const msg = payload.payload;
            var data = new FormData();
            data.append('file', msg);
            const response = yield call(tssFetch, '/userPicUpload', 'GET', data);
            // yield put(routerRedux.push({
            //     pathname: "/board="+msg,
            // }));
            return;

        },


    },

    subscriptions: {
        setup({dispatch, history,call,put}) {


            // dispatch({type:'allboard/getData', payload:{}});

            return;

        }
    },
};

export default model;

//DONE