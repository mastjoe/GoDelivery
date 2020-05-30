<template>
    <div class="autocomplete-group" tabindex="-1">
        <input class="form-control autocomplete-input"
            type="text"
            :placeholder="placeholder"
            ref="autocomplete"
            :status="status"
            v-model="search"
            @keyup="queryLocations()"
        >
        <!-- pick current location btn for pickup -->
        <template v-if="status == 'pickup' && search && search.length < 4">
            <div class="my-2">
                <button class="btn btn-success btn-sm btn-block"
                    type="button"
                    @click="getCurrentPositionAddress()"
                >
                    Select current location as Pickup address
                </button>
            </div>
        </template>

        <!-- autocomplete suggest sheet -->
        <template v-if="places.length">
            <div class="autocomplete-place">
                <ul class="list-group list-group-flush">
                    <!-- for pick current location selection -->
                    <a v-for="place in places" :key="place.id" class="list-group-item" @click="selectPlace(place)">
                        <div class="row">
                            <div class="col-2">
                                <img class="img-thumbnail rounded mt-3" :src="place.icon" width="35" height="35">
                            </div>
                            <div class="col-10">
                                <h6>{{ place.vicinity }}</h6>
                                <small class="text-muted">{{ place.name }}</small>
                            </div>
                        </div>
                    </a>
                </ul>
            </div>
        </template>

    </div>
</template>

<script>
import Util from '../util'
import Axios from 'axios'
import {mapState, mapMutations} from 'vuex'

export default {
    props:{
        placeholder: {
            type: String,
            default: '',
        },
        status: {
            type: String
        }
    },
    data() {
        return {
            search: null,
            places: [],
            currentPosition: null,
        }
    },
    computed: {
    },
    methods: {
        ...mapMutations(['addMarker', 'updatePickUpPosition', 'updateDropOffPosition']),

        queryGoogle() {
            const params = `&key=${Util.api_key}&input=${this.search}&radius=${Util.searchRadius}&location=${this.currentPosition.lat},${this.currentPosition.lng}`
            const url = `${Util.proxy}https://maps.googleapis.com/maps/api/place/nearbysearch/json?${params}`

            Axios.defaults.headers.get['Content-Type'] ='application/json';
            Axios.get(url)
                .then(({data}) => {
                    this.places = data.results
                    this.storeLocations(data.results)
                })
                .catch(error => console.log(error))
        },

        queryDatabaseLocations() {
            Axios({
                method: 'get',
                url: Util.locationURL+'?query='+this.search,
            })
                .then(({data}) => {
                    const placesData = data.data

                    const places = placesData.map(x => {
                        return  {
                            name: x.name,
                            vicinity: x.vicinity,
                            geometry: {
                                location: {
                                    lat: x.lat,
                                    lng: x.lng
                                }
                            }
                        }
                    })
                    this.places = data.data
                })
                .catch(error => console.log(error))
        },

        queryLocations: _.debounce(function() {
            if (this.search.length < 4 && this.status == "pickup") return false
            // attempt local locations
            this.queryDatabaseLocations();
            if (!this.places.length) {
                this.queryGoogle();
            } 
        }, 1500),


        getCurrentPositionAddress() {
            const params =
            `latlng=${this.currentPosition.lat},${this.currentPosition.lng}&key=${Util.api_key}`
            const url = 
            `${Util.proxy}https://maps.googleapis.com/maps/api/geocode/json?${params}`

            Axios.get(url)
                .then(({data}) => {
                    this.search = data.results[0].formatted_address
                    const position = data.results[0].geometry.location
                    this.handleMarking(position)
                })
                .catch(error => console.log(error))

        },

        clearAutocomplete() {
            this.places = [];
        },

        loadCurrentPosition() {
            this.currentPosition = this.$store.state.currentPosition
        },

        storeLocations(places) {
            places.forEach(place => {

                Axios({
                    method: 'post',
                    url: Util.locationURL,
                    data: {
                        name: place.name,
                        vicinity: place.vicinity,
                        lat: place.geometry.location.lat,
                        lng: place.geometry.location.lng
                    }
                })
                    .then(({data}) => { data.data })
                    .catch(({response}) => console.log(response))
            })
        },
        
        handleMarking(position) {
            if (this.status == "pickup") {
                this.$store.commit('addMarker', {position: position, label: 'Pickup', status: 'pickup'})
                this.$store.commit('updatePickUpPosition', position)                
            } else {
                
                this.$store.commit('addMarker', {position: position, label: 'DropOff', status: 'dropoff'})
                this.$store.commit('updateDropOffPosition', position)
            }
            this.filterMarkers();
        },

        filterMarkers() {
            const markers = this.$store.state.markers
            const markersStatuses = markers.map(x => x.status)

            if (markersStatuses.indexOf("current") !== -1) {
                this.$store.commit('removeMarker', "current")
            }
            console.log(this.$store.state.markers)
        },

        selectPlace(place) {
            const address = place.vicinity
            const position = place.geometry.location

            this.search = address
            this.handleMarking(position)
            this.clearAutocomplete();
        },
    },
    computed: {
    },
    mounted() {
       this.loadCurrentPosition();
       console.log(this.$store.state.markers)
    }
}
</script>

<style scoped>
    .form-control {
        background: #f8fafc;
        border-radius: .75rem;
    }
    .autocomplete-group{
        position:relative;
    }
    .autocomplete-place{
        width: 100%;
        position: absolute;
        top: 40px;
        left: 0;
        z-index: 100;
        max-height:90vh;
        overflow-y: scroll;
    }
    .autocomplete-place {
        transition: all 0.3s ease-in
    }
    .autocomplete-place .list-group-item:hover {
        cursor: pointer;
        background: #ddd;
    }
</style>