import {httpMethod, tssFetch} from '../utils/tssFetch';
import {message} from 'antd';
import {CurriculumData} from '../components/CurriculumManage';
import {Router, Route, Switch, routerRedux, browserHistory} from 'dva/router';

const model = {
    namespace: 'curriculumteacher',
    state: {
        dataSource: [
            {classId:'asd', courseName: 'aaa', type: "MON_1_2", campusName:'cc', buildingName:'ddd', classroomName:'ss'},
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
                    dispatch({ type: 'curriculumTeacher', payload: {teacherId: '',year: -1, semester: ''} });
                }
                if (pathname === '/curriculumTeacher') {
                    dispatch({ type: 'showList', payload: {classId: ''} });
                }
            });
        }
    },
    effects: {
        * curriculumTeacher(payload: { payload: {teacherId: string, year: number, semester: string} }, {call, put})  {
            console.log(payload.payload);
            // const response = yield call(tssFetch, '/teachers/root/schedule', 'GET');
            // if (response.status === 400) {
            //     message.error('教师信息错误');
            //     return;
            // }
            // const jsonBody = yield call(response.text.bind(response));
            // const body = JSON.parse(jsonBody);
            // yield put({
            //     type: 'updateCurriculumTeacherInfo',
            //     payload: {dataSource:body}
            // });
            return;
        },

        * showList(payload: { payload: {classId: string} }, {call, put})  {
             var value = payload.payload["classId"];
             console.log(value+"daf")
             if(value!='')
             yield put(routerRedux.push({pathname:'/stuList/'+value,query: payload.payload,}));
            return;
        },
    }
};

export default model;
