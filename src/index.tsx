import dva, {connect} from 'dva';
import {Router, Route, Switch, routerRedux, browserHistory} from 'dva/router';
import * as React from 'react';
import {Layout, message} from 'antd';

import registerServiceWorker from './registerServiceWorker';
import './index.css';
import LoginModel from './models/loginModel';
import NavigationModel from './models/navigationModel';
import FreeClassroomInfoModel from './models/FreeClassroomInfoModel';
import CourseInfoModel from './models/CourseInfoModel';
import UserInfoModel from './models/userInfoModel';
import CurriculumTeacherModel from './models/CurriculumTeacherModel'
import CurriculumManageModel from './models/CurriculumManageModel'
import ClassroomManageModel from './models/ClassroomManageModel'
import AutoSchedulingModel from './models/AutoSchedulingModel'
import CourseModel from './models/courseModel';
import PswdModel from './models/pswdModel';
import DeptModel from './models/deptModel';
import SelectionModel from './models/SelectionModel';
import StuListModel from './models/StuListModel';
import DeptManagePageComponent from './components/DeptManagePage';
import { TssFooter, TssHeader } from './components/TssPublicComponents';
import HomePageComponent from './components/HomePage';
import NavigationPageComponent from './components/NavigationPage';
import UserPageComponent from './components/UserPage';
import UserManagePageComponent from './components/UserManagePage';
import AutoSchedulingComponent from './components/AutoScheduling';
import ManualSchedulingPageComponent from './components/ManualScheduling';
import ManualSchModifyPageComponent from './components/ManualSchModify';
import CourseManagePageComponent from './components/CourseManagePage';
import ClassroomManagePageComponent from './components/ClassroomManagePage';
import CurriculumTeacherPageComponent from './components/CurriculumTeacher';
import CurriculumManagePageComponent from './components/CurriculumManage';
import ManageTimeComponent from './components/ManageTime';
import PlanComponent from './components/Plan'
import ManagerSelectionComponent from './components/SelectionManager';
import StudentSelectionComponent from './components/SelectionStudent';
import ClassSelectionComponent from './components/SelectionClass';
import StudentListComponent from './components/StudentList';


import ForumHomePageComponent from './components/ForumHomePage';
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

const app = dva({
    history: browserHistory
});

app.model(LoginModel);
app.model(NavigationModel);
app.model(UserInfoModel);
app.model(FreeClassroomInfoModel);
app.model(CourseInfoModel);
app.model(CurriculumTeacherModel);
app.model(CurriculumManageModel);
app.model(ClassroomManageModel);


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

const AutoSchedulingPage = connect(state => {
    const dataSource = state.autoscheduling.dataSource;
    const totalCourse = state.autoscheduling.totalCourse;
    //console.log(state.autoscheduling.dataSource);
    return {dataSource: dataSource, totalCourse: totalCourse};
})(AutoSchedulingComponent);

const ManualSchedulingPage = connect(state => {
    const {dataSource} = state.courseinfo;
    return {dataSource: dataSource};
})(ManualSchedulingPageComponent);

const ManualSchModifyPage = connect(state => {
    const dataSource = state.freeclassroominfo.dataSource;
    return {dataSource: dataSource, courseInfo:  state.freeclassroominfo.selectedCourseInfo};
})(ManualSchModifyPageComponent);

const ClassroomManagePage = connect(state => {
    const {dataSource} = state.classroommanage;
    return {dataSource:dataSource};

})(ClassroomManagePageComponent);

const CurriculumTeacherPage = connect(state => {
    const {dataSource} = state.curriculumteacher;
    return {dataSource: dataSource};
})(CurriculumTeacherPageComponent);

const CurriculumManagePage = connect(state => {
    const dataSource = state.curriculummanage.dataSource;
    const buildingData = state.curriculummanage.buildingData;
    const classroomData = state.curriculummanage.classroomData;
    return {dataSource: dataSource, buildingData: buildingData, classroomData: classroomData};
})(CurriculumManagePageComponent);

const CourseManagePage = connect(state => {
    return {...state.course, pswdShow: state.pswd.show};
})(CourseManagePageComponent);

const DeptManagePage = connect(state => {
    return {...state.dept, pswdShow: state.pswd.show};
})(DeptManagePageComponent);


const ManageTimePage = connect(state =>{
    return{};
})(ManageTimeComponent)

const PlanPage = connect(state => {
    return {};
})(PlanComponent)

const ManSelectPage = connect(state =>{
    const {dataSource} = state.courseinfo;
    return {dataSource: dataSource};
})(ManagerSelectionComponent)

const StuSelectPage = connect(state =>{
    const {dataSource} = state.selectCourse;
    return {dataSource: dataSource}
})(StudentSelectionComponent)

const ClassSelectPage = connect(state =>{
    return {};
})(ClassSelectionComponent)

const StuListPage = connect(state =>{
    const {dataSource} = state.studentList;
    return {dataSource: dataSource};
})(StudentListComponent)



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



app.router(({history}) => (
        <Router history={history}>
            <Layout>
                <TssHeader />
                <Content style={{minHeight: '600px'}}>
                    <Switch>
                        <Route path="/" exact component={HomePage}/>
                        <Route path="/navi" component={NavigationPage}/>
                        <Route path="/user" component={UserPage}/>
                        <Route path="/userManage" component={UserManagePage}/>
                        <Route path="/autoScheduling" component={AutoSchedulingPage} />
                        <Route path="/manualScheduling" component={ManualSchedulingPage} />
                        <Route path="/manualSchModify/:name" component={ManualSchModifyPage} />
                        <Route path="/classroomManage" component={ClassroomManagePage}/>
                        <Route path="/curriculumTeacher" component={CurriculumTeacherPage}/>
                        <Route path="/curriculumManage" component={CurriculumManagePage}/>
                        <Route path="/courseManage" component={CourseManagePage}/>
                        <Route path="/deptManage" component={DeptManagePage}/>
                        <Route path="/plan" component={PlanPage}/>
                        <Route path="/manageTime" component={ManageTimePage}/>
                        <Route path="/manSelect" component={ManSelectPage}/>
                        <Route path="/stuSelect" component={StuSelectPage}/>
                        <Route path="/classSelect/:courseId" component={ClassSelectPage}/>
                        <Route path="/stuList/:classId" component={StuListPage}/>

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
            <TssFooter/>
            </Layout>
        </Router>
    )
);

app.start('#root');

registerServiceWorker();
