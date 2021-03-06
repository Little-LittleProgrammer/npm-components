import Vue from 'vue';
import { Button, message, Table, Input, Select, Divider, Icon, Checkbox, Spin} from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import QLoading from '@/components/qm-loading';

Vue.use(Button);
Vue.use(Table);
Vue.use(Input);
Vue.use(Select);
Vue.use(Divider);
Vue.use(Icon);
Vue.use(Checkbox);
Vue.use(Spin);
Vue.component('QLoading', QLoading); // loading
Vue.prototype.$message = message;
