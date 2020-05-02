<template>
  <el-drawer
  :title="title"
  :visible.sync="drawer"
  :direction="direction"
  size="70%">
  <!-- 这个标签里就是封装了树形标签和异步组件的标签 -->
  <tree-component v-bind="$attrs"></tree-component>
  </el-drawer>
</template>

<script>
// import { gettreenode } from '@/api/treenode'
import treeComponent from '@/components/asyncTreeComponet'
export default {
  name: 'treedialog',
  components: {
    treeComponent
  },
  data () {
    return {
      drawer: false,
      direction: 'rtl',
      title: '获取了树形结构和异步组件'
    }
  },
  created () {
  },
  methods: {
    // async _gettree () {
    //   const { data: { data } } = await gettreenode()
    //   this.treedata = data
    // }
  }
}
</script>

<style>

</style>
