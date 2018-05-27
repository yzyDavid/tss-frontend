import {httpMethod, tssFetch} from '../utils/tssFetch';
import {message} from 'antd';
import {FreeClassroomFormData} from '../components/ManualSchModify';

const model = {
    namespace: 'freeclassroominfo',
    state: {
        dataSource: [
            {key: 1, classroomAddress: '', classroomTime: '', classroomCapacity: ''},
            ],
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
                    dispatch({ type: 'freeClassroomInfo', payload: {classroomAddress: '', classroomTime: '', classroomCapacity: ''} });
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
                        {key: 1, classroomAddress: '东一102', classroomTime: '周一第3~5节', classroomCapacity: '100'},
                        {key: 2, classroomAddress: '东二202', classroomTime: '周一第7~8节', classroomCapacity: '50'},
                        {key: 3, classroomAddress: '东三202', classroomTime: '周一第8~9节', classroomCapacity: '60'},
                    ]}
            });
            return;
        },
    }
};

export default model;
