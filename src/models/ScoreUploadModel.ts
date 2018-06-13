import { httpMethod, tssFetch } from '../utils/tssFetch';
import { message } from 'antd';
import { Router, Route, Switch, routerRedux, browserHistory } from 'dva/router';


const model = {
    namespace: 'scoreUpload',
    state: {
        last_page: 0,
        page: 0,
        cid: "",
        semester: "FIRST",
        year: "2015",
        ids: [],
        names: [],
        scores: [],
        classes: ["", "", "", "", "", "", "", ""],
        cids: ["", "", "", "", "", "", ""]
    },

    reducers: {
        change_page(state, payload) {

            if (state.page === 0 && payload.payload.count < 0) {
      
                message.error('已经是第一页了！');
                return { ...state };
            }

            if (state.last_page === state.page && payload.payload.count > 0) {
                message.error('已经是最后一页了！')
                return { ...state };
            }
            state.page = state.page + payload.payload.count
            return { ...state }
        },

        change_semester_(state, payload) {

            state.semester = payload.payload.value
            return { ...state }
        },

        change_year_(state, payload) {

            state.year = payload.payload.value
            return { ...state }
        },

        clear_class(state, payload) {
            for (var i = 0; i < 7; i++) {
                state.classes[i] = ""
                state.cids[i] = ""
            }
            return { ...state }
        },


        set_class(state, payload) {
            for (var i = 0; i < payload.payload.courses_name.length; i++) {
                state.classes[i] = payload.payload.courses_name[i]
                state.cids[i] = payload.payload.class_id[i]
            }
            return { ...state }
        },

        set_cid(state, payload) {

            state.cid = payload.payload.value
            return { ...state }
        },


        change_class_(state, payload) {
            state.ids = []
            state.names = []
            state.scores = []
            var i = 0
            var obj = payload.payload
            for (var p in obj.students) {
                state.ids.push(p)
                state.names.push(obj.name[i])
                state.scores.push("0")
                i++
            }

            state.last_page = Math.ceil(i / 12)
            for (var j = 0; j < (state.last_page * 12 - i); j++) {
                state.ids.push(" ")
                state.names.push(" ")
                state.scores.push(" ")
            }
            console.log(state.name)
            return { ...state }
        },

        change_score(state, payload) {
         
            state.scores[payload.payload.index] = payload.payload.value
            return { ...state }
        },

    },

    effects: {

        * change_semester(payload, { call, put, select }) {
            
            const year = yield select(state => state.scoreUpload.year)
            var identity = {"uid":payload.payload.uid, "semester":payload.payload.semester, "year":year}
         
            yield put({ type: 'change_semester_', payload: { value: payload.payload.semester} })
            
            const response = yield call(tssFetch, '/grade/getallclass', 'POST', identity)
            const jsonBody = yield call(response.text.bind(response))
            const obj = JSON.parse(jsonBody)
            yield put({ type: 'clear_class', payload: {} })
            yield put({ type: 'set_class', payload: obj })
            
        },

        * change_year(payload, { call, put, select }) {
            const semester = yield select(state => state.scoreUpload.semester)
            var identity = { "uid": payload.payload.uid, "semester": semester, "year": payload.payload.year}

            yield put({ type: 'change_year_', payload: { value: payload.payload.semester } })

            const response = yield call(tssFetch, '/grade/getallclass', 'POST', identity)
            const jsonBody = yield call(response.text.bind(response))
            const obj = JSON.parse(jsonBody)
            yield put({ type: 'clear_class', payload: {} })
            yield put({ type: 'set_class', payload: obj })

        },

        *change_class(payload, { call, put }) {

            var flag = 0
            var cid = ""
            const name = payload.payload.classname
           
            for (var p in name) {

                console.log(p)
                if (name[p] === "(") {
                    flag = 1
                    continue
                }
                else
                    if (flag === 0)
                        continue
                if (name[p] === ")")
                    break
                cid = cid + name[p]
            }

            console.log("aaaa",cid)
            var data = { "uid": payload.payload.uid, "cid": cid }
            const response = yield call(tssFetch, '/grade/getclassstudent', 'POST', data)
            const jsonBody = yield call(response.text.bind(response))
            const obj = JSON.parse(jsonBody)

            yield put({ 'type': 'change_class_', payload: obj })
            yield put({ 'type': 'set_cid', payload: {"value": cid} })

        },

        *upload(payload, { call, put, select }) {

            var score = yield select(state => state.scoreUpload.scores)
            var re = /^[0-9][0-9]?([.]5)?$/;

            for (var p in score) {
                if (score[p] === "0") {
                    message.error("尚未登记完全！")
                    return 
                }

              
                if (!re.test(score[p]) && score[p] !== "100") {
                    message.error("输入格式错误！")
                    return 
                }
            }

            var permission = 0
            var cid = yield select(state => state.scoreUpload.cid)
            var identity = { "cid": cid }
            const response = yield call(tssFetch, "/grade/getclassstudentscore", "GET", identity)
            const jsonBody = yield call(response.text.bind(response))
            const obj = JSON.parse(jsonBody)

            var i = 0
            for (i = 0; i < 5; i++) {
                if (obj['score'][i] == 1)
                    break
            }
            if (i === 5)
                permission == 1

            if (permission === 0) {
                message.error('该课程已经登记过成绩！')
                return
            }

            var student = yield select(state => state.students)
            var id = yield select(state => state.ids)
            yield call(tssFetch,"/grade/add", "PUT", { "uid": payload. uid, "cid": cid, "studentid": id, "score": score })
            message.success("登记成功！")
        }

     }


};

export default model;
