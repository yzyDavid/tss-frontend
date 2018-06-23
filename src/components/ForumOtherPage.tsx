import * as React from 'react';
import {Component} from 'react';
import {Form, Button,  Upload,Icon} from 'antd';
import DvaProps from '../types/DvaProps';
import NavigationBar from './ForumNavigation';

interface UserProps extends DvaProps {
    userInfo:any
    unread:any
}

const FormItem = Form.Item;

export default class ForumUserPageComponent extends Component<UserProps> {

    state = {
        uid:"",
        previewVisible: false,
        previewImage: '',
        fileList: [{
            uid: -1,
            name: 'xxx.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        }],
    };

    constructor(props){
        super(props);

    }

    handleCancel = () => this.setState({ previewVisible: false });

    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    };


    handleChange1 = ({ fileList }) => this.setState({ fileList });


    getBase64(img, callback) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }
    handleChange = (info,) => {

        if(info.file.status ==="error"){
            this.props.dispatch({type:'forumUser/changePhoto', payload:info})
        }

    };


    gotoPage=(e)=>{
        this.props.dispatch({type:'forumhome/gotoPage', payload:e})
    }
    beforeUpload(file) {
        const isJPG = file.type === 'image/png';
        if (!isJPG) {

        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {

        }
        return isJPG && isLt2M;
    }

    componentWillMount(){

        var uid = document.location.hash;
        var offset = "/forum/uid/"
        uid = uid.substring(offset.length+1);
        this.setState({uid:uid})
        this.props.dispatch({type:"ForumNavigation/updateUnread",payload:{}});
    }
    render() {
        const { previewVisible, previewImage, fileList } = this.state;
        return <div>
            <NavigationBar unread={this.props.unread}  current={""} dispatch={this.props.dispatch}/>
            <div style={{marginLeft: 200, marginRight: 200, marginTop: 10}}>
                <div style={{marginLeft: "45%"}}>
                    <img height="100" width="100" src={this.props.userInfo.photo}></img>

                </div>
                <div style={{marginLeft: "40%", marginTop: 20, fontSize: 22}}>
                    <div><Icon
                        type="user"/>&nbsp;用户名:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{this.props.userInfo.UserName}
                    </div>
                    <div style={{marginTop: 10}}><Icon
                        type="mail"/>&nbsp;E-mail:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{this.props.userInfo.email}
                    </div>
                    <div style={{marginTop: 10}}><Icon
                        type="mobile"/>&nbsp;Tel:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{this.props.userInfo.tel}
                    </div>
                    <div style={{marginTop: 10}}><Icon
                        type="line-chart"/>&nbsp;发帖统计:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{this.props.userInfo.postNum}</div>
                    <div style={{marginTop: 10}}><Icon
                        type="info"/>&nbsp;个人简介:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{this.props.userInfo.description}</div>
                    <div style={{marginTop: 10}}><a onClick={this.gotoPage.bind(this,"/forum/userpost/"+this.state.uid+"/1")}>查看发帖纪录</a></div>
                    <div style={{marginTop: 10}}><a onClick={this.gotoPage.bind(this,"/forum/privateLetter")}>给Ta私信</a></div>
                </div>
                <div style={{marginLeft: "45%", marginTop: 20}}>
                    <Upload

                        action=""
                        listType="picture"

                        // onPreview={this.handlePreview}
                        onChange={this.handleChange}
                        // showUploadList={false}
                        // action="//jsonplaceholder.typicode.com/posts/"
                        // beforeUpload={this.beforeUpload}
                        // onChange={this.handleChange}
                    >

                    </Upload>

                </div>
            </div>
        </div>;
    }
}