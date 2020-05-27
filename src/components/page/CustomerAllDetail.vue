<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 客户信息
                </el-breadcrumb-item>
                <el-breadcrumb-item>客户详细信息</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="顾客名称">
                        <el-input v-model="form.customerName"></el-input>
                    </el-form-item>
                     <el-form-item label="顾客电话">
                        <el-input v-model="form.customerPhone"></el-input>
                    </el-form-item>
                    <el-form-item label="会员时间">
                        <el-input v-model="form.customerResiduetime"></el-input>
                    </el-form-item>
                    
                    <el-form-item label="会员诞辰">
                        <el-col :span="11">
                            <el-date-picker
                                type="date"
                                placeholder="选择日期"
                                v-model="form.birthday"
                                value-format="yyyy-MM-dd"
                                style="width: 100%;"
                            ></el-date-picker>
                        </el-col>
                        <!-- <el-col class="line" :span="2">-</el-col>
                        <el-col :span="11">
                            <el-time-picker
                                placeholder="选择时间"
                                v-model="form.birthday"
                                style="width: 100%;"
                            ></el-time-picker>
                        </el-col> -->
                    </el-form-item>
                    <el-form-item label="顾客地址">
                        <!-- <el-cascader :options="customerAddress" v-model="Address"></el-cascader> -->
                    <el-input v-model="form.customerAddress" readonly="readonly"></el-input>
                    </el-form-item>
                   
                    <el-form-item label="客户类型">
                        <el-radio-group v-model="form.customerType">
                            <el-radio label="普通用户"></el-radio>
                            <el-radio label="高级用户"></el-radio>
                            <el-radio label="顶梁柱"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-row v-for="(item,index) in products" :key="index" >
                        <el-col :span="8">
                            <el-form-item label="产品名称">
                                <el-input v-model="item.productName" readonly="readonly"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="产品数量">
                                <el-input v-model="item.number" readonly="readonly"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item label="客户备注">
                        <el-input type="textarea" rows="5" v-model="form.customerDescription"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">表单提交</el-button>
                        <el-button @click="leave">取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import CustomerApi from '../../api/customer'
import customerApi from '../../api/customer';
export default {
    name: 'CustomerAllDetail',
    data() {
        return {
            customerAddress: [
                {
                    value: '广东省',
                    label: '广东省',
                    children: [
                        {
                            value: '广州市',
                            label: '广州市',
                            children: [
                                {
                                    value: '天河区',
                                    label: '天河区'
                                },
                                {
                                    value: '海珠区',
                                    label: '海珠区'
                                }
                            ]
                        },
                        {
                            value: '东莞市',
                            label: '东莞市',
                            children: [
                                {
                                    value: '长安镇',
                                    label: '长安镇'
                                },
                                {
                                    value: '虎门镇',
                                    label: '虎门镇'
                                }
                            ]
                        }
                    ]
                },
                {
                    value: '湖南省',
                    label: '湖南省',
                    children: [
                        {
                            value: '长沙市',
                            label: '长沙市',
                            children: [
                                {
                                    value: '岳麓区',
                                    label: '岳麓区'
                                }
                            ]
                        }
                    ]
                }
            ],
            Address:[],
            form: {
                customerName: '',
                customerPhone:this.$route.query.phone,
                customerType:"",
                customerResiduetime:"",
                birthday:"",
                customerDescription:"",
                customerAddress: ""
            },
            products:[]
        };
    },

    created(){
        this.getDate();
    },

    methods: {
        onSubmit() {
            let customerParam={
                customer:this.form,
                address:this.Address
            }
            customerApi.updateCustomer(this.form).then(res=>{ 
                this.$message.success(res.message);
                this.$router.push('/customer');
            })
            
        },
        leave(){
            this.$router.push('/customer');
        },
        getDate(){
            customerApi.getCustomerDetail(this.$route.query.phone).then(res=>{
                this.form=res.obj.customer,
                this.products=res.obj.products
                console.log(this.products)
            })
        }
    }
};
</script>