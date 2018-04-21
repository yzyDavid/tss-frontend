import dva, {connect} from 'dva';
import {Router, Route, Switch, routerRedux, browserHistory} from 'dva/router';
import * as React from 'react';
import {Layout, message} from 'antd';
import {TssFooter, TssHeader} from './components/TssPublicComponents';
import HomePageComponent from './components/HomePage';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import NavigationPageComponent from './components/NavigationPage';
import UserPageComponent from './components/UserPage';
import UserManagePageComponent from './components/UserManagePage';
import LoginModel from './models/loginModel';
import NavigationModel from './models/navigationModel';
import UserInfoModel from './models/userInfoModel';
import SelectionNaviComponent from "./components/SelectionNavi";
import AutoSchedulingComponent from './components/AutoScheduling';
import ManualSchedulingComponent from './components/ManualScheduling';
import ClassroomManagePageComponent from './components/ClassroomManagePage';
import ManualSchModifyComponent from './components/ManualSchModify';
import NavigationBar from './components/TssPublicComponents'
import {log} from "util";

const {Content} = Layout;

const app = dva({
    history: browserHistory
});

app.model(LoginModel);
app.model(NavigationModel);
app.model(UserInfoModel);
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

const UserManagePage = connect(state => {
    return {};
})(UserManagePageComponent);


const SelectionNavi = connect(state => {
    return {};
})(SelectionNaviComponent);

const AutoSchedulingPage = connect(state => {
    return {};
})(AutoSchedulingComponent);

const ManualSchedulingPage = connect(state => {
    return {};
})(ManualSchedulingComponent);

const ManualSchModifyPage = connect(state => {
    return {};
})(ManualSchModifyComponent);

const ClassroomManagePage = connect(state => {
    return {};
})(ClassroomManagePageComponent);


app.router(({history}) => (
        <Router history={history}>
            <Layout>
                <TssHeader/>
                <Content style={{minHeight: '300px'}}>
                    <Switch>
                        <Route path="/" exact component={HomePage}/>
                        <Route path="/navi" component={NavigationPage}/>
                        <Route path="/user" component={UserPage}/>
                        <Route path="/userManage" component={UserManagePage}/>
                        <Route path="/selection" component={SelectionNavi}/>
                        <Route path="/autoScheduling" component={AutoSchedulingPage} />
                        <Route path="/manualScheduling" component={ManualSchedulingPage} />
                        <Route path="/manualSchModify" component={ManualSchModifyPage} />
                        <Route path="/classroomManage" component={ClassroomManagePage}/>

                    </Switch>
                </Content>
                <TssFooter/>
            </Layout>
        </Router>
    )
);

app.start('#root');

registerServiceWorker();
