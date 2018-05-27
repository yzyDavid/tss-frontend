import {routerRedux} from 'dva/router';
import {tssFetch} from '../utils/tssFetch';
import * as React from 'react'
const model = {
    namespace: 'ForumAllBoard',
    state: {

        list: {
            "boardIDs":["303","404"],
            "boardNames":["fail","fail"]
        }
    },
    reducers: {
        updateAllBoardInfo(state, payload) {
            return {...state,...payload.payload};
        }
    },
    effects: {
        * goToBoard(payload: {payload:String}, {call, put}) {
            const msg = payload.payload;

            yield put(routerRedux.push({
                pathname: "/board="+msg,
            }));
            return;

        },

        *getData({payload},{call,put}){
            const response = yield call(tssFetch, '/section/info', 'GET', {});
            const jsonBody = yield call(response.text.bind(response));
            const body = JSON.parse(jsonBody);
            yield put({type: 'updateAllBoardInfo', payload: {list:body}});

        }
    },

    subscriptions: {
        setup({dispatch, history,call,put}) {


            dispatch({type:'allboard/getData', payload:{}});

            return;

        }
    },
};

export default model;

//DONE