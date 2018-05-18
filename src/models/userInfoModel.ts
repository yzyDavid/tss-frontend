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
        * userInfo(payload: { payload: {uid: null|string} }, {call, put}) {
            const msg = payload.payload;
            const response = yield call(tssFetch, '/user/get', 'POST', msg);
            if(response.status === 401) {
                message.error('查询个人信息失败');
                return;
            }
            const jsonBody = yield call(response.text.bind(response));
            const body = JSON.parse(jsonBody);
            // message.success(body.status);
            yield put({
                type: 'updateUserInfo',
                payload: {uid: body.uid, email: body.email, telephone: body.telephone, intro: body.intro}
            });
            return;
        },
        * modify(payload: { payload: {uid: null|string, email: null|string, telephone: null|string, intro: null|string} }, {call, put}) {
            const msg = payload.payload;
            const response = yield call(tssFetch, '/user/modify', 'POST', msg);
            if(response.status === 400) {
                message.error('编辑个人信息失败');
                return;
            }
            yield put({type: 'userInfo', payload: {uid: null}});
            return;
        },
        * searchUser(payload: {payload:{uid:any, name: any, type: any, dept:any}}, {call, put}){
            const msg = payload.payload;
            let targetData:any = [];
            for (let i = 0; i < totalData.length; i++){
                if(msg.uid !== undefined && msg.uid!=="" && msg.uid !== totalData[i].uid){
                    console.log("uid", msg.uid, totalData[i].uid);
                    continue;
                }
                if(msg.name !== undefined && msg.name!=="" &&  msg.name !== totalData[i].name) {
                    console.log("name", msg.name, totalData[i].name);
                    continue;
                }
                if(msg.dept !== undefined && msg.dept!=="" && msg.dept !== totalData[i].dept) {
                    continue;
                }
                if(msg.type !== undefined && msg.type!=="" && msg.type !== totalData[i].type) {
                    continue;
                }
                console.log("i", targetData);
                targetData.push( {...totalData[i]});
            }
            yield put({
                type: 'updateUserInfo',
                payload: {data: targetData}
            });
        },
        * showUser(payload: {payload:{uid:string}},{call,put}){
            const msg = payload.payload;
            for (let i = 0; i < totalData.length; i++){
                if(msg.uid === totalData[i].uid){
                    yield put({
                        type: 'updateUserInfo',
                        payload: {...totalData[i]}
                    });
                    break;
                }
            }
        },
        * modifyUser(payload: {payload: {uid: string, name: string, type: string, dept: string, gender:string, year:string}},{call,put}){
            const msg = payload.payload;
            for (let i = 0; i < totalData.length; i++){
                if(msg.uid === totalData[i].uid){
                    // console.log("msg",msg);
                    totalData[i].name = msg.name;
                    totalData[i].type = msg.type;
                    totalData[i].dept = msg.dept;
                    totalData[i].gender = msg.gender;
                    totalData[i].year = msg.year;
                    // console.log("modify", totalData);
                    yield put({
                        type: 'updateUserInfo',
                        payload: {...msg}
                    });
                    break;
                }
            }
        },
        * addUser(payload: {payload: {uid: string, name: string, type: string, dept: string, gender:string, year:string}},{call,put}){
            console.log("add");
            const msg = payload.payload;
            totalData.push({key: (totalData.length+1).toString(), ...msg})
        },
        * deleteUser(payload: {payload: {uid: string}},{call, put}){
            const msg = payload.payload;
            console.log("delete", msg);

            let tmp:any = [];
            for (let i = 0; i < totalData.length; i++){
                if(msg.uid !== totalData[i].uid){
                    tmp.push(totalData[i]);
                }
            }
            totalData = tmp;
        },
        * getPhoto(payload: {payload: {uid: null|string}}, {call, put}){
            // const msg = payload.payload;
            //
            // const response = yield call(tssFetch, '/user/getPhoto', 'POST', msg);
            // if(response.status === 401) {
            //     message.error('照片加载失败');
            //     return;
            // }
            // const jsonBody = yield call(response.text.bind(response));
            // const body = JSON.parse(jsonBody);
            // message.success(body.status);
            // yield put({
            //     type: 'updateUserInfo',
            //     payload: {photo: body.resource}
            // });
        },
        * modifyPhoto(payload:{payload: {file: any, uid: null|string}}, {call, put}) {
            // const msg = payload.payload;
            // console.log("msg", msg);
            // const f = {name: msg.file.name, uid:msg.file.uid, size:msg.file.size, type:msg.file.type};
            // console.log('json test:', JSON.stringify(f));
            // // const response = yield call(tssFetch, '/user/modifyPhoto', 'POST', msg);
            // const auth: string = getAuthTokenFromLocalStorage();
            // let url = '/user/modifyPhoto';
            // console.log("aa", payload);
        }
    }
};

export default model;
