import dva, {connect} from 'dva';
import {Router, Route, Switch, routerRedux, browserHistory} from 'dva/router';
import * as React from 'react';
import {Layout, message} from 'antd';
import './index.css';
import registerServiceWorker from './registerServiceWorker';


import TestsysHomePageComponent from './components/TestsysHomePage';
import TestsysTeacherPageComponent from './components/TestsysTeacher';
import TestsysStudentPageComponent from './components/TestsysStudent';
import TestsysTeacherQuestionPageComponent from './components/TestsysTeacherQuestion';
import TestsysTeacherQuestionInsertComponent from './components/TestsysTeacherQuestionInsert';
import TestsysTeacherQuestionSearchComponent from './components/TestsysTeacherQuestionSearch'
import TestsysTeacherPaperPageComponent from './components/TestsysTeacherPaper';
import TestsysTeacherPaperInsertComponent from './components/TestsysTeacherPaperInsert'
import TestsysTeacherPaperSearchComponent from './components/TestsysTeacherPaperSearch'
import TestsysTeacherResultPageComponent from './components/TestsysTeacherResult'
import TestsysTeacherResultSidComponent from './components/TestsysTeacherResultSid'
import TestsysTeacherResultPidComponent from './components/TestsysTeacherResultPid'
import TestsysTeacherResultQtypeComponent from './components/TestsysTeacherResultQtype'
import TestsysTeacherResultQunitComponent from './components/TestsysTeacherResultQunit'
import TestsysStudentPaperPageComponent from "./components/TestsysStudentPaper";
import TestsysStudentQuestionReviewPageComponent from "./components/TestsysStudentQuestionReview";


import LoginModel from './models/loginModel';
import NavigationModel from './models/navigationModel';
import FreeClassroomInfoModel from './models/FreeClassroomInfoModel';
import CourseInfoModel from './models/CourseInfoModel';
import UserInfoModel from './models/userInfoModel';

import TestsysTeacherQuestionModel from './models/TestsysTeacherQuestionModel';



import TestsysTeacherPaperModel from './models/TestsysTeacherPaperModel'
import TestsysModel from './models/TestsysModel'
import TestsysTeacherResultModel from './models/TestsysTeacherResultModel'
import TestsysStudentScoreComponent from "./components/TestsysStudentScore";
import TestsysStudentModel from './models/TestsysStudentModel'



import CurriculumTeacherModel from './models/CurriculumTeacherModel'
import CurriculumManageModel from './models/CurriculumManageModel'
import ClassroomManageModel from './models/ClassroomManageModel'
import AutoSchedulingModel from './models/AutoSchedulingModel'
import CourseModel from './models/courseModel';
import PswdModel from './models/pswdModel';
import DeptModel from './models/deptModel';
import SelectionModel from './models/SelectionModel';
import StuListModel from './models/StuListModel';
import ScoreUploadModel from './models/ScoreUploadModel'
import ApplyModifyModel from './models/ApplyModifyModel'
import ScoreManagerModel from './models/ScoreManagerModel'

import DeptManagePageComponent from './components/DeptManagePage';
import { TssFooter, TssHeader } from './components/TssPublicComponents';
import HomePageComponent from './components/HomePage';
import NavigationPageComponent from './components/NavigationPage';
import UserPageComponent from './components/UserPage';
import UserManagePageComponent from './components/UserManagePage';
import AutoSchedulingComponent from './components/AutoScheduling';
import ManualSchedulingPageComponent from './components/ManualScheduling';
import ManualSchModifyPageComponent from './components/ManualSchModify';
import SetSchedulingTimeComponent from './components/SetSchedulingTime'
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


import scoreUploadComponent from './components/ScoreUpload';
import applyModifyComponent from './components/ApplyModify';
import scoreManagerComponent from './components/ScoreManager'
import ScoreManager from './components/ScoreManager';


const {Content} = Layout;


const app = dva({
    history: browserHistory
});

app.model(LoginModel);
app.model(NavigationModel);
app.model(UserInfoModel);

app.model(TestsysTeacherQuestionModel);
app.model(TestsysTeacherPaperModel);
app.model(TestsysModel);
app.model(TestsysTeacherResultModel);
app.model(TestsysStudentModel);


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
app.model(LoginModel);
app.model(NavigationModel);
app.model(UserInfoModel);
app.model(FreeClassroomInfoModel);
app.model(CourseInfoModel);
app.model(CurriculumTeacherModel);
app.model(CurriculumManageModel);
app.model(ClassroomManageModel);




app.model(ScoreUploadModel);
app.model(ApplyModifyModel);
app.model(ScoreManagerModel);


const HomePage = connect(state => {
    return {}
})(HomePageComponent);


app.model(ScoreUploadModel);
app.model(ApplyModifyModel);
app.model(ScoreManagerModel);

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

const NavigationPage = connect(state => {
    const {uid, level} = state.login;
    return {level: level, uid: uid}
})(NavigationPageComponent);

const DeptManagePage = connect(state => {
    return {...state.dept, pswdShow: state.pswd.show};
})(DeptManagePageComponent);

const UserPage = connect(state => {
    return {...state.userinfo};
})(UserPageComponent);

const UserManagePage = connect(state => {
    return {};
})(UserManagePageComponent);


const TestsysHomePage = connect (state => {
    return{}
})(TestsysHomePageComponent);

const TestsysTeacherPage = connect(state => {
    return{}
})(TestsysTeacherPageComponent);

const TestsysStudentPage = connect(state => {
    return {...state.testsys_student};
})(TestsysStudentPageComponent);

