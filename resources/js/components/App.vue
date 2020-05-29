<template>
    <main>
        <Header />
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-3 col-sm-12">
                    <RequestForm :position="position" />
                </div>
                <div class="col-md-9 col-sm-12">
                    <div class="row">
                        <div class="col-12">
                            <Map @position_emitted="emitMapPosition($event)" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import AppHeader from './Header'
import RequestForm from './RequestForm'
import Map from './Map'
import Util from '../util'

export default {
    components: {
        AppHeader,
        RequestForm,
        Map,
    },
    data() {
        return {
            position: null
        }
    },
    methods: {
        emitMapPosition(event) {
            this.position = event
        }
    },
    mounted() {
    }
}
</script>

<style>
    body {
        background: #f2f2f2;
    }
    #map {
        width: 100%;
        height: 800px;
    }
</style>
