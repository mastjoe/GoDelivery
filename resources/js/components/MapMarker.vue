<template></template>

<script>
export default {
    props: {
       position: {
           type: Object,
           required: true,
       },
       title: {
           type: String,
           required: false,
           default: null,
       },
       google: {
           type: Object,
       },
       map: {
           type: Object
       },
       icon: {
           type: String,
           default: null
       },
       label: {
           type: String,
           default: null
       }

    },
    data() {
        return {
            marker: null
        }
    },
    mounted() {
        const {Marker} = this.google
        this.marker = new Marker({
            position: this.position,
            map: this.map,
            title: this.title,
            label: this.label
        })
    }
}
</script>

<style scoped>

</style>