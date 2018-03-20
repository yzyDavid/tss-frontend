import dva, {connect} from 'dva';
import {Router, Route, Switch} from 'dva/router';
import * as React from 'react';
import {Layout} from 'antd';
import {TssFooter, TssHeader} from './components/TssPublicComponents';
import HomePageComponent from './components/HomePage';
import GlobalState from './models/globalState';
import {loadSession, saveSession} from './utils/localStorage';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import NavigationPageComponent from './components/NavigationPage';

const {Content} = Layout;

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
    effects: {},
    subscriptions: {}
});

const HomePage = connect(state => {
})(HomePageComponent);

const NavigationPage = connect(state => {
})(NavigationPageComponent);

app.router(({history}) => (
        <Router history={history}>
            <Layout>
                <TssHeader/>
                <Content style={{minHeight: '300px'}}>
                    <Switch>
                        <Route path="/" component={HomePage}/>
                        <Route path="/navi" component={NavigationPage}/>
                        <Route path="/user" component={<div>user page</div>}/>
                    </Switch>
                </Content>
                <TssFooter/>
            </Layout>
        </Router>
    )
);

app.start('#root');

registerServiceWorker();
