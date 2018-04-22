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




const {Content} = Layout;

const HomePage = connect(state => {
    return {}
})(HomePageComponent);





const app = dva({
    history: browserHistory
});



app.model(LoginModel);
app.model(NavigationModel);
app.model(UserInfoModel);


app.router(({history}) => (
        <Router history={history}>
            {/*<Layout>*/}

                {/*<Content style={{minHeight: '300px'}}>*/}
                    <Switch>

                        <Route path="/"  component={HomePage}/>
                        {/*<Route path="/navi" component={NavigationPage}/>*/}
                        {/*<Route path="/user" component={UserPage}/>*/}
                        {/*<Route path="/userManage" component={UserManagePage}/>*/}
                    </Switch>
                {/*</Content>*/}

            {/*</Layout>*/}
        </Router>
    )
);

app.start('#root');

//registerServiceWorker();
