import dva, {connect} from 'dva';
import {Router, Route, Switch, routerRedux, browserHistory} from 'dva/router';
import * as React from 'react';
import {Layout, message} from 'antd';
import {TssFooter, TssHeader} from './components/ForumNavigation';
import ForumHomePageComponent from './components/ForumHomePage';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import NavigationPageComponent from './components/NavigationPage';
import UserPageComponent from './components/UserPage';
import UserManagePageComponent from './components/UserManagePage';
import NavigationModel from './models/forumNavigationModel';
import UserInfoModel from './models/userInfoModel';
import ForumUserPageComponent from './components/ForumUserPage'
import MyPostPageComponent from './components/ForumMyPostPage'
import ReplyPageComponent from './components/ForumReplyPage'
import NewTopicPageComponent from './components/ForumNewTopicPage'
import LetterPageComponent from './components/ForumMailPage'
import SearchModel from './models/forumSearchModel'
import AllBoardModel from './models/forumAllBoardModel'
import MyPostModel from './models/forumMyPostModel'
import MyBoardModel from './models/forumMyboardModel'
import TopicModel from './models/forumTopicModel'
import BoardPageComponent from './components/ForumBoardPage'
import TopicPageComponent from './components/ForumTopicPage'
import ReplyListModel from './models/forumReplyListModel'
import ForumHomeModel from './models/forumHomeModel'
import BoardMOdel from './models/forumBoardModel'
import SearchComponent from "./components/ForumSearchPage"
import AllBoardComponent from "./components/ForumAllBoard"
import MailModel from "./models/forumMailModel"
import ForumUserModel from "./models/forumUserModel"
import {Simulate} from "react-dom/test-utils";

import input = Simulate.input;

const {Content} = Layout;


const HomePage = connect(state => {
    const dataSource = state.allboard.uid;
    const mylist = state.myboard.list;
    const hot = state.forumhome.HotList;
    const latest = state.forumhome.LatestList;
    return {uid: dataSource,alllist :state.allboard.list,mylist:mylist,hot:hot,latest:latest };
})(ForumHomePageComponent);

const UserPage = connect(state => {
    const data = state.ForumUserInfo.userInfo;
    return {userInfo:data};
})(ForumUserPageComponent);

const MyPostPage = connect(state => {
    const data = state.mypost.postList;
    return{postList :data};
})(MyPostPageComponent);

const LetterPage = connect(state => {
    const data = state.mail.input;
    return {allstate:data}
})(LetterPageComponent);

const NewTopicPage = connect(state => {
    const data= {boardName: state.board.boardState.BoardName,boardID:state.board.boardState.BoardID};
    return {topicBoardInfo:data}
})(NewTopicPageComponent);

const BoardPage = connect(state => {
    const data = state.board.boardState;

    return { boardinfo:data}
})(BoardPageComponent);

const TopicPage = connect(state => {
    const data = state.topic.allstate;
    return {allstate: data};
})(TopicPageComponent);

const ReplyPage = connect(state => {
    const data = state.replyList.replylist;
    return {ReplyList: data};
})(ReplyPageComponent);

const SearchPage = connect(state => {
    const data = state.search.data;
    return {boardList:data}
})(SearchComponent);

const AllBoardPage = connect(state => {
    const data = state.allboard.list;
    return {boardList:data};
})(AllBoardComponent);


const app = dva({
    history: browserHistory
});




app.model(NavigationModel);
app.model(MyBoardModel);
app.model(AllBoardModel);
app.model(MyPostModel);
app.model(TopicModel);
app.model(ForumHomeModel);
app.model(BoardMOdel);
app.model(ReplyListModel);
app.model(MailModel);
app.model(UserInfoModel);
app.model(SearchModel);
app.model(ForumUserModel);


app.router(({history}) => (
        <Router history={history}>
            <Layout>

                <Content style={{minHeight: '300px'}}>
                    <Switch>

                        <Route exact path="/home"  component={HomePage}/>
                        <Route exact path="/userinfo" component={UserPage}/>
                        <Route  path="/uid=:uid" component={UserPage}/>
                        <Route exact path="/userarticle" component={UserPage}/>
                        <Route exact path="/mypost" component={MyPostPage}/>
                        <Route exact path="/privateLetter" component={LetterPage}/>
                        <Route exact path="/reply" component={ReplyPage}/>
                        <Route exact path="/search" component={SearchPage}/>
                        <Route exact path="/newpost" component={NewTopicPage}/>
                        <Route exact path="/allboard" component={AllBoardPage}/>
                        <Route path="/board=:boardid" component={BoardPage}/>
                        <Route path="/topic=:topicid" component={TopicPage}/>
                    </Switch>
                </Content>
            </Layout>
        </Router>
    )
);

app.start('#root');

//registerServiceWorker();
