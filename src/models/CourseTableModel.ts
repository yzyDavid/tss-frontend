import {Router, Route, Switch, routerRedux, browserHistory} from 'dva/router';
import {CourseFormData} from "../components/ManualScheduling";

const model = {
    namespace: "courseTable",
    state: {
        dataSource: [
            {key: 1, courseId: "20001", courseName: "Software Engineering", timeSlot: "Mon_1_2", semester: "FIRST", credit: 3}
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
                // if (pathname === '/courseTable') {
                //     dispatch({ type: 'refreshCourseTable', payload: {classNumber: ""} });
                // }
                if (pathname === '/courseTable') {
                    dispatch({ type: 'search', payload: {year: "", semester: ""} });
                }
            });
        }
    },
    effects: {
        * refreshCourseTable(payload: { payload: {classNumber: string} }, {call, put}){

        },
        * search(payload: {year: string, semester: string}, {call, put}){
            var a = payload["payload"]["year"];
            var b = payload["payload"]["semester"];
            if(a!="" || b!="") {
                //fetch the courseTable
                //TODO

                //refresh the dataSource
                //TODO
                console.log(a)
                console.log(b)
            }
        }
    }
}

export default model;