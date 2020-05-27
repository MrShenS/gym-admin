import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    mode:"history",
    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: '自述文件' },
            children: [
                {
                    path: '/dashboard',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Dashboard.vue'),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/icon',
                    component: () => import(/* webpackChunkName: "icon" */ '../components/page/Icon.vue'),
                    meta: { title: '自定义图标' }
                },
                {
                    path: '/employee',
                    component: () => import(/* webpackChunkName: "table" */ '../components/page/employee.vue'),
                    meta: { title: '员工信息' ,employee: true }
                },

                {
                    path: '/customer',
                    component: () => import(/* webpackChunkName: "table" */ '../components/page/Customer.vue'),
                    meta: { title: '客户信息' }
                },

                {
                    path: '/customerDetail',
                    component: () => import(/* webpackChunkName: "table" */ '../components/page/CustomerDetail.vue'),
                    meta: { title: '添加客户信息' }
                },

                {
                    path: '/CustomerAllDetail',
                    component: () => import(/* webpackChunkName: "table" */ '../components/page/CustomerAllDetail.vue'),
                    meta: { title: '会员详细信息' }
                },
                {
                    path: '/category',
                    component: () => import(/* webpackChunkName: "table" */ '../components/page/category.vue'),
                    meta: { title: '类别信息', category: true }
                },
                {
                            
                    path: '/facilities',
                    component: () => import(/* webpackChunkName: "table" */ '../components/page/facilities.vue'),
                    meta: { title: '器械信息' ,facilities: true }
                },


                //文件上传
                {
                            
                    path: '/MyUpload',
                    component: () => import(/* webpackChunkName: "table" */ '../components/page/myUpload.vue'),
                    meta: { title: '文件上传' }
                },


                {
                            
                    path: '/activityShow',
                    component: () => import(/* webpackChunkName: "table" */ '../components/page/activityShow.vue'),
                    meta: { title: '活动展示' }
                },
                {
                            
                    path: '/activityUpdateStatus',
                    component: () => import(/* webpackChunkName: "table" */ '../components/page/activityUpdateStatus.vue'),
                    meta: { title: '活动状态管理' }
                },
                {
                    path: '/Product',
                    component: () => import(/* webpackChunkName: "table" */ '../components/page/Product.vue'),
                    meta: { title: '健身产品信息' }
                },
                {
                    path: '/table',
                    component: () => import(/* webpackChunkName: "table" */ '../components/page/BaseTable.vue'),
                    meta: { title: '基础表格' }
                },


                {
                    path: '/tabs',
                    component: () => import(/* webpackChunkName: "tabs" */ '../components/page/Tabs.vue'),
                    meta: { title: 'tab选项卡' }
                },
                {
                    path: '/form',
                    component: () => import(/* webpackChunkName: "form" */ '../components/page/BaseForm.vue'),
                    meta: { title: '基本表单' }
                },
                {
                    // 富文本编辑器组件
                    path: '/editor',
                    component: () => import(/* webpackChunkName: "editor" */ '../components/page/VueEditor.vue'),
                    meta: { title: '富文本编辑器' }
                },
                {
                    // markdown组件
                    path: '/markdown',
                    component: () => import(/* webpackChunkName: "markdown" */ '../components/page/Markdown.vue'),
                    meta: { title: 'markdown编辑器' }
                },
                {
                    // 图片上传组件
                    path: '/upload',
                    component: () => import(/* webpackChunkName: "upload" */ '../components/page/Upload.vue'),
                    meta: { title: '文件上传' }
                },
                {
                    // vue-schart组件
                    path: '/charts',
                    component: () => import(/* webpackChunkName: "chart" */ '../components/page/BaseCharts.vue'),
                    meta: { title: 'schart图表' }
                },
                {
                    // 拖拽列表组件
                    path: '/drag',
                    component: () => import(/* webpackChunkName: "drag" */ '../components/page/DragList.vue'),
                    meta: { title: '拖拽列表' }
                },
                {
                    // 拖拽Dialog组件
                    path: '/dialog',
                    component: () => import(/* webpackChunkName: "dragdialog" */ '../components/page/DragDialog.vue'),
                    meta: { title: '拖拽弹框' }
                },
                {
                    // 国际化组件
                    path: '/i18n',
                    component: () => import(/* webpackChunkName: "i18n" */ '../components/page/I18n.vue'),
                    meta: { title: '国际化' }
                },
                {
                    // 权限页面
                    path: '/permission',
                    component: () => import(/* webpackChunkName: "permission" */ '../components/page/Permission.vue'),
                    meta: { title: '权限测试', permission: true }
                },
                {
                    path: '/404',
                    component: () => import(/* webpackChunkName: "404" */ '../components/page/404.vue'),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: () => import(/* webpackChunkName: "403" */ '../components/page/403.vue'),
                    meta: { title: '403' }
                },
                {
                    path: '/donate',
                    component: () => import(/* webpackChunkName: "donate" */ '../components/page/Donate.vue'),
                    meta: { title: '支持作者' }
                }
            ]
        },
        {
            path: '/login',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/Login.vue'),
            meta: { title: '登录' }
        },
        {
            path: '/register',            
            component: () => import('../components/page/register.vue'),
            meta: { title: '注册', roles: [''] }
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});

