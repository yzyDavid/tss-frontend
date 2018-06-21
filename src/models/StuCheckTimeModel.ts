import {tssFetch} from "../utils/tssFetch";

const model = {
    namespace: "stuTimeTable",
    state: {
        dataSource: []
    },
    reducers:{
        updateTimeTable(st, payload){
            return {...st, ...payload.payload};
        }
    },
    subscriptions: {
        setup({dispatch, history}) {
            return history.listen(({pathname}) => {
                if (pathname === '/stuCheckTime') {
                    dispatch({ type: 'fetchTime', payload: {} });
                }
            });
        }
    },
    effects:{
        *fetchTime(payload:{},{call,put}){
            const response = yield call(tssFetch, "/selection_time/show");
            if (response.status != 200) {
                return;
            }
            else{
                const jsonBody = yield call(response.text.bind(response));
                const body = JSON.parse(jsonBody);
                var list = body["timeList"];
                for(var i=0; i<list.length;i++)
                {
                    if(list[i]["register"])
                        list[i]["register"]="是";
                    if(list[i]["drop"])
                        list[i]["drop"]="是";
                    if(list[i]["complement"])
                        list[i]["complement"]="是";
                }
                console.log(list)
                yield put({
                    type: "updateTimeTable",
                    payload: {dataSource:list}
                })
            }
        }
    }
}
export default model;