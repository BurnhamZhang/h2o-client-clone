import React, {Component,PropTypes} from 'react';
import {Button, Upload, Icon} from 'antd';


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

        if(this.state.isList){
            fileList = fileList.map((file) => {
                if (file.response) {
                    // Component will show file.url as link
                    file.url = file.response.response.data.url;
                    file.thumbUrl = file.url;
                    file.name = file.url;
                    file.uid = file.url;
                }
                return file;
            });


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
