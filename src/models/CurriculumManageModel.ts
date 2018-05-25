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
        buildingData: [{key:1, id: -1 , name:'',},],
        classroomData: [{key:1, id: -1 , name:'',},],
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
                    dispatch({ type: 'curriculumManage', payload: {campusId: -1} });
                }
            });
        }
    },
    effects: {
        * curriculumManage(payload: { payload: ClassroomFormData }, {call, put})  {
            //console.log(payload.payload);
            if(payload.payload.campusId<0)
            {
                yield put({
                    type: 'updateCurriculumManageInfo',
                    //payload: {data:body.data}
                    payload: {dataSource:[
                            {key: 1, courseNumber: '1', courseName: '1', semester: '', campus: '', courseTime: '', courseAddress: ''},]}
                });
            }
            else
            {
                const response = yield call(tssFetch, '/classrooms/'+1+'/time-slots', 'GET');
                if (response.status === 400) {
                    message.error('无该校区');
                    return;
                }
                const jsonBody = yield call(response.text.bind(response));
                const body = JSON.parse(jsonBody);
                console.log(body);

                yield put({
                    type: 'updateCurriculumManageInfo',
                    payload: { dataSource: body }
                    // payload: {dataSource:[
                    //         {key: 1, courseNumber: '00011', courseName: '线性代数', semester: '春夏', courseTime: '周一第1~2节'},
                    //         {key: 2, courseNumber: '00022', courseName: '大学物理', semester: '春夏', courseTime: '周一第3~4节',}
                    //     ]}
                });
            }
            return;
        },

        * getBuilding(payload: { payload: ClassroomFormData }, {call, put})  {
            //console.log('this is the getBuilding');
            //console.log(payload.payload);
            const response = yield call(tssFetch, '/campuses/'+payload.payload.campusId+'/buildings', 'GET');
            if (response.status === 400) {
                message.error('无该校区');
                return;
            }
            const jsonBody = yield call(response.text.bind(response));
            const body = JSON.parse(jsonBody);
            let buildings = [{key:1, id: -1 , name:''},];
            buildings.pop();
            for(let i = 0; i<body.length;i++)
            {
                buildings.push({key: i+1, id: body[i].id , name: body[i].name});
            }
            yield put({
                type: 'updateBuildingData',
                payload: { buildingData:buildings}
            });
            return;
        },

        * getClassroom(payload: { payload: ClassroomFormData }, {call, put})  {
            console.log(payload.payload);
            const response = yield call(tssFetch, '/buildings/'+payload.payload.buildingId+'/classrooms', 'GET');
            if (response.status === 400) {
                message.error('无该建筑物');
                return;
            }
            const jsonBody = yield call(response.text.bind(response));
            const body = JSON.parse(jsonBody);
            //console.log(body);
            let classrooms = [{key:1, id: -1 , name:''},];
            if(body.length>0)
            {
                classrooms.pop();
                for(let i = 0; i<body.length;i++)
                {
                    classrooms.push({key: i+1, id: body[i].id , name: body[i].name});
                }
            }
            yield put({
                type: 'updateClassroomData',
                payload: { classroomData:classrooms}
            });

            return;
        },
    }
};

export default model;
