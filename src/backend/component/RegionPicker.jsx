import React, {Component,PropTypes} from 'react';
import {Cascader, Tag,Button} from 'antd';
import {fetchRegionIfNeeded} from '../actions/region';
import {connect} from 'react-redux';


@connect((state, ownProps)=>({
    region:state.region,
}), (dispatch, ownProps)=>({
    fetchRegionIfNeeded: (payload)=>dispatch(fetchRegionIfNeeded(payload)),
}))
class RegionPicker extends Component {
    static defaultProps = {
        onChange:(e)=>(e),
        value:[]
    }
    static propTypes = {
        onChange: PropTypes.func,
        value:PropTypes.array
    }
    constructor(props) {
        super(props)
        this.state = {
            value: props.value.concat(),
            tags: [],
            options: [],
            map: {}
        }
        this.onChange = this.onChange.bind(this);
        this.onClose = this.onClose.bind(this);
        this.loadData = this.loadData.bind(this);
    }

    componentWillMount(){
        this.props.fetchRegionIfNeeded();
    }

    mapRegionToOptions(region){
        let options = [];

        if(region.top) {
            options = this.getChildren(region.top, region)
        }
        return options
    }

    getChildren(item,region){
        return item.map((item) => {
            const data ={
                label:item.name,
                value:item.id,
                code:item.code,
                isLeaf:item.level=='4'
            }

            if(region[item.code]){
                data.children = this.getChildren(region[item.code],region)
            }

            return data
        })
    }

    componentWillReceiveProps(nextProps){
        console.warn('componentWillReceiveProps',nextProps)
        this.setState({options:this.mapRegionToOptions(nextProps.region)})
    }


    onChange(value, selectedOptions) {

        console.log('onchange', value,selectedOptions,this.state)

        const tags = this.state.tags.concat(selectedOptions.slice(-1))
        let map = this.state.map;
        map[value[value.length - 1]] = true;
        const options = this.getOptions(this.state.options.concat(), map)

        const state = {
            value: value,
            tags,
            map,
            options
        }

        this.setState(state)

        this.props.onChange(tags.map(item=>({
            streetId:item.value,
            streetName:item.label
        })))
    }

    getOptions(options, map) {
        return options.map(item => {
            item.disabled = map[item.value] ? true : false;
            if (item.children) {
                item.children = this.getOptions(item.children, map)
            }
            return item
        })
    }

    onClose(key) {
        const map = Object.assign({}, this.state.map);
        const tags = this.state.tags.filter(({value, label})=> value != key);
        delete  map[key];
        const options = this.getOptions(this.state.options.concat(), map)

        const state = {
            tags,
            map,
            options
        }
        console.log('onClose', state)
        this.setState(state)
    }
    loadData(treeNode) {
        const targetOption =  treeNode[treeNode.length - 1]
        console.warn('loadData', targetOption)

        this.props.fetchRegionIfNeeded(targetOption.code);
    }
    render() {

        const {options, value, tags} = this.state;


        console.warn('render', options, value, tags)
        return (
            <div>
                <Cascader options={options} value={value} onChange={this.onChange} popupPlacement="topLeft" loadData={this.loadData}>
                    {/*<Button type={'primary'} size="small" htmlType={'button'} style={{display:'inline-block',marginRight:10}}>选择地址</Button>*/}
                </Cascader>
                {
                    tags.map(({value, label})=>(
                        <Tag closable afterClose={()=>this.onClose(value)} key={value} >{label}</Tag>))
                }
            </div>
        )
    }
}


;

export default RegionPicker;
