import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Test from '../views/test.vue'
import Register from "../views/Register.vue";
import NotFound from "../views/404.vue";
import RolesMenus from "../views/RolesMenus.vue";


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
                path: "RolesMenus",
                name: "RolesMenus",
                component: RolesMenus,

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
    },
    {
        path: "/CommodityInventory",
        name: "CommodityInventory",
        component: resolve => require(['../views/Home.vue'], resolve),
        children: [{
            path: "PuOrderInfo",
            name: "PuOrderInfo",
            component: resolve => require(['../components/PuOrderInfo.vue'], resolve)
        }, {
            path: "CommodityInventoryInfo",
            name: "CommodityInventoryInfo",
            component: resolve => require(['../components/CommodityInventoryInfo.vue'], resolve)
        }]

<<<<<<< Updated upstream
    },
    {
        path: "/Customermanage",
        name: "CustomerManage",
        component: resolve => require(['../views/Home.vue'], resolve),
        children: [{
            path: "CustomerManageInfo",
            name: "CustomerManageInfo",
            component: resolve => require(['../components/CustomerManageInfo.vue'], resolve)
        }, {
            path: "CustomerManageOrder",
            name: "CustomerManageOrder",
            component: resolve => require(['../components/CustomerManageOrder.vue'], resolve)
        }]
    },
    {
        path: "/SaleManagement",
        name: "SaleManagement",
        component: resolve => require(['../views/Home.vue'], resolve),
        children: [{
            path: "SaleOrderManagement",
            name: "SaleOrderManagement",
            component: resolve => require(['../components/SaleOrderManagement.vue'], resolve)
        }]
    },
    {
        path: "/StaffManagement",
        name: "StaffManagement",
        component: resolve => require(['../views/Home.vue'], resolve),
        children: [{
            path: "StaffManagementInfo",
            name: "StaffManagementInfo",
            component: resolve => require(['../components/StaffManagementInfo.vue'], resolve)
        }]
    },
    {
        path: "/Notice",
        name: "Notice",
        component: resolve => require(['../views/Home.vue'], resolve),
        children: [{
            path: "Noticeinfo",
            name: "Noticeinfo",
            component: resolve => require(['../components/NoticeInfo.vue'], resolve)
        }]
    }, {
        path: "/PurchaseManagement",
        name: "PurchaseManagement",
        component: resolve => require(['../views/Home.vue'], resolve),
        children: [{
            path: "PurchaseEdit",
            name: "PurchaseEdit",
            component: resolve => require(['../components/Purchasing.vue'], resolve)
        }, {
            path: "Statistics",
            name: "Statistics",
            component: resolve => require(['../components/PurchasingStatistics.vue'], resolve)
        }, {
            path: "Create",
            name: "Create",
            component: resolve => require(['../components/PurchasingCreate.vue'], resolve)
        }]
    },{
        path: "/ProductionManagement",
        name: "ProductionManagement",
        component: resolve => require(['../views/Home.vue'], resolve),
        children: [{
            path: "ProductionPlanManagement",
            name: "ProductionPlanManagement",
            component: resolve => require(['../components/ProductionPlanManagement.vue'], resolve)
        },{
            path: "ProductionPickingManagement",
            name: "ProductionPickingManagement",
            component: resolve => require(['../components/ProductionPickingManagement.vue'], resolve)
        },{
            path: "ProductionProductManagement",
            name: "ProductionProductManagement",
            component: resolve => require(['../components/ProductionProductManagement.vue'], resolve)
        }]
    }
=======
  },
  {
    path: "/Customermanage",
    name: "CustomerManage",
    component: resolve => require(['../views/Home.vue'], resolve),
    children: [{
      path: "CustomerManageInfo",
      name: "CustomerManageInfo",
      component: resolve => require(['../components/CustomerManageInfo.vue'], resolve)
    }]
  },
  {
    path: "/SaleManagement",
    name: "SaleManagement",
    component: resolve => require(['../views/Home.vue'], resolve),
    children: [{
      path: "SaleOrderManagement",
      name: "SaleOrderManagement",
      component: resolve => require(['../components/SaleOrderManagement.vue'], resolve)
    }]
  },
  {
    path: "/StaffManagement",
    name: "StaffManagement",
    component: resolve => require(['../views/Home.vue'], resolve),
    children: [{
      path: "StaffManagementInfo",
      name: "StaffManagementInfo",
      component: resolve => require(['../components/StaffManagementInfo.vue'], resolve)
    }]
  },
  {
    path: "/Notice",
    name: "Notice",
    component: resolve => require(['../views/Home.vue'], resolve),
    children: [{
      path: "Noticeinfo",
      name: "Noticeinfo",
      component: resolve => require(['../components/NoticeInfo.vue'], resolve)
    }]
  },
  {
    path: "/Salary",
    name: "Salary",
    component: resolve => require(['../views/Home.vue'], resolve),
    children: [{
      path: "SalaryManagementWait",
      name: "SalaryManagementWait",
      component: resolve => require(['../components/SalaryManagementWait.vue'], resolve)
    }]
  },
  {
    path: "/Salary",
    name: "Salary",
    component: resolve => require(['../views/Home.vue'], resolve),
    children: [{
      path: "SalaryManagmentDefend",
      name: "SalaryManagmentDefend",
      component: resolve => require(['../components/SalaryManagmentDefend.vue'], resolve)
    }]
  },
  {
    path: "/Salary",
    name: "Salary",
    component: resolve => require(['../views/Home.vue'], resolve),
    children: [{
      path: "SalaryManagmentReport",
      name: "SalaryManagmentReport",
      component: resolve => require(['../components/SalaryManagmentReport.vue'], resolve)
    }]
  }
>>>>>>> Stashed changes
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
