<template>
  <div>
    <el-button type="success" @click="insertFormDialog = true" icon="el-icon-circle-plus-outline">新增</el-button>
    <el-tree :data="menus"  @node-click="handleNodeClick">
      <el-table-column prop="name" label="菜单名称">
      </el-table-column>

      <el-table-column prop="icon" label="菜单图标">
      </el-table-column>

      <el-table-column prop="url" label="菜单url">
      </el-table-column>

      <el-table-column prop="type" label="菜单类型">
      </el-table-column>

      <el-table-column prop="operation" label="操作">
        <template slot-scope="scope">
          <el-button @click="showEditForm(scope.row)" type="primary" icon="el-icon-edit">编辑</el-button>
          <el-button @click="removeMenu(scope.row)" type="danger" icon="el-icon-delete">删除</el-button>
        </template>
      </el-table-column>
    </el-tree>
    <!--<el-table :data="menus" style="width: 100%">-->
      <!--<el-table-column prop="name" label="菜单名称">-->
      <!--</el-table-column>-->

      <!--<el-table-column prop="icon" label="菜单图标">-->
      <!--</el-table-column>-->

      <!--<el-table-column prop="url" label="菜单url">-->
      <!--</el-table-column>-->

      <!--<el-table-column prop="type" label="菜单类型">-->
      <!--</el-table-column>-->

      <!--<el-table-column prop="operation" label="操作">-->
        <!--<template slot-scope="scope">-->
          <!--<el-button @click="showEditForm(scope.row)" type="primary" icon="el-icon-edit">编辑</el-button>-->
          <!--<el-button @click="removeMenu(scope.row)" type="danger" icon="el-icon-delete">删除</el-button>-->
          <!--&lt;!&ndash;<el-button type="success" icon="el-icon-delete"></el-button>&ndash;&gt;-->
          <!--&lt;!&ndash;<el-button type="warning" icon="el-icon-delete"></el-button>&ndash;&gt;-->
          <!--&lt;!&ndash;<el-button type="info" icon="el-icon-delete"></el-button>&ndash;&gt;-->
          <!--&lt;!&ndash;<el-button type="text" icon="el-icon-delete"></el-button>&ndash;&gt;-->
        <!--</template>-->
      <!--</el-table-column>-->
    <!--</el-table>-->
    <!--工具条-->
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[10, 20, 30, 40]" layout="sizes, prev, pager, next,jumper" :page-size="pageSize" :total="total">
    </el-pagination>
    <!--添加页面-->
    <el-dialog title="添加菜单" :visible.sync="insertFormDialog" width="30%" :before-close="handleCloseInsert">
      <el-form :model="insertForm" ref="insertForm">
        <el-form-item prop="name" label="菜单名称">
          <el-input type="text" v-model="insertForm.name"></el-input>
        </el-form-item>

        <el-form-item prop="icon" label="菜单icon">
          <el-input type="text" v-model="insertForm.icon"></el-input>
        </el-form-item>

        <el-form-item prop="url" label="菜单url">
          <el-input type="text" v-model="insertForm.url"></el-input>
        </el-form-item>

        <el-form-item prop="type" label="菜单类型">
          <el-input type="text" v-model="insertForm.type"></el-input>
        </el-form-item>

        <el-form-item prop="pId" label="父级id">
          <el-input type="text" v-model="insertForm.pId"></el-input>
        </el-form-item>
      </el-form>
      <div>
        <el-button type="primary" @click="insertMenu()">新增</el-button>
        <el-button type="info" @click="handleCloseInsert()">取消</el-button>
      </div>
    </el-dialog>
    <!--修改界面-->
    <el-dialog title="修改菜单" :visible.sync="editFormDialog" width="30%" :before-close="handleCloseEdit">
      <el-form :model="editForm" ref="editForm">
        <el-form-item prop="name" label="菜单名称">
          <el-input type="text" v-model="editForm.name"></el-input>
        </el-form-item>
        <el-form-item prop="icon" label="菜单图标">
          <el-input type="text" v-model="editForm.icon"></el-input>
        </el-form-item>
        <el-form-item prop="url" label="菜单url">
          <el-input type="text" v-model="editForm.url"></el-input>
        </el-form-item>
      </el-form>
      <div>
        <el-button type="primary" @click="editMenu()">修改</el-button>
        <el-button type="info" @click="handleCloseEdit()">取消</el-button>
      </div>
    </el-dialog>
  </div>

</template>
<script>

  export default {
    data(){
      return{
        page:1,
        pageSize:10,
        total:0,
        menus:[],
        insertForm:{
          name:'',
          icon:'',
          url:'',
          type:'',
          pId:''
        },
        editForm:{
          name:'',
          icon:'',
          url:''
        },
        insertFormDialog: false,
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
      searchMenus(){
        let params = {
          page: this.page,
          pageSize: this.pageSize,
          pId: this.pId,
          type: this.type
        }
        this.$get("/sys/menu/list",params).then(res =>{
          console.log(res);
          this.menus = res.list;
          this.total = res.count;
        })
      },
      insertMenu(){
        this.$refs.insertForm.validate(valid =>{
          if (valid){
            let params = Object.assign({},this.insertForm);
            this.$post("/sys/menu/insert",this.$qs.stringify(params)).then(res =>{
              if (res){
                this.$refs['insertForm'].resetFields();
                this.insertFormDialog = false;
                this.searchMenus();
              }
            })
          }
        })
      },
      editMenu(){
        this.$refs.editForm.validate(valid =>{
          if (valid){
            let params = Object.assign({},this.editForm);
            this.$post("/sys/menu/update",this.$qs.stringify(params)).then(res =>{
              if (res){
                this.$refs['editForm'].resetFields();
                this.editFormDialog = false;
                this.searchMenus();
              }
            })
          }
        })
      },
      showEditForm(row){
        this.$restful("/sys/menu/get/" + row.id).then(res =>{
          this.editForm = res;
          this.editFormDialog = true;
        })
      },
      removeMenu(row){
        this.$restful("/sys/menu/remove/" + row.id).then(res =>{
          if(res){
            this.searchMenus();
          }
        })
      },
      handleNodeClick(){
        console.log("111")
      }
    },
    mounted(){
      this.searchMenus();
    }
  }
</script>
