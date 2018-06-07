import {Router, Route, Switch, routerRedux, browserHistory} from 'dva/router';
import {CourseFormData} from "../components/ManualScheduling";

const model = {
    namespace: "manageTime",
    state: {
        time1_1: "",
        time1_2: "",
        time2_1: "",
        time2_2: "",
        time3_1: "",
        time3_2: "",
        date1_1: "",
        date1_2: "",
        date2_1: "",
        date2_2: "",
        date3_1: "",
        date3_2: "",
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
        // * setTime1(payload: )
    }
}

export default model;