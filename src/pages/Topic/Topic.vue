<template>
  <div id="Topic">
    <div class="body">
      <div class="topic">
        <div class="head">
          <div class="text">
            <div class="title">
              <span v-if="dataList.top">置顶</span>
              <span v-if="dataList.good">精华</span>
              <b>{{dataList.title}}</b>
            </div>
            <div class="info">
              <span>&nbsp;发布于 {{releaseTime}}&nbsp;</span>
              <span>&nbsp;作者 {{authorName}}</span>
              <span>&nbsp;{{dataList.visit_count}} 次浏览&nbsp;</span>
              <span>&nbsp;来自 {{tab}}&nbsp;</span>
            </div>
          </div>
          <div class="cancel" v-if="this.is_collect" @click="cancel">取消收藏</div>
          <div class="collection" v-else @click="collection">收藏</div>
        </div>

        <div class="content" v-html="dataList.content"></div>
      </div>

      <div class="reply" v-if="replyList.length!==0">
        <div class="bar">回复</div>
        <div class="replyList" v-for="(reply,index) in replyList">
          <div class="img">
            <router-link :to="{ path: '/user/'+reply.author.loginname, params: {} }">
              <img :src="reply.author.avatar_url">
            </router-link>
          </div>
          <div class="content">
            <div class="userBar">
              <div class="user">
                <router-link :to="{ path: '/user/'+reply.author.loginname, params: {} }">
                  {{reply.author.loginname}}
                </router-link>
                {{index+1}}楼
                <span>{{replyTime[index]}}</span>
                <span class="author" v-if="reply.author.loginname==authorName"> 作者</span>
              </div>
              <div class="icon">
                <div class="fabulous" :class="{display:reply.ups.length==0}">
                  <span class="iconfont icon-dianzan1" @click="fabulous(reply)" :class="{red:reply.is_uped}"></span>
                  <span v-if="reply.ups.length!=0">{{reply.ups.length}}</span>
                </div>
                <router-link :to="{ name: '', params: {} }">
                  <i class="el-icon-edit"></i>
                </router-link>
              </div>
            </div>
            <div class="text" v-html="reply.content"></div>
          </div>
        </div>
      </div>
    </div>

    <div class="banner">
      <UserInfo :user="user" title="作者"></UserInfo>
    </div>

  </div>
</template>

<script>
import UserInfo from '@/components/common/UserInfo'
export default {
  name:'Topic',
  components:{
    UserInfo,
  },
  data () {
    return {
      dataList:'',
      releaseTime:'',
      lastReplyTime:'',
      authorName:'',
      replyList:'',
      replyTime:[],
      tab:'',
      accesstoken:'',
      is_collect:'',
      user:'',
    }
  },
  methods:{
    fabulous:function(data){
      console.log(data)
      data.is_uped = !data.is_uped;
      this.axios({
        method:"POST",
        url:"https://cnodejs.org/api/v1/reply/"+data.id+"/ups",
        data:{
          accesstoken:this.accesstoken,
        }
      })
      .then((res)=>{
        console.log(res)
        if (res.data.action=='up') {
          data.ups.push(1);
        }else {
          data.ups.pop();
        }
      })
      .catch((err)=>{
        console.log(err)
      })
    },
    cancel:function(){
      this.axios({
        method:"POST",
        url:"https://cnodejs.org/api/v1/topic_collect/de_collect",
        data:{
          accesstoken:this.accesstoken,
          topic_id:this.dataList.id,
        }
      })
      .then((res)=>{
        this.is_collect = !res.data.success;
      })
      .catch((err)=>{
        console.log(err )
      })
    },
    collection:function(){
      this.axios({
        method:"POST",
        url:"https://cnodejs.org/api/v1/topic_collect/collect",
        data:{
          accesstoken:this.accesstoken,
          topic_id:this.dataList.id,
        }
      })
      .then((res)=>{
        this.is_collect = res.data.success;
      })
      .catch((err)=>{
        console.log(err)
      })
    },
    init:function(){
      this.axios({
        method:"GET",
        url:"https://cnodejs.org/api/v1/topic/"+this.$route.params.id,
        params:{
          accesstoken:this.accesstoken,
        }
      })
      .then((res)=>{
        console.log(res)
        let data = res.data.data;
        this.dataList = data;
        this.releaseTime = this.util.formTimeToData(data.create_at);
        this.lastReplyTime = this.util.formTimeToData(data.last_reply_at);
        this.authorName = data.author.loginname;
        let replyList = data.replies;
        this.replyList = replyList;
        this.is_collect = data.is_collect;
        for (var i = 0; i < replyList.length; i++) {
          this.replyTime[i] = this.util.formTimeToData(replyList[i].create_at)
        }
        if (data.tab=='good') {
          this.tab = '精华'
        }else if (data.tab=='share') {
          this.tab = '分享'
        }else if (data.tab=='ask') {
          this.tab = '问答'
        }else if (data.tab=='job') {
          this.tab = '招聘'
        }else if (data.tab=='dev') {
          this.tab = '测试'
        };
        this.axios({
          method:"GET",
          url:"https://cnodejs.org/api/v1/user/"+this.authorName,
          params:{

          }
        })
        .then((res)=>{
          let data = res.data.data;
          this.user = data;
        })
        .catch((err)=>{

        })
      })
      .catch((err)=>{
        console.log(err)
      })
    }
  },
  mounted(){
    this.accesstoken = this.util.getCookie('accesstoken');
    this.init();
  },
}
</script>


