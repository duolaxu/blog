import Vue from "vue";

import VueRouter from "vue-router";

Vue.use(VueRouter);

import detail from "../components/Blog/BlogDetail.vue"
import edit from "../components/Blog/BlogEdit.vue"
import blogs from "../components/Blog/Blogs.vue"
import login from "../components/Login/Login.vue"
import topbar from "../components/Blog/top.vue"
import register from "../components/Login/register.vue"
import exit from "../components/Login/exit.vue"
import content from "../components/comment/content.vue"
import chief from "../components/mainpage/main.vue"
import note from "../components/leavenote/note.vue"
import preview from "../components/mainpage/preessay.vue"
import preArticle from "../components/preview/article.vue"
import viewArticle from "../components/preview/preArticle.vue"
import main from "../components/update/mainpage/main.vue"
import line from "../components/update/time/timeline.vue"

const routes = [
    {
        redirect: '/',
        path:"*"
        // component: login
            // 通过
    },{
        path: '/',
        component: login
            // 通过
    },
    {
        path: "/chief",
        component: chief
            // 通过
    },
    {
        path: "/line",
        component: line
            // 通过
    },
    {
        path: "/main",
        component: main
            // 通过，不过底部的滚动条需要解决
    },
    {
        path: '/login',
        component: login
            // 通过
    }, {
        path: "/:id_1/edit/:id_2",
        name: 'edit',
        component: edit
            // 通过
    }, {
        path: "/:id/blogs",
        name: 'blogs',
        component: blogs
            // 这个需要添加一个按钮跳转到路由中，未通过
    }, {
        path: "/detail/:id",
        name: 'detail',
        component: detail
            // 通过，在main路由中
    }, {
        path: "/top",
        component: topbar
            // 这个路由可以废弃了
    }, {
        path: "/regist",
        component: register
            // 通过
    }, {
        path: '/exit',
        component: exit
            // 这个路由可以废弃了
    }, {
        path: "/:id_1/content/:id_2",
        name: 'content',
        component: content
            // 通过
    }, {
        path: '/leavenote',
        component: note
            // 通过
    }, {
        path: "/preessay/:id",
        name: 'preessay',
        component: preview
    }, {
        path: "/preArticle",
        component: preArticle
    }, {
        path: '/viewArticle',
        component: viewArticle
    }
]

const router = new VueRouter({
    routes,
    mode: "history"
})

export default router;