import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from "../views/Register.vue";
import NotFound from "../views/404.vue";
import axios from "../api/axios";
Vue.use(VueRouter)

const routes = [{
        path: "/",
        redirect: "/Login"
    },
    {
        path: '/Home',
        name: 'Home',
        component: Home,
        children: [{
                path: "",
                name: "Register",
                component: Register,
            },
            {
                path: "NotFound",
                name: "NotFound",
                component: NotFound,
            }
        ],
    },
    //login
    {
        path: "/Login",
        name: "Login",
        component: Login,
        meta: {
            title: "登录页"
        }
    },
    {
        path: '/about',
        name: 'About',
        component: () =>
            import ('../views/About.vue')
    }
]

const router = new VueRouter({
    routes,
    mode: "history" //去掉路由中的#号
})

//如果token为空证明未登录
router.beforeEach((to, from, next) => {
    // const token = sessionStorage.getItem('token')
    // if (to.path == '/login') {
    //     if (token != null) {
    //         return next('/Home')
    //     }
    //     return next()
    // }
    // if (token == null && to.path != "/register") {
    //     return next('/login')
    // }
    // if (token != null && to.name == "Share") {
    //     axios.get(`/api/Share/HasShareLink?ShareLink=${to.params.ShareLink}`).then(res => {
    //         if (res.data.entity == "不存在") {
    //             return next({
    //                 name: 'notFound'
    //             })
    //         }
    //     })
    // }
    // if (token != null && to.name == "ShareDetails") {
    //     if (sessionStorage.getItem("Share") == null) {
    //         return next('/login')
    //     }
    // }
    return next()
})

//防止跳转地址重复而报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

export default router