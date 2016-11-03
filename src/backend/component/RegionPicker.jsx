import React, {Component} from 'react';
import {Cascader, Tag,Button} from 'antd';


const optionsDefault = [{
    value: '四川',
    label: '四川',
    children: [{
        value: '成都',
        label: '成都',
        children: [{
            value: '武侯区',
            label: '武侯区',
            children: [{
                value: '新希望路',
                label: '新希望路',
            }, {
                value: '科华路',
                label: '科华路',
            }]
        }],
    }],
}, {
    value: '北京',
    label: '北京',
    children: [{
        value: '海淀区',
        label: '海淀区',
        children: [{
            value: '西土城路',
            label: '西土城路',
        }]
    }],
}];

class RegionPicker extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: [],
            tags: [],
            options: optionsDefault.concat(),
            map: {}
        }
        this.onChange = this.onChange.bind(this);
        this.onClose = this.onClose.bind(this);
    }

    onChange(value, selectedOptions) {
        const tags = this.state.tags.concat(selectedOptions.slice(-1))
        let map = this.state.map;
        map[value[value.length - 1]] = true;
        const options = this.getOptions(optionsDefault.concat(), map)

        const state = {
            value: [],
            tags,
            map,
            options
        }
        console.log('onchange', state)

        this.setState(state)
    }

    getOptions(options, map) {
        return options.map(item => {
            item.disabled = map[item.value]?true:false;
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
        const options = this.getOptions(optionsDefault.concat(), map)

        const state = {
            value: [],
            tags,
            map,
            options
        }
        console.log('onClose', state)
        this.setState(state)
    }

    render() {

        const {options, value, tags} = this.state;

        console.warn('render', options, value, tags)
        return (
            <div>
                <Cascader options={options} value={value} onChange={this.onChange} popupPlacement="topLeft">
                    <Button type={'primary'} size="small" htmlType={'button'} style={{display:'inline-block',marginRight:10}}>选择地址</Button>
                </Cascader>
                {
                    tags.map(({value, label})=>(
                        <Tag closable afterClose={()=>this.onClose(value)} key={value} >{label}</Tag>))
                }
            </div>
        )
    }
}

export default RegionPicker;
