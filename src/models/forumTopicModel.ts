import {routerRedux} from 'dva/router';
import {tssFetch} from '../utils/tssFetch';
import {boardForm} from "./forumBoardModel";




export class getDataForm{
    tid:string;
    page:string;
}

export class topicForm{
    topicID:string;
}

const model = {
    namespace: 'topic',
    state: {
        allstate:{
            "boardName":"软件工程",
            "boardID":"123",
            "title": "软件工程的七条原理",
            "postTime" : "2018-05-21 25:00:00",
            "currentPage": "1",
            "totalPage": "12",
            "thisPage":"10",
            "topicID":"123",
            "ids":["一楼ID","二楼ID"],
            "texts":["<p>Hey this <strong>editor</strong> rocks 😀</p>","<p>Hey this <strong>editor</strong> rocks 😀</p>"],
            "quotes":["这是我在一楼的引用","这是我在二楼引用的内容"],
            "quoteAuthors": ["引用的用户名","引用的用户名"],
            "quoteTimes": ["2018-05-01 12:10:10","2018-05-01 12:10:10"],
            "quoteIndexs": ["1","2"],
            "times":["2017-01-01 12:10:10","2017-01-01 12:10:10"],
            "photos":["https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526197579091&di=398662bf26b6d2ccc13d0e5d896cce9d&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01460b57e4a6fa0000012e7ed75e83.png","https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526197579091&di=398662bf26b6d2ccc13d0e5d896cce9d&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01460b57e4a6fa0000012e7ed75e83.png"],
            "indexs":["1","2"],

            "lzid":"34",
            "lztext":"123",
            "lzphoto":"url",
            "lztime":"123",
            "lzname":"楼主ID",

        }

    },
    reducers: {
        updateTopicInfo(state, payload) {
            return {...state,...payload.payload};
        }
    },
    effects: {
        * postReply(payload: {payload:any}, {call, put}) {
            const msg = payload.payload;

            const response = yield call(tssFetch, '/reply/add', 'POST', msg);
            const jsonBody = yield call(response.text.bind(response));

            location.reload();

            return ;
        },

        *getData(payload: {payload:any}, {call, put}){

            const Data = payload.payload;

            const data = new getDataForm;
            data.tid = Data.tid;
            data.page=Data.page;
            console.log("下面是发出请求的数据");
            console.log(data);
            const response = yield call(tssFetch, '/reply/info', 'POST', data);
            const jsonBody = yield call(response.text.bind(response));
            const body = JSON.parse(jsonBody);

            console.log("下面是topic getData");
            console.log(body);
            yield put({type: 'updateTopicInfo', payload: {allstate:body}});

        },

        *deleteTopic(payload: {payload:any}, {call, put}){

            const Data = payload.payload;

            const data = new topicForm();
            data.topicID = Data.topicID;


            console.log("in delete topic model");
            console.log(data);
            const response = yield call(tssFetch, '/topic/delete', 'POST', data);
            const jsonBody = yield call(response.text.bind(response));
            const body = JSON.parse(jsonBody);

            console.log("返回状态");
            console.log(body);
            yield put(routerRedux.push({
                pathname: "/forum/board/"+Data.boardID+"/1",
            }));


        },

        *setTop(payload: {payload:any}, {call, put}){

            const Data = payload.payload;

            const data = new topicForm();
            data.topicID = Data.topicID;

            const response = yield call(tssFetch, '/topic/settop', 'POST', data);
            const jsonBody = yield call(response.text.bind(response));
            const body = JSON.parse(jsonBody);



        },


    },

};

export default model;