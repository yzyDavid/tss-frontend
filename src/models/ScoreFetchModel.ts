import { httpMethod, tssFetch } from '../utils/tssFetch';
import { message } from 'antd';
import { Router, Route, Switch, routerRedux, browserHistory } from 'dva/router';
import {Simulate} from "react-dom/test-utils";
import select = Simulate.select;

const model = {
    namespace: 'scoreFetch',
    state: {
        _status:"1",
        _identity:"teacher",
        semester: "FIRST",
        year:"2015",
        avg:0,
        class: ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
        cid: ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
        score: [],
        className: "-",
        classid: ["", "", "", "", "", "", "", "", "", "", "", "", ""],
        class_score: {
            avg:0,
            classid:"",
            classname:"",
            num:0,
            current_score:0,
            score: [],
            ranking: 1,
            ranking_per: 100,

            ids: [],
            names: [],
            scores: [],
        },        
    },



    reducers: {
        change_year_(state, payload) {
            state.year = payload.payload.value;
            return { ...state }
        },

        change_semester_(state, payload) {
            state.semester = payload.payload.value;
            return {...state}
        },

        change_class_(state, payload) {
            console.log("change_class_");
            state.class_score.classid = payload.payload.value;
            return {...state}
        },

        change_identity_(state, payload) {
            if (payload.payload.type=="Student") state._identity = "student";
            else state._identity = "teacher";
            console.log("identity="+state._identity);
            return {...state}
        },

        clear_score_(state, payload) {
            for (let i=0;i<12;i++) {
                state.class[i] = "-";
                state.cid[i] = "-";
                state.classid[i] = "-";
                state.score[i] = "-";
            }
            state.avg = 0;
            return {...state};
        },

        set_score_(state, payload) {
            state.avg=0;
            state.class[0] = payload.payload.coursenames[0];
            for (let i = 0; i < payload.payload.coursenames.length; i++) {
                state.class[i] = payload.payload.coursenames[i];
                state.cid[i] = payload.payload.courseid[i];
                state.score[i] = payload.payload.scores[i];
                state.classid[i] = payload.payload.classids[i];
                state.avg = state.avg + parseFloat(payload.payload.scores[i]);
            }
            state.avg = state.avg / payload.payload.coursenames.length;
            return {...state}
        },

        set_status_(state, payload) {
            console.log("status=="+status);
            if (state._status==="1") state._status="0";
            else state._status="0";
            console.log("status=="+status);
            return {...state}
        },

        set_score(state, payload) {
            state.class_score.num = payload.payload.scores.length;
            state.class_score.ranking = 1;
            state.class_score.avg=0;
            for (let i = 0; i < payload.payload.scores.length; i++) {
                state.class_score.score[i] = payload.payload.scores[i];
                if (state.class_score.score[i]>state.class_score.current_score) state.class_score.ranking++;
                state.class_score.avg += parseFloat(state.class_score.score[i]);
            }
            state.class_score.avg = state.class_score.avg/state.class_score.num;
            state.class_score.ranking_per = state.class_score.ranking*100 / state.class_score.num;
            return {...state}
        },

        set_current_score(state, payload) {
            state.class_score.current_score = payload.payload.value;
            return {...state}
        },

        set_classname(state, payload) {
            state.class_score.classname = payload.payload.value;
            return {...state}
        },

        set_back_status(state){
            if (state._status==="0") state._status="1";
            else state._status="1";
            return {...state}
        },

        clear_class(state, payload) {
            for (let i = 0; i < 7; i++) {
                state.class[i] = "";
                state.cid[i] = ""
            }
            return { ...state }
        },

        set_class(state, payload) {
            for (let i = 0; i < payload.payload.courses_name.length; i++) {
                state.class[i] = payload.payload.courses_name[i];
                state.cid[i] = payload.payload.class_id[i]
            }
            return { ...state }
        },

        set_cid_t_(state, payload) {
            state.class_score.classid = state.cid[0];
            return { ...state }
        },

        set_className_t_(state, payload) {

            state.class_score.classname = payload.payload.value;
            return { ...state }
        },

        change_class_t_(state, payload) {
            state.class_score.ids = [];
            state.class_score.names = [];
            state.class_score.scores = [];
            state.class_score.avg = 0;
            let i = 0;
            let obj = payload.payload.obj;
            for (let p in obj.students) {
                state.class_score.ids.push(p);
                state.class_score.names.push(obj.name[i]);
                state.class_score.scores.push("0");
                state.class_score.avg += parseFloat(state.class_score.scores[i]);
                i++;
            }
            console.log("i=")
            return { ...state }
        },
    },

    effects: {
        *change_identity(payload, {call,select,put}) {
            let identity = {"uid":payload.payload.uid};
            console.log("uid:"+payload.payload.uid);
            const response = yield call(tssFetch, '/grade/getusertype', 'POST',identity);

            const jsonBody = yield call(response.text.bind(response));
            const obj = JSON.parse(jsonBody);
            yield put({ type: 'change_identity_', payload: obj});
        },

        *change_semester(payload,{call,select,put}) {
            const year = yield select(state => state.scoreFetch.year);
            const iden = yield select(state => state.scoreFetch_identity);
            if (iden == "student") {
                let identity = {"uid": payload.payload.uid, "semester": payload.payload.semester, "year": year};

                yield put({type: 'change_semester_', payload: {value: payload.payload.semester}});
                console.log(identity.uid+"+"+identity.year+"+"+identity.semester);
                const response = yield call(tssFetch, '/grade/getclassstudentscore', 'POST', identity);
                const jsonBody = yield call(response.text.bind(response));
                const obj = JSON.parse(jsonBody);
                yield put({type: 'clear_score_', payload: {}});
                yield put({type: 'set_score_', payload: obj});
            }
            else
            {
                const year = yield select(state => state.scoreFetch.year)
                let identity = {"uid":payload.payload.uid, "semester":payload.payload.semester, "year":year}

                yield put({ type: 'change_semester_', payload: { value: payload.payload.semester} })

                const response = yield call(tssFetch, '/grade/getallclass', 'POST', identity)
                const jsonBody = yield call(response.text.bind(response))
                const obj = JSON.parse(jsonBody)
                yield put({ type: 'clear_class', payload: {} })
                yield put({ type: 'set_class', payload: obj })
            }
        },

        *clear_score(payload,{put})
        {
            yield put({ type: 'clear_score_', payload: {}})
        },

        *change_year(payload, { call, put, select }) {
            const iden = yield select(state=> state.scoreFetch._identity);
            console.log("change_year() begin");
            if (iden=="student") {
                console.log("A student right!");
                const semester = yield select(state => state.scoreFetch.semester);
                let identity = {"uid": payload.payload.uid, "year": payload.payload.year, "semester": semester};
                console.log(identity.uid+"+"+identity.year+"+"+identity.semester);
                yield put({type: 'change_year_', payload: {value: payload.payload.year}});

                const response = yield call(tssFetch, '/grade/getclassstudentscore', 'POST', identity);
                const jsonBody = yield call(response.text.bind(response));
                const obj = JSON.parse(jsonBody);
                yield put({type: 'clear_score_', payload: {}});
                yield put({type: 'set_score_', payload: obj});
            }
            else
            {
                const semester = yield select(state => state.scoreFetch.semester)
                let identity = { "uid": payload.payload.uid, "semester": semester, "year": payload.payload.year};

                yield put({ type: 'change_year_', payload: { value: payload.payload.year } });

                const response = yield call(tssFetch, '/grade/getallclass', 'POST', identity);
                const jsonBody = yield call(response.text.bind(response));
                const obj = JSON.parse(jsonBody);
                yield put({ type: 'clear_class', payload: {} });
                yield put({ type: 'set_class', payload: obj })
            }
        },

        *change_class(payload,{call,put}){
            console.log("change_class");
            yield put({type: 'set_status_',payload:{}});
            yield put({type: 'set_current_score',payload: {value: payload.payload.score}});
            yield put({type: 'set_classname', payload: {value: payload.payload.classname}});
            let identity = {"cid":payload.payload.classid};
            yield put({ type: 'change_class_', payload: {value: payload.payload.classid}});

            const response = yield call(tssFetch, '/grade/getclassgrade', 'POST', identity);
            const jsonBody = yield call(response.text.bind(response));
            const obj = JSON.parse(jsonBody);
            yield put({type: 'set_score',payload: obj })
        },

        *change_class_t(payload, { call, put }) {

            let flag = 0;
            let cid = "";
            let className= "";
            for (let p in payload.paylaod.className) {
                if (payload.payload.className[p] === "(") {
                    flag = 1;
                    continue
                }
                else
                if (flag === 0) {
                    className + payload.payload.className[p];
                    continue;
                }
                if (payload.payload.className[p] === ")")
                    break;
                cid = cid + payload.payload.className[p]
            }

            var data = { "uid": payload.payload.uid, "cid": cid };
            const response = yield tssFetch('/grade/getclassstudent', 'POST', data);
            const jsonBody = yield call(response.text.bind(response));
            const obj = JSON.parse(jsonBody);

            yield put({ 'type': 'change_class_t_', payload: obj });
            yield put({ 'type': 'set_cid_t_', payload: {"value": cid} });
            yield put({ 'type': 'set_className_t_', payload: {"value": className}});
        },
    }

};

export default model;
