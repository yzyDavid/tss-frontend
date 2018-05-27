import {httpMethod, tssFetch} from '../utils/tssFetch';
import {message} from 'antd';
import {Router, Route, Switch, routerRedux, browserHistory} from 'dva/router';
import {log} from "util";

const model = {
    namespace: 'selectClass',
    state: {
        dataSource: [
            {key: 1, courseId: '00001', courseName: "My Plan",year: "2018", semester: "SECOND", timeSlot: "SUN_3_5", capacity: 100, numStudent: 0},
        ]
    },
    reducers: {
        updateClassInfo(st, payload) {
            return {...st, ...payload.payload};
        },
    },
    subscriptions: {
        setup({dispatch, history}) {
            return history.listen(({pathname}) => {
                if (pathname === '/stuSelect'){
                    dispatch({type: 'select', payload: {classId: -1}})
                }
                if (pathname === '/stuSelect'){
                    dispatch({type: 'dismiss', payload: {classId: -1}})
                }
                if (pathname === '/classSelect/:courseId'){
                    dispatch({type: 'dismiss', payload: {classId: -1}})
                }
                if (pathname === '/classSelect/*'){
                    dispatch({type: 'select', payload: {classId: -1}})
                }
            });
        }
    },
    effects: {
        * select(payload: { payload: {payload: {classId: number}}},{call,put}){
            var value = payload.payload.toString();
            console.log("选择了："+value)
            const response = yield call(tssFetch, '/classes/action/select/'+value, 'GET');
            if(response.status === 401) {
                message.error("不存在该课程");
                return;
            }
            //const jsonBody = yield call(response.text.bind(response));
            //const body = JSON.parse(jsonBody);
            else{
                console.log("选课成功");
            }
        },
        * dismiss(payload: {payload: {payload: {classId: number}}},{call,put}){
          var value = payload.payload.toString();
          console.log("删除"+value+"中...");
          
        }
    }
};

export default model;
