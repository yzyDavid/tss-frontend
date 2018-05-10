import {httpMethod, tssFetch} from '../utils/tssFetch';
import {message} from 'antd';
import {FreeClassroomFormData} from '../components/ManualSchModify';
import {CourseInfo} from '../components/ManualScheduling';

const model = {
    namespace: 'freeclassroominfo',
    state: {
        dataSource: [
            {key: 1, classroomAddress: '', classroomTime: '', classroomCapacity: ''},
            ],
        selectedCourseInfo: [
            {key: 1, classroomAddress: '', classroomTime: ''},
            {key: 2, classroomAddress: '', classroomTime: ''},
        ]
    },
    reducers: {
        updateClassroomInfo(st, payload) {
            return {...st, ...payload.payload};
        },
        updateSelectedCourseInfo(st, payload) {
            return {...st, ...payload.payload};
        },
    },
    subscriptions: {
        setup({dispatch, history}) {
            return history.listen(({pathname}) => {
                if (pathname.substring(0,17) === '/manualSchModify/') {
                    dispatch({ type: 'freeClassroomInfo', payload: {key: 1, classroomAddress: '', classroomTime: '', classroomCapacity: ''} });
                    dispatch({ type: 'getSelectedCourseInfo', payload: {courseNumber: '', courseTitle: '', courseAddress: '', courseTime: '' } });
                }
            });
        }
    },
    effects: {
        * freeClassroomInfo(payload: { payload: FreeClassroomFormData }, {call, put}) {
            // console.log('freeClass ');
            // console.log(payload.payload);
            //const msg = payload.payload;
            // // //const tssFetch = (url: string, method: httpMethod, payload: string | object)
            // // //返回一个js对象
            // const response = yield call(tssFetch, '/classroom/info', 'GET', msg);
            // if(response.status === 400) {
            //     message.error('查询空闲教室信息失败');
            //     return;
            // }
            // const jsonBody = yield call(response.text.bind(response));
            // //将字符串转换为json对象
            // const body = JSON.parse(jsonBody);
            yield put({
                type: 'updateClassroomInfo',
                //payload: {data:body.data}
                payload: {dataSource:[
                        {key: 1, classroomAddress: '东一102', classroomTime: '16:30-18:30', classroomCapacity: '100'},
                        {key: 2, classroomAddress: '东二202', classroomTime: '16:30-18:30', classroomCapacity: '50'},
                        {key: 3, classroomAddress: '东三202', classroomTime: '16:30-18:30', classroomCapacity: '60'},
                    ]}
            });
            return;
        },

        * getSelectedCourseInfo(payload: { payload: CourseInfo }, {call, put}) {
            // console.log('selectedCourseInfo ');
            // console.log(payload.payload);
            // const msg = payload.payload;
            // // //const tssFetch = (url: string, method: httpMethod, payload: string | object)
            // // //返回一个js对象
            // const response = yield call(tssFetch, '/classroom/info', 'GET', msg);
            // if(response.status === 400) {
            //     message.error('查询空闲教室信息失败');
            //     return;
            // }
            // const jsonBody = yield call(response.text.bind(response));
            // //将字符串转换为json对象
            // const body = JSON.parse(jsonBody);
            yield put({
                type: 'updateSelectedCourseInfo',
                //payload: {data:body.data}
                payload: { selectedCourseInfo:[
                        {key: 1, classroomAddress: '东一103', classroomTime: '周一第7~8节'},
                        {key: 2, classroomAddress: '东二314', classroomTime: '周三第3~5节'},
                    ]}
            });
            return;
        },
        * deleteCourseInfo1(payload: { payload: CourseInfo }, {call, put}) {
            // console.log('selectedCourseInfo ');
            // console.log(payload.payload);
            // const msg = payload.payload;
            // // //const tssFetch = (url: string, method: httpMethod, payload: string | object)
            // // //返回一个js对象
            // const response = yield call(tssFetch, '/classroom/info', 'GET', msg);
            // if(response.status === 400) {
            //     message.error('查询空闲教室信息失败');
            //     return;
            // }
            // const jsonBody = yield call(response.text.bind(response));
            // //将字符串转换为json对象
            // const body = JSON.parse(jsonBody);
            yield put({
                type: 'updateSelectedCourseInfo',
                //payload: {data:body.data}
                payload: { selectedCourseInfo:[
                        {key: 1, classroomAddress: '2', classroomTime: '2'},
                        {key: 2, classroomAddress: '', classroomTime: ''},
                    ]}
            });
            return;
        },
        * deleteCourseInfo2(payload: { payload: CourseInfo }, {call, put}) {
            // console.log('selectedCourseInfo ');
            // console.log(payload.payload);
            // const msg = payload.payload;
            // // //const tssFetch = (url: string, method: httpMethod, payload: string | object)
            // // //返回一个js对象
            // const response = yield call(tssFetch, '/classroom/info', 'GET', msg);
            // if(response.status === 400) {
            //     message.error('查询空闲教室信息失败');
            //     return;
            // }
            // const jsonBody = yield call(response.text.bind(response));
            // //将字符串转换为json对象
            // const body = JSON.parse(jsonBody);
            yield put({
                type: 'updateSelectedCourseInfo',
                //payload: {data:body.data}
                payload: { selectedCourseInfo:[
                        {key: 1, classroomAddress: '1', classroomTime: '1'},
                        {key: 2, classroomAddress: '', classroomTime: ''},
                    ]}
            });
            return;
        }
    }
};

export default model;
