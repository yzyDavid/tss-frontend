import {routerRedux} from 'dva/router';
import {tssFetch} from '../utils/tssFetch';

const model = {
    namespace: 'ForumMyBoard',
    state: {
        uid:'sunjian',
        list: [{
            'id':'3',
            'boardname':'计算机组成-楼学庆',

        },{
            'id':'4',
            'boardname':'数据结构基础-陈越',

        }]
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

        *show({ payload },{select,call, put}){
            const name = yield select(state =>state);
            console.log("in show:",name.allboard.uid);

            return ;
        }
    }
};

export default model;
