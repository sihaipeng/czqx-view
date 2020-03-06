<template>
  <el-table :data="tableData" style="width: 100%" max-height="250">
    <!--<el-table-column fixed prop="date" label="日期" width="150">-->
    <!--</el-table-column>-->

    <el-table-column prop="name" label="姓名" width="120">
    </el-table-column>

    <el-table-column prop="price" label="价格" width="120">
    </el-table-column>

    <el-table-column prop="status" label="状态" width="120">
    </el-table-column>

    <el-table-column fixed="right" label="操作" width="120">
      <template slot-scope="scope">
        <el-button @click.native.prevent="updatePro(scope.$index, tableData)" type="text" size="small">修改</el-button>
        <el-button @click.native.prevent="removePro(scope.$index, tableData)" type="text" size="small">移除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    data(){
      return {
        tableData:[],
      }
    },
    methods:{
      updatePro(){

      },
      removePro(){

      },
    }
  }
</script>
