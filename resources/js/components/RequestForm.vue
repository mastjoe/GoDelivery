<template>
    <div>
        <form>
            <div class="row background bg-white">
                <div class="col-12">
                    <h5 class="text-center my-2 font-weight-bold">
                        Parcel Request
                    </h5>
                    <div class="row mt-3">
                        <div class="col-12">
                            <div class="form-group">
                                <template v-if="currentPosition">

                                    <Autocomplete 
                                        placeholder="PickUp Address"
                                        status="pickup"
                                    />
                                </template>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="form-group">
                                <template v-if="currentPosition">
                                    <Autocomplete 
                                        placeholder="DropOff Address"
                                        status="dropoff"
                                    />
                                </template>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="row mt-5" v-if="pickUpPosition && dropOffPosition">
                                <div class="col-6">
                                    <h6>&#8358;1500.00</h6>
                                </div>
                                <div class="col-6">
                                    3.3km | 24 mins
                                </div>
                                <div class="col-12 py-3">
                                    <button class="btn btn-block btn-success">
                                        Enter Parcel Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </form>
    </div>
</template>

<script>
import Util from '../util'
import Autocomplete from './AutoComplete'
import {mapState} from 'vuex'

export default {
    components: {
        Autocomplete
    },
    computed: {
        ...mapState(['currentPosition', 'pickUpPosition', 'dropOffPosition']),
    },
    methods: {
    },
    mounted() {
        // setTimeout(()=> {console.log(this.currentPosition)}, 1000)
    },

}
</script>

<style scoped>
    @media only screen and (min-width: 768px) {
        .background {
            height: 100vh;
        }
    }
</style>