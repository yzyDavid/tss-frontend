import * as React from 'react';
import {Component} from 'react';
import {Form, Button,  Upload,Icon,Pagination} from 'antd';
import DvaProps from '../types/DvaProps';
import NavigationBar from './ForumNavigation';
import {readFile} from "fs";
import {Simulate} from "react-dom/test-utils";
import waiting = Simulate.waiting;


export class photoDataForm{
    bytes:any
    name:string
}
interface UserProps extends DvaProps {
    userInfo:any
    unread:any
    photo:any
    postList:any
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
        reader: new FileReader(),
        fileType:""
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




    handleChange = (info) => {

        console.log("info")
        console.log(info)

        var type = info.file.originFileObj.name;
        var pos = type.length;
        for(var i = pos-1;i>=0;i--){
            if(type.charAt(i)==='.'){
                pos=i;
                break;
            }
        }

        type = type.substring(pos+1);
        console.log("类型");
        console.log(type)

        this.setState({fileType:type})
        this.state.reader.readAsArrayBuffer(info.file.originFileObj)

//        setTimeout("this.changePhoto()", 3000); // 1秒钟后调用callback函数
        setTimeout(()=>{
            var buf = new Uint8Array(this.state.reader.result);
            const data = new photoDataForm;
            data.bytes = buf;
            data.name = this.state.fileType;
            this.props.dispatch({type:"forumUser/changePhoto",payload:data})
        },2000);

        this.state.reader.onload=function (ev) {
            console.log("我好了")

        };


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
    request(){

    }

    componentWillMount(){

        this.props.dispatch({type:"ForumUserInfo/getMyInfo",payload:{}});

        this.props.dispatch({type:"ForumNavigation/updateUnread",payload:{}});
    }
    render() {



        return <div>
            <NavigationBar unread={this.props.unread}  current={""} dispatch={this.props.dispatch}/>
            <div style={{marginLeft: 200, marginRight: 200, marginTop: 10}}>
                <div style={{marginLeft: "45%"}}>
                    <img height="100" width="100" src={this.props.photo.url}></img>

                </div>
                <div style={{marginLeft: "40%", marginTop: 20, fontSize: 22}}>
                    <div><Icon
                        type="user"/>&nbsp;用户名:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{this.props.userInfo.userName}
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
                    <div style={{marginTop: 10}}><a onClick={this.gotoPage.bind(this,"/forum/mypost/page=1")}>查看发帖纪录</a></div>

                </div>
                <div style={{marginLeft: "45%", marginTop: 20}}>
                    {/*<Upload*/}

                        {/*// action=""*/}
                        {/*// listType="picture"*/}

                        {/*// onPreview={this.handlePreview}*/}
                        {/*onChange={this.handleChange.bind(this)}*/}
                        {/*customRequest={this.request}*/}
                        {/*// showUploadList={false}*/}
                        {/*// action="//jsonplaceholder.typicode.com/posts/"*/}
                        {/*// beforeUpload={this.beforeUpload}*/}
                        {/*// onChange={this.handleChange}*/}
                    {/*>*/}
                        {/*<Button type="primary"><Icon type="edit"/>更换头像</Button>*/}
                    {/*</Upload>*/}

                </div>
            </div>



        </div>;
    }
}