<style lang="less">
</style>

<template>
	<div class="wrapper wrapper-scroll wrapper-box">
        <div style="width:500px; height:600px; border:0px solid #f66; background:#fff; overflow:hidden;" v-xscroll="{'class':'xscroll-default'}">
            <div style="width:1000px;">
                <p>指令钩子函数会被传入以下参数：</p>
                <p>el：指令所绑定的元素，可以用来直接操作 DOM 。</p>
                <p>binding：一个对象，包含以下属性：</p>
                <p>name：指令名，不包括 v- 前缀。</p>
                <p>value：指令的绑定值，例如：v-my-directive="1 + 1" 中，绑定值为 2。</p>
                <p>oldValue：指令绑定的前一个值，仅在 update 和 componentUpdated 钩子中可用。无论值是否改变都可用。</p>
                <p>expression：字符串形式的指令表达式。例如 v-my-directive="1 + 1" 中，表达式为 "1 + 1"。</p>
                <p>arg：传给指令的参数，可选。例如 v-my-directive:foo 中，参数为 "foo"。</p>
                <p>modifiers：一个包含修饰符的对象。例如：v-my-directive.foo.bar 中，修饰符对象为 { foo: true, bar: true }。</p>
                <p>vnode：Vue 编译生成的虚拟节点。移步 VNode API 来了解更多详情。</p>
                <p>oldVnode：上一个虚拟节点，仅在 update 和 componentUpdated 钩子中可用。</p>
                <p>除了 el 之外，其它参数都应该是只读的，切勿进行修改。如果需要在钩子之间共享数据，建议通过元素的 dataset 来进行。</p>
                <p></p>
                <p>这是一个使用了这些属性的自定义钩子样例：</p>
                <p>指令钩子函数会被传入以下参数：</p>
                <p>el：指令所绑定的元素，可以用来直接操作 DOM 。</p>
                <p>binding：一个对象，包含以下属性：</p>
                <p>name：指令名，不包括 v- 前缀。</p>
                <p>value：指令的绑定值，例如：v-my-directive="1 + 1" 中，绑定值为 2。</p>
                <p>oldValue：指令绑定的前一个值，仅在 update 和 componentUpdated 钩子中可用。无论值是否改变都可用。</p>
                <p>expression：字符串形式的指令表达式。例如 v-my-directive="1 + 1" 中，表达式为 "1 + 1"。</p>
                <p>arg：传给指令的参数，可选。例如 v-my-directive:foo 中，参数为 "foo"。</p>
                <p>modifiers：一个包含修饰符的对象。例如：v-my-directive.foo.bar 中，修饰符对象为 { foo: true, bar: true }。</p>
                <p>vnode：Vue 编译生成的虚拟节点。移步 VNode API 来了解更多详情。</p>
                <p>oldVnode：上一个虚拟节点，仅在 update 和 componentUpdated 钩子中可用。</p>
                <p>除了 el 之外，其它参数都应该是只读的，切勿进行修改。如果需要在钩子之间共享数据，建议通过元素的 dataset 来进行。</p>
                <p></p>
                <p>这是一个使用了这些属性的自定义钩子样例：</p>
                <p>指令钩子函数会被传入以下参数：</p>
                <p>el：指令所绑定的元素，可以用来直接操作 DOM 。</p>
                <p>binding：一个对象，包含以下属性：</p>
                <p>name：指令名，不包括 v- 前缀。</p>
                <p>value：指令的绑定值，例如：v-my-directive="1 + 1" 中，绑定值为 2。</p>
                <p>oldValue：指令绑定的前一个值，仅在 update 和 componentUpdated 钩子中可用。无论值是否改变都可用。</p>
                <p>expression：字符串形式的指令表达式。例如 v-my-directive="1 + 1" 中，表达式为 "1 + 1"。</p>
                <p>arg：传给指令的参数，可选。例如 v-my-directive:foo 中，参数为 "foo"。</p>
                <p>modifiers：一个包含修饰符的对象。例如：v-my-directive.foo.bar 中，修饰符对象为 { foo: true, bar: true }。</p>
                <p>vnode：Vue 编译生成的虚拟节点。移步 VNode API 来了解更多详情。</p>
                <p>oldVnode：上一个虚拟节点，仅在 update 和 componentUpdated 钩子中可用。</p>
                <p>除了 el 之外，其它参数都应该是只读的，切勿进行修改。如果需要在钩子之间共享数据，建议通过元素的 dataset 来进行。</p>
                <p></p>
                <p>这是一个使用了这些属性的自定义钩子样例：</p>
                <p>指令钩子函数会被传入以下参数：</p>
                <p>el：指令所绑定的元素，可以用来直接操作 DOM 。</p>
                <p>binding：一个对象，包含以下属性：</p>
                <p>name：指令名，不包括 v- 前缀。</p>
                <p>value：指令的绑定值，例如：v-my-directive="1 + 1" 中，绑定值为 2。</p>
                <p>oldValue：指令绑定的前一个值，仅在 update 和 componentUpdated 钩子中可用。无论值是否改变都可用。</p>
                <p>expression：字符串形式的指令表达式。例如 v-my-directive="1 + 1" 中，表达式为 "1 + 1"。</p>
                <p>arg：传给指令的参数，可选。例如 v-my-directive:foo 中，参数为 "foo"。</p>
                <p>modifiers：一个包含修饰符的对象。例如：v-my-directive.foo.bar 中，修饰符对象为 { foo: true, bar: true }。</p>
                <p>vnode：Vue 编译生成的虚拟节点。移步 VNode API 来了解更多详情。</p>
                <p>oldVnode：上一个虚拟节点，仅在 update 和 componentUpdated 钩子中可用。</p>
                <p>除了 el 之外，其它参数都应该是只读的，切勿进行修改。如果需要在钩子之间共享数据，建议通过元素的 dataset 来进行。</p>
                <p></p>
                <p>这是一个使用了这些属性的自定义钩子样例：</p>
                <p>指令钩子函数会被传入以下参数：</p>
                <p>el：指令所绑定的元素，可以用来直接操作 DOM 。</p>
                <p>binding：一个对象，包含以下属性：</p>
                <p>name：指令名，不包括 v- 前缀。</p>
                <p>value：指令的绑定值，例如：v-my-directive="1 + 1" 中，绑定值为 2。</p>
                <p>oldValue：指令绑定的前一个值，仅在 update 和 componentUpdated 钩子中可用。无论值是否改变都可用。</p>
                <p>expression：字符串形式的指令表达式。例如 v-my-directive="1 + 1" 中，表达式为 "1 + 1"。</p>
                <p>arg：传给指令的参数，可选。例如 v-my-directive:foo 中，参数为 "foo"。</p>
                <p>modifiers：一个包含修饰符的对象。例如：v-my-directive.foo.bar 中，修饰符对象为 { foo: true, bar: true }。</p>
                <p>vnode：Vue 编译生成的虚拟节点。移步 VNode API 来了解更多详情。</p>
                <p>oldVnode：上一个虚拟节点，仅在 update 和 componentUpdated 钩子中可用。</p>
                <p>除了 el 之外，其它参数都应该是只读的，切勿进行修改。如果需要在钩子之间共享数据，建议通过元素的 dataset 来进行。</p>
                <p></p>
                <p>这是一个使用了这些属性的自定义钩子样例：</p>
                <p>指令钩子函数会被传入以下参数：</p>
                <p>el：指令所绑定的元素，可以用来直接操作 DOM 。</p>
                <p>binding：一个对象，包含以下属性：</p>
                <p>name：指令名，不包括 v- 前缀。</p>
                <p>value：指令的绑定值，例如：v-my-directive="1 + 1" 中，绑定值为 2。</p>
                <p>oldValue：指令绑定的前一个值，仅在 update 和 componentUpdated 钩子中可用。无论值是否改变都可用。</p>
                <p>expression：字符串形式的指令表达式。例如 v-my-directive="1 + 1" 中，表达式为 "1 + 1"。</p>
                <p>arg：传给指令的参数，可选。例如 v-my-directive:foo 中，参数为 "foo"。</p>
                <p>modifiers：一个包含修饰符的对象。例如：v-my-directive.foo.bar 中，修饰符对象为 { foo: true, bar: true }。</p>
                <p>vnode：Vue 编译生成的虚拟节点。移步 VNode API 来了解更多详情。</p>
                <p>oldVnode：上一个虚拟节点，仅在 update 和 componentUpdated 钩子中可用。</p>
                <p>除了 el 之外，其它参数都应该是只读的，切勿进行修改。如果需要在钩子之间共享数据，建议通过元素的 dataset 来进行。</p>
                <p></p>
                <p>这是一个使用了这些属性的自定义钩子样例：</p>
                <p>指令钩子函数会被传入以下参数：</p>
                <p>el：指令所绑定的元素，可以用来直接操作 DOM 。</p>
                <p>binding：一个对象，包含以下属性：</p>
                <p>name：指令名，不包括 v- 前缀。</p>
                <p>value：指令的绑定值，例如：v-my-directive="1 + 1" 中，绑定值为 2。</p>
                <p>oldValue：指令绑定的前一个值，仅在 update 和 componentUpdated 钩子中可用。无论值是否改变都可用。</p>
                <p>expression：字符串形式的指令表达式。例如 v-my-directive="1 + 1" 中，表达式为 "1 + 1"。</p>
                <p>arg：传给指令的参数，可选。例如 v-my-directive:foo 中，参数为 "foo"。</p>
                <p>modifiers：一个包含修饰符的对象。例如：v-my-directive.foo.bar 中，修饰符对象为 { foo: true, bar: true }。</p>
                <p>vnode：Vue 编译生成的虚拟节点。移步 VNode API 来了解更多详情。</p>
                <p>oldVnode：上一个虚拟节点，仅在 update 和 componentUpdated 钩子中可用。</p>
                <p>除了 el 之外，其它参数都应该是只读的，切勿进行修改。如果需要在钩子之间共享数据，建议通过元素的 dataset 来进行。</p>
                <p></p>
                <p>这是一个使用了这些属性的自定义钩子样例：</p>
            </div>
        </div>
	</div>
</template>

<script>
    import {mapGetters, mapActions}         from 'vuex';

	export default {
        components: {},
        data() {
            return {}
        },
        computed: {},
        methods: {
            //收起展开左栏
            // ...mapActions([
            //     'toggle_leftbar'
            // ])
        },
        created() {}
    }
</script>