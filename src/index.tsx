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
    state: state,
    reducers: {
        saveSession(st) {
            return saveSession(st)
        },
        loadSession(st) {
            return loadSession(st)
        },
        updateSession(st, payload: GlobalState) {
            return {...st, ...payload};
        }
    },
    effects: {
        * login(payload: { payload: LoginFormData }, {call, put}) {
            console.log(payload);
            const msg = payload.payload;
            const response = yield call(tssFetch, '/session/login', 'POST', msg);
            console.log(response);
            if (response.status === 400) {
                message.error('用户名或密码错误');
                return;
            }
            const jsonBody = yield call(response.text.bind(response));
            const body = JSON.parse(jsonBody);
            console.log(body);
            yield put({type: 'updateSession', payload: {uid: body.uid, password: msg.password, token: body.token}});
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

const HomePage = connect(state => {
    return {}
})(HomePageComponent);

const NavigationPage = connect(state => {
    return {}
})(NavigationPageComponent);

const UserPage = connect(state => {
    return {}
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
