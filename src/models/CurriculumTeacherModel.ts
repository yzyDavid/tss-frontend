import {httpMethod, tssFetch} from '../utils/tssFetch';
import {message} from 'antd';
import {Router, Route, Switch, routerRedux, browserHistory} from 'dva/router';


class CurriculumTeacherClassInfo
{
    id: number;
    courseId: number;
    courseName: string;
    arrangements: string;
}

const model = {
    namespace: 'curriculumteacher',
    state: {
        dataSource: [
            // {id: -1, courseId:'asd', courseName: 'aaa', arrangements:[{typeName:'', classroomName:'',buildingName:'',campusName:''},]},
            {id: -1, courseId:'', courseName: '', arrangements:''},
            ]
    },
    reducers: {
        updateCurriculumTeacherInfo(st, payload) {
            return {...st, ...payload.payload};
        },
    },
    subscriptions: {
        setup({dispatch, history}) {
            return history.listen(({pathname}) => {
                if (pathname === '/curriculumTeacher') {
                    dispatch({ type: 'curriculumTeacher', payload: {teacherId: '',year: -1, semester: ''} });
                }
                if (pathname === '/curriculumTeacher') {
                    dispatch({ type: 'showList', payload: {classId: ''} });
                }
            });
        }
    },
    effects: {
        * curriculumTeacher(payload: { payload: {teacherId: string, year: number, semester: string} }, {call, put})  {
            if(payload.payload.year>0)
            {
                const response = yield call(tssFetch, '/teachers/'+payload.payload.teacherId+'/classes?year='+payload.payload.year+'&semester='+payload.payload.semester, 'GET');
                if (response.status === 400) {
                    message.error('教师信息错误');
                    return;
                }
                const jsonBody = yield call(response.text.bind(response));
                const body = JSON.parse(jsonBody);
                let newData = [{id: -1, courseId: -1, courseName: '', arrangements:''},]
                newData.pop();
                if(body.length>0)
                {
                    for(let i=0; i<body.length; i++)
                    {
                        var arr = '';
                        for(let j=0;j<body[i].arrangements.length;j++)
                            arr += (body[i].arrangements[j].campusName+' '+body[i].arrangements[j].buildingName+' '+body[i].arrangements[j].classroomName+' '+body[i].arrangements[j].typeName+' ; ')
                        newData.push({id: body[i].id, courseId: body[i].courseId, courseName: body[i].courseName, arrangements: arr});
                    }
                }
                //console.log(newData);
                yield put({
                    type: 'updateCurriculumTeacherInfo',
                    payload: {dataSource:newData}
                });
                return;
            }
            else{
                yield put({
                    type: 'updateCurriculumTeacherInfo',
                    payload: {dataSource:[]}
                });
            }
        },

        * showList(payload: { payload: {classId: string} }, {call, put})  {
             var value = payload.payload["classId"];
             console.log(value+"daf")
             if(value!='')
             yield put(routerRedux.push({pathname:'/stuList/'+value,query: payload.payload,}));
            return;
        },
    }
};

export default model;
