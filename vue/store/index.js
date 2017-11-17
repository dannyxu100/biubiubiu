import Vue                      from 'vue';
import Vuex                     from 'vuex';
Vue.use(Vuex);

import admin_root               from './admin/root';
import admin_theme              from './admin/theme';
// import home                  from './home';




export default new Vuex.Store({
    modules: {
        admin_root:         admin_root,
        admin_theme:        admin_theme,
        // home:          home
    }
});
