<template>
    <div class="grid-row" :style="stylerow">
        <slot></slot>
    </div>
</template>

<script>
    import {mapGetters, mapActions}         from 'vuex';

    export default {
        components: {},
        data() {
            return {}
        },
        computed: {
            //
            ...mapGetters([
                'basic'
            ]),
            //
            stylerow() {
                return {
                    'margin-top': this.basic.grid.rowspace*2 +'px'
                };
            }
        },
        methods: {},
        created() {}
    }
</script>