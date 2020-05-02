<template>
    <div class="five-container">
       <h1>
           我是视口标签router-view显示的内容
       </h1>
       <el-button type="primary" @click="getTreeData">
           点击弹框获取树形和异步组件
       </el-button>
       <el-button @click="goTwo">
           我要去视口跳转组件二
       </el-button>
       <el-button @click="goTestData">gg
           获取mock的随机数据
       </el-button>
       <!-- 这里是我们封装的左树右表的弹框标签 -->
       <tree-dialog ref="dialog" :treedata="treedata"></tree-dialog>
    </div>
</template>

<script>
import treeDialog from '@/components/treedialog'
import { gettreenode, gettestdata } from '@/api/treenode'
export default {
  components: {
    treeDialog
  },
  data () {
    return {
      treedata: [],
      data: {
        name: '李四',
        age: 18
      }
    }
  },
  created () {
    // this._gettree()
  },
  methods: {
    async goTestData () {
      const data = await gettestdata()
      console.log(data, '----我是获取的测试数据')
    },
    goTwo () {
      this.$router.push({ name: 'pagetwo', params: this.data })
    },
    async getTreeData () {
      this.$refs.dialog.drawer = true
      const { data: { data } } = await gettreenode(this.data)
      this.treedata = data
    }
    // async _gettree () {
    //   const { data: { data } } = await gettreenode()
    //   this.treedata = data
    // }

  }
}
</script>

<style lang="scss" scoped>
h1{
    height: 30px;
    text-align: center;
    border-bottom: 1px dashed black;
}
.el-button{
    margin-top: 30px;
}
</style>
