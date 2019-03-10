<template>
    <b-modal ref="myModalRef" hide-footer title="Favorite">
        <!-- <div class="d-block text-left">
            <slot name="header" />
        </div> -->
        <slot name="content" />
        <b-row align-h="end" style="margin-right:20px;">
            <span>
                <slot name="buttonleft" />
            </span>
            <span style="margin-left:10px;">
                <slot name="buttonright" />
            </span>
        </b-row>
    </b-modal>
</template>
<script>
export default {
    methods: {
        showModal() {
            this.$refs.myModalRef.show()
        },
        hideModal() {
            this.$refs.myModalRef.hide()
        },
        // toggleModal() {
        //     this.$refs.myModalRef.toggle('#toggleBtn')
        // }
    }
}
</script>