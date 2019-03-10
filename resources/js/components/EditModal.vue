<template>
    <b-modal ref="myModalRef" hide-footer title="Edit Favorite">
        <!-- <div class="d-block text-left">
            <slot name="header" />
        </div> -->
        <slot name="content" />
        <b-row align-h="end" style="margin-right:20px;">
        <!-- <b-btn-group style="margin-right:20px;"> -->
            <span>
                <slot name="buttonleft" />
            </span>
            <span style="margin-left:10px;">
                <slot name="buttonright" />
            </span>
        <!-- </b-btn-group> -->
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
        toggleModal() {
            // We pass the ID of the button that we want to return focus to when
            // the modal has hidden
            this.$refs.myModalRef.toggle('#toggleBtn')
        }
    }
}
</script>