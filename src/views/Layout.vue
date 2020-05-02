<template>
    <el-container class="layout-container">
        <el-header>
            <wz-header></wz-header>
        </el-header>
        <el-container>
            <el-aside style="height:100%;" width="200px">
                <wz-sidebar></wz-sidebar>
            </el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import wzHeader from '@/components/header'
import wzSidebar from '@/components/sidebar'
export default {
  components: {
    wzHeader,
    wzSidebar
  }
}
</script>

<style lang="scss">
.layout-container{
    width: 100%;
    height: 100%;
    .el-header{
        border-bottom: 1px solid black;
    }
}
</style>
