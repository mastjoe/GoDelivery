<template>
    <div class="autocomplete-group">
        <input class="form-control autocomplet-input"
            type="text"
            :placeholder="placeholder"
            :position="position"
            ref="autocomplete"
            :status="status"
            v-model="search"
            @keyup="queryGoogle()"
            @blur="clearAutocomplete()"
        >

        <template v-if="status == 'pickup' && position && search && search.length < 4">
            <div class="my-2">
                <button class="btn btn-success btn-sm btn-block"
                    type="button"
                    @click="getCurrentLocationAddress()"
                >
                    Select current location as Pickup address
                </button>
            </div>
        </template>
        <template v-if="places.length">
            <div class="autocomplete-place">
                <ul class="list-group list-group-flush">
                    <!-- for pick current location selection -->
                    <a v-for="place in places" :key="place.id" class="list-group-item">
                        <div class="row">
                            <div class="col-2">
                                <img class="img-thumbnail rounded mt-3" :src="place.icon" width="35" height="35">
                            </div>
                            <div class="col-10">
                                <h6>{{ place.name }}</h6>
                                <small class="text-muted">{{ place.vicinity }}</small>
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

export default {
    props:{
        placeholder: {
            type: String,
            default: '',
        },
        position: {
            type: Object
        },
        status: {
            type: String
        }
    },
    data() {
        return {
            search: null,
            autocomplete: null,
            places:[],
            currentPositionAddress: ''
        }
    },
    methods: {
        
        queryGoogle() {
            if (!this.position || (this.search.length < 4 && this.status == "pickup")) return false

            const params = `&key=${Util.api_key}&input=${this.search}&radius=${Util.searchRadius}&location=${this.position.lat},${this.position.lng}`
            const url = `${Util.proxy}https://maps.googleapis.com/maps/api/place/nearbysearch/json?${params}`

            Axios.defaults.headers.get['Content-Type'] ='application/json';
            Axios.get(url, {
                headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                },
            })
                .then(response => this.places = response.data.results)
                .catch(error => console.log(error))
            console.log(url)
            
        },

        getCurrentLocationAddress() {
            const url = `${Util.proxy}https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.position.lat},${this.position.lng}&key=${Util.api_key}`

            Axios.get(url)
                .then(({data}) => {
                    this.search = data.results[0].formatted_address
                    console.log(data)
                })
                .catch(error => console.log(error))

        },

        clearAutocomplete() {
            this.places = [];
        },
    },
    computed: {
    },
    mounted() {
        // console.log(this.getPosititon())
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
</style>