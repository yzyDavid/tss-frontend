import dva, {connect} from 'dva';
import {Router, Route, Switch, routerRedux, browserHistory} from 'dva/router';
import * as React from 'react';
import {Layout, message} from 'antd';
import {TssFooter, TssHeader} from './components/TssPublicComponents';
import ForumHomePageComponent from './components/ForumHomePage';
import LoginPageComponent from './components/ForumLoginPage';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import NavigationPageComponent from './components/NavigationPage';
import UserPageComponent from './components/UserPage';
import UserManagePageComponent from './components/UserManagePage';
import LoginModel from './models/loginModel';
import NavigationModel from './models/navigationModel';
import UserInfoModel from './models/userInfoModel';
import ForumUserPageComponent from './components/ForumUserPage'



const {Content} = Layout;

const LoginPage = connect(state => {
    return {}
})(LoginPageComponent);

const HomePage = connect(state => {
    return {}
})(ForumHomePageComponent);

const UserPage = connect(state => {
    return {}
})(ForumUserPageComponent);
const app = dva({
    history: browserHistory
});



app.model(LoginModel);
app.model(NavigationModel);
app.model(UserInfoModel);


app.router(({history}) => (
        <Router history={history}>
            <Layout>

                <Content style={{minHeight: '300px'}}>
                    <Switch>

                        <Route exact path="/"  component={UserPage}/>
                        <Route exact path="/home" component={HomePage}/>
                        <Route path="/userinfo" component={UserPage}/>
                        {/*<Route path="/userManage" component={UserManagePage}/>*/}
                    </Switch>
                </Content>

            </Layout>
        </Router>
    )
);

app.start('#root');

//registerServiceWorker();
