
export default {
    state: {
        currentPosition: null,
        pickUpPosition: null,
        dropOffPosition: null
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

        updatedropOffPosition: (state, payload) => {
            state.dropOffPosition = payload
        },
    },

    actions: {
        updateCurrentPositionAsync(context) {
            context.commit('updateCurrentPosition')
        }
    }
}