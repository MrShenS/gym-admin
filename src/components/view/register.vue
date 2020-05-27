<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">角色健身房管理系统注册</div>
            <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
                <el-form-item prop="employeeName">
                    <el-input v-model="param.employeeName" placeholder="用户名">
                        <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="employeePassword">
                    <el-input type="employeePassword" placeholder="员工密码" v-model="param.employeePassword"
                        @keyup.enter.native="submitForm()"
                    >
                        <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                    </el-input>
                </el-form-item>
                <!-- <el-form-item prop="employeePost">
                    <el-input v-model="param.employeePost" placeholder="员工职位">
                        <el-button slot="prepend" icon="el-icon-lx-crown"></el-button>
                    </el-input>
                </el-form-item> -->
                <el-form-item prop="employeePhone">
                    <el-input v-model="param.employeePhone" placeholder="电话号"><!--placeholder设置输入框内的默认值-->
                        <el-button slot="prepend" icon="el-icon-phone"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="employeeEmail">
                    <el-input v-model="param.employeeEmail" placeholder="邮箱">
                        <el-button slot="prepend" icon="el-icon-lx-mail"></el-button>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm()">注册</el-button>
                </div>
                <!-- <p class="login-tips">Tips : 用户名和密码随便填。</p> -->
            </el-form>
        </div>
    </div>
</template>

<script >
export default {
    
    data: function() {
        return {
            param: {
                employeeName: 'admin',
                employeePassword: '123123',
                // employeePost: '',
                employeePhone: '',
                employeeEmail: ''
            },
            rules: {
                employeeName: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                employeePassword: [{ required: true, message: '请输入密码', trigger: 'blur' }],
                // employeePost: [{ required: true, message: '请输入职位', trigger: 'blur' }],
                employeePhone: [{ required: true, message: '请输入电话号', trigger: 'blur' }],
                employeeEmail: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
            },
        };
    },


    methods: {
       submitForm() {
            this.$refs.login.validate(valid => {
                if (valid) {
                    this.$message.success('注册成功');
                    localStorage.setItem('ms_username', this.param.username);
                    this.$router.push('/');
                } else {
                    this.$message.error('请补充信息');
                    console.log('error submit!!');
                    return false;
                }
            });
    
        },
    },
};


</script>

<style scoped>
button{
  background: #333;
}

.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(../../assets/img/login-bg.jpg);
    background-size: 100%;
}
.ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: rgb(8, 5, 5);
    border-bottom: 1px solid #ddd;
}
.ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 350px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.3);
    overflow: hidden;
}
.ms-content {
    padding: 30px 30px;
}
.login-btn {
    text-align: center;
}
.login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
}
.login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #fff;
}
.el-button--primary{
  border: none;
}
</style>