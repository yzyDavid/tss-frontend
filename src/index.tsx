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
import MyPostPageComponent from './components/MyPostPage'
import ReplyPageComponent from './components/ReplyPage'
import LetterPageComponent from './components/LetterPage'

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

const MyPostPage = connect(state => {
    return {}
})(MyPostPageComponent);

const LetterPage = connect(state => {
    return {}
})(LetterPageComponent);

const ReplyPage = connect(state => {
    return {}
})(ReplyPageComponent);


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

                        <Route exact path="/"  component={LoginPage}/>
                        <Route exact path="/home" component={HomePage}/>
                        <Route exact path="/userinfo" component={UserPage}/>
                        <Route exact path="/userarticle" component={UserPage}/>
                        <Route exact path="/mypost" component={MyPostPage}/>
                        <Route exact path="/privateLetter" component={LetterPage}/>
                        <Route exact path="/reply" component={ReplyPage}/>
                    </Switch>
                </Content>

            </Layout>
        </Router>
    )
);

app.start('#root');

//registerServiceWorker();
