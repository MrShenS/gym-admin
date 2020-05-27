<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 基础表格
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button
                    type="primary"
                    icon="el-icon-delete"
                    class="handle-del mr10"
                    @click="delAllSelection"
                >批量删除</el-button>
                <el-select v-model="query.address" placeholder="地址" class="handle-select mr10">
                    <el-option key="1" label="广东省" value="广东"></el-option>
                    <el-option key="2" label="湖南省" value="湖南"></el-option>
                    <el-option key="3" label="北京市" value="北京"></el-option>
                    <el-option key="4" label="上海市" value="上海"></el-option>
                    <el-option key="5" label="内蒙古自治区" value="内蒙"></el-option>
                </el-select>
                <el-input v-model="query.name" placeholder="用户名" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
            </div>
            <el-table
                :data="tableData.slice((query.pageIndex-1)*query.pageSize,query.pageIndex*query.pageSize) "
                
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column type="index" prop="employeeId" label="ID" width="55" align="center"></el-table-column>
                <el-table-column prop="employeeName" label="用户名"></el-table-column>
                <el-table-column prop="employeeRelname" label="真实姓名"></el-table-column>
                <el-table-column prop="employeePost" label="职位"></el-table-column>
                <el-table-column label="薪水">
                    <template slot-scope="scope">￥{{scope.row.salary}}</template>
                </el-table-column>
                <el-table-column prop="employeeAddress" label="地址"></el-table-column>
                <el-table-column prop="employeePhone" label="联系电话"></el-table-column>
                <el-table-column prop="employeeEmail" label="邮箱"></el-table-column>
                <el-table-column prop="createTime" label="注册时间"></el-table-column>
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
        <el-dialog title="编辑" v-dialogDrag :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="用户名">
                    <el-input v-model="form.employeeName"></el-input>
                </el-form-item>
                <el-form-item label="真实姓名">
                    <el-input v-model="form.employeeRelname"></el-input>
                </el-form-item>
                 <el-form-item label="职位">
                    <el-input v-model="form.employeePost"></el-input>
                </el-form-item>
                <el-form-item label="薪水">
                    <el-input v-model="form.salary"></el-input>
                </el-form-item>
                 <el-form-item label="地址">
                    <el-input v-model="form.employeeAddress"></el-input>
                </el-form-item>
                <el-form-item label="联系电话">
                    <el-input v-model="form.employeePhone"></el-input>
                </el-form-item>
                 <el-form-item label="邮箱">
                    <el-input v-model="form.employeeEmail"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { fetchData } from '../../api/index';
import employeeApi from '../../api/employee';
export default {
    name: 'employee',
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
            pageTotal: 0,
            form: {},
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
            employeeApi.getemployeeShow().then(Response=>{
                this.tableData= Response.obj.list,
                this.pageTotal= Response.obj.num || 50
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
                this.tableData= res.obj.list,
                this.pageTotal= res.obj.num || 50
            })           
        },
        // 删除操作
        handleDelete(index, row) {
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    employeeApi.deleteEmployee(row).then(res=>{
                        if(res.status=="success"){
                            this.$message.success(res.message);
                            this.tableData.splice(index, 1);
                        }else{
                            this.$message.error(res.message);
                        }
                        
                    })
                    
                })
                .catch(() => {});
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
            employeeApi.updateEmployee(this.form).then(res=>{
                if(res.status=='success'){
                    this.$message.success(res.message)
                }else{
                    this.$message.error(res.message)
                }
                
            })        
        },
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
