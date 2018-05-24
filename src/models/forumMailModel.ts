import {routerRedux} from 'dva/router';
import {tssFetch} from '../utils/tssFetch';

const model = {
    namespace: 'ForumMail',
    state: {

        input: [{
            'id':'1',
            'user':'发件人ID',
            "title":"私信标题",
            "time":"2018-05-01 21:00:00",
            "contents":"这里是私信的正文"
        },{
            'id':'1',
            'user':'发件人ID',
            "title":"私信标题",
            "time":"2018-05-01 21:00:00",
            "contents":"这里是私信的正文"

        },{
            'id':'1',
            'user':'发件人ID',
            "title":"私信标题",
            "time":"2018-05-01 21:00:00",
            "contents":"这里是私信的正文"

        }]
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
