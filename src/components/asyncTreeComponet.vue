<template>
  <div class="async-container">
      <el-tree :data="treedata" style="width:100px" @node-click="getNode">

      </el-tree>
      <div class="component-container">
          <async-component :nodepath="path"></async-component>
      </div>
  </div>
</template>

<script>
import asyncComponent from './asyncComponent'
export default {
  components: {
    asyncComponent
  },
  props: {
    treedata: {
      type: Array,
      isRequired: true,
      default: () => { return [] }
    }
  },
  created () {
    console.log(this.treedata, '-----我是第三个组件')
  },
  mounted () {
  },
  data () {
    return {
      data: [{ label: '表单类', children: [{ label: '表单1', path: 'form/formone' }, { label: '表单2', path: 'form/formtwo' }] },
        { label: '表格类', children: [{ label: '表格1', path: 'table/tableone' }, { label: '表格2', path: 'table/tabletwo' }] }],
      path: 'form/formone'
    }
  },
  methods: {
    getNode (res) {
      if (!res.path) {
        this.path = res.children[0].path
        return
      }
      this.path = res.path
    }
  }
}

</script>

<style>
.async-container{
    padding: 0 20px;
    display: flex;
}
.component-container{
    padding: 0 20px;
    margin-left: 10px;
    width: 100%;
}
</style>
