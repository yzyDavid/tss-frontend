import {httpMethod, tssFetch} from '../utils/tssFetch';
import {message} from 'antd';
import {CourseFormData,CourseInfo} from '../components/ManualScheduling';
import {Router, Route, Switch, routerRedux, browserHistory} from 'dva/router';

const model = {
    namespace: 'courseinfo',
    state: {
        dataSource: [
            {key: 1, courseNumber: '00001', courseTitle: '线性代数', courseAddress: '3150100001', courseTime: '16:30-18:30', semester: '秋冬', credit: 2},
            {key: 2, courseNumber: '00002', courseTitle: '微积分', courseAddress: '3150100002', courseTime: '16:30-18:30', semester: '秋', credit: 3},
            ]
    },
    reducers: {
        updateCourseInfo(st, payload) {
            return {...st, ...payload.payload};
        },
    },
    subscriptions: {
        setup({dispatch, history}) {
            return history.listen(({pathname}) => {
                if (pathname === '/manualScheduling') {
                    dispatch({ type: 'courseInfo', payload: {key: 1, courseNumber: '', courseTitle: '', courseAddress: '', courseTime: ''} });
                }
                if (pathname === '/selection') {
                    dispatch({ type: 'courseInfo', payload: {key: 1, courseNumber: '', courseTitle: '', courseAddress: '', courseTime: ''} });
                }
            });
        }
    },
    effects: {
        * courseInfo(payload: { payload: CourseFormData}, {call, put}) {
            //console.log('courseInfo ');
            console.log(payload.payload);
            //const msg = payload.payload;
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
                type: 'updateCourseInfo',
                //payload: {data:body.data}
                payload: {dataSource:[
                        {key: 1, courseNumber: '20102', courseTitle: '数据结构基础', courseAddress: '东一103', courseTime: '16:30-18:30', semester: '春夏', credit: 3},
                        {key: 2, courseNumber: '00022', courseTitle: '微积分', courseAddress: '东二201', courseTime: '16:30-18:30', semester: '夏', credit: 4.5}
                    ]}
            });
            return;
        },

       * modifyCourseInfo(payload: { payload: CourseInfo}, {call, put})
       {
           const value = payload.payload.courseNumber.toString();
           yield put(routerRedux.push({pathname:'/manualSchModify/'+value,query: payload.payload,}));
           return;
       },
    }
};

export default model;