<style lang="less">
#Topic{
  margin: 0 auto;
  padding: 20px 0;
  width: 1200px;
  display: flex;
  .red{
    color: red;
  }
  .body{
    width: 900px;
    .topic{
      background-color: #fff;
      border-radius: 5px;
      .head{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 20px 10px;
        border-bottom: 1px solid #e5e5e5;
        .text{

          .title{
            font-size: 22px;
            span{
              padding: 2px 4px;
              background-color: #80bd01;
              color: #999;
              border-radius: 2px;
              font-size: 14px;
              color: #fff;
            }
          }
          .info{
            font-size: 12px;
            color: #838383;
            margin: 8px 0;
            span::before{
              content: "•";
            }
          }
        }
        .collection{
          background-color: #80bd01;
          color: #fff;
          padding: 5px 10px;
          border-radius: 3px;
          cursor: pointer;
        }
        .cancel{
          background-color: #909090;
          color: #fff;
          padding: 5px 10px;
          border-radius: 3px;
          cursor: pointer;
        }
      }
      .content{
        padding: 10px;
        font-size: 15px;
        line-height: 25px;
        h3,h4{
          border-bottom: 1px solid #eee;
        }
        img{
          display: inline-block;
          max-width: 100%;
        }
      }
    }
    .reply{
      background-color: #fff;
      margin: 10px 0;
      border-radius: 5px;
      .bar{
        padding: 10px;
        border-bottom: 1px solid #eee;
        background-color: #f6f6f6;
      }
      .replyList{
        padding: 10px;
        display: flex;
        border-bottom: 1px solid #eee;
        .img{
          margin-right: 10px;
          img{
            display: inline-block;
            width: 30px;
            height: 30px;
            border-radius: 3px;
          }
        }
        .content{
          flex: 1;
          .userBar{
            display: flex;
            justify-content: space-between;
            align-items: center;
            .user{
              font-size: 12px;
              span::before:first-child{
                content: "•";
              }
              a{
                text-decoration: none;
                color: #666;
              }
              .author{
                background-color: #6ba44e;
                color: #fff;
                padding: 2px;
              }
            }
            .icon{
              font-size: 16px;
              .fabulous{
                display: inline-block;
                span:first-child{
                  cursor: pointer;
                }
              }
              .display{
                display: none;
              }
            }
          }
          .text{
            font-size: 14px;
            line-height: 24px;
            img{
              display: inline-block;
              max-width: 100%;
            }
          }
        }
      }
      .replyList:hover .content .userBar .icon .fabulous{
        display: inline-block;
      }
    }
  }
  .banner{
    flex: 1;
    margin-left: 20px;

  }
}
</style>
