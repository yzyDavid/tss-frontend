import {httpMethod, tssFetch} from '../utils/tssFetch';
import {message} from 'antd';
import {CourseFormData,CourseInfo} from '../components/ManualScheduling';
import {Router, Route, Switch, routerRedux, browserHistory} from 'dva/router';
import {log} from "util";

const model = {
    namespace: 'courseinfo',
    state: {
        dataSource: [
            {key: 1, classId :'',courseName:'', courseId:'',  numLessonsLeft:'',  courseAddress:'',  courseTime:''},
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
                    dispatch({ type: 'courseInfo', payload: {key: 1, campus: '', courseName: ''} });
                }
            });
        }
    },
    effects: {
        * courseInfo(payload: { payload: CourseFormData}, {call, put}) {
            //console.log((!payload.payload.campus));
            //console.log(payload.payload);
            if((!payload.payload.campus)||(!payload.payload.courseName))
                yield put({
                    type: 'updateCourseInfo',
                    payload: {dataSource:[
                            {key: 1, classId :'',courseName:'', courseId:'',  numLessonsLeft:'',  courseAddress:'',  courseTime:''},]}});
            else
            {
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
                            {key: 1, classId :'12301',courseName:" Data Struct", courseId:'20011',  numLessonsLeft:'3',  courseAddress:'东教学楼01',  courseTime:'mon_1_2'},
                            {key: 2, classId :'22301',courseName: "Data Struct2", courseId:'22011',  numLessonsLeft:'4',  courseAddress:'东教学楼02',  courseTime:'mon_2_2'},
                        ]}
                });
            }
            return;
        },

       * modifyCourseInfo(payload: { payload: CourseInfo}, {call, put})
       {
           const value = payload.payload.classId;
           //console.log(payload.payload);
           //fetch the data of the case and add to the query
           yield put(routerRedux.push({pathname:'/manualSchModify/'+value,query: payload.payload.classId,}));
           return;
       },
    }
};

export default model;
