import {message} from 'antd';
import {routerRedux} from 'dva/router';
import GlobalState from '../types/globalState';
import {loadSession, saveSession} from '../utils/localStorage';
import {QuestionFormData, WrappedQuestionInsertForm} from '../components/TestsysTeacherQuestionInsertForm';
import {tssFetch} from '../utils/tssFetch';

const state: GlobalState = {
    token: '',
    uid: '',
    username: ''
};

const model = {
    namespace: 'teacherquestion',
    state: {
        ...state,
        level: 'manager',
        questions :[{
            qid: '10',
            question: 'Is monkey an animal?',
            qanswer: 'yes',
            qtype: '1',         //1judge
            qunit: '1',
        }, {
            qid: '12',
            question: 'Is apple an animal?',
            qanswer: 'no',
            qtype: '1',
            qunit: '1',
        },{
            qid: '13',
            question: 'Is the sun rising from east?',
            qanswer: 'yes',
            qtype: '1',
            qunit: '2',
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
        },

        updateSearchInfo(st, payload) {
            return {...st, ...payload.payload};
        },
    },
    effects: {
        * jump(payload: {payload: {direction: string}}, {call, put}) {
            const direction = payload.payload.direction;
            console.log('jump');
            switch(direction){
                case "Insert": yield put(routerRedux.push('/testsys_teacher_question_insert')); break;
                case "Search": yield put(routerRedux.push('/testsys_teacher_question_search')); break;
            }
            return;

        },

        * insert(payload: { payload: QuestionFormData }, {call, put}) {
             console.log(payload);
            const msg = payload.payload;
            const response = yield call(tssFetch, '/testsys_question/insert', 'POST', msg);
            console.log(response);
            if (response.status === 400) {
                message.error('插入失败');
                return;
            };
            message.success('插入成功');
            return;
        },

        * delete(payload: { payload: {qid:string} }, {call, put}) {     //删除问题
            console.log(payload);
            const msg = payload.payload;
            const response = yield call(tssFetch, '/testsys_question/delete', 'POST', msg);
            console.log(response);
            if (response.status === 400) {
                message.error('删除失败');
                return;
            };
            message.success('删除成功');
            return;
        },

        * search(payload: { payload: {direction: string, info: string}}, {call, put}) {
             console.log(payload);
            const msg = payload.payload;
            const response = yield call(tssFetch, '/testsys_question/search', 'POST', msg);
            console.log("search question response:"+response);
            if (response.status === 400) {
                message.error('查询失败');
                return;
            };
            //?datasource
            const jsonBody = yield call(response.text.bind(response));
            const body = JSON.parse(jsonBody);
            yield put({
                type: 'updateSearchInfo',
                payload: {questions: body.questions}
            });

            return;
        },

        * update(payload: { payload: QuestionFormData }, {call, put}) {
            console.log(payload);
            const msg = payload.payload;
            const response = yield call(tssFetch, '/testsys_question/update', 'POST', msg);
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
