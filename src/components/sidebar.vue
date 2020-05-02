<template>
      <el-menu
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      router>
      <el-menu-item :index="item.path" v-for="item in sidebar" :key="item.path">
        <span slot="title">{{item.title}}</span>
      </el-menu-item>
    </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'sidebar',
  computed: {
    ...mapGetters(['sidebar'])
  },
  created () {
    console.log(this.sidebar, '----计算属性')
  },
  data () {
    return {
      routerItem: [
        {
          path: '/',
          name: '视口跳转组件一'
        },
        {
          path: 'pagetwo',
          name: '视口跳转组件二'
        },
        {
          path: 'pagethree',
          name: '视口跳转组件三'
        },
        {
          path: 'pagefour',
          name: '视口跳转组件四'
        },
        {
          path: 'pagefive',
          name: '视口跳转组件五'
        }
      ]
    }
  }
}
</script>

<style>
.el-menu{
    height: 100%;
}
</style>
