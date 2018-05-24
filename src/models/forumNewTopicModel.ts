import {routerRedux} from 'dva/router';
import {tssFetch} from '../utils/tssFetch';

const model = {
    namespace: 'ForumNewTopic',
    state: {
        boardInfo:{
            "boardName": "软件工程-XXX",
            "boardID": 123
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

        *show({ payload },{select,call, put}){
            const name = yield select(state =>state);
            console.log("in show:",name.allboard.uid);

            return ;
        }
    },
    subscriptions: {
        setup({dispatch, history}) {
            //console.log(history.location.pathname)
            // return history.listen(({pathname}) => {
            //     if (pathname === '/user') {
            //         dispatch({ type: 'userInfo', payload: {uid: ''} });
            //     }
            // });
        }
    },
};

export default model;
