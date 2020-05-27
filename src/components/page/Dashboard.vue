<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="8">
                <el-card shadow="hover" class="mgb20" style="height:252px;">
                    <div class="user-info">
                        <img src="../../assets/img/img.jpg" class="user-avator" alt />
                        <div class="user-info-cont">
                            <div class="user-info-name">{{name}}</div>
                            <div>{{role}}</div>
                        </div>
                    </div>
                    <div class="user-info-list">
                        上次登录时间：
                        <span>2019-11-01</span>
                    </div>
                    <div class="user-info-list">
                        上次登录地点：
                        <span>内蒙古乌兰浩特</span>
                    </div>
                </el-card>
                <el-card shadow="hover" style="height:252px;">
                    <div slot="header" class="clearfix">
                        <span>器械比例详情</span>
                    </div>
                   <div v-for="(item,index) in FacilitiesRatios" :key="index">
                       {{ item.facilitiesName }}<el-progress :percentage="item.facilitiesRatio" :color="item.color"></el-progress>
                   </div>
                    <!-- 无氧健身机器<el-progress :percentage="71.3" color="#42b983"></el-progress>
                    
                   
                    有氧健身机器<el-progress :percentage="24.1" color="red"></el-progress>
                    特殊健身器械<el-progress :percentage="13.7"></el-progress>
                    HTML<el-progress :percentage="5.9" color="#f56c6c"></el-progress> -->
                    
                </el-card>
            </el-col>
            <el-col :span="16">
                <el-row :gutter="20" class="mgb20">
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-1">
                                <i class="el-icon-lx-people grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{ headerNumber.employeeNumber }}</div>
                                    <div>员工数量</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-2">
                                <i class="el-icon-lx-notice grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{ headerNumber.facilitiesNumber }}</div>
                                    <div>器材数量</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-3">
                                <i class="el-icon-lx-goods grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{ headerNumber.customerNumbers }}</div>
                                    <div>顾客数量</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
                <el-card shadow="hover" style="height:403px;">
                    <div slot="header" class="clearfix">
                        <span>当前活动</span>
                        <el-button style="float: right; padding: 3px 0" type="text" @click="addActivity=true">添加</el-button>
                    </div>
                    <el-table :show-header="false" :data="todoList" style="width:100%;">
                        <!-- <el-table-column width="40">
                            <template slot-scope="scope">
                                <el-checkbox v-model="scope.row.status"></el-checkbox>
                            </template>
                        </el-table-column> -->
                        <el-table-column>
                            <template slot-scope="scope">
                                <div
                                    class="todo-item"
                                    :class="{'todo-item-del': false}"
                                >{{scope.row.title}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column width="60">
                            <template>
                                <i class="el-icon-edit"></i>
                                <i class="el-icon-delete"></i>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="12">
                <el-card shadow="hover">
                    <schart ref="bar" class="schart" canvasId="bar" :options="options"></schart>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card shadow="hover">
                    <schart ref="line" class="schart" canvasId="line" :options="options2"></schart>
                </el-card>
            </el-col>
        </el-row>


        <!-- 新增活动弹出框 -->
                <el-dialog title="新增活动" v-dialogDrag :visible.sync="addActivity" width="30%">
            <el-form ref="activityInfo" :model="activityInfo" label-width="70px">
                <el-form-item label="活动名称">
                    <el-input v-model="activityInfo.activityName"></el-input>
                </el-form-item>
                <el-form-item label="活动描述">
                    <el-input v-model="activityInfo.activityDescription"></el-input>
                </el-form-item>
                <el-form-item label="剩余时间">
                    <el-input v-model="activityInfo.activityResiduetime"></el-input>
                </el-form-item>
                <el-form-item label="负责人">
                    <el-select v-model="activityInfo.activityUser" placeholder="请选择负责人">
                            <!-- <el-option key="bbk" label="步步高" value="bbk"></el-option> -->
                         <el-option v-for="(item,index) in Employees" :key="index" :value="item.employeeName"> {{ item.employeeName }} </el-option>
                        </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addActivity = false">取 消</el-button>
                <el-button type="primary" @click="saveActivity">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
import Schart from 'vue-schart';
import bus from '../common/bus';
import dashboardApi from '../../api/dashboard'
import activityApi from '../../api/activity'
import employeeApi from '../../api/employee'
export default {
    name: 'dashboard',
    data() {
        return {
            Employees:[],
            FacilitiesRatios:[

            ],
            addActivity:false,
            activityInfo:{
                activityName:"",
                activityDescription:"",
                activityUser:"",
                activityResiduetime:0,
                // activityStatus:""
            },
            headerNumber:{
                employeeNumber:0,
                facilitiesNumber:0,
                customerNUmbers:0
            },
            name: localStorage.getItem('ms_username'),
            todoList: [
                {
                    title: '今天要修复100个bug',
                    status: false
                },
                {
                    title: '今天要修复100个bug',
                    status: false
                },
                {
                    title: '今天要写100行代码加几个bug吧',
                    status: false
                },
                {
                    title: '今天要修复100个bug',
                    status: false
                },
                {
                    title: '今天要修复100个bug',
                    status: true
                },
                {
                    title: '今天要写100行代码加几个bug吧',
                    status: true
                }
            ],
            data: [
                {
                    name: '2018/09/04',
                    value: 1083
                },
                {
                    name: '2018/09/05',
                    value: 941
                },
                {
                    name: '2018/09/06',
                    value: 1139
                },
                {
                    name: '2018/09/07',
                    value: 816
                },
                {
                    name: '2018/09/08',
                    value: 327
                },
                {
                    name: '2018/09/09',
                    value: 228
                },
                {
                    name: '2018/09/10',
                    value: 1065
                }
            ],
            options: {
                type: 'bar',
                title: {
                    text: '最近一周健身房财务状况'
                },
                xRorate: 25,
                labels: ['周一', '周二', '周三', '周四', '周五',"周六"],
                datasets: [
                    {
                        label: '家电',
                        data: [234, 278, 270, 190, 230]
                    },
                    {
                        label: '百货',
                        data: [164, 178, 190, 135, 160]
                    },
                    {
                        label: '食品',
                        data: [144, 198, 150, 235, 120]
                    }
                ]
            },
            options2: {
                type: 'line',
                title: {
                    text: '最近几个月各品类销售趋势图'
                },
                labels: ['3月', '4月', '5月', '6月', '7月'],
                datasets: [
                    {
                        label: '器材',
                        data: [234, 278, 270, 190, 230]
                    },
                    {
                        label: '健身课程',
                        data: [164, 178, 150, 135, 160]
                    },
                    {
                        label: '健身消耗消耗品',
                        data: [74, 118, 200, 235, 90]
                    }
                ]
            }
        };
    },
    created () {
        console.log('==============' + 'created' + '===================')
        dashboardApi.getHeaderNumber().then(Response=>{         
             this.headerNumber.employeeNumber=Response.obj.employeeNumber;
             this.headerNumber.customerNumbers=Response.obj.customerNumbers;
             this.headerNumber.facilitiesNumber=Response.obj.facilitiesNumber;
        })
        employeeApi.getEmployees().then(Response=>{
            
            this.Employees=Response.obj
            console.log(this.Employees);
            console.log(Response.obj[1].employeeName);           
        })
        activityApi.getActivity().then(Response=>{
            this.todoList=Response.obj
        })
        this.getFacilitiesRatios();     
        
        this.getOptions();
        // this.todoList=[]
    },
    components: {
        Schart
    },
    computed: {
        role() {
            // return this.name === 'admin' ? '超级管理员' : '普通用户';
        }
    },
    // created() {
    //     this.handleListener();
    //     this.changeDate();
    // },
    // activated() {
    //     this.handleListener();
    // },
    // deactivated() {
    //     window.removeEventListener('resize', this.renderChart);
    //     bus.$off('collapse', this.handleBus);
    // },
    methods: {
        changeDate() {
            const now = new Date().getTime();
            this.data.forEach((item, index) => {
                const date = new Date(now - (6 - index) * 86400000);
                item.name = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
            });
        },

        getFacilitiesRatios(){
            dashboardApi.getFacilitiesRatios().then(res=>{
                console.log(res.obj);
                
                this.FacilitiesRatios=res.obj;

            })
        },
        saveActivity(){
            activityApi.saveActivity(this.activityInfo).then(response=>{
                this.activityInfo.activityName=response.obj.activityName;
                this.activityInfo.activityDescription=response.obj.activityDescription,
                this.activityInfo.activityResiduetime=response.obj.activityResiduetime
            })
            this.addActivity = false;
        },
        getOptions(){
            dashboardApi.GetOptions().then(res=>{
                this.options=res.obj;
            })
        }



        // handleListener() {
        //     bus.$on('collapse', this.handleBus);
        //     // 调用renderChart方法对图表进行重新渲染
        //     window.addEventListener('resize', this.renderChart);
        // },
        // handleBus(msg) {
        //     setTimeout(() => {
        //         this.renderChart();
        //     }, 200);
        // },
        // renderChart() {
        //     this.$refs.bar.renderChart();
        //     this.$refs.line.renderChart();
        // }
    }
};
</script>


<style scoped>
.el-row {
    margin-bottom: 20px;
}

.grid-content {
    display: flex;
    align-items: center;
    height: 100px;
}

.grid-cont-right {
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: #999;
}

.grid-num {
    font-size: 30px;
    font-weight: bold;
}

.grid-con-icon {
    font-size: 50px;
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    color: #fff;
}

.grid-con-1 .grid-con-icon {
    background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
    background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-3 .grid-con-icon {
    background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
    color: rgb(242, 94, 67);
}

.user-info {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 2px solid #ccc;
    margin-bottom: 20px;
}

.user-avator {
    width: 120px;
    height: 120px;
    border-radius: 50%;
}

.user-info-cont {
    padding-left: 50px;
    flex: 1;
    font-size: 14px;
    color: #999;
}

.user-info-cont div:first-child {
    font-size: 30px;
    color: #222;
}

.user-info-list {
    font-size: 14px;
    color: #999;
    line-height: 25px;
}

.user-info-list span {
    margin-left: 70px;
}

.mgb20 {
    margin-bottom: 20px;
}

.todo-item {
    font-size: 14px;
}

.todo-item-del {
    text-decoration: line-through;
    color: #999;
}

.schart {
    width: 100%;
    height: 300px;
}
</style>
