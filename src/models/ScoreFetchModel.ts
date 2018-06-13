import { httpMethod, tssFetch } from '../utils/tssFetch';
import { message } from 'antd';
import { Router, Route, Switch, routerRedux, browserHistory } from 'dva/router';
import {Simulate} from "react-dom/test-utils";
import select = Simulate.select;

const model = {
    namespace: 'scoreFetch',
    state: {
        _status:"1",
        semester: "FIRST",
        year:"2015",
        avg:0,
        class: ["", "", "", "", "", "", "", "", "", "", "", "", ""],
        cid: ["", "", "", "", "", "", "", "", "", "", "", "", ""],
        score: [],
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
            state.class_score.classid = payload.payload.value;
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
            if (state._status==="1") state._status="0";
            else state._status="0";
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
        }
    },

    effects: {
        *change_semester(payload,{call,select,put}) {
            const year = yield select(state => state.scoreFetch.year);
            let identity = {"uid":payload.payload.uid,  "semester":payload.payload.semester ,"year":year};

            yield put({ type: 'change_semester_', payload: { value: payload.payload.semester} });

            const response = yield call(tssFetch, '/grade/getclassstudentscore', 'POST', identity);
            const jsonBody = yield call(response.text.bind(response));
            const obj = JSON.parse(jsonBody);
            yield put({ type: 'clear_score_', payload: {}});
            yield put({ type: 'set_score_', payload: obj });
        },

        *clear_score(payload,{put})
        {
            yield put({ type: 'clear_score_', payload: {}})
        },

        *change_year(payload, { call, put, select }) {
            const semester = yield select(state => state.scoreFetch.semester);
            let identity = { "uid": payload.payload.uid, "year": payload.payload.year,"semester": semester};

            yield put({ type: 'change_year_', payload: { value: payload.payload.semester } });

            const response = yield call(tssFetch, '/grade/getclassstudentscore', 'POST', identity);
            const jsonBody = yield call(response.text.bind(response));
            const obj = JSON.parse(jsonBody);
            yield put({ type: 'clear_score_', payload: {}});
            yield put({ type: 'set_score_', payload: obj });
        },

        *change_class(payload,{call,put}){
            yield put({type: 'set_status_',payload:{}});
            yield put({type: 'set_current_score',payload: {value: payload.payload.score}});
            yield put({type: 'set_classname', payload: {value: payload.payload.classname}});
            let identity = {"cid":payload.payload.classid};
            yield put({ type: 'change_class_', payload: {value: payload.payload.classid}});

            const response = yield call(tssFetch, '/grade/getclassgrade', 'POST', identity);
            const jsonBody = yield call(response.text.bind(response));
            const obj = JSON.parse(jsonBody);
            yield put({type: 'set_score',payload: obj })
        }


    }

};

export default model;
