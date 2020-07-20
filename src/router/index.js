import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Test from '../views/test.vue'
import Register from "../views/Register.vue";
import NotFound from "../views/404.vue";
import RolesMenus from "../views/RolesMenus.vue";
import CommodityInventory from "../views/CommodityInventory.vue";


import axios from "../api/axios";
import {
  Loading,
  Message
} from 'element-ui'
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
      },
      {
        path: "/RolesMenus",
        name: "RolesMenus",
        component: RolesMenus,

      },
      {
        path: "/CommodityInventory",
        name: "CommodityInventory",
        component: CommodityInventory,

      },

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
    path: '/Test',
    name: 'Test',
    component: Test
  }
]

const router = new VueRouter({
  routes,
  mode: "history" //去掉路由中的#号
})

//如果token为空证明未登录
router.beforeEach((to, from, next) => {
  const token = sessionStorage.getItem('token')
  if (to.path == '/Login') {
    if (token != null) {
      return next('/Home')
    }
    return next()
  }
  if (token == null && to.path != "/register") {
    Message.error('token过期，将返回登录界面')
    return next('/Login')
  }

  return next()
})

//防止跳转地址重复而报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router
