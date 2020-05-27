<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 类别信息
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" icon="el-icon-lx-add" @click="handleSave">新增</el-button>
            </div>
            <el-table
                :data="tableData.slice((query.pageIndex-1)*query.pageSize,query.pageIndex*query.pageSize) "               
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
            >
                <!-- <el-table-column type="selection" width="55" align="center"></el-table-column> -->
                <el-table-column prop="categoryId" label="ID" width="55" align="center"></el-table-column>
                <el-table-column prop="categoryName" label="类别名"></el-table-column>
                <el-table-column prop="categoryType" label="类别类型"></el-table-column>
                <el-table-column prop="createTime" label="创建时间"></el-table-column>
                <el-table-column prop="createTime" label="修改时间"></el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            icon="el-icon-edit"
                            @click="handleEdit(scope.$index, scope.row)"
                        >编辑</el-button>
                        <el-button
                            type="text"
                            icon="el-icon-delete"
                            class="red"
                            @click="handleDelete(scope.$index, scope.row)"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                    background
                    layout="total, prev, pager, next"
                    :current-page="query.pageIndex"
                    :page-size="query.pageSize"
                    :total="pageTotal"
                    @current-change="handlePageChange"
                ></el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="类别名">
                    <el-input v-model="form.categoryName"></el-input>
                </el-form-item>
                <el-form-item label="类别编号">
                    <el-select v-model="saveForm.categoryType" placeholder="请选择类型">
                            <el-option key="product" label="商品类别" value="product"></el-option>
                            <el-option key="facilities" label="器械类别" value="facilities"></el-option>
                        </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 新增弹出框 -->
        <el-dialog title="新增" :visible.sync="saveVisible" width="30%">
            <el-form ref="saveForm" :model="saveForm" label-width="70px">
                <el-form-item label="类别描述">
                    <el-input v-model="saveForm.categoryName"></el-input>
                </el-form-item>
               <el-form-item label="类别编号">
                    <el-select v-model="saveForm.categoryType" placeholder="请选择类型">
                            <el-option key="product" label="商品类别" value="product"></el-option>
                            <el-option key="facilities" label="器械类别" value="facilities"></el-option>
                        </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="saveVisible = false">取 消</el-button>
                <el-button type="primary" @click="save">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { fetchData } from '../../api/index';
import categoryApi from '../../api/category';
export default {
    name: 'category',
    data() {
        return {
            query: {
                address: '',
                name: '',
                pageIndex: 1,
                pageSize: 4
            },
            tableData: [],
            multipleSelection: [],
            delList: [],
            editVisible: false,
            saveVisible: false,
            pageTotal: 0,
            form: {},
            saveForm: {},
            idx: -1,
            id: -1
        };
    },
    created() {
        this.getData();
    },
    methods: {
        // 获取 员工信息数据
        getData() {
            categoryApi.getGategory().then(res=>{
                this.tableData= res.obj.list,
                this.pageTotal= res.obj.num 
            })
        },
        // 触发搜索按钮
        handleSearch() {
            this.$set(this.query, 'pageIndex', 1);
            // this.getData();
            let queryParam={
                employeeName:this.query.name,
                employeeAddress:this.query.address
            };
            employeeApi.getemployeeByQueryParam(queryParam).then(res=>{
                this.tableData= res.obj.employees,
                this.pageTotal= res.obj.num 
            })           
        },
        // 删除操作
        handleDelete(index, row) {
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                        categoryApi.deleteGategory(row).then(res=>{
                        if(res.status=="success"){
                            this.$message.success(res.message);
                            this.tableData.splice(index, 1);
                        }else{
                            this.$message.error(res.message);
                        }                       
                    })                    
                })
                .catch(() => {});
                 this.getData()
        },
        // 多选操作
        handleSelectionChange(val) {
            console.log("多选操作"+val)
            this.multipleSelection = val;
        },
        delAllSelection() {
            const length = this.multipleSelection.length;
            let str = '';
            this.delList = this.delList.concat(this.multipleSelection);
            for (let i = 0; i < length; i++) {
                str += this.multipleSelection[i].name + ' ';
            }
            console.log(str);
            employeeApi.deleteAllEmployee(this.multipleSelection).then(res=>{
                if(res.status=='success'){
                    this.$message.success(res.message)
                    this.getData();
                }else{
                    this.$message.error(res.message)
                }                
            })        
            this.multipleSelection = [];
        },
        // 编辑操作
        handleEdit(index, row) {
            console.log(index);
            console.log(row);           
            this.idx = index;
            this.form = row;//将行对象的属性赋值给form对象 数据绑定 并实时更新数据
            this.editVisible = true;
        },
        // 保存编辑
        saveEdit() {
            this.editVisible = false;
            // this.$message.success(`修改第 ${this.idx + 1} 行成功`);
            this.$set(this.tableData, this.idx, this.form);
           
            categoryApi.updateGategory(this.form).then(res=>{
                if(res.status=='success'){
                    this.$message.success(res.message)
                }else{
                    this.$message.error(res.message)
                }
                
            })        
        },



//===============================================================================

    // 新增操作
        handleSave() {
                       
            // this.idx = index;
            // this.form = row;//将行对象的属性赋值给form对象 数据绑定 并实时更新数据
            this.saveVisible = true;
        },
        // 新增保存
        save() {
            
            // this.$message.success(`修改第 ${this.idx + 1} 行成功`);
            // this.$set(this.tableData, this.idx, this.form);
           
            categoryApi.saveGategory(this.saveForm).then(res=>{
                if(res.status=='success'){
                    this.getData()
                    this.$message.success(res.message)
                }else{
                    this.$message.error(res.message)
                }
                
            }) 
            this.saveVisible = false;       
        },




//======================================================

        // 分页导航
        handlePageChange(val) {
            console.log("分页导航："+val);            
            this.$set(this.query, 'pageIndex', val);
            this.getData();
        }
    }
};
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 14px;
}
.red {
    color: #ff0000;
}
.mr10 {
    margin-right: 10px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
</style>
