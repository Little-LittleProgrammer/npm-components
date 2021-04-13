<template>
  <div class="home">
    <!-- multiple -->
    <big-select :selectAllList="list" type="default"></big-select>
  </div>
</template>

<script>
// @ is an alias to /src
import bigSelect from '@/views/big-select'

export default {
  name: 'Home',
  components: {
    bigSelect
  },
  data() {
    return {
      list: []
    }
  },
  mounted() {
    let _list = new Array(10000).fill(1)
    let _cache = _list.map(() => {
      let _num = this.getRandom(10)
      return { value:_num, label:_num }
    })
    setTimeout(()=> {
      this.list = _cache
    },5000)
    
  },
  methods: {
    getRandom(num){
      var random = Math.floor((Math.random()+Math.floor(Math.random()*9+1))*Math.pow(10,num-1));
      return random
    }
  }
}
</script>
