<template>
  <el-container class="el-container">
    <el-header class="el-header">
      <img src="../assets/header.jpg" height="100%" width="100%"/>
    </el-header>

    <el-container class="el-container">
      <el-aside class="el-aside" width="200px">
        <el-menu default-active="2" class="el-menu-vertical-demo" >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span>系统管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1" @click="jumpTo('/user/list')">用户管理</el-menu-item>
              <el-menu-item index="1-2" @click="jumpTo('/role/list')">角色管理</el-menu-item>
              <el-menu-item index="1-2" @click="jumpTo('/menu/list')">菜单管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="el-main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<style>
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>

<script>

  export default {
    data(){
      return{
        menuList: [],
        user:{
          name:''
        }
      }
    },
    methods:{
      jumpTo(url){
        this.$router.push(url)
      }
    },
    mounted(){
    }
  }
</script>
