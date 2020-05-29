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
                               <Autocomplete 
                                    :position="position"
                                    placeholder="PickUp Address"
                                    status="pickup"
                               />
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="form-group">
                                <Autocomplete 
                                    :position="position"
                                    placeholder="DropOff Address"
                                    status="dropoff"
                                />
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

export default {
    props: {
        position: Object
    },
    components: {
        Autocomplete
    },
    methods: {
    }

}
</script>

<style scoped>
    @media only screen and (min-width: 768px) {
        .background {
            height: 100vh;
        }
    }
</style>