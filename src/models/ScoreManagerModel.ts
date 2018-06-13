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
        score: "无",
        uid: "无",
        cid: "无",
        tid: "无",
        reason: "无", 
        id: "无",
    },

    reducers: {
        change_page(state, payload) {


            if (state.num >= state.page) {
                message.success('提交成功！')
            }

            state.page += 1

            if (state.page > state.num) {

                state.id = "无";
                state.uid = "无";
                state.cid = "无";
                state.reason = "无";
                state.score = "无";
                return { ...state }
            }
            
            state.id = state.ids[state.page-1]
            state.uid = state.uids[state.page-1]
            state.cid = state.cids[state.page-1]
            state.reason = state.reasons[state.page-1]
            state.score = state.scores[state.page-1]
            return { ...state }
        },

        get_modify(state, payload) {
            var i = 0;
            var obj = payload.payload

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
       
            if (id === "" || uid === "" || cid === "" || score === "") {
                message.error('没有要处理的请求！')
                return
            }

            yield call(tssFetch, "/grade/processmodify", "POST", { "id": id, "uids": uid, "cids": cid, "score": score, "agree": payload.payload.res })
            yield put({ 'type': "change_page", 'payload': {} })
        }
            
    }


};

export default model;
