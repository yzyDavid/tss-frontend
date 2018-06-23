import {routerRedux} from 'dva/router';
import any = jasmine.any;
import {tssFetch} from "../utils/tssFetch";

const model = {
    namespace: 'search',
    state: {
        type:{
            "type":"标题"
        },
        key:{
            "key":""
        },
        topicData:{
            currentPage:"12",
            totalPage:"123",

            "titles":["biaoti"],
            "authors":["author"],
            "times":["2017"],
            "boardNames":["boardName"],
            "boardIDs":["123"],
            "topicIDs":["123"],
            "replyNums":["每个帖子的回复数"]
        },
        userData:{
            "userNames":["1","1","1","1","1","1","1","1","1","1"],
            "userIDs":["1","1","1","1","1","1","1","1","1","1"],
            "photoURLs":["https://file.cc98.org/v2-upload/hjpf3upe.jpg","1","1","1","1","1","1","1","1","1"]
        },
        boardData:{
            "boardNames":["版块的名称","版块的名称","版块的名称","版块的名称","版块的名称","版块的名称","版块的名称"],
            "boardIDs":["版块的名称","版块的名称","版块的名称","版块的名称","版块的名称","版块的名称","版块的名称"]

        }
    },
    reducers: {
        updateSearchInfo(st, payload) {
            return {...st, ...payload.payload};
        }
    },
    effects: {
        * query(payload: {payload: {key: string}}, {call, put,select}) {

            var key = payload.payload.key;
            key = encodeURI(key);

            const type = yield select(state => state.search.type.type);


            if(type==="标题"){
                yield put({type: 'updateSearchInfo', payload: {type: {type:"标题"}}});
                yield put(routerRedux.push({
                    pathname: "/forum/search/topic/"+key+"/1",
                }));
            }else if(type==="用户"){
                yield put({type: 'updateSearchInfo', payload: {type: {type:"标题"}}});
                yield put(routerRedux.push({
                    pathname: "/forum/search/user/"+key,
                }));
            }else if(type==="版块"){
                yield put({type: 'updateSearchInfo', payload: {type: {type:"标题"}}});
                yield put(routerRedux.push({
                    pathname: "/forum/search/board/"+key,
                }));
            }

        },


        *getSearchData(payload: {payload: {key: any,type:any}}, {call, put,select}){
            var type = payload.payload.type;
            var data = payload.payload.key;

            if(type==="user"){
                const response = yield call(tssFetch, '/search/user', 'POST', data);
                const jsonBody = yield call(response.text.bind(response));
                const body = JSON.parse(jsonBody);
                console.log("看看？")
                console.log(body)
                yield put({type: 'updateSearchInfo', payload: {userData:body}});
            }else if(type ==="board"){
                console.log("在board里面啊")
                const response = yield call(tssFetch, '/search/section', 'POST', data);
                const jsonBody = yield call(response.text.bind(response));
                const body = JSON.parse(jsonBody);
                yield put({type: 'updateSearchInfo', payload: {boardData:body}});
            }else if(type ==="topic"){
                const response = yield call(tssFetch, '/search/topic', 'POST', data);
                const jsonBody = yield call(response.text.bind(response));
                const body = JSON.parse(jsonBody);
                yield put({type: 'updateSearchInfo', payload: {topicData:body}});
            }
        },


        *settype(payload: {payload: {type:string}}, {call, put,select}) {
            yield put({type: 'updateSearchInfo', payload: {type: payload.payload}});
        }
    }
};

export default model;