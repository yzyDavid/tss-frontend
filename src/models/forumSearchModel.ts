import {routerRedux} from 'dva/router';
import any = jasmine.any;

const model = {
    namespace: 'ForumSearch',
    state: {
        data:{
            "key": '数据结构',
            "type":'版块',
            "num":2,
            "result":["数据结构-陈越","数据结构-徐镜春"]
        }
    },
    reducers: {
        updateSearchInfo(st, payload) {
            return {...st, ...payload.payload};
        }
    },
    effects: {
        * query(payload: {payload: {key: string}}, {call, put}) {
                console.log("in search");
                console.log(payload.payload.key);
                yield put({type: 'updateSearchInfo', payload: {key: payload.payload.key}});

                //todo: 向后端发送搜索请求并更新

        },

        *settype(payload: {payload: {type:string}}, {call, put}) {
            console.log("in search")
            console.log(payload.payload.type)
            yield put({type: 'updateSearchInfo', payload: {key: payload.payload.type}});
        }
    }
};

export default model;
