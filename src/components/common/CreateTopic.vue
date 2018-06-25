<template>
  <div id="CreateTopic">
    <div class="CreateTopic">
      <div class="btn">
        <router-link :to="{ name: '', params: {} }">发布话题</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'UserInfo',
  props:['user','title'],
  components:{

  },
  data () {
    return {

    }
  },
  methods:{

  },
  mounted(){

  },
}
</script>


<style lang="less">
#CreateTopic{

  .CreateTopic{
    margin: 10px 0;
    padding: 10px;
    background-color: #fff;
    border-radius: 5px;
    .btn{
      padding: 5px;
      background-color: #80bd01;
      display: inline-block;
      border-radius: 3px;
      a{
        color: #fff;
        text-decoration: none;
      }
    }
  }
}
</style>
