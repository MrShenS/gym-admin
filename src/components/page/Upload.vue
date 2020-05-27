<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 文件上传和下载</el-breadcrumb-item>
              
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="content-title">支持拖拽</div>
            <div class="plugins-tips">            
            </div>
            <el-upload
                class="upload-demo"
                drag
                action="http://localhost:8099/api/File/fileUpload"
                multiple
                name="multipartfiles">
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
            <div class="content-title">
                <el-button
                    type="primary"
                    icon="el-icon-circle-plus"
                    class="handle-del mr10"
                    @click="add"
                >文件下载</el-button>
            </div> 
                </div>
           
        <div>
            <el-dialog title="裁剪图片" :visible.sync="dialogVisible" width="30%">
                <vue-cropper ref='cropper' :src="imgSrc" :ready="cropImage" :zoom="cropImage" :cropmove="cropImage" style="width:100%;height:300px;"></vue-cropper>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="cancelCrop">取 消</el-button>
                    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                </span>
            </el-dialog>


            <el-dialog title="新增活动" v-dialogDrag :visible.sync="downloadFileFalg" width="30%">
            <!-- <el-form ref="fileinfo" :model="fileinfo" label-width="70px">
                <el-form-item label="文件名"> -->
                    <el-select v-model="fileName" placeholder="请选择文件">
                            <!-- <el-option key="bbk" label="步步高" value="bbk"></el-option> -->
                         <el-option v-for="(item,index) in fileinfos" :key="index" :value="item.fileName"> {{ item.fileName }} </el-option>
                        </el-select>
                <!-- </el-form-item>
            </el-form> -->
            <span slot="footer" class="dialog-footer">
                <el-button @click="downloadFileFalg = false">取 消</el-button>
                <el-button type="primary" @click="detailDown">确 定</el-button>
                <!-- <a href="http://localhost:8099/File?filename=这是1.png">=====</a> -->
            </span>
        </el-dialog>




        </div>
    </div>
</template>

<script>
    import VueCropper  from 'vue-cropperjs';
    import fileApi from "../../api/file";
    export default {
        name: 'upload',
        data: function(){
            return {
                defaultSrc: require('../../assets/img/img.jpg'),
                fileList: [],
                imgSrc: '',
                cropImg: '',
                dialogVisible: false,
                downloadFileFalg:false,
                fileinfos:[],
                fileinfo:{},
                fileName:""
            }
        },
        components: {
            VueCropper
        },
        methods:{
            setImage(e){
                const file = e.target.files[0];
                if (!file.type.includes('image/')) {
                    return;
                }
                const reader = new FileReader();
                reader.onload = (event) => {
                    this.dialogVisible = true;
                    this.imgSrc = event.target.result;
                    this.$refs.cropper && this.$refs.cropper.replace(event.target.result);
                };
                reader.readAsDataURL(file);
            },
            cropImage () {
                this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL();
            },
            cancelCrop(){
                this.dialogVisible = false;
                this.cropImg = this.defaultSrc;
            },
            imageuploaded(res) {
                console.log(res)
            },
            handleError(){
                this.$notify.error({
                    title: '上传失败',
                    message: '图片上传接口上传失败，可更改为自己的服务器接口'
                });
            },
            add(){
                this.downloadFileFalg=true;
            },
            getFileInfo(){
                               
                fileApi.getAllfile().then(res=>{
                    this.fileinfos=res.obj;
                })
            },
            downloadFile(){
                console.log(this.fileName);
                fileApi.getfile(this.fileName).then(res=>{
                    // fileApi.getAllfile().then(res=>{
                    this.$message.success("成功")
                })
            },
            detailDown() {
                const param = '?fileName=' + this.fileName
                //创建一个a标签元素
                const a = document.createElement('a')
                //给a标签设置链接属性
                a.href = 'http://localhost/api/File/download' + param
                //调用点击事件
                a.click();
                this.downloadFileFalg=false;
                }
        },
        created(){
            this.cropImg = this.defaultSrc;
            this.getFileInfo();
        }
    }
</script>

<style scoped>
    .content-title{
        font-weight: 400;
        line-height: 50px;
        margin: 10px 0;
        font-size: 22px;
        color: #1f2f3d;
    }
    .pre-img{   
        width: 100px;
        height: 100px;
        background: #f8f8f8;
        border: 1px solid #eee;
        border-radius: 5px;
    }
    .crop-demo{
        display: flex;
        align-items: flex-end;
    }
    .crop-demo-btn{
        position: relative;
        width: 100px;
        height: 40px;
        line-height: 40px;
        padding: 0 20px;
        margin-left: 30px;
        background-color: #409eff;
        color: #fff;
        font-size: 14px;
        border-radius: 4px;
        box-sizing: border-box;
    }
    .crop-input{
        position: absolute;
        width: 100px;
        height: 40px;
        left: 0;
        top: 0;
        opacity: 0;
        cursor: pointer;
    }
</style>