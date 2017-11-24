<style lang="less">
    @import "../../less/mixins/prefix.less";

    .iconsdocker {
        display: inline-block;
        position: relative;
        // padding-left: 20px;
        height: 50px;
        font-size: 0;
        vertical-align: middle;
        .prefix-transition();
        .icon {
            display: inline-block;
            position: relative;
            margin: 10px 8px;
            width: 30px;
            height: 30px;
            font-size: 14px;
            color: rgba(188, 255, 248, .8);
            // color: transparent;
            // text-shadow: 0 0 2px #fff;
            cursor: pointer;
            text-decoration: none;
            .prefix-transition(all linear .2s);
            &:hover {
                color: rgb(255, 255, 255);
            }
            .badge {
                position: absolute;
                top: -6px;
                left: 16px;
                padding: 0 3px;
                height: 18px;
                line-height: 18px;
                font-size: 12px;
                color: rgba(255,255,255,1);
                background: rgba(255,114,92, 1);
                .prefix-border-radius(5px);
                .prefix-gradient(0deg, rgba(228,58,21, 1), rgba(230,82,69, 1));
            }
            i {
                display: block;
                width: 30px;
                height: 30px;
                background-repeat: no-repeat;
                background-position: center;
                background-size: 24px 24px;
            }
            &.animate {
                i {
                    .prefix-transition(transform linear .2s .1s);
                }
                &.animate-rotate {
                    i:hover {
                        .prefix-transform(rotate(360deg));
                    }
                }
                &.animate-flip-x,
                &.animate-flip-lr {
                    i:hover {
                        .prefix-transform(rotateY(360deg));
                    }
                }
                &.animate-flip-y,
                &.animate-flip-tb {
                    i:hover {
                        .prefix-transform(rotateY(360deg));
                    }
                }
                &.animate-shake {
                    i:hover {
                        .prefix-animation(animate-shake .3s linear);
                    }
                }
            }
            &.large {
                margin: 5px 8px;
                width: 40px;
                height: 40px;
                .badge {
                    top: -4px;
                    left: 24px;
                }
                i {
                    width: 40px;
                    height: 40px;
                    background-size: 40px 40px;
                }
            }
            &.rounded {
                i {
                    .prefix-border-radius(20%);
                }
            }
            &.circle {
                i {
                    .prefix-border-radius(50%);
                }
            }
        }
    }
    .prefix-keyframes(animate-shake, {
        10% { .prefix-transform( translateX(3px) rotate(2deg) ); }
        20% { .prefix-transform( translateX(-3px) rotate(-2deg) ); }
        30% { .prefix-transform( translateX(3px) rotate(2deg) ); }
        40% { .prefix-transform( translateX(-3px) rotate(-2deg) ); }
        50% { .prefix-transform( translateX(2px) rotate(1deg) ); }
        60% { .prefix-transform( translateX(-2px) rotate(-1deg) ); }
        70% { .prefix-transform( translateX(2px) rotate(1deg) ); }
        80% { .prefix-transform( translateX(-2px) rotate(-1deg) ); }
        90% { .prefix-transform( translateX(1px) rotate(0) ); }
        100% { .prefix-transform( translateX(-1px) rotate(0) ); }
    });
</style>

<template>
    <div class="iconsdocker">
        <!-- welcome to you! {{mode}} - qqq23324112222 - {{showdetail}} 544 {{userid4modal}} -->
        <template v-for="(item,idx) in list">
            <transition name="scale">
            <a v-if="item.show"
            class="icon"
            :class="classesitem(item)"
            @mouseenter="hover(item, idx)"
            @click="click(item, idx)"
            :show="item.show">
                <i class="ico" :style="iconstyles(item)"></i>
                <transition name="scale">
                <span v-if="item.badge" class="badge">{{item.badge}}</span>
                </transition>
            </a>
            </transition>
        </template>
    </div>
</template>

<script>
    import {mapGetters, mapActions}         from 'vuex';

    export default {
        components: {},
        props:{
            list: {
                type: Array,
                required: true
            },
            value: {
                type: String
            }
            // @on-hover()
            // @on-click()
        },
        data() {
            return {}
        },
        computed: {},
        methods:{
            //
            classesitem( item ) {
                let classes = {};
                if( item.class ){
                    this.$fn.each(item.class.split(' '), (classname, idx)=>{
                        classes[classname] = true;
                    });
                }
                return classes;
            },
            //图标动态样式
            iconstyles( item ) {
                return {
                    'background-image': `url(${item.iconpath || '/public/images/unknown.svg'})`
                };
            },
            //
            hover( item, itemidx ) {
                this.$emit('on-hover', item, itemidx, this.list);
                console.log(1);
            },
            //
            click( item, itemidx ) {
                this.$emit('on-click', item, itemidx, this.list);
                console.log(2);
            }
        },
        mounted() {
            // debugger;
        },
    }
</script>