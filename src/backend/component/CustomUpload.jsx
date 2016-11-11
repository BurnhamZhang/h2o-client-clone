import React, {Component,PropTypes} from 'react';
import {Button, Upload, Icon,message} from 'antd';

class CustomUpload extends Component {
    constructor(props){
        super(props);
        this.onChange = this.onChange.bind(this);
        const value = props.value||props.defaultValue;
        this.state = this.mapValueToFileList(value.concat([]));
    }

    static defaultProps = {
        value:[],
        defaultValue:[],
        maxLength:5
    }
    static propTypes = {
        onChange: PropTypes.func,
        maxLength:PropTypes.number,
        value:PropTypes.array,
        defaultValue:PropTypes.array
    }
    componentWillReceiveProps(nextProps){
        const value = nextProps.value||nextProps.defaultValue;
        this.setState(this.mapValueToFileList(value.concat([])));

    }
    mapValueToFileList(value){
        let fileList = [];
        if(Array.isArray(value)){
             value.forEach((item,index)=>{
                fileList.push({
                    uid: (-index)+'',
                    name: item,
                    status: 'done',
                    url: item,
                })
            })
        }
        return {
            fileList,
        }
    }
    onChange(e){

        let fileList = e.fileList.concat([]);

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


        fileList = fileList.slice(-this.props.maxLength);
        if(/^(removed|done)$/.test(e.file.status)){
            console.warn('onChange>>>>>>>>>>>');
            if(this.props.onChange){
                this.props.onChange(fileList.map((item)=>item.url))
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
            <Upload {...props} className="upload-list-inline" onChange={this.onChange}>
                <Button type="ghost">
                    <Icon type="upload"/> 上传图片
                </Button>
            </Upload>
        )
    }
}


export default CustomUpload;
