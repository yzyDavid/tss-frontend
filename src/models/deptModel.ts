import {tssFetch} from '../utils/tssFetch';
import {message} from 'antd';
import {apiBaseUrl} from "../configs/apiBaseUrl";
import {getAuthTokenFromLocalStorage} from '../utils/localStorage';
import {dataForm} from "./forumNewTopicModel";

const model = {
    namespace: 'dept',
    state: {
        data: [],
        majorData: [{key: "1", name: "计算机科学与技术"},
            {key: "2", name: "软件工程"},
            {key: "3", name: "数字媒体"}],
        classData: [{key: "1", name: "计算机科学与技术1501"},
            {key: "2", name: "计算机科学与技术1502"},
            {key: "3", name: "计算机科学与技术1503"},
            {key: "4", name: "计算机科学与技术1504"}],
        deptList: ["test"],
        stuData: [],
        name: "计算机科学与技术学院",
        majorName: "计算机科学与技术",
        className: "计算机科学与技术1504",
        pswdShow: false,
        year: "2015"
    },
    reducers: {
        updateDeptInfo(st, payload) {
            return {...st, ...payload.payload, show: true};
        },
    },
    effects: {
        * search(payload: { payload: { name: string } }, {call, put}) {
            const msg = payload.payload;
            if (msg.name === "" || msg.name === undefined) {
                const response = yield call(tssFetch, '/dept/department/get/list', 'POST', {});
                if (response.status !== 200) {
                    // message.error('获取院系列表失败');
                    const jsonBody = yield call(response.text.bind(response));
                    const body = JSON.parse(jsonBody);
                    message.warning(body.status);
                    yield put({
                        type: 'updateDeptInfo',
                        payload: {data: []}
                    });
                    return;
                }
                const jsonBody = yield call(response.text.bind(response));
                const body = JSON.parse(jsonBody);
                message.success(body.status);
                const tmp = body.names;
                let deptData: any = [];
                // console.log('haha',tmp);
                for (let i = 0; i < tmp.length; i = i + 1) {
                    deptData.push({key: (deptData.length + 1).toString(), name: tmp[i]})
                }
                yield put({
                    type: 'updateDeptInfo',
                    payload: {data: deptData}
                });
            }
            else {
                const response = yield call(tssFetch, '/dept/department/get/info', 'POST', {name: msg.name});
                if (response.status !== 200) {
                    // message.error('获取院系列表失败');
                    const jsonBody = yield call(response.text.bind(response));
                    const body = JSON.parse(jsonBody);
                    message.warning(body.status);
                    yield put({
                        type: 'updateDeptInfo',
                        payload: {data: []}
                    });
                    return;
                }
                const jsonBody = yield call(response.text.bind(response));
                const body = JSON.parse(jsonBody);
                message.success(body.status);
                const deptData: any = [{key: "1", name: body.name}];
                yield put({
                    type: 'updateDeptInfo',
                    payload: {data: deptData}
                });
            }
        },
        * add(payload: { payload: { name: string } }, {call, put}) {
            console.log("add");
            const msg = payload.payload;
            const response = yield call(tssFetch, '/dept/department/add', 'PUT', {name: msg.name});
            console.log(response);
            if (response.status !== 201) {
                message.error('添加院系失败');
                return;
            }
            const jsonBody = yield call(response.text.bind(response));
            const body = JSON.parse(jsonBody);
            message.success(body.status);
        },
        * addMajor(payload: { payload: { name: string, department: string } }, {call, put}) {
            const msg = payload.payload;
            const response = yield call(tssFetch, '/dept/major/add', 'PUT', msg);
            console.log(response);
            if (response.status !== 201) {
                message.error('添加专业失败');
                return;
            }
            const jsonBody = yield call(response.text.bind(response));
            const body = JSON.parse(jsonBody);
            message.success(body.status);
        },
        * addClass(payload: { payload: { name: string, major: string } }, {call, put}) {
            console.log("add");
            const msg = payload.payload;
            const response = yield call(tssFetch, '/dept/class/add', 'PUT', msg);
            console.log(response);
            if (response.status !== 201) {
                message.error('添加班级失败');
                return;
            }
            const jsonBody = yield call(response.text.bind(response));
            const body = JSON.parse(jsonBody);
            message.success(body.status);
        },
        * addStu(payload: { payload: { uids: string[], majorClass: string } }, {call, put}) {
            console.log("add");
            const msg = payload.payload;
            const response = yield call(tssFetch, '/dept/class/add/user', 'POST', msg);
            console.log(response);
            if (response.status !== 200) {
                message.error('添加学生失败');
                return;
            }
            const jsonBody = yield call(response.text.bind(response));
            const body = JSON.parse(jsonBody);
            message.success(body.status);
        },
        * addTea(payload: { payload: { uids: string[], department: string } }, {call, put}) {
            // console.log("add");
            const msg = payload.payload;
            const response = yield call(tssFetch, '/dept/department/add/user', 'POST', msg);
            console.log(response);
            if (response.status !== 200) {
                message.error('添加教师失败');
                return;
            }
            const jsonBody = yield call(response.text.bind(response));
            const body = JSON.parse(jsonBody);
            message.success(body.status);
        },
        * getDept(payload: { payload: { name: string } }, {call, put}) {
            const msg = payload.payload;
            const response = yield call(tssFetch, '/dept/department/get/info', 'POST', {name: msg.name});
            console.log(response);
            if (response.status !== 200) {
                message.error('获取信息失败');
                return;
            }
            const jsonBody = yield call(response.text.bind(response));
            const body = JSON.parse(jsonBody);
            message.success(body.status);
            console.log(body);
            const tmp = body.majors;
            let deptData: any = [];
            for (let i = 0; i < tmp.length; i = i + 1) {
                deptData.push({key: (deptData.length + 1).toString(), name: tmp[i]})
            }
            yield put({
                type: 'updateDeptInfo',
                payload: {majorData: deptData, name: body.name}
            });
        },
        * getMajor(payload: { payload: { name: string } }, {call, put}) {
            const msg = payload.payload;
            const response = yield call(tssFetch, '/dept/major/get/info', 'POST', {name: msg.name});
            console.log(response);
            if (response.status !== 200) {
                message.error('获取信息失败');
                const jsonBody = yield call(response.text.bind(response));
                const body = JSON.parse(jsonBody);
                message.error(body.status);
                return;
            }
            const jsonBody = yield call(response.text.bind(response));
            const body = JSON.parse(jsonBody);
            message.success(body.status);
            console.log(body);
            const tmp = body.classes;
            let deptData: any = [];
            for (let i = 0; i < tmp.length; i = i + 1) {
                deptData.push({key: (deptData.length + 1).toString(), name: tmp[i]})
            }
            yield put({
                type: 'updateDeptInfo',
                payload: {classData: deptData, majorName: body.name}
            });
        },
        * getClass(payload: { payload: { name: string } }, {call, put}) {
            const msg = payload.payload;
            const response = yield call(tssFetch, '/dept/class/get/info', 'POST', {name: msg.name});
            console.log(response);
            if (response.status !== 200) {
                message.error('获取信息失败');
                const jsonBody = yield call(response.text.bind(response));
                const body = JSON.parse(jsonBody);
                message.error(body.status);
                return;
            }
            const jsonBody = yield call(response.text.bind(response));
            const body = JSON.parse(jsonBody);
            message.success(body.status);
            // console.log(body);
            const unames = body.unames;
            const uids = body.uids;
            let deptData: any = [];
            // console.log(unames);
            // console.log(uids);
            for (let i = 0; i < uids.length; i = i + 1) {
                deptData.push({key: (deptData.length + 1).toString(), name: unames[i], uid: uids[i]})
            }
            // console.log(deptData);
            yield put({
                type: 'updateDeptInfo',
                payload: {stuData: deptData, className: body.name}
            });
        },
        * getDeptList(paload: {}, {call, put}) {
            console.log('getDept');
            const response = yield call(tssFetch, '/dept/department/get/list', 'POST', {});
            if (response.status !== 200) {
                message.error('获取院系列表失败');
                const jsonBody = yield call(response.text.bind(response));
                const body = JSON.parse(jsonBody);
                message.error(body.status);
                return;
            }
            const jsonBody = yield call(response.text.bind(response));
            const body = JSON.parse(jsonBody);
            // message.success(body.status);
            const tmp = body.names;
            // let deptData: any = [];
            // for (let i = 0; i < tmp.length; i = i + 1) {
            //     deptData.push({key: (deptData.length + 1).toString(), name: tmp[i]})
            // }
            console.log('tmp', body);
            yield put({
                type: 'updateDeptInfo',
                payload: {deptList: tmp}
            });
        },
        * deleteDept(payload: { payload: { names: string[] } }, {call, put}) {
            const msg = payload.payload;
            for (let i = 0; i < msg.names.length; i++) {
                const response = yield call(tssFetch, '/dept/department/delete', 'DELETE', {name: msg.names[i]});
                if (response.status !== 200) {
                    message.error('删除院系失败');
                    const jsonBody = yield call(response.text.bind(response));
                    const body = JSON.parse(jsonBody);
                    message.error(body.status);
                    return;
                }
            }
            message.success('删除院系成功');
        },
        * deleteMajor(payload: { payload: { names: string[] } }, {call, put}) {
            const msg = payload.payload;
            for (let i = 0; i < msg.names.length; i++) {
                const response = yield call(tssFetch, '/dept/major/delete', 'DELETE', {name: msg.names[i]});
                if (response.status !== 200) {
                    message.error('删除专业失败');
                    const jsonBody = yield call(response.text.bind(response));
                    const body = JSON.parse(jsonBody);
                    message.error(body.status);
                    return;
                }
            }
            message.success('删除专业成功');
        },
        * deleteClass(payload: { payload: { names: string[] } }, {call, put}) {
            const msg = payload.payload;
            for (let i = 0; i < msg.names.length; i++) {
                const response = yield call(tssFetch, '/dept/class/delete', 'DELETE', {name: msg.names[i]});
                if (response.status !== 200) {
                    message.error('删除班级失败');
                    const jsonBody = yield call(response.text.bind(response));
                    const body = JSON.parse(jsonBody);
                    message.error(body.status);
                    return;
                }
            }
            message.success('删除班级成功');
        },
        * deleteStu(payload: { payload: { uids: string[], majorClass: string } }, {call, put}) {
            const msg = payload.payload;
            const response = yield call(tssFetch, '/dept/class/delete/user', 'POST', msg);
            if (response.status !== 200) {
                message.error('删除学生失败');
                const jsonBody = yield call(response.text.bind(response));
                const body = JSON.parse(jsonBody);
                message.error(body.status);
                return;
            }
            message.success('删除学生成功');
        },
        * deleteTea(payload: { payload: { uids: string[], department: string } }, {call, put}) {
            const msg = payload.payload;
            const response = yield call(tssFetch, '/dept/department/delete/user', 'POST', msg);
            if (response.status !== 200) {
                message.error('删除教师失败');
                const jsonBody = yield call(response.text.bind(response));
                const body = JSON.parse(jsonBody);
                message.error(body.status);
                return;
            }
            message.success('删除教师成功');
        },
        * modifyDept(payload: { payload: { name: string, newName: string } }, {call, put}) {
            const msg = payload.payload;
            const response = yield call(tssFetch, '/dept/department/modify', 'POST', msg);
            if (response.status !== 200) {
                message.error('编辑院系失败');
                const jsonBody = yield call(response.text.bind(response));
                const body = JSON.parse(jsonBody);
                message.error(body.status);
                return;
            }
            message.success('编辑院系成功');
        },
        * modifyMajor(payload: { payload: { name: string, newName: string, department: any } }, {call, put}) {
            const msg = payload.payload;
            const response = yield call(tssFetch, '/dept/major/modify', 'POST', msg);
            if (response.status !== 200) {
                message.error('编辑专业失败');
                const jsonBody = yield call(response.text.bind(response));
                const body = JSON.parse(jsonBody);
                message.error(body.status);
                return;
            }
            message.success('编辑专业成功');
        },
        * modifyClass(payload: { payload: { name: string, newName: string, major: any, year: any } }, {call, put}) {
            const msg = payload.payload;
            const response = yield call(tssFetch, '/dept/class/modify', 'POST', msg);
            if (response.status !== 200) {
                message.error('编辑班级失败');
                const jsonBody = yield call(response.text.bind(response));
                const body = JSON.parse(jsonBody);
                message.error(body.status);
                return;
            }
            message.success('编辑班级成功');
        }
    }
};

export default model;
