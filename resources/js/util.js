import LoadGoogleMapsApi from 'load-google-maps-api'

const  Util = {
    api_key     : "AIzaSyDPqd5E425ij8wz_VdpAFJLfibFbxbDFyc",
    test_key    : "AIzaSyBgzzIeLFM4FBmWKSDWVNszczcmKfjey7M",
    searchRadius: 50000,
    proxy       : "http://cors-anywhere.herokuapp.com/",
    locationURL : "api/v1/locations",
    googleMapApi: async () => {
                    try {
                    return await LoadGoogleMapsApi({
                        timeout: 15000,
                        // key    : Util.test_key
                    }) 
                    } catch (error) { 
                        console.log(error)
                    }
                },
}

export default Util;