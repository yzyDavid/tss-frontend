import {tssFetch} from '../utils/tssFetch';
import {message} from 'antd';
import {apiBaseUrl} from "../configs/apiBaseUrl";
import {getAuthTokenFromLocalStorage} from '../utils/localStorage';

const model = {
    namespace: 'dept',
    state: {
        data: [],
        majorData: [{key:"1", name:"计算机科学与技术"},
            {key:"2", name:"软件工程"},
            {key:"3", name:"数字媒体"}],
        classData: [{key:"1", name:"计算机科学与技术1501"},
            {key:"2", name:"计算机科学与技术1502"},
            {key:"3", name:"计算机科学与技术1503"},
            {key:"4", name:"计算机科学与技术1504"}],
        name: "计算机科学与技术学院",
        majorName: "计算机科学与技术",
        className: "计算机科学与技术1504",
        pswdShow: false,
        year: "2015"
    },
    reducers: {
        updateDeptInfo(st, payload) {
            return {...st, ...payload.payload, show:true};
        },
    },
    effects: {
        * search(payload: {payload: {tag: string, name: string}}, {call, put}){
            const msg = payload.payload;
            if(msg.tag === "1"){
                if(msg.name === ""){
                    const response = yield call(tssFetch, '/dept/department/get/list', 'POST', {});
                    if(response.status === 401) {
                        message.error('获取院系列表失败');
                        return;
                    }
                    const jsonBody = yield call(response.text.bind(response));
                    const body = JSON.parse(jsonBody);
                    message.success(body.status);
                    const tmp = body.names;
                    let deptData:any = [];
                    for (let i = 0; i < tmp.length(); i = i + 1){
                        deptData.push({key: (deptData.length+1).toString(), name: tmp[i]})
                    }
                    yield put({
                        type: 'updateDeptInfo',
                        payload: {data: deptData}
                    });
                }
                else {
                    const response = yield call(tssFetch, '/dept/department/get/info', 'POST', {name: msg.name});
                    if(response.status === 401) {
                        message.error('获取院系列表失败');
                        return;
                    }
                    const jsonBody = yield call(response.text.bind(response));
                    const body = JSON.parse(jsonBody);
                    message.success(body.status);
                    const deptData:any = [{key: "1", name: body.name}];
                    yield put({
                        type: 'updateDeptInfo',
                        payload: {data: deptData}
                    });
                }
            }
            else if(msg.tag === "2"){
                if(msg.name === ""){
                    message.error("请输入专业名称");
                }
                else {
                    const response = yield call(tssFetch, '/dept/major/get/info', 'POST', {name: msg.name});
                    if(response.status === 401) {
                        message.error('获取专业列表失败');
                        return;
                    }
                    const jsonBody = yield call(response.text.bind(response));
                    const body = JSON.parse(jsonBody);
                    message.success(body.status);
                    yield put({
                        type: 'updateDeptInfo',
                        payload: {majorData: [{key:"1", name:body.name}]}
                    });
                }
            }
            else {
                if(msg.name === ""){
                    message.error("请输入班级名称");
                }
                else {
                    const response = yield call(tssFetch, '/dept/class/get/info', 'POST', {name: msg.name});
                    if(response.status === 401) {
                        message.error('获取班级列表失败');
                        return;
                    }
                    const jsonBody = yield call(response.text.bind(response));
                    const body = JSON.parse(jsonBody);
                    message.success(body.status);
                    yield put({
                        type: 'updateDeptInfo',
                        payload: {classData: [{key:"1", name:body.name}]}
                    });
                }
            }
        }
    }
};

export default model;
