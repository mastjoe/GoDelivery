
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
        },

        removeMarker: (state, status) => {
            const index = state.markers.map(item => item.status).indexOf(status);
            state.markers.splice(index, 1);
        },
    },

    actions: {
        updateCurrentPositionAsync(context) {
            context.commit('updateCurrentPosition')
        }
    }
}