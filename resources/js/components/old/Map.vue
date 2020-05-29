<template>
    <div>
        <div id="map" ref="map"></div>
        <GmapMap
            :center="currentCoordinates"
            :zoom="15"
            map-type-id="roadmap"
            id="map"
            ref="map"
        >
            <GmapMarker
                :key="index"
                v-for="(m, index) in markers"
                :position="m.position"
                :clickable="true"
                :draggable="true"
                icon="http://maps.google.com/mapfiles/ms/icons/green-dot.png"
                @click="center=m.position"
            />
        </GmapMap>
    </div>
</template>

<script>

import Util from '../util'
import {gmapApi} from 'vue2-google-maps'

export default {
    components:{
        google: gmapApi
    },
    data:() => {
        return {
            currentCoordinates: {
                lat:0,
                lng:0
            },
            pickUpCoordinates: {
                lat:0,
                lng:0
            },
            dropoffCoordinates:{
                lat:0,
                lng:0
            },
            markers: [],
        }
    },
    methods: {
        // get current position
        getCurrentPosition() {
            navigator.geolocation.getCurrentPosition(position => {
                this.currentCoordinates.lat = position.coords.latitude;
                this.currentCoordinates.lng = position.coords.longitude;
            })
        },

        // add marker
        addMarker(coords) {
            const marker = {};
            marker.position = coords.position;
            this.markers.push(marker)
        }
    },
    computed: {
        
    },
    created() {
        this.getCurrentPosition();
    },
    mounted() {
        // get user current position
        this.addMarker({position: this.currentCoordinates});
        new google.maps.Map(this.$refs.map, {
          center: {lat: -34.397, lng: 150.644},
          zoom: 8
        })
        // console.log(gmapApi)
    }
}
</script>

<style scoped>
  #map {
      width: 100;
      height: 100vh;
  }
</style>