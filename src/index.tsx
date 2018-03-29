import dva, {connect} from 'dva';
import {Router, Route, Switch} from 'dva/router';
import * as React from 'react';
import HomePage from './components/HomePage';
import NaviPage from './components/NavigationPage';
import UserPage from './components/UserPage';
import GlobalState from './models/globalState';
import {loadSession, saveSession} from './utils/localStorage';
import registerServiceWorker from './registerServiceWorker';

import './index.css';

const app = dva();

const state: GlobalState = {
    token: '',
    uid: '',
    userName: ''
};

app.model({
    namespace: 'login',
    state: state,
    reducers: {
        ['login/saveSession']: saveSession,
        ['login/loadSession']: loadSession
    },
    effects: {} ,
    subscriptions: {}
});

const LoginPage = connect(state => {
})(HomePage);
const navi = connect(state => {
})(NaviPage);
const user = connect(state => {
})(UserPage);
app.router(({history}) => (
        <Router history={history}>
            <Switch>
                <Route path="/index" component={LoginPage}/>
                <Route path="/navi" component={navi}/>
                <Route path="/user" component={user}/>
            </Switch>
        </Router>
    )
);

app.start('#root');

registerServiceWorker();
