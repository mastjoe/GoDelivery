<template>
    <div>
        <GoogleMap
            :center="currentCoordinates"
            :zoom="15"
            id="map"
        >
            <template v-slot="slotProp">
                <template  v-for="(m, index) in markers">
                    <MapMarker
                        :key="index"
                        :google="slotProp.google"
                        :position="m.position"
                        :map="slotProp.map"
                        :title="m.title"
                        :label="m.label"
                    />
                </template>
            </template>
        </GoogleMap>
    </div>
</template>

<script>
import GoogleMap from './GoogleMap'
import MapMarker from './MapMarker'

export default {
    components: {
        GoogleMap,
        MapMarker
    },
    data() {
        return {
            currentCoordinates: {
                lat: 0,
                lng: 0
            },
            markers: [],
        }
    },
    methods:{
        getCurrentCoordinate() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    position => {
                        this.currentCoordinates.lat = position.coords.latitude;
                        this.currentCoordinates.lng = position.coords.longitude;
                        this.$emit('position_emitted', this.currentCoordinates);
                        this.$store.commit('updateCurrentPosition', this.currentCoordinates)
                    },
                    error => {
                        console.log(error);
                        alert(error);
                    }
                )
            }
        },

        // mark user's current location
        markCurrentCoordinate() {
            this.markers.push({position: this.currentCoordinates, label: 'Your Location'});
        }
    },
    created() {
        // get user current geo-coordinate
        this.getCurrentCoordinate();
    },
    mounted() {
        this.markCurrentCoordinate();
    }
}
</script>

<style scoped>
    #map {
        width: 100%;
        height: 100vh;
    }
</style>