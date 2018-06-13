import {tssFetch} from '../utils/tssFetch';
import {message} from 'antd';
import {apiBaseUrl} from "../configs/apiBaseUrl";
import {getAuthTokenFromLocalStorage} from '../utils/localStorage';


let totalData= [{key: '1', uid: '1020100001', name:'张老师', dept:'计算机科学与技术学院', type:'教师', gender:'男', year:'2002'},
    {key: '2', uid: '1040100002', name:'王老师', dept:'计算机科学与技术学院', type:'教师', gender:'男', year:'2004'},
    {key: '3', uid: '1040100003', name:'李老师', dept:'计算机科学与技术学院', type:'教师', gender:'女', year:'2004'},
    {key: '4', uid: '1050100004', name:'赵老师', dept:'计算机科学与技术学院', type:'教师', gender:'女', year:'2004'},
    {key: '5', uid: '1060100002', name:'田老师', dept:'计算机科学与技术学院', type:'教师', gender:'女', year:'2004'},
    {key: '6', uid: '1060100004', name:'孙老师', dept:'计算机科学与技术学院', type:'教师', gender:'男', year:'2004'},
    {key: '7', uid: '1070100002', name:'周老师', dept:'计算机科学与技术学院', type:'教师', gender:'男', year:'2004'},
    {key: '8', uid: '1100100001', name:'李老师', dept:'计算机科学与技术学院', type:'教师', gender:'男', year:'2004'},
    {key: '9', uid: '1120100003', name:'郑老师', dept:'计算机科学与技术学院', type:'教师', gender:'男', year:'2004'},
    {key: '10', uid: '1120100010', name:'王老师', dept:'计算机科学与技术学院', type:'教师', gender:'男', year:'2004'},
    {key: '11', uid: '1120100011', name:'田老师', dept:'计算机科学与技术学院', type:'教师', gender:'男', year:'2004'},
    {key: '12', uid: '1120100023', name:'钱老师', dept:'计算机科学与技术学院', type:'教师', gender:'男', year:'2004'},
    {key: '13', uid: '1130100010', name:'黄老师', dept:'计算机科学与技术学院', type:'教师', gender:'男', year:'2004'},
    {key: '14', uid: '1140100001', name:'王老师', dept:'计算机科学与技术学院', type:'教师', gender:'男', year:'2004'},
    {key: '15', uid: '1140100003', name:'王老师', dept:'计算机科学与技术学院', type:'教师', gender:'男', year:'2004'},
    {key: '16', uid: '1160100004', name:'王老师', dept:'计算机科学与技术学院', type:'教师', gender:'男', year:'2004'}
];


