<template>
  <div>
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item style="float: right;margin-right: -1px;">
          <el-button class="el-button el-button--custom" @click="searchRole" style="border-radius: 0 4px 4px 0"  >搜索</el-button>
        </el-form-item>
        <el-form-item style="float: right;margin-right: -1px;border-radius: 4px 0 0 4px;">
          <el-input placeholder="描述"  prefix-icon="el-icon-search" v-model="filters.remark"  style="border-radius: 4px 0 0 4px;" >
          </el-input>
        </el-form-item>
        <el-form-item style="float: left">
          <el-button class="el-button el-button--custom" @click="insertFormDialog = true" icon="el-icon-plus" style="font-weight: bold">新增角色</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-table :data="roles" style="width: 100%">

      <el-table-column prop="name" label="角色名" width="180">
      </el-table-column>

      <el-table-column prop="remark" label="描述" width="180">
      </el-table-column>

      <el-table-column prop="operate" label="操作">
        <template slot-scope="scope">
          <el-button @click="showEditForm(scope.row)">编辑</el-button>
          <el-button @click="removeRole(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--工具条-->
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[10, 20, 30, 40]" layout="sizes, prev, pager, next,jumper" :page-size="pageSize" :total="total">
    </el-pagination>
    <!--添加界面-->
    <el-dialog title="添加角色" :visible.sync="insertFormDialog" width="30%" :before-close="handleCloseInsert">
      <el-form :model="insertForm" ref="insertForm">
        <el-form-item prop="name" label="角色名">
          <el-input type="text" v-model="insertForm.name"></el-input>
        </el-form-item>

        <el-form-item prop="remark" label="描述">
          <el-input type="text" v-model="insertForm.remark"></el-input>
        </el-form-item>
      </el-form>
      <div>
        <el-button @click="insertRole()">新增</el-button>
        <el-button @click="handleCloseInsert()">取消</el-button>
      </div>
    </el-dialog>
    <!--修改界面-->
    <el-dialog title="修改角色" :visible.sync="editFormDialog" width="30%" :before-close="handleCloseEdit">
      <el-form :model="editForm" ref="editForm">
        <el-form-item prop="remark" label="描述">
          <el-input type="text" v-model="editForm.remark"></el-input>
        </el-form-item>
      </el-form>
      <div>
        <el-button @click="editRole()">修改</el-button>
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
        roles:[],
        insertForm:{
          name:'',
          remark:''
        },
        editForm:{
          remark:''
        },
        filters:{
          remark:''
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
        this.searchRole();
      },
      handleCurrentChange(val){
        this.page = val;
        this.searchRole();
      },
      showEditForm(row){
        this.$restful("/sys/role/get/" + row.id).then(res =>{
          if (res){
            this.editForm = res;
            this.editFormDialog = true;
          }
        })
        this.editFormDialog = true;
      },
      searchRole(){
        this.$get("/sys/role/list",{
          page: this.page,
          pageSize: this.pageSize,
          remark: this.filters.remark
        }).then(res =>{
          console.log(res)
          this.roles = res.list;
          this.total = res.count;
        })
      },
      insertRole(){
        this.$refs.insertForm.validate(valid =>{
          if (valid){
            let params = Object.assign({},this.insertForm);
            this.$post("/sys/role/insert",this.$qs.stringify(params)).then(res =>{
              if (res){
                this.$refs['insertForm'].resetFields();
                this.insertFormDialog = false;
                this.searchRole();
              }
            })
          }
        })
      },
      editRole(){
        this.$refs.editForm.validate(valid =>{
          if (valid){
            let params = Object.assign({},this.editForm);
            this.$post("/sys/role/update",this.$qs.stringify(params)).then(res =>{
              if (res){
                this.$refs['editForm'].resetFields();
                this.editFormDialog = false;
                this.searchRole();
              }
            })
          }
        })
      },
      removeRole(row){
        this.$restful("/sys/role/remove/" + row.id).then(res =>{
          if(res){
            this.searchRole();
          }
        })
      }
    },
    mounted(){
      this.searchRole();
    }
  }
</script>
