import dva, {connect} from 'dva';
import {Router, Route} from 'dva/router';
import * as React from 'react';
import HomePage from './components/HomePage';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

const app = dva();

app.model({
    namespace: 'login',
    state: {},
});

const LoginPage = connect(state => {})(HomePage);

app.router(({history}) => (
    <Router history={history}>
        <Route path="/" component={LoginPage}/>
    </Router>)
);

app.start('#root');

registerServiceWorker();
