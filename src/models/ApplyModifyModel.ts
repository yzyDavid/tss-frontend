import { httpMethod, tssFetch } from '../utils/tssFetch';
import { message } from 'antd';
import { Router, Route, Switch, routerRedux, browserHistory } from 'dva/router';


const model = {
    namespace: 'applyModify',
    state: {
        sid:"",
        cid: "",
        semester: "FIRST",
        year: "2015",
        reason:"",
        score: "",
        classes: ["", "", "", "", "", "", "", ""],
        cids: ["", "", "", "", "", "", ""]
    },

    reducers: {

        update(state, payoad) {
            return { ...state, ...payoad.payload }
        },

        change_page(state, payload) {

            if (state.page === 0 && payload.payload.count < 0) {

                message.error('�Ѿ��ǵ�һҳ�ˣ�');
                return { ...state };
            }

            if (state.last_page === state.page && payload.payload.count > 0) {
                message.error('�Ѿ������һҳ�ˣ�')
                return { ...state };
            }
            state.page = state.page + payload.payload.count
            return { ...state }
        },

        change_semester_(state, payload) {

            state.semester = payload.payload.value
            return { ...state }
        },

        change_year_(state, payload) {

            state.year = payload.payload.value
            return { ...state }
        },

        clear_class(state, payload) {
            for (var i = 0; i < 7; i++) {
                state.classes[i] = ""
                state.cids[i] = ""
            }
            return { ...state }
        },


        set_class(state, payload) {
            for (var i = 0; i < payload.payload.courses_name.length; i++) {
                state.classes[i] = payload.payload.courses_name[i]
                state.cids[i] = payload.payload.class_id[i]
            }
            return { ...state }
        },

        set_cid(state, payload) {

            state.cid = payload.payload.value
            return { ...state }
        },


        change_score(state, payload) {
            state.scores[payload.payload.index] = payload.payload.value
            return { ...state }
        },

    },

    effects: {

        * change_semester(payload, { call, put, select }) {

            const year = yield select(state => state.applyModify.year)
            var identity = { "uid": payload.payload.uid, "semester": payload.payload.semester, "year": year }
            yield put({ type: 'change_semester_', payload: { value: payload.payload.semester } })

            const response = yield call(tssFetch, '/grade/getallclass', 'POST', identity)
            const jsonBody = yield call(response.text.bind(response))
            const obj = JSON.parse(jsonBody)
            yield put({ type: 'clear_class', payload: {} })
            yield put({ type: 'set_class', payload: obj })

        },

        * change_year(payload, { call, put, select }) {

            const semester = yield select(state => state.applyModify.semester)
            var identity = { "uid": payload.payload.uid, "semester": semester, "year": payload.payload.year }
            yield put({ type: 'change_year_', payload: { value: payload.payload.semester } })

            const response = yield call(tssFetch, '/grade/getallclass', 'POST', identity)
            const jsonBody = yield call(response.text.bind(response))
            const obj = JSON.parse(jsonBody)
            yield put({ type: 'clear_class', payload: {} })
            yield put({ type: 'set_class', payload: obj })

        },

        *change_class(payload, { call, put }) {

            var flag = 0
            var cid = ""
            for (var p in payload.payload.className) {
                if (payload.payload.className[p] === "(") {
                    flag = 1
                    continue
                }
                else
                    if (flag === 0)
                        continue
                if (payload.payload.className[p] === ")")
                    break
                cid = cid + payload.payload.className[p]
            }

           

            var data = { "uid": payload.payload.uid, "cid": cid }

            const response = yield tssFetch('/grade/getclassstudent', 'POST', data)
            const jsonBody = yield call(response.text.bind(response))
            const obj = JSON.parse(jsonBody)

            yield put({ 'type': 'set_cid', payload: { "value": cid } })

        },

        *upload(payload, { call, put, select }) {

            const uid = yield select(state => state.applyModify.uid)
            const cid = yield select(state => state.applyModify.cid)
            const score = yield select(state => state.applyModify.score)
            const sid = yield select(state => state.applyModify.sid)
            const reason = yield select(state => state.applyModify.reason)
            if (uid === "" || cid === "" || score === "" || score === "" || sid === "" || reason === "")
            {
                message.error('提交失败')
                return
            }
            yield call(tssFetch, "/grade/modify", "POST", { "uid": uid, "cid": cid, "score": score, "studentid": sid, "reasons": reason })
            message.success('提交成功')
        }

    }


};

export default model;
