<style lang="less">
    @import "../../less/mixins/prefix.less";

    .toolsbar {
        position: relative;
        display: inline-table;
        width: 100%;
        margin-bottom: 20px;
        font-size: 0;
        .toolsbar-left, .toolsbar-middle, .toolsbar-right {
            display: table-cell;
            vertical-align: top;
        }
        .toolsbar-left {
            text-align: left;
            width:33%;
        }
        .toolsbar-middle {
            text-align: center;
        }
        .toolsbar-right {
            text-align: right;
            width:33%;
        }
        .tool-item {
            display: inline-block;
            margin: 2px;
            padding: 6px 20px;
            border: none;
            background: rgba(255,255,255,.4);
            border-radius: 5px;
            font-size: 14px;
            color: rgb(45, 146, 147);
            cursor: pointer;
            outline: none;
            .prefix-transition();
            &:hover {
                background: rgba(255,255,255,.8);
                color: rgb(0, 152, 153);
                .prefix-box-shadow();
            }
        }
        .tool-group {
            display: inline-block;
            border-radius: 5px;
            overflow: hidden;
            margin: 2px;
            &:first-child {
                margin-left: 0;
            }
            .tool-item {
                margin: 0;
                border-left: 1px solid rgba(255,255,255,.3);
                border-radius: 0;
                white-space: nowrap;
                &:first-child {
                    border: none;
                }
            }
        }
    }
    .grid {
        table {
            width: 100%;
            border-top: 1px solid rgba(255,255,255,.1);
            border-left: 1px solid rgba(255,255,255,.1);
            border-collapse: collapse;
            tr {
                // color: rgb(45, 146, 147);
                // color: rgb(0, 112, 109);
                color: rgb(211, 251, 255);
                // background: rgba(255,255,255,.2);
                background: rgba(0,0,0,.5);
                .prefix-transition();
            }
            tbody tr:hover {
                color: rgb(255, 255, 255);
                // background: rgba(255,255,255,.3);
                background: rgba(0,0,0,.7);
            }
            th, td {
                padding: 10px 15px;
                font-size: 14px;
                border-right: 1px solid rgba(255,255,255,.1);
                border-bottom: 1px solid rgba(255,255,255,.1);
            }
            th {
                text-align: left;
                font-size: 13px;
                font-weight: 400;
                color: rgb(84, 196, 193);
            }
        }

        &.grid-line {
            border-left: none;
            th, td {
                border-right: none;
            }
        }
    }
</style>

<template>
    <div class="wrapper wrapper-scroll wrapper-box">
        <div class="toolsbar">
            <div class="toolsbar-left">
                <button class="tool-item">添加</button>
                <button class="tool-item">全选</button>
            </div>
            <div class="toolsbar-middle">
                <div class="tool-group">
                    <button class="tool-item">天</button>
                    <button class="tool-item">周</button>
                    <button class="tool-item">月</button>
                </div>
            </div>
            <div class="toolsbar-right">
                <button class="tool-item">添加</button>
                <button class="tool-item">全选</button>
            </div>
        </div>

        <div class="grid">
            <table>
                <thead>
                    <tr>
                        <th>&nbsp;</th>
                        <th>编号</th>
                        <th>姓名</th>
                        <th>部门</th>
                        <th>年龄</th>
                        <th>性别</th>
                        <th>角色</th>
                        <th>&nbsp;</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>32442</td>
                        <td>王小二</td>
                        <td>人事部</td>
                        <td>28</td>
                        <td>男</td>
                        <td>HR</td>
                        <td>&nbsp;</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>32422</td>
                        <td>王小二</td>
                        <td>人事部</td>
                        <td>28</td>
                        <td>男</td>
                        <td>HR</td>
                        <td>&nbsp;</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>32422</td>
                        <td>王小二</td>
                        <td>人事部</td>
                        <td>28</td>
                        <td>男</td>
                        <td>HR</td>
                        <td>&nbsp;</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>32422</td>
                        <td>王小二</td>
                        <td>人事部</td>
                        <td>28</td>
                        <td>男</td>
                        <td>HR</td>
                        <td>&nbsp;</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>32422</td>
                        <td>王小二</td>
                        <td>人事部</td>
                        <td>28</td>
                        <td>男</td>
                        <td>HR</td>
                        <td>&nbsp;</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="grid grid-line" style="margin-top:50px;">
            <table>
                <thead>
                    <tr>
                        <th>&nbsp;</th>
                        <th>编号</th>
                        <th>姓名</th>
                        <th>部门</th>
                        <th>年龄</th>
                        <th>性别</th>
                        <th>角色</th>
                        <th>&nbsp;</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>32442</td>
                        <td>王小二</td>
                        <td>人事部</td>
                        <td>28</td>
                        <td>男</td>
                        <td>HR</td>
                        <td>&nbsp;</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>32422</td>
                        <td>王小二</td>
                        <td>人事部</td>
                        <td>28</td>
                        <td>男</td>
                        <td>HR</td>
                        <td>&nbsp;</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>32422</td>
                        <td>王小二</td>
                        <td>人事部</td>
                        <td>28</td>
                        <td>男</td>
                        <td>HR</td>
                        <td>&nbsp;</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>32422</td>
                        <td>王小二</td>
                        <td>人事部</td>
                        <td>28</td>
                        <td>男</td>
                        <td>HR</td>
                        <td>&nbsp;</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>32422</td>
                        <td>王小二</td>
                        <td>人事部</td>
                        <td>28</td>
                        <td>男</td>
                        <td>HR</td>
                        <td>&nbsp;</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import {mapGetters, mapActions}         from 'vuex';

    export default {
        components: {},
        data() {
            return {
                mode: 'HOME',
                userid4modal: '333',
                showdetail: false
            }
        },
        computed: {},
        methods: {
            //收起展开左栏
            // ...mapActions([
            //     'toggle_leftbar'
            // ])
        },
        created() {
        }
    }
</script>