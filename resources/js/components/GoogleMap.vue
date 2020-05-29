<template>
    <div>
        <div ref="map" class="map-container"
            :center="center"
            :zoom="zoom"
            :map-type-id="mapTypeId"
        >
        </div>
        <template v-if="google && map">
            <slot
                :google="google"
                :map="map"
            ></slot>
        </template>
    </div>
</template>

<script>
import Util from '../util'

export default {
    props:{
        center: {
            type: Object,
            required: true
        },
        zoom: {
            required: true,
            type: Number
        },
        mapTypeId: {
            default: 'roadmap'
        },
        markers: {
            type: Array,
            required: false
        }
    },
    data() {
        return {
            map: null,
            google: null
        }
    },
    methods: {
        initializeMap() {
            const {Map} = this.google
            const options = {
                center: this.center,
                zoom: this.zoom,
                mapTypeId: this.mapTypeId
            }

            this.map = new Map(this.$refs.map, options)
        },
    },
    created() {
    },
    mounted() {
        Util.googleMapApi()
            .then(google => {
                this.google = google
                this.initializeMap();
            })
            .catch(error => {
                console.log(error)
            })
    }
}
</script>

<style scoped>
    .map-container {
        width: 100%;
        height: 100vh;
    }
</style>