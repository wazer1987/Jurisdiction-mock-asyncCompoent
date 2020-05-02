<template>
    <div class="component-container" >
        <h1>我是异步组件</h1>
        <component :is="componentFile" />
    </div>
</template>

<script>
export default {
  props: {
    nodepath: {
      type: String,
      default: function () {
        return ''
      }
    }
  },
  data () {
    // 初始的时候先调用一下这个函数
    const componentFile = this.render
    return {
      componentFile: componentFile
    }
  },
  watch: {
    nodepath () {
      this.render()
    }
  },
  methods: {
    render () {
      this.componentFile = (reslove) => ({
        component: import(`@/views/${this.nodepath}`),
        timeout: 3000
      })
    }
  }

}
</script >

<style lang="scss" scoped>
h1{
  text-align: center;
  font-size: 20px;
  margin-bottom: 20px;
}
</style>
