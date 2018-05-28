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

        qids: [
            "1",
            "2",
            "4",
        ],
        rates: [
            "0.8",
            "1.0",
            "0.92",
        ]
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
            console.log(response);
            if (response.status === 400) {
                message.error('查询失败');
                return;
            }
            //?datasource
            const jsonBody = yield call(response.text.bind(response));
            const body = JSON.parse(jsonBody);
            yield put({
                type: 'updateSearchInfo',
                payload: {qids:body.qid, rates:body.rate}
            });

            return;
        },

    },
    subscriptions: {}
};

export default model;
