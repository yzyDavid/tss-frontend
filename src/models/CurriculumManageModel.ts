import {httpMethod, tssFetch} from '../utils/tssFetch';
import {message} from 'antd';
import {CurriculumData,ClassroomFormData} from '../components/CurriculumManage';
import {Router, Route, Switch, routerRedux, browserHistory} from 'dva/router';

const model = {
    namespace: 'curriculummanage',
    state: {
        dataSource: [
            {key: 1, courseNumber: '1', courseName: '1', semester: '', campus: '', courseTime: '', courseAddress: ''},
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
                    dispatch({ type: 'curriculumManage', payload: {campus: ''} });
                }
            });
        }
    },
    effects: {
        * curriculumManage(payload: { payload: ClassroomFormData }, {call, put})  {
            console.log(payload.payload);
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
                        {key: 1, courseNumber: '00011', courseName: '线性代数', semester: '春夏', courseTime: '周一第1~2节'},
                        {key: 2, courseNumber: '00022', courseName: '大学物理', semester: '春夏', courseTime: '周一第3~4节',}
                    ]}
            });
            return;
        },

        * getBuilding(payload: { payload: ClassroomFormData }, {call, put})  {
            //console.log('this is the getBuilding');
            console.log(payload.payload);
            const msg = payload.payload;
            if(payload.payload.campus === "紫金港校区")
                yield put({
                    type: 'updateBuildingData',
                    //payload: {data:body.data}
                    payload: { buildingData:['东一','东二']}
                });
            else
                yield put({
                    type: 'updateBuildingData',
                    //payload: {data:body.data}
                    payload: { buildingData:['教一','教二']}
                });
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
            return;
        },

        * getClassroom(payload: { payload: ClassroomFormData }, {call, put})  {
            //console.log('this is the getClassroom');
            console.log(payload.payload);
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
            if(payload.payload.building === "东一")
                yield put({
                    type: 'updateClassroomData',
                    //payload: {data:body.data}
                    payload: { classroomData:['202','203']}
                });
            else
                yield put({
                    type: 'updateClassroomData',
                    //payload: {data:body.data}
                    payload: { classroomData:['512','516']}
                });
            return;
        },
    }
};

export default model;
