import dva, {connect} from 'dva';
import {Router, Route} from 'dva/router';
import * as React from 'react';
import HomePage from './components/HomePage';
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
    }
});

const LoginPage = connect(state => {
})(HomePage);

app.router(({history}) => (
    <Router history={history}>
        <Route path="/" component={LoginPage}/>
    </Router>)
);

app.start('#root');

registerServiceWorker();