const TestsysTeacherQuestionPage = connect(state => {
    return {...state.teacherquestion};
})(TestsysTeacherQuestionPageComponent);

const TestsysTeacherPaperPage = connect(state => {
    return{...state.teacherpaper}
})(TestsysTeacherPaperPageComponent);

const TestsysTeacherQuestionInsertPage = connect(state => {
    return {...state.userinfo};
})(TestsysTeacherQuestionInsertComponent);

const TestsysTeacherQuestionSearchPage = connect(state => {
    return {...state.teacherquestion};
})(TestsysTeacherQuestionSearchComponent);


const TestsysStudentPaperPage = connect(state => {
    return {...state.testsys_student};
})(TestsysStudentPaperPageComponent);

const TestsysStudentQuestionReviewPage = connect(state => {
    return {...state.testsys_student};
})(TestsysStudentQuestionReviewPageComponent);

const TestsysStudentScorePage = connect(state => {
    return {...state.testsys_student};
})(TestsysStudentScoreComponent);


const TestsysTeacherPaperInsertPage = connect(state => {
    return{...state.teacherpaper}
})(TestsysTeacherPaperInsertComponent);

const TestsysTeacherPaperSearchPage = connect(state => {
    return{...state.teacherpaper}
})(TestsysTeacherPaperSearchComponent);

const TestsysTeacherResultPage = connect(state => {
    return {...state.teacherresult};
})(TestsysTeacherResultPageComponent);

const TestsysTeacherResultSidPage = connect(state => {
    return {...state.teacherresult};
})(TestsysTeacherResultSidComponent);

const TestsysTeacherResultPidPage = connect(state => {
    return {...state.teacherresult};
})(TestsysTeacherResultPidComponent);

const TestsysTeacherResultQtypePage = connect(state => {
    return {...state.teacherresult};
})(TestsysTeacherResultQtypeComponent);

const TestsysTeacherResultQunitPage = connect(state => {
    return {...state.teacherresult};
})(TestsysTeacherResultQunitComponent);



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

const SetSchedulingTimePage = connect(state => {
    return{};
})(SetSchedulingTimeComponent);

const CourseManagePage = connect(state => {
    return {...state.course, pswdShow: state.pswd.show};
})(CourseManagePageComponent);


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


})(StudentListComponent);




const ScoreUploadPage = connect(state => {
    const {uid, level} = state.login;
    return {uid: uid, _state: state.scoreUpload};
})(scoreUploadComponent);


const ApplyModifyPage = connect(state => {
    const { uid, level } = state.login;
    return { uid: uid, _state: state.applyModify };
})(applyModifyComponent);


const ScoreManagerPage = connect(state => {
    return {  _state: state.scoreManager };
})(scoreManagerComponent);

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

                        <Route path="/testsys" component={TestsysHomePage}/>
                        <Route path="/testsys_teacher" component={TestsysTeacherPage}/>
                        <Route path="/testsys_student" component={TestsysStudentPage}/>
                        <Route path="/testsys_teacher_question" component={TestsysTeacherQuestionPage}/>
                        <Route path="/testsys_teacher_question_insert" component={TestsysTeacherQuestionInsertPage}/>
                        <Route path="/testsys_teacher_question_search" component={TestsysTeacherQuestionSearchPage}/>

                        <Route path="/testsys_student_paper" component={TestsysStudentPaperPage}/>
                        <Route path="/testsys_student_question_review" component={TestsysStudentQuestionReviewPage}/>
                        <Route path="/testsys_student_score" component={TestsysStudentScorePage}/>

                        <Route path="/testsys_teacher_paper" component={TestsysTeacherPaperPage}/>
                        <Route path="/testsys_teacher_paper_insert" component={TestsysTeacherPaperInsertPage}/>
                        <Route path="/testsys_teacher_paper_search" component={TestsysTeacherPaperSearchPage}/>
                        <Route path="/testsys_teacher_result" component={TestsysTeacherResultPage}/>
                        <Route path="/testsys_teacher_result_sid" component={TestsysTeacherResultSidPage}/>
                        <Route path="/testsys_teacher_result_pid" component={TestsysTeacherResultPidPage}/>
                        <Route path="/testsys_teacher_result_qtype" component={TestsysTeacherResultQtypePage}/>
                        <Route path="/testsys_teacher_result_qunit" component={TestsysTeacherResultQunitPage}/>


                        <Route path="/autoScheduling" component={AutoSchedulingPage} />
                        <Route path="/manualScheduling" component={ManualSchedulingPage} />
                        <Route path="/manualSchModify/:name" component={ManualSchModifyPage} />
                        <Route path="/classroomManage" component={ClassroomManagePage}/>
                        <Route path="/curriculumTeacher" component={CurriculumTeacherPage}/>
                        <Route path="/curriculumManage" component={CurriculumManagePage}/>
                        <Route path="/setSchedulingTime" component={SetSchedulingTimePage}/>
                        <Route path="/courseManage" component={CourseManagePage}/>
                        <Route path="/deptManage" component={DeptManagePage}/>
                        <Route path="/plan" component={PlanPage}/>
                        <Route path="/manageTime" component={ManageTimePage}/>
                        <Route path="/manSelect" component={ManSelectPage}/>
                        <Route path="/stuSelect" component={StuSelectPage}/>
                        <Route path="/classSelect/:courseId" component={ClassSelectPage}/>
                        <Route path="/stuList/:classId" component={StuListPage}/>



                        <Route path="/scoreUpload" component={ScoreUploadPage} />
                        <Route path="/applyModify" component={ApplyModifyPage} />
                        <Route path="/scoreManager" component={ScoreManagerPage} />

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

//registerServiceWorker();
