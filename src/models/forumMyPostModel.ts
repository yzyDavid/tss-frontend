import {routerRedux} from 'dva/router';
import {tssFetch} from '../utils/tssFetch';


export class pageForm{
    page:string
}

const model = {
    namespace: 'mypost',
    state: {
        postList: {
            "userName":"用户名",
            "titles":["帖子标题"],
            "times":["2017-05-01 12:11:11"],
            "topicIDs":["123"],
            "boardIDs":["123"],
            "boardNames":["数据结构-陈越"],
            "currentPage":"1",
            "totalPage":"100" ,
        }


    },
    reducers: {
        updateListInfo(state, payload) {
            return {...state,...payload.payload};
        }
    },
    effects: {
        * getMyDataByPage(payload: {payload:any}, {call, put}) {

            const pageNum = payload.payload;
            const data  = new pageForm;
            data.page = pageNum;
            const response = yield call(tssFetch, '/topic/published?page=1', 'GET',data );
            const jsonBody = yield call(response.text.bind(response));
            const body = JSON.parse(jsonBody);
            yield put({type: 'updateListInfo', payload: {postList:body}});


            return ;
        },

        * getUserDataByPage(payload: {payload:any}, {call, put}) {

            const data = payload.payload;

            const response = yield call(tssFetch, '/search/published', 'POST',data );
            const jsonBody = yield call(response.text.bind(response));
            const body = JSON.parse(jsonBody);
            console.log("下面是user发帖纪录");
            console.log(body);
            yield put({type: 'updateListInfo', payload: {postList:body}});


            return ;
        },


    }
};

export default model;