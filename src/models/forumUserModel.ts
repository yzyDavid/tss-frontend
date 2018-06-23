import {routerRedux} from 'dva/router';
import {tssFetch} from '../utils/tssFetch';
import * as React from 'react'


export class DataForm {
    data: string;

}

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

            console.log("下面是传送的图片data");
            console.log(payload.payload);
            const response = yield call(tssFetch, '/file/upload', 'POST', payload.payload);
            // yield put(routerRedux.push({
            //     pathname: "/board="+msg,
            // }));
            const jsonBody = yield call(response.text.bind(response));
            console.log("下面是返回")
            console.log(jsonBody);
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