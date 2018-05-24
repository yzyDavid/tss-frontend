import dva, {connect} from 'dva';
import {Router, Route, Switch,  browserHistory} from 'dva/router';
import * as React from 'react';
import {Layout} from 'antd';

import ForumHomePageComponent from './components/ForumHomePage';
import './index.css';
import ForumNavigationModel from './models/forumNavigationModel';
import ForumUserInfoModel from './models/forumUserInfoModel';
import ForumUserPageComponent from './components/ForumUserPage'
import MyPostPageComponent from './components/ForumMyPostPage'
import ReplyPageComponent from './components/ForumReplyPage'
import NewTopicPageComponent from './components/ForumNewTopicPage'
import LetterPageComponent from './components/ForumMailPage'
import ForumSearchModel from './models/forumSearchModel'
import ForumAllBoardModel from './models/forumAllBoardModel'
import ForumMyPostModel from './models/forumMyPostModel'
import ForumMyBoardModel from './models/forumMyboardModel'
import ForumTopicModel from './models/forumTopicModel'
import BoardPageComponent from './components/ForumBoardPage'
import TopicPageComponent from './components/ForumTopicPage'
import ForumReplyListModel from './models/forumReplyListModel'
import ForumHomeModel from './models/forumHomeModel'
import ForumBoardMOdel from './models/forumBoardModel'
import SearchComponent from "./components/ForumSearchPage"
import AllBoardComponent from "./components/ForumAllBoard"
import ForumMailModel from "./models/forumMailModel"
import ForumUserModel from "./models/forumUserModel"


const {Content} = Layout;


const ForumHomePage = connect(state => {
    const dataSource = state.allboard.uid;
    const mylist = state.myboard.list;
    const hot = state.forumhome.HotList;
    const latest = state.forumhome.LatestList;
    return {uid: dataSource,alllist :state.allboard.list,mylist:mylist,hot:hot,latest:latest };
})(ForumHomePageComponent);

const ForumUserPage = connect(state => {
    const data = state.ForumUserInfo.userInfo;
    return {userInfo:data};
})(ForumUserPageComponent);

const ForumMyPostPage = connect(state => {
    const data = state.mypost.postList;
    return{postList :data};
})(MyPostPageComponent);

const ForumLetterPage = connect(state => {
    const data = state.mail.input;
    return {allstate:data}
})(LetterPageComponent);

const ForumNewTopicPage = connect(state => {
    const data= {boardName: state.board.boardState.BoardName,boardID:state.board.boardState.BoardID};
    return {topicBoardInfo:data}
})(NewTopicPageComponent);

const ForumBoardPage = connect(state => {
    const data = state.board.boardState;

    return { boardinfo:data}
})(BoardPageComponent);

const ForumTopicPage = connect(state => {
    const data = state.topic.allstate;
    return {allstate: data};
})(TopicPageComponent);

const ForumReplyPage = connect(state => {
    const data = state.replyList.replylist;
    return {ReplyList: data};
})(ReplyPageComponent);

const ForumSearchPage = connect(state => {
    const data = state.search.data;
    return {boardList:data}
})(SearchComponent);

const ForumAllBoardPage = connect(state => {
    const data = state.allboard.list;
    return {boardList:data};
})(AllBoardComponent);


const app = dva({
    history: browserHistory
});




app.model(ForumNavigationModel);
app.model(ForumMyBoardModel);
app.model(ForumAllBoardModel);
app.model(ForumMyPostModel);
app.model(ForumTopicModel);
app.model(ForumHomeModel);
app.model(ForumBoardMOdel);
app.model(ForumReplyListModel);
app.model(ForumMailModel);
app.model(ForumUserInfoModel);
app.model(ForumSearchModel);
app.model(ForumUserModel);


app.router(({history}) => (
        <Router history={history}>
            <Layout>

                <Content style={{minHeight: '300px'}}>
                    <Switch>

                        <Route exact path="/home"  component={ForumHomePage}/>
                        <Route exact path="/userinfo" component={ForumUserPage}/>
                        <Route  path="/uid=:uid" component={ForumUserPage}/>
                        <Route exact path="/userarticle" component={ForumUserPage}/>
                        <Route exact path="/mypost" component={ForumMyPostPage}/>
                        <Route exact path="/privateLetter" component={ForumLetterPage}/>
                        <Route exact path="/reply" component={ForumReplyPage}/>
                        <Route exact path="/search" component={ForumSearchPage}/>
                        <Route exact path="/newpost" component={ForumNewTopicPage}/>
                        <Route exact path="/allboard" component={ForumAllBoardPage}/>
                        <Route path="/board=:boardid" component={ForumBoardPage}/>
                        <Route path="/topic=:topicid" component={ForumTopicPage}/>
                    </Switch>
                </Content>
            </Layout>
        </Router>
    )
);

app.start('#root');

//registerServiceWorker();
