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

const SetSchedulingTimePage = connect(state => {
    return{};
})(SetSchedulingTimeComponent);

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
                        <Route path="/setSchedulingTime" component={SetSchedulingTimePage}/>
                        <Route path="/courseManage" component={CourseManagePage}/>
                        <Route path="/deptManage" component={DeptManagePage}/>
                        <Route path="/plan" component={PlanPage}/>
                        <Route path="/manageTime" component={ManageTimePage}/>
                        <Route path="/manSelect" component={ManSelectPage}/>
                        <Route path="/stuSelect" component={StuSelectPage}/>
                        <Route path="/classSelect/:courseId" component={ClassSelectPage}/>
                        <Route path="/stuList/:classId" component={StuListPage}/>
                    </Switch>
                </Content>
            <TssFooter/>
            </Layout>
        </Router>
    )
);

app.start('#root');

registerServiceWorker();
