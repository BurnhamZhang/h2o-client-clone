import React, {Component} from 'react';
import { List,Checkbox ,Flex,Stepper,Icon,Popup,Button} from 'antd-mobile';
import {get_geolocation} from '../actions/geo';
import {connect} from 'react-redux';
import debounce from 'debounce';


@connect((state, ownProps)=>({
    ...state.geo
}), (dispatch, ownProps)=>({
    get_geolocation:()=>dispatch(get_geolocation())
}))
class Map extends Component {
    constructor(props){
        super(props);
        this.onChange= this.onChange.bind(this);
        this.state = {
            pois:null
        }
    }
    componentWillMount(){
        this.props.get_geolocation();
    }
    componentDidMount(){
        this.map = new qq.maps.Map(this.refs.map, {
            zoom:15                                                 // 地图的中心地理坐标。
        });

        const citylocation = new qq.maps.CityService({
            complete :(result)=> {
                this.map.setCenter(result.detail.latLng)
                // geocoder.getAddress(result.detail.latLng);
            }
        });

        const geocoder = new qq.maps.Geocoder({
            complete : function(result){

               console.log('geocoder',result)
                geocoder2.getAddress(result.detail.location);

            }
        });

        const geocoder2 = new qq.maps.Geocoder({
            complete : function(result){

                console.log('geocoder2',result)


            }
        });

        const searchService = new qq.maps.SearchService({
            //设置搜索范围为北京
            location: "成都",
            //设置搜索页码为1
            pageIndex: 1,
            //设置每页的结果数为5
            pageCapacity: 5,
            //设置展现查询结构到infoDIV上
            //设置动扩大检索区域。默认值true，会自动检索指定城市以外区域。
            autoExtend: true,
            //检索成功的回调函数
            complete: function(results) {
                //设置回调函数参数
                var pois = results.detail.pois;
                console.log('searchService',results)
            },
            //若服务请求失败，则运行以下函数
            error: function() {
                alert("出错了。");
            }
        });
        searchService.search('酒店');

        qq.maps.event.addListener(this.map, 'center_changed', debounce(()=> {
           const center = this.map.getCenter();
            geocoder.getAddress(center);
        },200));
        //调用searchLocalCity();方法    根据用户IP查询城市信息。
        citylocation.searchLocalCity();



    }
    componentWillReceiveProps(nextProps){
        // if(nextProps.location && nextProps.location!=this.props.location){
        //     console.warn('componentWillReceiveProps',nextProps.location)
        //     this.map.panTo(new qq.maps.LatLng(location.lat, location.lng));
        // }
        this.map.panTo(new qq.maps.LatLng(30.57, 104.08));
    }
    onClick(){


        return
        Popup.show( <List  className="popup-list">
                {['股票名称', '股票代码', '买入价格', '买入数量', '更多', '更多'].map((i, index) => (
                    <List.Item key={index}>{i}</List.Item>
                ))}
            </List>, { animationType: 'slide-up' });
    }
    onChange(e){
        console.log(e)

        return
        const searchService = new qq.maps.SearchService({
            // autoExtend:false,
            //检索成功的回调函数
            pageCapacity:20,
            complete: (resp)=> {
                //设置回调函数参数
                var pois = resp.detail.pois;
                console.warn(pois)
                this.setState({
                    pois
                })

            },
            //若服务请求失败，则运行以下函数
            error: function() {
                alert("出错了。");
            }
        });

        searchService.search(keyword);
    }
    render() {

        return (
            <Flex className="full-height" direction="column" align="stretch">
                {/*<SearchBar*/}
                    {/*value={this.state.value}*/}
                    {/*placeholder="搜索"*/}
                    {/*onSubmit={(value) => console.log(value, 'onSubmit')}*/}
                    {/*onClear={(value) => console.log(value, 'onClear')}*/}
                    {/*onFocus={() => console.log('onFocus')}*/}
                    {/*onBlur={() => console.log('onBlur')}*/}
                    {/*showCancelButton*/}
                    {/*onChange={this.onChange}*/}
                {/*/>*/}
                {
                    Array.isArray(this.state.pois) ?
                        (<List>
                            {
                                this.state.pois.map((item,index)=>(
                                    <List.Item key={index}>
                                        {item}
                                    </List.Item>
                                ))
                            }
                        </List>):
                        (
                            [<Flex.Item key="0" style={{position:'relative'}}>
                                <div id="map" ref="map" className="full-height" >

                                </div>
                                <Icon type="environment" style={{position:'absolute',top:'50%',left:'50%',color:'#108ee9'}}/>
                            </Flex.Item>,
                            <Flex.Item key="1">
                            </Flex.Item>]
                        )
                }

            </Flex>

        );
    }
}

export default Map;