import {stringify} from "querystring";
import {loadSession, saveSession} from "../utils/localStorage";
import {routerRedux} from "dva/router";
import {tssFetch} from "../utils/tssFetch";
import {message} from "antd";
import GlobalState from "../types/globalState";
import {platform} from "os";
import {parseTwoDigitYear} from "moment";

const model = {
    namespace: 'testsys_student',
    state: {
        uid: "",
        pid: -1,
        pids: [],
        papers: [
            // {
            //     pid:"1",
            //     pstatus: true,
            //     pscore: "90",
            //     ptime: "Monday 9:00-9:15",
            //     plength: "1:30:00",
            // },
            // {
            //     pid:"2",
            //     pstatus: false,
            //     pscore: 0,
            //     ptime: "Sunday 14:00-9:15",
            //     plength: "2:00:00",
            // },
            {
                pid: "1",
                begin: "9:00",
                end: "9:15",
                last: "1:30:00",
                count: "5",
                papername: "Chapter 1 Quiz",
            },
            {
                pid: "2",
                begin: "14:00",
                end: "14:15",
                last: "2:00:00",
                count: "6",
                papername: "Chapter 2 Quiz",
            },
        ],
        qids: [],
        startTime: "",
        questions: {
            j_questions: [
            {
                qid: "1",
                question: "Is monkey an animal?",
                qtype: "1",
                // qanswer: "yes",
                qmyanswer: "",
                qunit: "1",
            },
            {
                qid: "4",
                question: "Is apple an animal?",
                qtype: "1",
                // qanswer: "no",
                qmyanswer: "",
                qunit: "2",
            },
            ],
            s_questions: [
            {
                qid: "5",
                question: "Which is an animal?\nA.monkey B.apple",
                qtype: "2",
                // qanswer: "A",
                qmyanswer: "",
                qunit: "2",
            },
            ],
            f_questions: [
            {
                qid: "6",
                question: "What is an apple?",
                qtype: "3",
                // qanswer: "fruit",
                qmyanswer: "",
                qunit: "2",
            },
            ],
        },
        scores: [
            {
                pid:"1",
                score: "80",
                date: "2018-05-01 9:00",
            },
            {
                pid:"3",
                score: "95",
                date: "2018-05-01 14:30",
            },
        ],
        // score_pids: [
        //     "1",
        //     "3",
        // ],
        // score_scores: [
        //     "80",
        //     "95"
        // ],
        // score_dates: [
        //     "2018-05-01 9:00",
        //     "2018-05-02 14:30",
        // ]
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
        // updateQidList(st, payload) {
        //     return {...st, ...payload.payload};
        // },
        // updateQuestionList(st, payload) {
        //     return {...st, ...payload.payload};
        // },
        updateQuestionsList(st, payload) {
            return {...st, ...payload.payload}
        },
        updatePaperList(st, payload) {
            return {...st, ...payload.payload};
        },
        updateScoreList(st, payload) {
            return {...st, ...payload.payload};
        },
    },

    effects: {
        * jump(payload: {payload: {direction: string}}, {call, put}) {
            const direction = payload.payload.direction;
            console.log('jump_testsysstudent');
            switch(direction){
                case "student_paper":
                    const response = yield call(tssFetch, '/testsys_student/getpaperlist', 'POST', {});
                    console.log("student/paper response: "+response);
                    if (response.status === 400) {
                        message.error('无法读取试卷列表');
                        return;
                    }
                    //?datasource
                    const jsonBody = yield call(response.text.bind(response));
                    const body = JSON.parse(jsonBody);
                    yield put({
                        type: 'updatePaperList',
                        payload: {papers: body.paperlist}
                    });
                    yield put(routerRedux.push('/testsys_student_paper'));
                    return;
                    // break;
                case "student_score":

                    const values = {
                        type: 0,
                        sid: null,
                        pid: "233",
                        qtype: null,
                        qunit: null,
                    };
                    console.log("dispatch:"+values);
                    const response1 = yield call(tssFetch, '/testsys_result/search', 'POST', values);
                    console.log("student/score response: "+response1);
                    if (response1.status === 400) {
                        message.error('无法读取学生成绩');
                        return;
                    }
                    //?datasource
                    const jsonBody1 = yield call(response1.text.bind(response1));
                    const body1 = JSON.parse(jsonBody1);
                    let scores: any[] = [];
                    for(let i in body1.pid) {
                        scores.push({
                            pid: body1.pid[i],
                            score: body1.score[i],
                            date: body1.date[i]
                        });
                    }
                    yield put({
                        type: 'updateScoreList',
                        // payload: {score_pids: body1.pid, score_scores: body1.score, score_dates: body1.date}
                        payload: {scores: scores}
                    });

                    yield put(routerRedux.push('/testsys_student_score'));
                    return;
                    // break;
            }
            return;
        },

        * getpaper(payload: {payload: {pid: string, uid: string}}, {call, put}) {
            const msg = {pid: payload.payload.pid};
            console.log("sp/paper: "+msg);
            const response = yield call(tssFetch, '/testsys_student/getpaper', 'POST', msg);
            console.log("sq/paper response: "+response);
            if (response.status === 400) {
                message.error('更新失败');
                return;
            }
            //?datasource
            const jsonBody = yield call(response.text.bind(response));
            const body = JSON.parse(jsonBody);
            yield put({
                type: 'updatePaperList',
                payload: {papers: body.papers}
            });
            return;
        },

        * getquestions(payload: {payload: {pid: string, uid: string}}, {call, put}) {
            // const msg = payload.payload;
            const msg = {pid: payload.payload.pid};
            console.log("sp/paper: "+payload);
            const response = yield call(tssFetch, '/testsys_student/getquestions', 'POST', msg);
            console.log("sq/paper response: "+response);
            if (response.status === 400) {
                message.error('已参加过该考试！');
                return;
            }
            //?datasource
            const jsonBody = yield call(response.text.bind(response));
            const body = JSON.parse(jsonBody);
            let j_questions: any[] = [];
            let s_questions: any[] = [];
            let f_questions: any[] = [];
            for(let entry of body.questioninfo) {
                switch(entry.qtype) {
                    case '1':
                        j_questions.push(entry);
                        break;
                    case '2':
                        s_questions.push(entry);
                        break;
                    case '3':
                        f_questions.push(entry);
                        break;
                }
            }
            yield put({
                type: 'updateQuestionsList',
                payload: {pid: body.pid, startTime: body.starttime, questions: {j_questions, s_questions, f_questions}}
            });
            yield put(routerRedux.push('/testsys_student_question_review'));
            return;
        },

        // * getquestion(payload: {payload: {qid: string, uid: string}}, {call, put}) {
        //     console.log("sq/question: "+payload);
        //     const msg = {direction: "qid", info: payload.payload.qid};
        //     const response = yield call(tssFetch, '/testsys_student/getquestion', 'POST', msg);
        //     console.log("sq/question response: "+response);
        //     if (response.status === 400) {
        //         message.error('更新失败');
        //         return;
        //     }
        //     //?datasource
        //     const jsonBody = yield call(response.text.bind(response));
        //     const body = JSON.parse(jsonBody);
        //     yield put({
        //         type: 'updateQuestionList',
        //         payload: {questions: body.questions}
        //     });
        //     return;
        // },

        * save(payload: {payload: {ans: string[], qid: string[], pid: string}}, {call, put}) {
            console.log("sq/save: "+payload.payload);
            const msg = payload.payload;
            const response = yield call(tssFetch, '/testsys_student/save', 'POST', msg);
            console.log("sq/question response: "+response);
            if (response.status === 400) {
                message.error('无法保存试卷');
                return;
            }
            message.success('保存成功');
            return;
        },

        * submit(payload: {payload: {pid: string}}, {call, put}) {
            console.log("sq/submit: "+payload.payload);
            const msg = {pid:payload.payload.pid};
            const response = yield call(tssFetch, '/testsys_student/submit', 'POST', msg);
            console.log("sq/question response: "+response);
            if (response.status === 400) {
                message.error('无法提交试卷');
                return;
            }
            message.success('提交成功');
            yield put(routerRedux.push('/testsys_student_paper'));
            return;
        }
    },
    subscriptions: {}

};


export default model;