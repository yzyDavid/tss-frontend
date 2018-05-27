/*
* this model is related to the ClassroomManagePage
* * */
import {httpMethod, tssFetch} from '../utils/tssFetch';
import {message} from 'antd';
import {Router, Route, Switch, routerRedux, browserHistory} from 'dva/router';
//import ClassroomManagePage from '../components/ClassroomManagePage';

const model = {
    namespace:'classroommanage',
    state:{
        dataSource: [{key: 1, campus: '', building: '', room: '', capacity: '', x: ''}],
    },
    reducers:{
        updateClassroomInfo(curState, payload) {
            return {...curState, ...payload.payload};
        },
    },
    effects:{
        /*
        * the structure of the table
        * Field         Type        NULL    Key
        * id            int11       NO      PRI
        * capacity      int11       NO
        * name          varchar32   NO
        * building_id   int11 NO            MUL
        * */

        *fetchClassroomInfo(payload: { payload: {campusId: string} }, {call, put})  {
            const msg = payload.payload;
            console.log("in fetchClassroomInfo");
            let dataCollection=[{key:1,campus:'',building:'',room:'',capacity:0}];
            let tot=0;
            // fetch campus
            const campusResponse = yield call(tssFetch,'/campuses','GET',msg);
            if(campusResponse.status===400){
                message.error('查询校区失败');
            }
            const campusJsonBody = yield call(campusResponse.text.bind(campusResponse));
            const campusBody = JSON.parse(campusJsonBody); // convert the string to json object
            //console.log(campusBody);
            //console.log(campusBody.length);

            const campusCount = campusBody.length; // record the total number of campus

            // fetch buildings
            for(let campusId=1;campusId<=campusCount;campusId++) {
                let buildingResponse = yield call(tssFetch, `/campuses/${campusId}/buildings`, 'GET', msg);
                let buildingJsonBody = yield call(buildingResponse.text.bind(buildingResponse));
                let buildingBody = JSON.parse(buildingJsonBody);
                //console.log(campusId);
                //console.log(buildingBody);
                let buildingCount = buildingBody.length;
                for(let buildingId=1;buildingId<=buildingCount;buildingId++){
                    let classroomResponse = yield call(tssFetch,`/buildings/${buildingId}/classrooms`,'GET',msg);
                    let classroomJsonBody = yield call(classroomResponse.text.bind(classroomResponse));
                    let classroomBody = JSON.parse(classroomJsonBody);
                    //console.log(classroomBody);
                    for(let classroomId=1;classroomId<=classroomBody.length;classroomId++){
                        let combined={
                            key:(tot+1),//this is the key property
                            campus:campusBody[campusId-1].name,
                            building:buildingBody[buildingId-1].name,
                            room:classroomBody[classroomId-1].name,
                            capacity:classroomBody[classroomId-1].capacity
                        }
                        dataCollection[tot++]=combined;
                        console.log(combined);
                    }
                }
            }
            //console.log(tot);
            yield put({
                type: 'updateClassroomInfo',
                payload:{
                    dataSource:dataCollection
                }
            });
            return;
        },
    },
    subscriptions: {
        setup({ dispatch, history }){
            return history.listen(({ pathname}) => {
                if (pathname === '/classroomManage') {
                    console.log("detected");
                    dispatch({ type: 'fetchClassroomInfo', payload: {campusId:''} });
                }
            });
        },
    },
};

export default model;