import {routerRedux} from 'dva/router';

const model = {
    namespace: 'navigation',
    state: {
    },
    reducers: {
        updateUserInfo(st, payload) {
            return {...st, ...payload.payload};
        }
    },
    effects: {
        * jump(payload: {payload: {direction: string}}, {call, put}) {
            const direction = payload.payload.direction;
            switch(direction){
                case "user": yield put(routerRedux.push('/user')); break;
                case "selection": yield put(routerRedux.push('/selection')); break;
                case "autoScheduling": yield put(routerRedux.push('/autoScheduling')); break;
                case "manualScheduling": yield put(routerRedux.push('/manualScheduling')); break;
                case "manualSchModify": yield put(routerRedux.push('/manualSchModify')); break;
                case "classroomManage": yield put(routerRedux.push('/classroomManage')); break;

            }
            return;
        }
    }
};

export default model;
