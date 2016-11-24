import React, {Component} from 'react';
import {List, Checkbox, Flex, Stepper, Icon, Popup, Button, InputItem} from 'antd-mobile';
import {get_geolocation,setGeoCache} from '../actions/geo';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import debounce from 'debounce';

const Item = List.Item;
const Brief = Item.Brief;
let geocoder,searchService,geocoder2;


@withRouter
@connect((state, ownProps)=>({
    local:state.geo.location,
    isFetching:state.geo.isFetching,
    addressComponents:state.geo.addressComponents,
}), (dispatch, ownProps)=>({
    get_geolocation: ()=>dispatch(get_geolocation()),
    setGeoCache: (payload)=>dispatch(setGeoCache(payload))
}))
class Map extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.state = {
            pois: null,
            nearPois: [],
            value:''
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.local &&  (!nextProps.isFetching || this.props.isFetching)){
            this.map.setCenter(nextProps.local)
        }
    }
    componentDidMount() {
        this.map = new qq.maps.Map(this.refs.map, {
            zoom: 15                                                 // 地图的中心地理坐标。
        });

        if(this.props.local){
            this.map.setCenter(this.props.local)
        }
        else {
            this.props.get_geolocation();
        }


        geocoder = new qq.maps.Geocoder({
            complete: (result)=> {
                this.setState({
                    nearPois: result.detail.nearPois
                })
            }
        });

        qq.maps.event.addListener(this.map, 'center_changed', debounce(()=> {
            const center = this.map.getCenter();
            geocoder.getAddress(center);
        }, 500));

    }

    // componentWillReceiveProps(nextProps){
    //     // if(nextProps.location && nextProps.location!=this.props.location){
    //     //     console.warn('componentWillReceiveProps',nextProps.location)
    //     //     this.map.panTo(new qq.maps.LatLng(location.lat, location.lng));
    //     // }
    //     this.map.panTo(new qq.maps.LatLng(30.57, 104.08));
    // }
    onClick(item) {

        geocoder2 = new qq.maps.Geocoder({
            complete: (result)=> {
                result.detail.name = item.name;
                console.log(result);
                this.props.setGeoCache(result.detail)
                this.props.router.goBack();
            }
        });

        geocoder2.getAddress(item.latLng);
    }

    onCancel() {
        console.log('onCancel')
        this.setState({
            pois: null,
            value:'',
            focus:false
        })
    }
    onFocus(focus){
        this.setState({
            focus
        })
    }

    onChange(val) {
        if (!val) {
            this.setState({
                pois: []
            })
            return
        }
        const city = this.props.addressComponents?this.props.addressComponents.city:'宜宾';
        searchService = new qq.maps.SearchService({
            // autoExtend:false,
            //检索成功的回调函数
            location: city,
            pageCapacity: 20,
            autoExtend: true,
            complete: (resp)=> {
                //设置回调函数参数
                var pois = resp.detail.pois;

                if (Array.isArray(pois)) {
                    pois = pois.filter(item=>item.type == 0)
                }
                console.warn('success', resp)
                this.setState({
                    pois: pois || []
                })


            },
            //若服务请求失败，则运行以下函数
            error: (e)=> {
                console.warn('error', e)
                this.setState({
                    pois: []
                })
            }
        });
        searchService.search(val);

    }

    render() {

        return (
            <div id="map">
                <List className="search-bar">
                    <InputItem extra="取消" labelNumber={3} type="search"
                               onChange={ debounce((val)=>this.onChange(val), 500)} onExtraClick={()=>this.onCancel()} onFocus={()=>this.onFocus(true)} onBlur={()=>this.onFocus(false)}>
                        <Icon type="search" />搜索
                    </InputItem>
                </List>
                <div className="full-height" style={{position:'relative'}}>
                    {
                        Array.isArray(this.state.pois) ?
                            (<div className="search-list">
                                    <List>
                                        {
                                            this.state.pois.map((item, index)=>(
                                                <List.Item key={index} onClick={()=>this.onClick(item)}>
                                                    {item.name}
                                                    <Brief>{item.address}</Brief>
                                                </List.Item>
                                            ))
                                        }
                                    </List>
                                </div>
                            ) :null
                    }

                    {
                        this.state.focus ? (
                            <div className="map-mask"></div>
                        ):null
                    }

                    <div className="map-container">
                        <div id="map" ref="map" className="full-height"/>
                        <Icon type="environment"
                              style={{position: 'absolute', top: '50%', left: '50%', color: '#108ee9'}}/>
                    </div>
                    <div className="map-list">
                        <List>
                            {
                                this.state.nearPois.map((item, index)=>(
                                    <List.Item key={index} onClick={()=>this.onClick(item)}
                                               thumb={<Icon type="environment-o"/>}>
                                        {item.name}
                                        <Brief>{item.address}</Brief>
                                    </List.Item>
                                ))
                            }
                        </List>
                    </div>
                </div>


            </div>

        );
    }
}

export default Map;