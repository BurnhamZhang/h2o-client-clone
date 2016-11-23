export const GEO_FETCH_REQUEST = 'GEO_FETCH_REQUEST';
export const GEO_FETCH_SUCCESS = 'GEO_FETCH_SUCCESS';
export const GEO_FETCH_FAILURE = 'GEO_FETCH_FAILURE';

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

export function get_geolocation() {

    return (dispatch)=>{

        const citylocation = new qq.maps.CityService({
            complete : function(res){
                console.warn('citylocation complete',res);
                geocoder.getAddress(res.detail.latLng);
            }
        });
        const geocoder = new qq.maps.Geocoder({
            complete : function(res){
                console.warn('geocoder complete',res);
                dispatch(geo_fetch_success(res.detail))
            }
        });

        dispatch(geo_fetch_request())
        if (navigator.geolocation && false) {
            navigator.geolocation.getCurrentPosition(function(position)  {
                var lat=position.coords.latitude;
                var lng=position.coords.longitude;
                qq.maps.convertor.translate(new qq.maps.LatLng(lat,lng), 1, function(res){
                    //取出经纬度并且赋值
                    alert(JSON.stringify(res[0]));
                    geocoder.getAddress(res[0]);

                });
            },function (error){
                citylocation.searchLocalCity();
            })
        }
        else
        {
            citylocation.searchLocalCity();
        }
    }
}