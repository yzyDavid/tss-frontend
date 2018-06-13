import {routerRedux} from 'dva/router';
import {tssFetch} from '../utils/tssFetch';
import {Simulate} from "react-dom/test-utils";
import contextMenu = Simulate.contextMenu;


export  class newTopicForm{
    boardID:string;
    title:string;
    text:string;
}

export class dataForm{
    boardID:string;
}

export class boardInfoForm{
    boardName:string;
    boardID:string;
}
const model = {
    namespace: 'ForumNewTopic',
    state: {
        boardInfo:{
            "boardName": "软件工程-XXX",
            "boardID": "123"
        }

    },
    reducers: {
        updateBoardInfo(state, payload) {
            return {...state,...payload.payload};
        }
    },
    effects: {
        * getallboard(payload: {payload:{newuser:string}}, {call, put}) {

            yield put({type: 'updateAllBoardInfo', payload: {uid :'test'}});

            return ;
        },

        *postNewTopic(payload:{payload:any},{select,call, put}){
            const data = payload.payload;

            const TopicData = new newTopicForm;
            TopicData.boardID = data.boardID;
            TopicData.text = data.text;
            TopicData.title = data.title;
            console.log("下面是发帖数据");
            console.log(TopicData);
            const response = yield call(tssFetch, '/topic/add', 'POST', TopicData);
            const jsonBody = yield call(response.text.bind(response));
            const body = JSON.parse(jsonBody);
            var topicID = body.topicID;
            console.log("下面是返回数据 in newTopicMode postNewTopic");
            console.log(jsonBody);
            yield put(routerRedux.push({
                pathname: "/forum/topic/"+topicID+"/1",
            }));

            return ;
        },

        *getName(payload: {payload:any}, {call, put}){
            const boardID = payload.payload;

            const data = new dataForm;
            data.boardID = boardID;
            const response = yield call(tssFetch, '/topic/beforeadd', 'POST', data);
            const jsonBody = yield call(response.text.bind(response));
            const body = JSON.parse(jsonBody);

            const boardInfo = new boardInfoForm;
            boardInfo.boardName = body.boardName;
            boardInfo.boardID = boardID;

            yield put({type: 'updateBoardInfo', payload: {boardInfo:boardInfo}});

            return;
        },

        *goToPage(payload:{boardInfo:any},{select,call, put}){

            return ;
        }
    },
    subscriptions: {
        setup({dispatch, history}) {

            return;
        },

    },
};

export default model;