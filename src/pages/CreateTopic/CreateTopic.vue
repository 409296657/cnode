<template>
  <div id="User">
    <div class="container">
      <div class="Nav">
        <div class="navbar">
          <div class="icon">
            <router-link :to="{ path: '/', params: {} }">主页 </router-link>/
            <span>发布话题</span>
          </div>
        </div>
        <div class="content">
          <div class="template">
            选择版块：
            <el-select v-model="value" placeholder="请选择" size=small>
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <span v-if="value != ''&&value != 'dev'">*个人练习做的小项目，为了避免污染社区，请选择发布在客户端测试区</span>
          </div>
          <div class="title">
            <input type="text" name="" placeholder="标题字数 10 字以上">
          </div>
          <div class="text">
            <div id="editor" style="text-align:left"></div>
          </div>
          <div class="footbar">
            <div class="btn" @click="submit">提&nbsp;&nbsp;交</div>
          </div>
        </div>
      </div>
    </div>

    <div class="banner">

    </div>
  </div>
</template>

<script>
import E from 'wangeditor'
export default {
  name:'User',
  components:{

  },
  data () {
    return {
      options: [{
          value: 'share',
          label: '分享'
        }, {
          value: 'ask',
          label: '问答'
        }, {
          value: 'job',
          label: '招聘'
        }, {
          value: 'dev',
          label: '客户端测试'
        }],
        value: '',
    }
  },
  methods:{
    submit:function(){

    }
  },
  mounted(){
    let editor = new E('#editor')
    this.editor = editor
    editor.customConfig.onchange = (html) => {
      this.editorContent = html
    }
    editor.create()
  },
}
</script>


<style lang="less">
#User{
  margin: 0 auto;
  padding: 20px 0;
  width: 1200px;
  display: flex;
  .container{
    width: 900px;
    .Nav{

      .navbar{
        height: 40px;
        background-color: #f6f6f6;
        display: flex;
        align-items: center;
        border-radius: 5px 5px 0 0;
        border-bottom: 1px solid #e5e5e5;
        .icon{
          color: #ccc;
          margin: 0 10px;
          font-size: 14px;
          padding: 3px;
          border-radius: 3px;
          a{
            text-decoration: none;
            color: #80bd01;
          }
        }
      }
      .content{
        padding: 8px;
        border-radius:0 0 5px 5px;
        background-color: #fff;
        .template,.title,.text{
          margin: 15px 0;
        }
        .template{

          span{
            color: red;
            font-size: 14px;
          }
        }
        .title{

          input{
            width: 100%;
            padding: 6px 10px;
            font-size: 16px;
            box-sizing: border-box;
            border-radius: 5px;
            border: 1px solid #dedede;
            color: #999;
          }
        }
        .footbar{
          padding: 10px;
          background-color: #fff;
          .btn{
            padding: 5px 10px;
            border-radius: 5px;
            background-color: #0088cc;
            color: #fff;
            display: inline-block;
          }
        }
      }
    }
  }
  .banner{
    flex: 1;
    margin-left: 20px;

  }
}
.el-select-dropdown{
  z-index: 99999999 !important;
}
</style>
