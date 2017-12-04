
<template>
    <div :class="classescell" :style="stylecell">
        <slot></slot>
    </div>
</template>

<script>
    import {mapGetters, mapActions}         from 'vuex';

    export default {
        components: {},
        props: {
            max: {
                type: Number,
                default: 12
            },
            span: {
                type: Number,
                default: 1
            }
        },
        data() {
            return {}
        },
        computed: {
            //
            ...mapGetters([
                'basic'
            ]),
            //
            classescell() {
                return {[`cell-${this.max}-${this.span}`]: true};
            },
            //
            stylecell() {
                return {
                    'padding-left': this.basic.grid.padding +'px',
                    'padding-right': this.basic.grid.padding +'px'
                };
            }
        },
        methods: {},
        created() {}
    }
</script>