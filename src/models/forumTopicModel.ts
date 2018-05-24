import {routerRedux} from 'dva/router';
import {tssFetch} from '../utils/tssFetch';


export class ReplyFormData {
    quoteIndex: string;
    text: string;
}

const model = {
    namespace: 'ForumTopic',
    state: {
        allstate:{
            "boardName":"软件工程",
            "boardID":123,
            "title": "软件工程的七条原理",
            "postTime" : "2018-05-21 25:00:00",
            "currentPage": 1,
            "totalPage": 23,
            "thisPage":10,
            "topicID":"123",
            "id":["一楼ID","二楼ID"],
            "text":["<p>Hey this <strong>editor</strong> rocks 😀</p>","<p>Hey this <strong>editor</strong> rocks 😀</p>"],
            "quote":["这是我在一楼的引用","这是我在二楼引用的内容"],
            "quoteAuthor": ["引用的用户名","引用的用户名"],
            "quoteTime": ["2018-05-01 12:10:10","2018-05-01 12:10:10"],
            "quoteIndex": ["1","2"],
            "time":["2017-01-01 12:10:10","2017-01-01 12:10:10"],
            "photo":["https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526197579091&di=398662bf26b6d2ccc13d0e5d896cce9d&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01460b57e4a6fa0000012e7ed75e83.png","https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526197579091&di=398662bf26b6d2ccc13d0e5d896cce9d&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01460b57e4a6fa0000012e7ed75e83.png"],
            "index":["1","2"],


        }

    },
    reducers: {
        updateAllBoardInfo(state, payload) {
            return {...state,...payload.payload};
        }
    },
    effects: {
        * postReply(payload: {payload:any}, {call, put}) {
            const msg = payload.payload;
            console.log(msg);

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
