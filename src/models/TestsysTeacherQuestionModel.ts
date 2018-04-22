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
        * jumpInsert(payload: {payload: {direction: string}}, {call, put}) {
            yield put(routerRedux.push('testsys_teacher_question_insert'));

            return;
        },

        * jumpSearch(payload: {payload: {direction: string}}, {call, put}) {
            yield put(routerRedux.push('testsys_teacher_question_search'));

            return;
        },

        * insert(payload: { payload: QuestionFormData }, {call, put}) {
            // console.log(payload);
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

        * delete(payload: { payload: QuestionFormData }, {call, put}) {
            // console.log(payload);
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

        * search(payload: { payload: QuestionFormData }, {call, put}) {
            // console.log(payload);
            const msg = payload.payload;
            const response = yield call(tssFetch, '/testsys_question/search', 'POST', msg);
            console.log(response);
            if (response.status === 400) {
                message.error('查询失败');
                return;
            };
            //?datasource

            return;
        },

    },
    subscriptions: {}
};

export default model;
