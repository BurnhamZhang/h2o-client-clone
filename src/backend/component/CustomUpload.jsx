import React, {Component,PropTypes} from 'react';
import {Button, Upload, Icon,message} from 'antd';


class CustomUpload extends Component {
    constructor(props){
        super(props);
        this.state = this.mapValueToFileList(props.value);
    }
    static propTypes = {
        onChange: PropTypes.func,
    }
    componentWillReceiveProps(nextProps){

        this.setState(this.mapValueToFileList(nextProps.value));

    }
    mapValueToFileList(value){
        let fileList = [];
        let isList = false;
        if(Array.isArray(value)){
             value.forEach((item,index)=>{
                fileList.push({
                    uid: (-index)+'',
                    name: item,
                    status: 'done',
                    url: item,
                })
            })
            isList = true;

        }
        else if(value){
            fileList.push({
                uid: -1,
                name: value,
                status: 'done',
                url: value,
            });

        }
        return {
            fileList,
            isList
        }
    }
    onChange(e){
        console.log('onChange',e);

        let fileList = e.fileList;

        fileList = fileList.filter((file) => {
            if (file.response) {
                if(file.response.code!='A00000'){
                    message.warn(file.response.response.remoteMsg||file.response.msg)
                    return false
                }
                // Component will show file.url as link
                file.url = file.response.response.data.url;
                file.thumbUrl = file.url;
                file.name = file.url;
                delete  file.response
                // file.uid = file.url;
            }
            return true;
        });

        console.warn('fileList',fileList,e)
        if(this.state.isList){

            if(e.file.status == 'removed'){
                this.props.onChange(null)
            }
            else if(e.file.status == 'done'){
                this.props.onChange(fileList.map((item)=>item.url))
            }
        }
        else {
            fileList = fileList.slice(-1);

            if(e.file.status == 'removed'){
                this.props.onChange(null)
            }
            else if(e.file.status == 'done'){
                this.props.onChange(e.file.response.response.data.url)
            }
        }

        this.setState({
            fileList
        })


    }
    render(){
        const { fileList } = this.state;
        const props = {
            name:'image',
            action: '/api/upload',
            listType: 'picture',
            // listType: 'picture-card',
            fileList
        };

        return (
            <Upload {...props} className="upload-list-inline" onChange={(e)=>this.onChange.call(this,e)}>
                <Button type="ghost">
                    <Icon type="upload"/> 上传图片
                </Button>
            </Upload>
        )
    }
}


export default CustomUpload;
