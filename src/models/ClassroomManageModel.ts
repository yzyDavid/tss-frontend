/*
* this model is related to the ClassroomManagePage
* * */
import {tssFetch} from '../utils/tssFetch';
import {message} from 'antd';
import {browserHistory} from 'dva/router';

const model = {
    namespace:'classroommanage',
    state:{
        dataSource: [{key: -1, campus: '', building: '', room: '', capacity: '', x: ''}],
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
            //console.log("in fetchClassroomInfo");
            let dataCollection=[{key:-1,campus:'',building:'',room:'',capacity:0}];
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
            //const campusCount = campusBody.length; // record the total number of campus
            // fetch buildings
            //console.log("total campuses:",campusBody.length);
            for(let i=0;i<campusBody.length;i++){
                let campusId=campusBody[i].id;
                //console.log("campus id:",campusId);
                let buildingResponse = yield call(tssFetch,`/campuses/${campusId}/buildings`,'GET',msg);
                let buildingJsonBody = yield call(buildingResponse.text.bind(buildingResponse));
                let buildingBody = JSON.parse(buildingJsonBody);
                for(let j=0;j<buildingBody.length;j++){
                    //console.log("campus id:",campusId);
                    let buildingId=buildingBody[j].id;
                    //console.log("building id:",buildingId);
                    let classroomResponse = yield call(tssFetch,`/buildings/${buildingId}/classrooms`,'GET',msg);
                    let classroomJsonBody = yield call(classroomResponse.text.bind(classroomResponse));
                    let classroomBody = JSON.parse(classroomJsonBody);
                    //console.log(classroomBody);
                    for(let k=0;k<classroomBody.length;k++){

                        let combined={
                            // 为方便删除id应该是教室id
                            key:classroomBody[k].id,//this is the key property
                            campus:campusBody[i].name,
                            building:buildingBody[j].name,
                            room:classroomBody[k].name,
                            capacity:classroomBody[k].capacity
                        }
                        dataCollection[tot++]=combined;
                    }
                }
            }
            yield put({
                type: 'updateClassroomInfo',
                payload:{
                    dataSource:dataCollection
                }
            });
            return;
        },

        *fetchSpecific(payload:{payload:string},{call,put}){
            const msg = payload.payload;
            // console.log("in fetchSpecific:",msg);
            let englishName="";
            if(msg === "紫金港"){
                englishName = "zijingang";
            } else if(msg === "玉泉"){
                englishName = "yuquan";
            } else if(msg === "西溪"){
                englishName = "xixi";
            } else if(msg === "华家池"){
                englishName = "huajiachi";
            } else if(msg === "舟山"){
                englishName = "zhoushan";
            } else if(msg === "海宁"){
                englishName = "haining"
            } else if(msg === "之江"){
                englishName = "zhijiang"
            } else{
                englishName = "hehe";
            }
            let dataCollection=[{key:1,campus:'',building:'',room:'',capacity:0}];
            let tot=0;
            // fetch campus
            const campusResponse = yield call(tssFetch,'/campuses','GET',msg);
            const campusJsonBody = yield call(campusResponse.text.bind(campusResponse));
            const campusBody = JSON.parse(campusJsonBody); // convert the string to json object
            //const campusCount = campusBody.length; // record the total number of campus
            let idToQuery=NaN;
            for(let i=0;i<campusBody.length;i++){
                if(campusBody[i].name===englishName){
                    idToQuery = campusBody[i].id;
                }
            }
            //console.log(idToQuery);
            let buildingResponse = yield call(tssFetch, `/campuses/${idToQuery}/buildings`, 'GET', msg);
            let buildingJsonBody = yield call(buildingResponse.text.bind(buildingResponse));
            let buildingBody = JSON.parse(buildingJsonBody);
            let buildingCount = buildingBody.length;

            for(let i=0;i<buildingCount;i++){
                let buildingId = buildingBody[i].id;
                let classroomResponse = yield call(tssFetch,`/buildings/${buildingId}/classrooms`,'GET',msg);
                let classroomJsonBody = yield call(classroomResponse.text.bind(classroomResponse));
                let classroomBody = JSON.parse(classroomJsonBody);
                for(let j=0;j<classroomBody.length;j++){
                    let combined={
                        key:classroomBody[j].id,//this is the key property
                        campus:englishName,
                        building:buildingBody[i].name,
                        room:classroomBody[j].name,
                        capacity:classroomBody[j].capacity
                    }
                    dataCollection[tot++]=combined;
                    //console.log(combined);
                }
            }
            yield put({
                type: 'updateClassroomInfo',
                payload:{
                    dataSource:dataCollection
                }
            });
            return;
        },

        *deleteClassroom(payload:{payload: string},{call, put}) {
            //console.log("enter effects: deleteClassroom");
            const classroomId = payload.payload;
            console.log("classroom id:", classroomId);
            let dataSource = null;
            /*
            * in backend, add
            * .allowedHeaders("*")
            * .allowedMethods("*")
            * .allowedOrigins("*");
            * after addMapping("/**")
            * in CorsConfiguration
            * */
            const deleteClassroomResponse = yield call(tssFetch,`/classrooms/${classroomId}`,'DELETE',classroomId);
            if(deleteClassroomResponse.state===400) {
                message.error('删除请求失败');
            }
            //console.log("delete done");
            yield put({
                type: 'fetchClassroomInfo',
                payload: {
                    campusId:''
                }
            });
            return;
        },

        *createClassroom(payload:{payload:{campus,building,classroom,capacity}},{call, put}){
            const msg=payload.payload;
            console.log("in createClassroom");
            //console.log("received new classroom info:",payload.payload.campus);
            let campusName = payload.payload.campus;
            let buildingName = payload.payload.building;
            let classroomName = payload.payload.classroom;
            let capacity = payload.payload.capacity;
            let campusId = -1;
            let buildingId = -1;
            // 判断校区一不一样的逻辑先不写了，否则代码太丑了...而且那7个校区本来就该存在
            let foundSameCampus = false;
            let foundSameBuilding = false;

            /* boring code */
            if(campusName === "紫金港"){
                campusName = "zijingang";
            } else if(campusName === "玉泉"){
                campusName = "yuquan";
            } else if(campusName === "西溪"){
                campusName = "xixi";
            } else if(campusName === "华家池"){
                campusName = "huajiachi";
            } else if(campusName === "舟山"){
                campusName = "zhoushan";
            } else if(campusName === "海宁"){
                campusName = "haining"
            } else if(campusName === "之江"){
                campusName = "zhijiang"
            } else{
                campusName = "hehe";
            }
            //console.log("important:",campusName);
            //console.log("important:",buildingName);
            //console.log("important:",classroomName);
            //console.log("important:",capacity);
            const campusResponse = yield call(tssFetch,'/campuses','GET',msg);
            const campusJsonBody = yield call(campusResponse.text.bind(campusResponse));
            const campusBody = JSON.parse(campusJsonBody);
            for(let i=0;i<campusBody.length;i++){
                if(campusBody[i].name === campusName){
                    campusId = campusBody[i].id;
                    //foundSameCampus = true;
                }
            }

            //console.log("important:",campusId);
            const buildingResponse = yield call(tssFetch,`/campuses/${campusId}/buildings`,'GET',msg);
            const buildingJsonBody = yield call(buildingResponse.text.bind(buildingResponse));
            const buildingBody = JSON.parse(buildingJsonBody);
            for(let i=0;i<buildingBody.length;i++){
                if(buildingBody[i].name === buildingName){
                    buildingId = buildingBody[i].id;
                    foundSameBuilding = true;
                }
            }
            console.log("foundSameBuilding:",foundSameBuilding);
            if(foundSameBuilding === false){
                let buildingRequestBody = {
                    id:null,
                    name:buildingName
                }
                // create a new building if not found
                yield call(tssFetch,`/campuses/${campusId}/buildings`,'POST',buildingRequestBody);
                console.log("the new building is in campus NO.",campusId);
                let newBuildingResponse = yield call(tssFetch,`/campuses/${campusId}/buildings`,'GET',msg);
                let newBuildingJsonBody = yield call(newBuildingResponse.text.bind(newBuildingResponse));
                let newBuildingBody = JSON.parse(newBuildingJsonBody);
                console.log("the new buildings:",newBuildingBody);
                for(let i=0;i<newBuildingBody.length;i++){
                    if(newBuildingBody[i].name === buildingName){
                        buildingId = newBuildingBody[i].id;
                    }
                }
                //console.log("this building's id:",buildingId);
                let classroomRequestBody={
                    id:null,
                    name:classroomName,
                    capacity:capacity
                }
                yield call(tssFetch,`/buildings/${buildingId}/classrooms`,'POST',classroomRequestBody);
            }
            else {
                let classroomRequestBody={
                    id:null,
                    name:classroomName,
                    capacity:capacity
                }
                yield call(tssFetch,`/buildings/${buildingId}/classrooms`,'POST',classroomRequestBody);
            }
            yield put({
                type: 'fetchClassroomInfo',
                payload: {
                    campusId:''
                }
            });
            //哇。。。这个有槽点，因为这个action是在另外一个页面dispatch的，所以还要跳转回来
            yield put({
                type:'navigation/jump',
                payload: {direction: "classroomManage"}
            })
        },
    },
    subscriptions: {
        setup({ dispatch, history }){
            return history.listen(({ pathname}) => {
                if (pathname === '/classroomManage') {
                    //console.log("enter classroomManage page");
                    dispatch({ type: 'fetchClassroomInfo', payload: {campusId:''} });
                }
            });
        },
    },
};

export default model;