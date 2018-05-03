import {message} from 'antd';
import {routerRedux} from 'dva/router';
import GlobalState from '../types/globalState';
import {loadSession, saveSession} from '../utils/localStorage';
import {PaperFormData, WrappedPaperInsertForm} from '../components/TestsysTeacherPaperInsertForm';
import {tssFetch} from '../utils/tssFetch';
import {QuestionFormData} from "../components/TestsysTeacherQuestionInsertForm";


const model = {
    namespace: 'teacherpaper',
    state: {

        uid: '3152222222',
        level: 'manager',

        pid_t: '1',
        papername_t:'hello',
        begin_t: '2018-04-30 16:30:00',
        end_t: '2018-04-30 16:30:00',
        count_t: '2',
        isauto_t: false,
        qid_t: ['0', '0'],
        score_t: ['10', '20'],

        paperlist:[{
            pid: '1',
            papername:'hello',
            begin: '2018-04-30 16:30:00',
            end: '2018-04-30 16:30:00',
            count: '2',
            isauto: false,
            qid: ['1', '2'],
            score: ['10', '20'],
        }, {
            pid: '2',
            papername:'hello2',
            begin: '2018-05-30 16:30:00',
            end: '2018-05-30 16:30:00',
            count: '2',
            isauto: false,
            qid: ['3', '4'],
            score: ['10', '20'],
        },{
            pid: '3',
            papername:'hello3',
            begin: '2018-06-30 16:30:00',
            end: '2018-06-30 16:30:00',
            count: '2',
            isauto: false,
            qid: ['5', '6'],
            score: ['10', '20'],
        }]
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
        }
    },
    effects: {
        * jump(payload: {payload: {direction: string}}, {call, put}) {
            const direction = payload.payload.direction;
            console.log('jump');
            switch(direction){
                case "Insert": yield put(routerRedux.push('/testsys_teacher_paper_insert')); break;
                case "Search": yield put(routerRedux.push('/testsys_teacher_paper_search')); break;
            }
            return;

            },



        * insert(payload: { payload: PaperFormData }, {call, put}) {
            // console.log(payload);
            const msg = payload.payload;
            const response = yield call(tssFetch, '/testsys_paper/insert', 'POST', msg);
            console.log(response);
            if (response.status === 400) {
                message.error('插入失败');
                return;
            };
            message.success('插入成功');
            return;
        },

        * delete(payload: { payload: {pid:string} }, {call, put}) { //删除卷子
            // console.log(payload);
            const msg = payload.payload;
            const response = yield call(tssFetch, '/testsys_paper/delete', 'POST', msg);
            console.log(response);
            if (response.status === 400) {
                message.error('删除失败');
                return;
            };
            message.success('删除成功');
            return;
        },


        * search(payload: { }, {call, put}) {
            // console.log(payload);

            const response = yield call(tssFetch, '/testsys_paper/search', 'POST');
            console.log("search paper response"+response);
            if (response.status === 400) {
                message.error('查询失败');
                return;
            };
            //?datasource

            return;
        },



        * update(payload: { payload: PaperFormData }, {call, put}) {
            // console.log(payload);
            const msg = payload.payload;
            const response = yield call(tssFetch, '/testsys_paper/update', 'POST', msg);
            console.log(response);
            if (response.status === 400) {
                message.error('更新失败');
                return;
            };


            //回馈？

            return;
        },

    },
    subscriptions: {}
};

export default model;
