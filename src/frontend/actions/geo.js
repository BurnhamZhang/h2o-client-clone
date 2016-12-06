import {shopChoose} from './shop';
export const GEO_FETCH_REQUEST = 'GEO_FETCH_REQUEST';
export const GEO_FETCH_SUCCESS = 'GEO_FETCH_SUCCESS';
export const GEO_FETCH_FAILURE = 'GEO_FETCH_FAILURE';


export const GEO_SET_CACHE = 'GEO_SET_CACHE';
export const GEO_UNSET_CACHE = 'GEO_UNSET_CACHE';


export function setGeoCache(payload) {
    return {
        type: GEO_SET_CACHE,
        payload
    };
}
export function unsetGeoCache(payload) {
    return {
        type: GEO_UNSET_CACHE,
        payload
    };
}


function geo_fetch_failure(payload) {
    return {
        type: GEO_FETCH_FAILURE,
        payload
    };
}

function geo_fetch_request(payload) {
    return {
        type: GEO_FETCH_REQUEST,
        payload
    };
}

function geo_fetch_success(json) {
    return {
        type: GEO_FETCH_SUCCESS,
        receiveAt: Date.now(),
        payload: json
    };
}

export function get_geolocation(widthShopId) {

    return (dispatch)=>{

        const citylocation = new qq.maps.CityService({
            complete : function(res){
                console.warn('citylocation complete',res);
                geocoder.getAddress(res.detail.latLng);
            },
            error:(err)=>{
                dispatch(geo_fetch_failure(err))
            }
        });
        const geocoder = new qq.maps.Geocoder({
            complete : function(res){
                console.warn('geocoder complete',res);
                res.detail.streetNumber = res.detail.addressComponents.streetNumber
                dispatch(geo_fetch_success(res.detail))

                if(widthShopId){
                    dispatch(shopChoose(res.detail.addressComponents));
                }
            },
            error:(err)=>{
                dispatch(geo_fetch_failure(err))
            }
        });

        dispatch(geo_fetch_request())
        if (navigator.geolocation ) {
            navigator.geolocation.getCurrentPosition(function(position)  {
                if(position.coords){
                    const lat=position.coords.latitude*1;
                    const lng=position.coords.longitude*1;
                    if(lat && lng){
                        const lagtLng = new qq.maps.LatLng(lat,lng);
                        geocoder.getAddress(lagtLng);
                        return
                    }
                }
                citylocation.searchLocalCity();

            },function (error){
                citylocation.searchLocalCity();
            },{
                enableHighAccuracy:true,
                timeout:3000,
                maximumAge: 3000
            })
        }
        else
        {
            citylocation.searchLocalCity();
        }
    }
}