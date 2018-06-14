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
                state.page = state.page + 1
                state.id = ""
                state.uid = ""
                state.cid = ""
                state.reason = ""
                state.score = ""
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
            var obj = payload.payload;
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
            }
            else {
                alert('当前没有请求')
            }
            return { ...state }
        }



    },

    effects: {
        *getModify(payload, { call, put}) {
         

            // const response = yield tssFetch("/grade/getprocessmodify", "POST", { "uid": "root" })
            const response = yield call(tssFetch, "/grade/getprocessmodify", "POST", { "uid": "root" })
            const jsonBody = yield call(response.text.bind(response))
            const obj = JSON.parse(jsonBody)      
     
            yield put({ 'type': "get_modify", 'payload': obj })
      
        },

        *submit(payload, { call, put, select }) {
           
            const id = yield select(state => state.scoreManager.id)
            const uid = yield select(state => state.scoreManager.uid)
            const cid = yield select(state => state.scoreManager.cid)
            const score = yield select(state => state.scoreManager.score)
            const page = yield select(state => state.scoreManager.page)
            const num = yield select(state => state.scoreManager.num)

            if (page > num) {
                message.error('当前无请求!')
                return
            }

            if (id === "" || uid === "" || cid === "" || score === "") {
                message.error('信息缺失!')
                return
            }



            yield call(tssFetch, "/grade/processmodify", "POST", { "id": id, "uids": uid, "cids": cid, "score": score, "agree": payload.payload.res })
            message.success("处理成功")

            
            yield put({ 'type': "change_page", 'payload': {} })
            
                
        }
            
    }


};

export default model;
