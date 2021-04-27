<template>
  <div>
    <a-select
      v-model="selectList"
      mode="multiple"
      style="width: 30%"
      placeholder="select one country"
    >
      <div slot="dropdownRender" slot-scope="menu">
        <div
          style="padding: 4px 8px; cursor: pointer;"
          @mousedown="e => e.preventDefault()"
        >
          <a-checkbox v-model="isAll" @change="selectAll">全选</a-checkbox>
        </div>

        <a-divider style="margin: 4px 0;" />
        <v-nodes :vnodes="menu" />
      </div>  
      <a-select-option v-for="(item, index) in options" :key="index" :value="item.value">
        {{item.name}}
      </a-select-option>
    </a-select>
    <a-table v-cloak :columns="columns" :data-source="data" :scroll="{ x: 1500, y: 300 }">
      <template v-for="item in columns.slice(0,columns.length-2)" slot-scope="text" :slot="item.scopedSlots.customRender">
          <div v-if="item.type == 'input'" :key='item.key' >
              <a-input :value="text.name"></a-input>
          </div>
          <div v-else-if="item.type == 'button'" :key='item.key' >
              <a-button type = "primary">{{text.age}}</a-button>
          </div>
          <div v-else-if="item.type == 'textarea'" :key='item.key' >
              <a-textarea cols="3" rows="5" v-model="text.address"></a-textarea>
              <a-button>{{text.age}}</a-button>
          </div>
          <div v-else :key='item.key' >
              {{text.address}}
          </div>
      </template>
      <template slot="action" slot-scope="text, data">
        <div key="opration">
          <a-button type="primary" @click="handle_download(data)">下载</a-button>
        </div>
      </template>
    </a-table>
  </div>
</template>
<script>
const columns = [
  { title: 'Full Name', width: 100, key: 'name', fixed: 'left',type: 'input', scopedSlots:{ customRender:'name' } },
  { title: 'Age', width: 100, key: 'age', fixed: 'left',type: 'button', scopedSlots:{ customRender:'age' } },
  { title: 'Column 1', key: '1', width: 150, type: 'input', scopedSlots:{ customRender:'input1' } },
  { title: 'Column 2', key: '2', width: 150, type: 'button',scopedSlots:{ customRender:'button' } },
  { title: 'Column 3', key: '3', width: 150, type: 'input',scopedSlots:{ customRender:'updateImg' } },
  { title: 'Column 4', key: '4', width: 150, type: 'textarea',scopedSlots:{ customRender:'1' } },
  { title: 'Column 5', key: '5', width: 150, scopedSlots:{ customRender:'2' } },
  { title: 'Column 6', key: '6', width: 150, scopedSlots:{ customRender:'3' } },
  { title: 'Column 7', key: '7', width: 150, scopedSlots:{ customRender:'input' } },
  { title: 'Column 8', key: '8', scopedSlots:{ customRender:'4' } },
  {
    title: 'Action',
    key: 'operation',
    fixed: 'right',
    width: 100,
    scopedSlots: { customRender: 'action' },
  },
];




export default {
  components: {
    VNodes: {
      functional: true,
      render: (h, ctx) => ctx.props.vnodes,
    },
  },
  data() {
    return {
      data:[],
      columns:[],
      selectList:[],
      isAll:false,
      options: [
        {name: 'sam', value: 'sam'},
        {name: 'jam', value: 'jam'},
        {name: 'stave', value: 'stave'},
        {name: 'pony', value: 'pony'}
      ]
    };
  },
  mounted() {
    this.initData().then(
      (data) => {
        console.log(data)
        for(let i = 0; i < columns.length; i++) {
            this.columns.push(columns[i])
        }
        for(let i = 0; i < data.length; i++) {
            this.data.push(data[i])
        }
      }
    )
    
  },
  methods: {
     initData() {
      let data = [];
      return new Promise((reslove) => {
        setTimeout(() => {
          for (let i = 0; i < 100; i++) {
            data.push({
              key: i,
              name: `Edrward ${i}`,
              age: 32,
              address: `London Park no. ${i}`,
            });
          }
          reslove(data)
        }, 300);
      }) 
    },
    handle_download(data){
      console.log(data)
            // location.href = data.download_url;
        },
    selectAll() {
      console.log(this.isAll)
      console.log(this.selectList)
      if (this.isAll === true) {
        this.selectList = []
        this.options.forEach(item => {
          this.selectList.push(item.value)
        })
      } else {
        this.selectList = []
      }
    }
  }
};
</script>
<style lang="scss" scoped>
  [v-cloak]{
    display: none;
  }
</style>