const model = {
    namespace: 'userinfo',
    state: {
        data: [],
        uid: '3150104405',
        name: '小天使',
        telephone: '18888888888',
        email: 'email@mail.cn',
        intro: 'This is an introduction.',
        dept: '教务处',
        year: '2015',
        type: '管理员',
        gender: '男',
        majorClass: '教务处',
        show: false,
        photo: null
    },
    reducers: {
        updateUserInfo(st, payload) {
            return {...st, ...payload.payload, show:true};
        },
    },
    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(location => {
                if (location.pathname === '/user') {
                    dispatch({type: 'userInfo', payload: {uid: null}});
                }
            });
        }
    },
    effects: {
        * userInfo(payload: { payload: null }, {call, put}) {
            const msg = payload.payload;
            const response = yield call(tssFetch, '/user/get/own/info', 'POST', msg);
            if(response.status !== 200) {
                message.error('查询个人信息失败');
                return;
            }
            const jsonBody = yield call(response.text.bind(response));
            const body = JSON.parse(jsonBody);
            // message.success(body.status);
            console.log("body", body);
            yield put({
                type: 'updateUserInfo',
                payload: {uid: body.uid, email: body.email, telephone: body.telephone, intro: body.intro, name: body.name, dept: body.department, gender: body.gender, majorClass: body.majorClass, type: body.type}
            });
            return;
        },
        * modify(payload: { payload: {email: null|string, telephone: null|string, intro: null|string} }, {call, put}) {
            const msg = payload.payload;
            const response = yield call(tssFetch, '/user/modify/own/info', 'POST', msg);
            if(response.status === 400) {
                message.error('编辑个人信息失败');
                return;
            }
            yield put({type: 'userInfo', payload: {uid: null}});
            return;
        },
        * resetUser(payload: {payload: {}}, {call, put}){
            yield put({
                type: 'updateUserInfo',
                payload: {uid: "", email: "", telephone: "", intro: "", name: "", dept: "", gender: "", majorClass: "", type: ""}
            });
        },
        * searchUser(payload: {payload:{uid:any, name: any, type: any, dept:any}}, {call, put}){
            console.log("searchUser", payload.payload);
            const msg = payload.payload;
            const response = yield call(tssFetch, '/user/query', 'POST', {uid: msg.uid, name: msg.name, department: msg.dept, type: msg.type});
            // if(response.status === 400) {
            //     message.error('搜索用户失败');
            //     return;
            // }
            const jsonBody = yield call(response.text.bind(response));
            const body = JSON.parse(jsonBody);
            message.success(body.status);
            let tmp:any = [];
            for(let i = 0; i < body.uids.length; i++){
                console.log(body);
                tmp.push({key: (tmp.length+1).toString(), uid: body.uids[i], name: body.names[i], dept: body.departments[i], type: body.types[i], gender: body.genders[i], year: body.years[i]});
            }
            // let targetData:any = [];
            // for (let i = 0; i < totalData.length; i++){
            //     if(msg.uid !== undefined && msg.uid!=="" && msg.uid !== totalData[i].uid){
            //         console.log("uid", msg.uid, totalData[i].uid);
            //         continue;
            //     }
            //     if(msg.name !== undefined && msg.name!=="" &&  msg.name !== totalData[i].name) {
            //         console.log("name", msg.name, totalData[i].name);
            //         continue;
            //     }
            //     if(msg.dept !== undefined && msg.dept!=="" && msg.dept !== totalData[i].dept) {
            //         continue;
            //     }
            //     if(msg.type !== undefined && msg.type!=="" && msg.type !== totalData[i].type) {
            //         continue;
            //     }
            //     console.log("i", targetData);
            //     targetData.push( {...totalData[i]});
            // }
            yield put({
                type: 'updateUserInfo',
                payload: {data: tmp}
            });
            // console.log("tmp", tmp);
        },
        * showUser(payload: {payload:{uid:string}},{call,put}){
            // const msg = payload.payload;
            // for (let i = 0; i < totalData.length; i++){
            //     if(msg.uid === totalData[i].uid){
            //         yield put({
            //             type: 'updateUserInfo',
            //             payload: {...totalData[i]}
            //         });
            //         break;
            //     }
            // }
            const msg = payload.payload;
            const response = yield call(tssFetch, '/user/get/info', 'POST', msg);
            if(response.status === 401) {
                message.error('查询用户信息失败');
                return;
            }
            const jsonBody = yield call(response.text.bind(response));
            const body = JSON.parse(jsonBody);
            message.success(body.status);
            // console.log("body", body);
            yield put({
                type: 'updateUserInfo',
                payload: {uid: body.uid, email: body.email, telephone: body.telephone, intro: body.intro, name: body.name, dept: body.department, gender: body.gender, majorClass: body.majorClass, type: body.type}
            });
        },
        * modifyUser(payload: {payload: {uid: string, name: string, type: string, dept: string, gender:string, year:string, majorClass:string, email:string, telephone: string, intro: string}},{call,put}){
            const msg = payload.payload;
            const response = yield call(tssFetch, '/user/modify/info', 'POST', msg);
            if(response.status === 400) {
                message.error('编辑用户信息失败');
                return;
            }
            const jsonBody = yield call(response.text.bind(response));
            const body = JSON.parse(jsonBody);
            message.success(body.status);
            // for (let i = 0; i < totalData.length; i++){
            //     if(msg.uid === totalData[i].uid){
            //         // console.log("msg",msg);
            //         totalData[i].name = msg.name;
            //         totalData[i].type = msg.type;
            //         totalData[i].dept = msg.dept;
            //         totalData[i].gender = msg.gender;
            //         totalData[i].year = msg.year;
            //         // console.log("modify", totalData);
            //         yield put({
            //             type: 'updateUserInfo',
            //             payload: {...msg}
            //         });
            //         break;
            //     }
            // }
        },
        * addUser(payload: {payload: {uids: string[], names: string[], type: string, genders:string[], passwords:string|null[]}},{call,put}){
            const msg = payload.payload;
            const response = yield call(tssFetch, '/user/add', 'PUT', msg);
            if(response.status === 400) {
                message.error('添加用户失败');
                return;
            }
            const jsonBody = yield call(response.text.bind(response));
            const body = JSON.parse(jsonBody);
            message.success(body.status);
        },
        * deleteUser(payload: {payload: {uids: string[]}},{call, put}){
            const msg = payload.payload;
            const response = yield call(tssFetch, '/user/delete', 'DELETE', msg);
            if(response.status !== 200) {
                message.error('删除用户失败');
                return;
            }
            const jsonBody = yield call(response.text.bind(response));
            const body = JSON.parse(jsonBody);
            message.success(body.status);
            // console.log("delete", msg);

            // let tmp:any = [];
            // for (let i = 0; i < totalData.length; i++){
            //     if(msg.uid !== totalData[i].uid){
            //         tmp.push(totalData[i]);
            //     }
            // }
            // totalData = tmp;
        },
        * getPhoto(payload: {payload: {uid: null|string}}, {call, put}){

        },
        * modifyPhoto(payload:{payload: {file: any, uid: null|string}}, {call, put}) {

        }
    }
};

export default model;
