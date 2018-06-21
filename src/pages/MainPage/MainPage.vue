<template>
  <div id="MainPage">
    <div class="Nav">
      <div class="navbar">
        <div v-for='(icon,index) in iconList' class="icon" :class='{active:isActive==icon.name}' @click="choseTopics(icon)">{{icon.text}}</div>
      </div>

      <div class="content">
        <div class="topic" v-for='item in itemList'>
          <div class="img"><router-link :to="{ name: '', params: {} }"><img :src="item.author.avatar_url" :title="item.author.loginname"></router-link></div>
          <div class="num"><span title="回复数">{{item.reply_count}}</span>/<span title="点击数">{{item.visit_count}}</span></div>
          <div class="type" :class="{active:item.top||item.good}">{{item.tab}}</div>
          <div class="title" :title="item.title"><router-link :to="{ name: '', params: {} }">{{item.title}}</router-link></div>
          <div class="answer"><router-link :to="{ name: '', params: {} }"><img src="" alt=""><span>xx小时前</span></router-link></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'MainPage',
  components:{

  },
  data () {
    return {
      iconList:[{text:"全部",name:"all",index:0},{text:"精华",name:"good",index:1},{text:"分享",name:"share",index:2},{text:"问答",name:"ask",index:3},{text:"招聘",name:"job",index:4},{text:"客户端测试",name:"dev",index:5}],
      isActive:'',
      topic:'',
      itemList:'',
    }
  },
  methods:{
    choseTopics:function(data){
      this.$router.push({
        path:'/',
        query:{tab:data.name},
      });
      this.init()
    },
    init:function(){
      this.axios({
        method:"GET",
        url:"https://cnodejs.org/api/v1/topics",
        params:{
          page:"",
          tab:this.$route.query.tab?this.$route.query.tab:'',
          limit:"20",
          mdrender:"",
        }
      })
      .then((res)=>{
        console.log(res)
        let data = res.data.data
        this.isActive = this.$route.query.tab?this.$route.query.tab:'all';
        for (var i = 0; i < data.length; i++) {
          if (data[i].top) {
            data[i].tab = '置顶'
          }else if(data[i].good){
            data[i].tab = '精华'
          }else {
            if (data[i].tab=='good') {
              data[i].tab = '精华'
            }else if (data[i].tab=='share') {
              data[i].tab = '分享'
            }else if (data[i].tab=='ask') {
              data[i].tab = '问答'
            }else if (data[i].tab=='job') {
              data[i].tab = '招聘'
            }else if (data[i].tab=='dev') {
              data[i].tab = '测试'
            }
          }
        }
        this.itemList = data;
      })
      .catch((err)=>{
        console.log(err)
      })
    }
  },
  mounted(){
    this.init()
  },
}
</script>


<style lang="less">
#MainPage{
  width: 1000px;
  margin: 0 auto;
  .Nav{
    width: 1000px;
    margin: 0 auto;
    .navbar{
      height: 40px;
      background-color: #f6f6f6;
      display: flex;
      align-items: center;
      .icon{
        color: #80bd01;
        margin: 0 10px;
        font-size: 14px;
        padding: 3px;
        border-radius: 3px;
        &.active{
          background-color: #80bd01;
          color: #fff;
        }
      }
    }
    .content{

      .topic{
        height: 50px;
        background-color: #fff;
        border-bottom: 1px solid #f0f0f0;
        display: flex;
        align-items: center;
        padding: 0 10px;
        font-size: 14px;
        .img{
          width: 30px;
          height: 30px;
          img{
            display: block;
            background-color: #666;
            width: 100%;
            height: 100%;
          }
        }
        .num{
          width: 100px;
          text-align: center;
          span:first-child{
            color:#9e78c0;
          }
          span:last-child{
            color: #b4b4b4;
          }
        }
        .type{
          padding: 2px 4px;
          background-color: #e5e5e5;
          color: #999;
          border-radius: 2px;
          &.active{
            background-color: #80bd01;
            color: #fff;
          }
        }
        .title{
          font-size: 16px;
          flex:1;
          padding: 0 10px;
          a{
            color: #333;
            text-decoration: none;
            font-size: 16px;
          }
          a:hover{
            text-decoration: underline;
          }
        }
        .answer{

          a{
            text-decoration: none;
            text-align: right;
            display: flex;
            align-items: center;
            color: #333;
            img{
              display: inline-block;
              width: 18px;
              height: 18px;
              background-color: #eee;
              margin-right: 6px;
            }
            span{
              text-align: right;
            }
          }
        }
      }
      .topic:hover{
        background-color: #f5f5f5;
      }
    }
  }

}
</style>
