import React, {Component,PropTypes} from 'react';
import {Button, Upload, Icon} from 'antd';


class CustomUpload extends Component {
    constructor(props){
        super(props);
        let fileList = [];
        if(props.value){
            fileList.push({
                uid: -1,
                name: props.value,
                status: 'done',
                url: props.value,
            });
        }
       this.state ={
           fileList
       }
    }
    static propTypes = {
        value: PropTypes.string,
        onChange: PropTypes.func,
    }
    onChange(e){
        let fileList = e.fileList;
        fileList = fileList.slice(-1);
        this.setState({
            fileList
        })
        if(e.file.status == 'removed'){
            this.props.onChange(null)
        }
        else if(e.file.status == 'done'){
            this.props.onChange(e.file.response.response.data.url)
        }

    }
    render(){
        const { fileList } = this.state;
        const props = {
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
