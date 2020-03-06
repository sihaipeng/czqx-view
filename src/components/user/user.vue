<template>
  <div>
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item style="float: right;margin-right: -1px;">
          <el-button class="el-button el-button--custom" @click="searchUser" style="border-radius: 0 4px 4px 0"  >搜索</el-button>
        </el-form-item>
        <el-form-item style="float: right;margin-right: -1px;border-radius: 4px 0 0 4px;">
          <el-input placeholder="昵称"  prefix-icon="el-icon-search" v-model="filters.nickName"  style="border-radius: 4px 0 0 4px;" >
          </el-input>
        </el-form-item>
        <el-form-item style="float: left">
          <el-button class="el-button el-button--custom" @click="insertFormDialog = true" icon="el-icon-plus" style="font-weight: bold">新增用户</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-table :data="users" style="width: 100%">

      <el-table-column prop="name" label="姓名" width="180">
      </el-table-column>

      <el-table-column prop="nickName" label="昵称" width="180">
      </el-table-column>

      <el-table-column prop="status" label="状态">
      </el-table-column>

      <el-table-column prop="operate" label="操作">
        <template slot-scope="scope">
          <el-button @click="showEditForm(scope.row)">编辑</el-button>
          <el-button @click="removeUser(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--工具条-->
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[10, 20, 30, 40]" layout="sizes, prev, pager, next,jumper" :page-size="pageSize" :total="total">
    </el-pagination>
    <!--添加界面-->
    <el-dialog title="添加用户" :visible.sync="insertFormDialog" width="30%" :before-close="handleCloseInsert">
      <el-form :model="insertForm" ref="insertForm">
        <el-form-item prop="name" label="姓名">
          <el-input type="text" v-model="insertForm.name"></el-input>
        </el-form-item>

        <el-form-item prop="nickName" label="昵称">
          <el-input type="text" v-model="insertForm.nickName"></el-input>
        </el-form-item>

        <el-form-item prop="password" label="密码">
          <el-input type="password" v-model="insertForm.password"></el-input>
        </el-form-item>
      </el-form>
      <div>
        <el-button @click="insertUser()">新增</el-button>
        <el-button @click="handleCloseInsert()">取消</el-button>
      </div>
    </el-dialog>
    <!--修改界面-->
    <el-dialog title="修改用户" :visible.sync="editFormDialog" width="30%" :before-close="handleCloseEdit">
      <el-form :model="editForm" ref="editForm">
        <el-form-item prop="nickName" label="昵称">
          <el-input type="text" v-model="editForm.nickName"></el-input>
        </el-form-item>
      </el-form>
      <div>
        <el-button @click="editUser()">修改</el-button>
        <el-button @click="handleCloseEdit()">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

  export default {
    data(){
      return{
        total:0,
        page:1,
        pageSize:10,
        users:[],
        insertForm:{
          name:'',
          nickName:'',
          password:''
        },
        editForm:{
          name:'',
          nickName:'',
          password:''
        },
        filters:{
          nickName:''
        },
        insertFormDialog:false,
        editFormDialog:false
      }
    },
    methods:{
      handleCloseEdit(){
        this.$refs['editForm'].resetFields();
        this.editFormDialog = false;
      },
      handleCloseInsert(){
        this.$refs['insertForm'].resetFields();
        this.insertFormDialog = false;
      },
      handleSizeChange(val){
        this.pageSize = val;
        this.searchUser();
      },
      handleCurrentChange(val){
        this.page = val;
        this.searchUser();
      },
      showEditForm(row){
        this.$restful("/sys/user/get/" + row.id).then(res =>{
          if (res){
            this.editForm = res;
            this.editFormDialog = true;
          }
        })
        this.editFormDialog = true;
      },
      searchUser(){
        this.$get("/sys/user/list",{
          page: this.page,
          pageSize: this.pageSize,
          nickName: this.filters.nickName
        }).then(res =>{
          console.log(res)
          this.users = res.list;
          this.total = res.count;
        })
      },
      insertUser(){
        this.$refs.insertForm.validate(valid =>{
          if (valid){
            let params = Object.assign({},this.insertForm);
            this.$post("/sys/user/insert",this.$qs.stringify(params)).then(res =>{
              if (res){
                this.$refs['insertForm'].resetFields();
                this.insertFormDialog = false;
                this.searchUser();
              }
            })
          }
        })
      },
      editUser(){
        this.$refs.editForm.validate(valid =>{
          if (valid){
            let params = Object.assign({},this.editForm);
            this.$post("/sys/user/update",this.$qs.stringify(params)).then(res =>{
              if (res){
                this.$refs['editForm'].resetFields();
                this.editFormDialog = false;
                this.searchUser();
              }
            })
          }
        })
      },
      removeUser(row){
        this.$restful("/sys/user/remove/" + row.id).then(res =>{
          if(res){
            this.searchUser();
          }
        })
      }
    },
    mounted(){
      this.searchUser();
    }
  }
</script>
