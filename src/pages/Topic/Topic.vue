<template>
  <div id="Topic">
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
        <div class="collection">
          收藏
        </div>
      </div>

      <div class="content" v-html="dataList.content"></div>
    </div>

    <div class="reply">
      <div class="bar">回复</div>
      <div class="replyList" v-for="(reply,index) in replyList">
        <div class="img">
          <img :src="reply.author.avatar_url">
        </div>
        <div class="content">
          <div class="userBar">
            <div class="user">
              <router-link :to="{ name: '', params: {} }">{{reply.author.loginname}}</router-link> {{index+1}}楼
              <span>{{replyTime[index]}}</span>
            </div>
            <div class="icon"><i class="el-icon-edit"></i></div>
          </div>
          <div class="text" v-html="reply.content"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'Topic',
  components:{

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
    }
  },
  methods:{
    init:function(){
      this.axios({
        method:"GET",
        url:"https://cnodejs.org/api/v1/topic/"+this.$route.params.id,
        params:{
          accesstoken:'',
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
        }
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
#Topic{
  width: 1000px;
  margin: 0 auto;
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
            span::before{
              content: "•";
            }
            a{
              text-decoration: none;
              color: #666;
            }
          }
          .icon{
            font-size: 16px;
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
  }
}
</style>
