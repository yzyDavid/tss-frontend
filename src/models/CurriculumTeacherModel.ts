import {httpMethod, tssFetch} from '../utils/tssFetch';
import {message} from 'antd';
import {CurriculumData} from '../components/CurriculumManage';
import {Router, Route, Switch, routerRedux, browserHistory} from 'dva/router';

const model = {
    namespace: 'curriculumteacher',
    state: {
        dataSource: [
            {key: 1, courseNumber: '', courseName: '', semester: '', campus: '', courseTime: '', courseAddress: ''},
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
            });
        }
    },
    effects: {
        * curriculumTeacher(payload: { payload: {teacherId: string} }, {call, put})  {
            const msg = payload.payload;
            // //const tssFetch = (url: string, method: httpMethod, payload: string | object)
            // //返回一个js对象
            //const response = yield call(tssFetch, '/classroom/info', 'GET', msg);
           // if(response.status === 400) {
            //    message.error('查询空闲教室信息失败');
            //    return;
            //}
           // const jsonBody = yield call(response.text.bind(response));
            //将字符串转换为json对象
            //const body = JSON.parse(jsonBody);
            yield put({
                type: 'updateCurriculumTeacherInfo',
                //payload: {data:body.data}
                payload: {dataSource:[
                        {key: 1, courseNumber: '00011', courseName: '线性代数', semester: '春夏', campus: '紫金港校区', courseTime: '周一第一二节', courseAddress: '东一102'},
                        {key: 2, courseNumber: '00022', courseName: '线性代数', semester: '春夏', campus: '紫金港校区', courseTime: '周一第一二节', courseAddress: '东一102'}
                    ]}
            });
            return;
        },
    }
};

export default model;
