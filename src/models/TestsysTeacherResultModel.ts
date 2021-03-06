import {message} from 'antd';
import {routerRedux} from 'dva/router';
import GlobalState from '../types/globalState';
import {loadSession, saveSession} from '../utils/localStorage';
import {ResultFormData} from '../components/TestsysTeacherResultSidForm';
import {tssFetch} from '../utils/tssFetch';

const state: GlobalState = {
    token: '',
    uid: '',
    username: ''
};

const model = {
    namespace: 'teacherresult',
    state: {
        ...state,
        level: 'manager',

        resultlist:[

        ],

        paperresult:[{
            qid: '10',
            avg: '90'

        }, {
            qid: '11',
            avg: '93'
        },{
            qid: '15',
            avg: '71'
        }],

        // qids: [
        //     "1",
        //     "2",
        //     "4",
        // ],
        // rates: [
        //     "0.8",
        //     "1.0",
        //     "0.92",
        // ],
        presult: [],
        qresult: [/*
            {
                qid: "1",
                rate: "0.8",
            },
            {
                qid: "2",
                rate: "0.94",
            },*/
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
        updateSearchInfo(st, payload) {
            return {...st, ...payload.payload};
        },
    },
    effects: {
        * jump(payload: {payload: {direction: string}}, {call, put}) {
            const direction = payload.payload.direction;
            console.log('jump'+direction);
            switch(direction){
                case "sid": yield put(routerRedux.push('/testsys_teacher_result_sid')); break;
                case "pid": yield put(routerRedux.push('/testsys_teacher_result_pid')); break;
                case "qtype": yield put(routerRedux.push('/testsys_teacher_result_qtype')); break;
                case "qunit": yield put(routerRedux.push('/testsys_teacher_result_qunit')); break;
                default: console.log(direction);
            }
            return;

        },

        //test
        * insert(payload: { payload: ResultFormData }, {call, put}) {
            // console.log(payload);
            const msg = payload.payload;
            const response = yield call(tssFetch, '/testsys_result/insert', 'POST', msg);
            console.log(response);
            if (response.status === 400) {
                message.error('插入失败');
                return;
            };
            message.success('插入成功');
            return;
        },

        //test
        * delete(payload: { payload: ResultFormData }, {call, put}) {
            // console.log(payload);
            const msg = payload.payload;
            const response = yield call(tssFetch, '/testsys_result/delete', 'POST', msg);
            console.log(response);
            if (response.status === 400) {
                message.error('删除失败');
                return;
            };
            message.success('删除成功');
            return;
        },

        * detail(payload: { payload: ResultFormData }, {call, put}) {
            // console.log(payload);
            const msg = payload.payload;
            const response = yield call(tssFetch, '/testsys_result/detail', 'POST', msg);
            console.log(response);
            if (response.status === 400) {
                message.error('查询成功');
                return;
            };
            message.success('查询失败');
            return;
        },

        // * search(payload: { payload: ResultFormData }, {call, put}) {
        //     // console.log(payload);
        //     const msg = payload.payload;
        //     const response = yield call(tssFetch, '/testsys_result/search', 'POST', msg);
        //     console.log(response);
        //     if (response.status === 400) {
        //         message.error('查询失败');
        //         return;
        //     };
        //     //?datasource
        //
        //     return;
        // },
        * search(payload: { payload: {type:number, sid:string, pid:string, qtype:string, qunit:string, } }, {call, put}) {
            console.log(payload);
            const msg = payload.payload;
            const response = yield call(tssFetch, '/testsys_result/search', 'POST', msg);

            if (response.status === 400) {
                message.error('查询失败');
                return;
            }
            //?datasource
            const jsonBody = yield call(response.text.bind(response));
            const body = JSON.parse(jsonBody);
            let presult: any[] = [];
            let qresult: any[] = [];
            console.log(body);

            for(let i in body.pid) {
                presult.push({
                    pid: body.pid[i],
                    score: body.score[i],
                    date: body.date[i]
                });
            }

            for(let i in body.questions) {
                qresult.push({
                    qid: body.questions[i].qid,
                    question:body.questions[i].question,
                    qanswer:body.questions[i].qanswer,
                    qtype:body.questions[i].qtype,
                    qunit:body.questions[i].qunit,
                    rate: (body.questions[i].answerednum==0? 0.0:body.questions[i].correct/body.questions[i].answerednum).toString(),
                });
            }


            yield put({
                type: 'updateSearchInfo',
                payload: {presult: presult, qresult: qresult}
            });

            return;
        },

    },
    subscriptions: {}
};

export default model;
