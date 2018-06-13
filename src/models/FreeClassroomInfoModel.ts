import {httpMethod, tssFetch} from '../utils/tssFetch';
import {message} from 'antd';
import {FreeClassroomFormData} from '../components/ManualSchModify';

const model = {
    namespace: 'freeclassroominfo',
    state: {
        dataSource: [
            {id: '', buildingName: '', name:'', capacity: ''},
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
                    dispatch({ type: 'freeClassroomInfo', payload: '' });
                }
            });
        }
    },

    effects: {
        * freeClassroomInfo(payload: { payload: string }, {call, put}) {
            //console.log(payload.payload);
            if(payload.payload.length >0 )
            {
                yield put({
                    type: 'updateClassroomInfo',
                    //payload: {data:body.data}
                    payload: {dataSource: [{id: '', buildingName: '正在查询', name:'正在查询', capacity: '正在查询'},]}
                });
                const response = yield call(tssFetch, '/time-slots/'+payload.payload+'/empty-classrooms', 'GET');
                if(response.status === 400) {
                    message.error('查询空闲教室信息失败');
                    return;
                }
                const jsonBody = yield call(response.text.bind(response));
                //将字符串转换为json对象
                const body = JSON.parse(jsonBody);
                //console.log(body);
                yield put({
                    type: 'updateClassroomInfo',
                    //payload: {data:body.data}
                    payload: {dataSource: body}
                });
                return;
            }
            else
            {
                yield put({
                    type: 'updateClassroomInfo',
                    //payload: {data:body.data}
                    payload: {dataSource: [{id: '', buildingName: '', name:'', capacity: ''},]}
                });
                return;
            }
        },
    }
};

export default model;
