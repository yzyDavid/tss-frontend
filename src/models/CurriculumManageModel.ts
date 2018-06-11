import {httpMethod, tssFetch} from '../utils/tssFetch';
import {message} from 'antd';
import {CurriculumData,ClassroomFormData} from '../components/CurriculumManage';
import {Router, Route, Switch, routerRedux, browserHistory} from 'dva/router';

var myMap = new Map();
myMap.set('MON','周一');
myMap.set('TUE','周二');
myMap.set('WED','周三');
myMap.set('THU','周四');
myMap.set('FRI','周五');
myMap.set('SAT','周六');
myMap.set('SUN','周日');

myMap.set('1_2','第1~2节');
myMap.set('3_5','第3~5节');
myMap.set('6_8','第6~8节');
myMap.set('9_10','第9~10节');
myMap.set('11_13','第11~13节');

const model = {
    namespace: 'curriculummanage',
    state: {
        dataSource: [
            {id: 1, classId: '', courseName: '', typeName: ''},
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
            console.log(payload.payload);
            if(payload.payload.campusId<0)
            {
                yield put({
                    type: 'updateCurriculumManageInfo',
                    //payload: {data:body.data}
                    payload: {dataSource:[
                            {id: 1, classId: '', courseName: '', typeName: ''},]}
                });
            }
            else
            {
                const response = yield call(tssFetch, '/classrooms/'+payload.payload.classroomId+'/time-slots', 'GET');
                if (response.status === 400) {
                    message.error('获取教室课表失败');
                    return;
                }
                const jsonBody = yield call(response.text.bind(response));
                const body = JSON.parse(jsonBody);
                console.log(body);
                for(let i=0;i<body.length;i++)
                {
                    var temp= body[i].typeName;
                    body[i].typeName=myMap.get(temp.substring(0,3))+myMap.get(temp.substring(4));
                }
                yield put({
                    type: 'updateCurriculumManageInfo',
                    payload: { dataSource: body }
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
            //console.log(payload.payload);
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
