
export default {
    state: {
        currentPosition: null,
        pickUpPosition: null,
        dropOffPosition: null,
        markers: []
    },
    getters: {

    },

    mutations:{
        updateCurrentPosition: (state, payload) => {
            state.currentPosition = payload
        },

        updatePickUpPosition: (state, payload) => {
            state.pickUpPosition = payload
        },

        updateDropOffPosition: (state, payload) => {
            state.dropOffPosition = payload
        },

        addMarker: (state, payload) => {
            state.markers.push(payload)
            if (payload.status == "current") {
                state.markers.filter(x => x.status != "current")
            }
        },
    },

    actions: {
        updateCurrentPositionAsync(context) {
            context.commit('updateCurrentPosition')
        }
    }
}