<template>
    <section class="main">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-rank"></i> 活动管理</el-breadcrumb-item>
                <el-breadcrumb-item>活动状态管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="plugins-tips">
                <!-- Vue.Draggable：基于 Sortable.js 的 Vue 拖拽组件。
                访问地址：<a href="https://github.com/SortableJS/Vue.Draggable" target="_blank">Vue.Draggable</a> -->
                本页面可以通过拖拽的形式实现对活动状态的更新和修改 修改结束后请点击 
                <!-- <el-button type="primary" icon="el-icon-lx-add" >保存</el-button> -->
                <el-button type="text" icon="el-icon-circle-check" @click="commit" round>提交</el-button>
            </div>
            <div class="drag-box">
                <div class="drag-box-item">
                    <div class="item-title">未开始</div>
                    <draggable v-model="todo" @remove="removeHandle" :options="dragOptions">
                        <transition-group tag="div" id="todo" class="item-ul">
                            <div v-for="item in todo" class="drag-list" :key="item.id">
                                {{item.content}}
                            </div>
                        </transition-group>
                    </draggable>
                </div>
                <div class="drag-box-item">
                    <div class="item-title">进行中</div>
                    <draggable v-model="doing" @remove="removeHandle" :options="dragOptions">
                        <transition-group tag="div" id="doing" class="item-ul">
                            <div v-for="item in doing" class="drag-list" :key="item.id">
                                {{item.content}}
                            </div>
                        </transition-group>
                    </draggable>
                </div>
                <div class="drag-box-item">
                    <div class="item-title">已结束</div>
                    <draggable v-model="done" @remove="removeHandle" :options="dragOptions">
                        <transition-group tag="div" id="done" class="item-ul">
                            <div v-for="item in done" class="drag-list" :key="item.id">
                                {{item.content}}
                            </div>
                        </transition-group>
                    </draggable>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import draggable from 'vuedraggable'
    import acrivityApi from '../../api/activity'
import activityApi from '../../api/activity'
    export default {
        name: 'activityUpdateStatus',
        data() {
            return {
                dragOptions:{
                    animation: 120,
                    scroll: true,
                    group: 'sortlist',
                    ghostClass: 'ghost-style'
                },
                todo: [],
                doing: [],
                done:[]
            }
        },
        components:{
            draggable
        },
        created(){
            this.getActivity()
        },
        methods: {
            removeHandle(event){
                console.log(event);
                this.$message.success(`从 ${event.from.id} 移动到 ${event.to.id} `);
            },
            getActivity(){
                activityApi.getAllActivityOfStatus().then(res=>{
                    this.todo=res.obj.todDoing,
                    this.doing=res.obj.doings
                    this.done=res.obj.done
                })
            },
            commit(){
                let ActivityOfStatus={
                    doings:this.doing,
                    todDoing:this.todo,
                    done:this.done
                };
                activityApi.updateAllActivityOfStatus(ActivityOfStatus).then(res=>{
                    if(res.status=="success"){
                            this.$message.success(res.message);
                        }else{
                            this.$message.error(res.message);
                        }  
                })
            }
        }
    }

</script>

<style scoped>
    .drag-box{
        display: flex;
        user-select: none;
    }
    .drag-box-item {
        flex: 1;
        max-width: 330px;
        min-width: 300px;
        background-color: #eff1f5;
        margin-right: 16px;
        border-radius: 6px;
        border: 1px #e1e4e8 solid;
    }
    .item-title{
        padding: 8px 8px 8px 12px;
        font-size: 14px;
        line-height: 1.5;
        color: #24292e;
        font-weight: 600;
    }
    .item-ul{
        padding: 0 8px 8px;
        height: 500px;
        overflow-y: scroll;
    }
    .item-ul::-webkit-scrollbar{
        width: 0;
    }
    .drag-list {
        border: 1px #e1e4e8 solid;
        padding: 10px;
        margin: 5px 0 10px;
        list-style: none;
        background-color: #fff;
        border-radius: 6px;
        cursor: pointer;
        -webkit-transition: border .3s ease-in;
        transition: border .3s ease-in;
    }
    .drag-list:hover {
        border: 1px solid #20a0ff;
    }
    .drag-title {
        font-weight: 400;
        line-height: 25px;
        margin: 10px 0;
        font-size: 22px;
        color: #1f2f3d;
    }
    .ghost-style{
        display: block;
        color: transparent;
        border-style: dashed
    }
</style>
