import {message} from 'antd';
import {routerRedux} from 'dva/router';
import GlobalState from '../types/globalState';
import {loadSession, saveSession} from '../utils/localStorage';

import {tssFetch} from '../utils/tssFetch';

const state: GlobalState = {
    token: '',
    uid: '',
    username: ''
};

const model = {
    namespace: 'testsys',
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
        * jump(payload: {payload: {direction: string}}, {call, put}) {
            const direction = payload.payload.direction;
            console.log('jump_testsys');
            switch(direction){
                case "Teacher": yield put(routerRedux.push('/testsys_teacher')); break;
                case "Student": yield put(routerRedux.push('/testsys_student')); break;
                case "Teacher_question": yield put(routerRedux.push('/testsys_teacher_question')); break;
                case "Teacher_paper": yield put(routerRedux.push('/testsys_teacher_paper')); break;
                case "Teacher_result": yield put(routerRedux.push('/testsys_teacher_result')); break;
                case "student_paper": yield put(routerRedux.push('/testsys_student_paper')); break;
                case "student_score": yield put(routerRedux.push('/testsys_student_score')); break;
            }
            return;

        },



    },
    subscriptions: {}
};

export default model;
