import {stringify} from "querystring";
import {loadSession, saveSession} from "../utils/localStorage";
import {routerRedux} from "dva/router";
import {tssFetch} from "../utils/tssFetch";
import {message} from "antd";

const model = {
    namespace: 'testsysstudent',
    state: {
        uid: "",
        pid: "",
        papers: [
            {
                pid:"1",
                pstatus: true,
                pscore: "90",
                ptime: "Monday 9:00-9:15",
                plength: "1:30:00",
            },
            {
                pid:"2",
                pstatus: false,
                pscore: 0,
                ptime: "Sunday 14:00-9:15",
                plength: "2:00:00",
            },
        ],
        qids: [],
        questions: [
            {
                qid: "1",
                question: "Is monkey an animal?",
                qtype: "1",
                qanswer: "yes",
                qmyanswer: "",
                qunit: "1",
            },
            {
                qid: "4",
                question: "Is apple an animal?",
                qtype: "1",
                qanswer: "no",
                qmyanswer: "",
                qunit: "2",
            },
            {
                qid: "5",
                question: "Which is an animal?\nA.monkey B.apple",
                qtype: "2",
                qanswer: "A",
                qmyanswer: "",
                qunit: "2",
            },
            {
                qid: "6",
                question: "What is an apple?",
                qtype: "3",
                qanswer: "fruit",
                qmyanswer: "",
                qunit: "2",
            },
        ],
    },

    reducers: {
        saveSession(st) {
            return saveSession(st)
        },
        loadSession(st) {
            return loadSession(st)
        },
        updateSession(st, payload) {
            return {...st, ...payload.payload};
        },
        updateQidList(st, payload) {
            return {...st, ...payload.payload};
        },
        updateQuestionList(st, payload) {
            return {...st, ...payload.payload};
        },
    },

    effect: {
        * jump(payload: {payload: {direction: string}}, {call, put}) {
            const direction = payload.payload.direction;
            console.log('jump');
            switch(direction){
                // case "Insert": yield put(routerRedux.push('/testsys_teacher_paper_insert')); break;
                // case "Search": yield put(routerRedux.push('/testsys_teacher_paper_search')); break;
            }
            return;
        },

        * getpaper(payload: {payload: {pid: string, uid: string}}, {call, put}) {
            const msg = payload.payload;
            console.log("sp/paper: "+payload);
            const response = yield call(tssFetch, '/testsysstudent/getpaper', 'POST', msg);
            console.log("sq/paper response: "+response);
            if (response.status === 400) {
                message.error('更新失败');
                return;
            }
            //?datasource
            const jsonBody = yield call(response.text.bind(response));
            const body = JSON.parse(jsonBody);
            yield put({
                type: 'updateQidList',
                payload: {qids: body.qids}
            });
            yield put(routerRedux.push('/testsys_student_question_review'));
            return;
        },

        * getquestion(payload: {payload: {qid: string, uid: string}}, {call, put}) {
            console.log("sq/question: "+payload);
            const msg = payload.payload;
            const response = yield call(tssFetch, '/testsysstudent/getquestion', 'POST', msg);
            console.log("sq/question response: "+response);
            if (response.status === 400) {
                message.error('更新失败');
                return;
            }
            //?datasource
            const jsonBody = yield call(response.text.bind(response));
            const body = JSON.parse(jsonBody);
            yield put({
                type: 'updateQuestionList',
                payload: {questions: body.questions}
            });
            return;
        },

        * submit(payload: {payload: {myAns: any[], uid: string}}, {call, put}) {
            console.log("sq/submit: "+payload);
            const msg = payload.payload;
            const response = yield call(tssFetch, '/testsysstudent/submit', 'POST', msg);
            console.log("sq/question response: "+response);
            if (response.status === 400) {
                message.error('更新失败');
                return;
            }
            return;
        }
    }

};

export default model;