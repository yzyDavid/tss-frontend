import dva, {connect} from 'dva';
import {Router, Route, Switch, routerRedux, browserHistory} from 'dva/router';
import * as React from 'react';
import {Layout, message} from 'antd';
import {TssFooter, TssHeader} from './components/TssPublicComponents';
import HomePageComponent from './components/HomePage';
import GlobalState from './models/globalState';
import {loadSession, saveSession} from './utils/localStorage';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import NavigationPageComponent from './components/NavigationPage';
import UserPageComponent from './components/UserPage';
import {tssFetch} from './utils/tssFetch';
import {LoginFormData} from './components/LoginForm';
import {userInfo} from "os";

const {Content} = Layout;

const app = dva({
    history: browserHistory
});

const state: GlobalState = {
    token: '',
    uid: '',
    username: ''
};

app.model({
    namespace: 'login',
    state: {
        ...state,
        level: 'manager'
    },
    reducers: {
        saveSession(st) {
            return saveSession(st)
        },
        loadSession(st) {
            return loadSession(st)
        },
        updateSession(st, payload) {
            return {...st, ...payload.payload};
        }
    },
    effects: {
        * login(payload: { payload: LoginFormData }, {call, put}) {
            // console.log(payload);
            const msg = payload.payload;
            const response = yield call(tssFetch, '/session/login', 'POST', msg);
            console.log(response);
            if (response.status === 400) {
                message.error('用户名或密码错误');
                return;
            }
            const jsonBody = yield call(response.text.bind(response));
            const body = JSON.parse(jsonBody);
            // console.log(body);
            yield put({type: 'updateSession', payload: {uid: body.uid, password: msg.password, token: body.token}}); // level 添加用户身份 学生？教师？管理员？
            message.success('登录成功');
            yield put(routerRedux.push('/navi'));
            return;
        },
        * echo(payload: {}, {call, put}) {
            const response = yield call(tssFetch, '/echo', 'GET', {});
            console.log(response);
        }
    },
    subscriptions: {}
});

app.model({
    namespace: 'navigation',
    state: {
        ...state,
    },
    reducers: {
        updateUserInfo(st, payload) {
            return {...st, ...payload.payload};
        }
    },
    effects: {
        * jump(payload: {payload: {direction: string}}, {call, put}) {
            const direction = payload.payload.direction;
            switch(direction){
                case "user": yield put(routerRedux.push('/user')); break;
            }
            return;
        }
    }
});

app.model({
    namespace: 'userinfo',
    state: {
        uid: '3152222222',
        email: 'haha@qq.com',
        tel: '23333',
        intro: 'hhhhh',
    },
    reducers: {
        updateUserInfo(st, payload) {
            return {...st, ...payload.payload};
        },
    },
    subscriptions: {
        setup({dispatch, history}) {
            return history.listen(({pathname}) => {
                if (pathname === '/user') {
                    dispatch({ type: 'userInfo', payload: {uid: ''} });
                }
            });
        }
    },
    effects: {
        * userInfo(payload: { payload: {uid: string} }, {call, put}) {
            const msg = payload.payload;
            const response = yield call(tssFetch, '/user/info', 'GET', msg);
            if(response.status === 400) {
                message.error('查询个人信息失败');
                return;
            }
            const jsonBody = yield call(response.text.bind(response));
            const body = JSON.parse(jsonBody);
            yield put({
               type: 'updateUserInfo',
               payload: {uid: body.uid, email: body.email, telephone: body.telephone, intro: body.intro}
            });
            return;
        }
    }


});

const HomePage = connect(state => {
    return {}
})(HomePageComponent);

const NavigationPage = connect(state => {
    const {uid, level} = state.login;
    return {level: level, uid: uid}
})(NavigationPageComponent);

const UserPage = connect(state => {
    return {...state.userinfo};
})(UserPageComponent);

app.router(({history}) => (
        <Router history={history}>
            <Layout>
                <TssHeader/>
                <Content style={{minHeight: '300px'}}>
                    <Switch>
                        <Route path="/" exact component={HomePage}/>
                        <Route path="/navi" component={NavigationPage}/>
                        <Route path="/user" component={UserPage}/>
                    </Switch>
                </Content>
                <TssFooter/>
            </Layout>
        </Router>
    )
);

app.start('#root');

registerServiceWorker();
