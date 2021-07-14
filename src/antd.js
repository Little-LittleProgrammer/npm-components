import Vue from 'vue';
import { Button, message, Table, Input, Select, Divider, Icon, Checkbox, Spin} from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import QmLoading from '@/components/qm-loading';

Vue.use(Button);
Vue.use(Table);
Vue.use(Input);
Vue.use(Select);
Vue.use(Divider);
Vue.use(Icon);
Vue.use(Checkbox);
Vue.use(Spin);
Vue.component('QmLoading', QmLoading); // loading
Vue.prototype.$message = message;
