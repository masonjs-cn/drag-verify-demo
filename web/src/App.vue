<template>
  <div id="app">
    <drag-verify-img
      ref="verify"
      :imgsrc="imgsrc"
      :isPassing.sync="isPassing"
      text="请按住滑块拖动"
      successText="验证通过"
      handlerIcon="el-icon-d-arrow-right"
      successIcon="el-icon-circle-check"
      @postRotate="postRotate"
      @passcallback="passcallback"
      @passfail="passfail"
    >
    </drag-verify-img>
  </div>
</template>

<script>
import DragVerifyImg from './components/DragVerify.vue';
import axios from 'axios';

export default {
  name: 'App',
  components: {
    DragVerifyImg
  },
  data: function () {
    return {
      imgsrc: '',
      isPassing: false
    };
  },
  created() {
    this.getImg();
  },
  methods: {
    async getImg() {
      try {
        const res = await axios.get('/api/getImg');
        this.imgsrc = res.data.base64str;
      } catch (error) {
        console.log(error);
      }
    },
    async postRotate(val) {
      const res = await axios.get(`/api/validation?rotate=${val}`);
      this.$refs.verify.setFinish(res.data.flag);
    },
    passcallback() {
      console.log('成功');
    },
    passfail() {
      this.$refs.verify.reset(); // 默认重置
      console.log('失败');
    }
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
