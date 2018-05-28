import { httpMethod, tssFetch } from '../utils/tssFetch';
import { message } from 'antd';
import { Router, Route, Switch, routerRedux, browserHistory } from 'dva/router';


const model = {
    namespace: 'scoreManager',
    state: {
        page: 1,
        num: 0,
        process: [],
        scores: [],
        uids: [],
        cids: [],
        ids: [],
        reasons: [],
        score: null,
        uid: null,
        cid: null,
        tid: null,
        reason: " ",
        id: null,
    },

    reducers: {
        change_page(state, payload) {

            if (state.num === state.page) {
                message.error('没有更多的请求了！')
                return {...state}
            }

            state.page += 1
            
            state.id = state.ids[state.page]
            state.uid = state.uids[state.page]
            state.cid = state.cids[state.page]
            state.reason = state.reasons[state.page]
            state.score = state.scores[state.page]
            return { ...state }
        },

        get_modify(state, payload) {
            var i = 0;
            var obj = payload.payload.obj
            for (i = 0; i < obj['cids'].length; i++) {
                state.ids.push(obj['ids'][i])
                state.reasons.push(obj['reasons'][i])
                state.scores.push(obj['scores'][i])
                state.uids.push(obj['uids'][i])
                state.cids.push(obj['cids'][i])

            }

            if (state.uids.length > 0) {
                state.num = i
                state.id = state.ids[0]
                state.uid = state.uids[0]
                state.cid = state.cids[0]
                state.reason = state.reasons[0]
                state.score = state.scores[0]
                state.forceUpdate()
            }
            else {
                alert('当前无修改成绩请求！')
            }
        }



    },

    effects: {
        *getModify(payload, { call, put}) {

            const response = call(tssFetch, "/grade/getprocessmodify", "POST", { "uid": "root" })
            const jsonBody = yield call(response.text.bind(response))
            const obj = JSON.parse(jsonBody)

            var i = 0

            yield put({ 'type': "get_modify", 'payload': obj })
      
        },

        *submit(payload, { call, put, select }) {
           
            const id = yield select(state => state.id)
            const uid = yield select(state => state.uid)
            const cid = yield select(state => state.cid)
            const score = yield select(state => state.score)
       
            if (id === "" || uid === "" || cid === "" || score === "") {
                message.error('没有要处理的请求！')
                return
            }

            call(tssFetch, "/grade/processmodify", "POST", { "id": id, "uids": uid, "cids": cid, "score": score, "agree": payload.payload.res })

            yield put({ 'type': "change_page", 'payload': {} })
        }
            
    }


};

export default model;
