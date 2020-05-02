<template>
<div class="header-container">
  <h1>异步组件和mock的基本使用</h1>
  <div>
    <span style="margin-right:10px">账号:{{email}}</span>
    <span>昵称:{{nickname}}</span>
  </div>
</div>

</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'wzheader',
  computed: {
    ...mapGetters(['email', 'nickname'])
  }
}
</script>

<style lang="scss" scoped>
.header-container{
  display: flex;
  justify-content: space-between;
   h1{
        line-height: 60px;
        text-align: center;
        font-size: 24px;
    }
    span{
      line-height: 60px;
    }
}

</style>
