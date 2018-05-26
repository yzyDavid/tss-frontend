import {httpMethod, tssFetch} from '../utils/tssFetch';
import {message} from 'antd';
import {CurriculumData} from '../components/CurriculumManage';
import {Router, Route, Switch, routerRedux, browserHistory} from 'dva/router';

const model = {
    namespace: 'curriculumteacher',
    state: {
        dataSource: [
            {key: 1, classId:'asd', courseName: 'aaa', type:'bb', campusName:'cc', buildingName:'ddd', classroomName:'ss'},
            //{key: 1, classId:'', courseName: '', type:'', campusName:'', buildingName:'', classroomName:''}
            ]
    },
    reducers: {
        updateCurriculumTeacherInfo(st, payload) {
            return {...st, ...payload.payload};
        },
    },
    subscriptions: {
        setup({dispatch, history}) {
            return history.listen(({pathname}) => {
                if (pathname === '/curriculumTeacher') {
                    dispatch({ type: 'curriculumTeacher', payload: {teacherId: ''} });
                }
                if (pathname === '/curriculumTeacher') {
                    dispatch({ type: 'showList', payload: {classId: ''} });
                }
            });
        }
    },
    effects: {
        * curriculumTeacher(payload: { payload: {teacherId: string} }, {call, put})  {
             console.log("aa");
            const msg = payload.payload;
            const response = yield call(tssFetch, '/teachers/root/schedule', 'GET');
            //console.log(response);
            if (response.status === 400) {
                message.error('教师信息错误');
                return;
            }
            const jsonBody = yield call(response.text.bind(response));
            const body = JSON.parse(jsonBody);
            console.log(body);
            yield put({
                type: 'updateCurriculumTeacherInfo',
                payload: {dataSource:body}
            });
            return;
        },
        * showList(payload: { payload: {classId: string} }, {call, put})  {
             console.log("!!!");
             console.log(payload.payload)
            // const msg = payload.payload;
            // const response = yield call(tssFetch, '/teachers/root/schedule', 'GET');
            // //console.log(response);
            // if (response.status === 400) {
            //     message.error('教师信息错误');
            //     return;
            // }
            // const jsonBody = yield call(response.text.bind(response));
            // const body = JSON.parse(jsonBody);
            // console.log(body);
            // yield put({
            //     type: 'updateCurriculumTeacherInfo',
            //     payload: {dataSource:body}
            // });
            return;
        },
    }
};

export default model;
