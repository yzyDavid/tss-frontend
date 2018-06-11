import {Router, Route, Switch, routerRedux, browserHistory} from 'dva/router';
import {CourseFormData} from "../components/ManualScheduling";

const model = {
    namespace: "studentList",
    state: {
        dataSource: [
            {id: "31500001", name: "小红", major: "计算机科学与技术"},
            {id: "31500002", name: "小刚", major: "软件工程"}
        ]
    },
    reducers: {
        updateStudentList(st, payload) {
            return {...st, ...payload.payload};
        },
    },
    subscriptions: {
        setup({dispatch, history}) {
            return history.listen(({pathname}) => {
                // if (pathname === '/stuList') {
                //     dispatch({ type: 'stuList', payload: {classNumber: ""} });
                // }
            });
        }
    },
    effects: {
        // * stuList(payload: { payload: {classNumber: string} }, {call, put}){
        //     yield put({
        //         type: "updateStudentList",
        //         payload: {dataSource:[
        //                 {key: "1", id: "315010101", name: "我是数据库来的", major: "计算机科学与技术"}
        //             ]}
        //         }
        //
        //     )
        // },
    }
}

export default model;