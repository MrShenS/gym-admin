<template>
    <div class="login-wrap">
        <div class="ms-login" v-if="show==2">
            <div class="ms-title">健身房后台管理系统注册</div>
            <el-form
                :model="registerParam"
                :rules="registerRules"
                ref="login"
                label-width="0px"
                class="ms-content"
            >
                <el-form-item prop="employeeName">
                    <el-input v-model="registerParam.employeeName" placeholder="用户名">
                        <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="employeePassword">
                    <el-input
                        type="employeePassword"
                        placeholder="员工密码"
                        v-model="registerParam.employeePassword"
                    >
                        <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                    </el-input>
                </el-form-item>
                <!-- <el-form-item prop="employeePost">
                    <el-input v-model="registerParam.employeePost" placeholder="员工职位">
                        <el-button slot="prepend" icon="el-icon-lx-crown"></el-button>
                    </el-input>
                </el-form-item>-->
                <el-form-item prop="employeePhone">
                    <el-input v-model="registerParam.employeePhone" placeholder="电话号">
                        <!--placeholder设置输入框内的默认值-->
                        <el-button slot="prepend" icon="el-icon-phone"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="employeeEmail">
                    <el-input v-model="registerParam.employeeEmail" placeholder="邮箱">
                        <el-button slot="prepend" icon="el-icon-lx-mail"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="employeeRelname">
                    <el-input v-model="registerParam.employeeRelname" placeholder="真实姓名">
                        <el-button slot="prepend" icon="el-icon-lx-profile"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="employeeAddress">
                    <el-input v-model="registerParam.employeeAddress" placeholder="地址">
                        <el-button slot="prepend" icon="el-icon-lx-homefill"></el-button>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="post()">注册</el-button>
                </div>
            </el-form>
        </div>
        <div class="ms-login" v-if="show==1">
            <div class="ms-title">健身房后台管理系统</div>
            <el-form
                :model="loginParam"
                :rules="loginRules"
                ref="login"
                label-width="0px"
                class="ms-content"
            >
                <el-form-item prop="username">
                    <el-input v-model="loginParam.username" placeholder="username">
                        <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                        type="password"
                        placeholder="password"
                        v-model="loginParam.password"
                        @keyup.enter.native="login()"
                    >
                        <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="login()">登录</el-button>
                </div>
                <p class="login-tips">Tips : 请输入正确的用户名密码。</p>
                <el-button type="text" @click="toRegister()">注册</el-button>
            </el-form>
        </div>
    </div>
</template>

<script>
import https from '../../utils/https';
import axios from 'axios'
import qs from 'qs';
import postApi from '../../api/post'
export default {
    data: function() {
        return {
            detail: {},
            show: 1,
            loginParam: {
                username: 'admin',
                password: '123123'
            },
            registerParam: {
                employeeName: '',
                employeePassword: '',
                employeeRelname: '',
                employeePhone: '',
                employeeEmail: '',
                employeeAddress:'内蒙古'
            },
            loginRules: {
                username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
            },
            registerRules: {
                employeeName: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                employeePassword: [{ required: true, message: '请输入密码', trigger: 'blur' }],
                employeeRelname: [{ required: true, message: '请输入真实姓名', trigger: 'blur' }],
                employeePhone: [{ required: true, message: '请输入电话号', trigger: 'blur' }],
                employeeEmail: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
                employeeAddress: [{ required: true, message: '请输入地址', trigger: 'blur' }]
            }
        };
    },
    methods: {
        // submitForm() {
        //     this.$refs.login.validate(valid => {
        //         if (valid) {
        //             this.$message.success('登录成功');
        //             localStorage.setItem('ms_username', this.loginParam.username);
        //             this.$router.push('/');
        //         } else {
        //             this.$message.error('请输入账号和密码');
        //             console.log('error submit!!');
        //             return false;
        //         }
        //     });
        // },
        //登录login
        login(){
            console.log("开始登录");
            
            let loginParam = {
                'username': this.loginParam.username,
                'password': this.loginParam.password
            }
            console.log(loginParam);
            postApi.login(loginParam).then(response => {
                console.log('Created post', response);  
                       if(response.status!="success"){
                           this.$message.error(response.message);
                           localStorage.setItem('ms_username', this.loginParam.username);

                       }  else{
                        localStorage.setItem('ms_username', this.loginParam.username);
                        this.$message.success('登录成功');
                        this.$router.push('/');                         
                       }   
                })  

        },
        // 转换注册页面
        toRegister() {
            // this.$router.push('register')
            console.log(this.registerParam, '参数');
            this.show = 2;
            console.log(this.show, 321);
        },
        // 注册
        post(){
            let params = {
                'employeeName': this.registerParam.employeeName,
                'employeePassword': this.registerParam.employeePassword,
                'employeePhone': this.registerParam.employeePhone,
                'employeeEmail': this.registerParam.employeeEmail,
                'employeeRelname': this.registerParam.employeeRelname,
                'employeeAddress': this.registerParam.employeeAddress                
            };
            postApi.register('http://localhost:8099/register',params).then(response => {
                console.log('Created post', response);  
                       if(response.status!="success"){
                           this.$message.error(response.message);
                       }  else{
                           this.$message.success('注册成功');
                            this.show = 1;
                       }   
                })          

        }
    }
};
</script>

<style scoped>
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
    color: rgb(3, 0, 0);
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
    color: rgb(3, 0, 0);
}
</style>