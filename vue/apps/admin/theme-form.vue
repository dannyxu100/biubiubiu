<style lang="less">
    @import "../../less/mixins/prefix.less";

</style>

<template>
    <div class="wrapper wrapper-scroll wrapper-box wrapper-theme">
        <div class="container">
            <!-- 表单 -->
            <div class="section">
                <h2>表单</h2>
                <h3>.form .formitem</h3>
                <div></div>
                <br/>
                <div class="grid">
                    <div class="grid-row">
                        <div class="cell-12-6">
                            <form class="form" action="" method="post" novalidate="novalidate">
                                <div class="formitem">
                                    <label class="label">账号 <i class="must"></i></label>
                                    <input type="text" class="input" value="" placeholder="邮箱或手机"/>
                                </div>
                                <div class="formitem">
                                    <label class="label">密码 <i class="must"></i></label>
                                    <input type="text" class="input" value="" placeholder="登录密码"/>
                                    <small>忘记密码，可以联系客服咨询。</small>
                                </div>

                                <div style="padding-left:85px;">
                                    <label class="checkbox checkbox-theme checkbox-min checkbox-full">
                                        <input type="checkbox" id="autologin" name="autologin" value="1" />
                                        <span class="checkbox-text">30天免登录</span>
                                    </label>
                                    <button type="submit" class="btn btn-theme">立即登录</button>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
                <br/>

                <h3>.form .formsub .formitem</h3>
                <div>字段分组</div>
                <br/>
                <div class="grid">
                    <div class="grid-row">
                        <div class="cell-12-6">
                            <form class="form" action="" method="post" novalidate="novalidate">
                                <div class="formsub">
                                    <div class="formitem">
                                        <label class="label">用户名 <i class="must"></i></label>
                                        <input type="text" class="input" value="" placeholder="昵称"/>
                                    </div>
                                    <div class="formitem">
                                        <label class="label">电话 <i class="must"></i></label>
                                        <input type="number" class="input" value="" placeholder="手机号码"/>
                                    </div>
                                </div>

                                <div class="formsub">
                                    <div class="formitem">
                                        <label class="label">性别</label>
                                        <label class="radio radio-theme checked">
                                            <input type="radio" id="formgender1" name="formgender" value="man" checked/>
                                            <span class="radio-text">男</span>
                                        </label>
                                        <label class="radio radio-theme">
                                            <input type="radio" id="formgender2" name="formgender" value="woman" />
                                            <span class="radio-text">女</span>
                                        </label>
                                    </div>
                                    <div class="formitem">
                                        <label class="label">所在地区</label>
                                        <div class="select" style="margin-right:10px;">
                                            <div class="select-box">
                                                <input class="select-text" type="text" placeholder="省份" value="" />
                                            </div>
                                            <ul class="select-list">
                                                <li class="select-item" value="beijing">北京</li>
                                                <li class="select-item" value="shanghai">四川</li>
                                                <li class="select-item" value="guangzhou">浙江</li>
                                                <li class="select-item" value="shenzhen">内蒙古</li>
                                            </ul>
                                        </div>
                                        <div class="select">
                                            <div class="select-box">
                                                <input class="select-text" type="text" placeholder="城市" value="" />
                                            </div>
                                            <ul class="select-list">
                                                <li class="select-item" value="beijing">北京</li>
                                                <li class="select-item" value="shanghai">上海</li>
                                                <li class="select-item" value="guangzhou">广州</li>
                                                <li class="select-item" value="shenzhen">深圳</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div class="formsub">
                                    <div class="formitem">
                                        <label class="label">个人简介</label>
                                        <input type="text" class="input" value="" placeholder="个人资料"/>
                                    </div>
                                </div>

                                <div style="padding-left:85px;">
                                    <button type="submit" class="btn btn-theme">保存</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <br/>

                <h3>.form .formitem-line</h3>
                <div>行模式</div>
                <br/>
                <div class="grid">
                    <div class="grid-row">
                        <div class="cell-12-8">
                            <form class="form" action="" method="post" novalidate="novalidate">
                                <div class="formsub">
                                    <div class="formitem-line">
                                        <label class="label">账号 <i class="must"></i></label>
                                        <input type="text" class="input input-full" value="" placeholder="邮箱或手机"/>
                                    </div>
                                    <div class="formitem-line">
                                        <label class="label">旧密码 <i class="must"></i></label>
                                        <input type="text" class="input input-full" value="" placeholder="登录密码"/>
                                        <small>忘记密码，可以联系客服咨询。</small>
                                    </div>
                                </div>

                                <div class="formsub">
                                    <div class="formitem-line">
                                        <label class="label">新密码 <i class="must"></i></label>
                                        <input type="text" class="input input-full" value="" placeholder="6~30位数字、字母或特殊符号"/>
                                    </div>
                                    <div class="formitem-line">
                                        <label class="label">确认密码 <i class="must"></i></label>
                                        <input type="text" class="input input-full" value="" placeholder="再次输入新密码"/>
                                    </div>
                                </div>

                                <div>
                                    <label class="checkbox checkbox-theme checkbox-min checkbox-full">
                                        <input type="checkbox" id="autologin" name="autologin" value="1" />
                                        <span class="checkbox-text">同意《账号安全管理协议》条款</span>
                                    </label>
                                    <button type="submit" class="btn btn-theme">确定提交</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
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
        created() {
        }
    }
</script>