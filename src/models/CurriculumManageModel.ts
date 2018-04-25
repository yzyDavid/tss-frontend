import {httpMethod, tssFetch} from '../utils/tssFetch';
import {message} from 'antd';
import {CurriculumData,ClassroomFormData} from '../components/CurriculumManage';
import {Router, Route, Switch, routerRedux, browserHistory} from 'dva/router';

const model = {
    namespace: 'curriculummanage',
    state: {
        dataSource: [
            {key: 1, courseNumber: '', courseName: '', semester: '', campus: '', courseTime: '', courseAddress: ''},
            ],
        buildingData: ['',],
        classroomData: ['',],
    },
    reducers: {
        updateCurriculumManageInfo(st, payload) {
            return {...st, ...payload.payload};
        },
        updateBuildingData(st, payload) {
            return {...st, ...payload.payload};
        },
        updateClassroomData(st, payload) {
            return {...st, ...payload.payload};
        },
    },
    subscriptions: {
        setup({dispatch, history}) {
            return history.listen(({pathname}) => {
                if (pathname === '/curriculumManage') {
                    dispatch({ type: 'curriculumManage', payload: {teacherId: ''} });
                }
            });
        }
    },
    effects: {
        * curriculumManage(payload: { payload: {teacherId: string} }, {call, put})  {
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
                type: 'updateCurriculumManageInfo',
                //payload: {data:body.data}
                payload: {dataSource:[
                        {key: 1, courseNumber: '00011', courseName: '线性代数', semester: '春夏', courseTime: '周一第一二节'},
                        {key: 2, courseNumber: '00022', courseName: '线性代数', semester: '春夏', courseTime: '周一第一二节',}
                    ]}
            });
            return;
        },

        * getBuilding(payload: { payload: ClassroomFormData }, {call, put})  {
            //console.log('this is the getBuilding');
            //console.log(payload.payload);
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
                type: 'updateBuildingData',
                //payload: {data:body.data}
                payload: { buildingData:['building1','building2']}
            });
            return;
        },

        * getClassroom(payload: { payload: ClassroomFormData }, {call, put})  {
            //console.log('this is the getClassroom');
            //console.log(payload.payload);
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
                type: 'updateClassroomData',
                //payload: {data:body.data}
                payload: { classroomData:['202','203']}
            });
            return;
        },
    }
};

export default model;
