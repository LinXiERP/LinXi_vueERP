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
                path: "InPuOrderInfo",
                name: "InPuOrderInfo",
                component: resolve => require(['../components/InPuOrderInfo.vue'], resolve)
            }, {
                path: "CommodityInventoryInfo",
                name: "CommodityInventoryInfo",
                component: resolve => require(['../components/CommodityInventoryInfo.vue'], resolve)
            }, {
                path: "InCommodityRecord",
                name: "InCommodityRecord",
                component: resolve => require(['../components/InCommodityRecord.vue'], resolve)
            },
            {
                path: "OutProductmaterials",
                name: "OutProductmaterials",
                component: resolve => require(['../components/OutProductmaterials.vue'], resolve)
            },
            {
                path: "OutCommodityRecord",
                name: "OutCommodityRecord",
                component: resolve => require(['../components/OutCommodityRecord.vue'], resolve)
            },

        ]

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
            },
            {
                path: "CustomerManageOrderTrace",
                name: "CustomerManageOrderTrace",
                component: resolve => require(['../components/CustomerManageOrderTrace.vue'], resolve)
            }
        ]
    },
    {
        path: "/SaleManagement",
        name: "SaleManagement",
        component: resolve => require(['../views/Home.vue'], resolve),
        children: [{
                path: "SaleOrderManagement",
                name: "SaleOrderManagement",
                component: resolve => require(['../components/SaleOrderManagement.vue'], resolve)
            },
            {
                path: "SlOrder",
                name: "SlOrder",
                component: resolve => require(['../components/SlOrder.vue'], resolve)
            },
            {
                path: "SaleStatistics",
                name: "SaleStatistics",
                component: resolve => require(['../components/SaleStatistics.vue'], resolve)
            },
        ]
    },
    {
        path: "/QualityManagement",
        name: "QualityManagement",
        component: resolve => require(['../views/Home.vue'], resolve),
        children: [{
            path: "QualityProduct",
            name: "QualityProduct",
            component: resolve => require(['../components/QualityProduct.vue'], resolve)
        }, {
            path: "ProductInfo",
            name: "ProductInfo",
            component: resolve => require(['../components/ProductInfo.vue'], resolve)
        }, {
            path: "QualityCommodity",
            name: "QualityCommodity",
            component: resolve => require(['../components/QualityCommodity.vue'], resolve)
        }, {
            path: "CommodityInfo",
            name: "CommodityInfo",
            component: resolve => require(['../components/CommodityInfo.vue'], resolve)
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
        }, {
            path: "NoticeManageInfo",
            name: "NoticeManageInfo",
            component: resolve => require(['../components/NoticeManageInfo.vue'], resolve)
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
    }, {
        path: "/ProductionManagement",
        name: "ProductionManagement",
        component: resolve => require(['../views/Home.vue'], resolve),
        children: [{
            path: "ProductionPlanManagement",
            name: "ProductionPlanManagement",
            component: resolve => require(['../components/ProductionPlanManagement.vue'], resolve)
        }, {
            path: "ProductionPickingManagement",
            name: "ProductionPickingManagement",
            component: resolve => require(['../components/ProductionPickingManagement.vue'], resolve)
        }, {
            path: "ProductionProductManagement",
            name: "ProductionProductManagement",
            component: resolve => require(['../components/ProductionProductManagement.vue'], resolve)
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
        path: "/Salary",
        name: "Salary",
        component: resolve => require(['../views/Home.vue'], resolve),
        children: [{
            path: "SalaryManagementWait",
            name: "SalaryManagementWait",
            component: resolve => require(['../components/SalaryManagementWait.vue'], resolve)
        }, {
            path: "SalaryManagmentDefend",
            name: "SalaryManagmentDefend",
            component: resolve => require(['../components/SalaryManagmentDefend.vue'], resolve)
        }, {
            path: "SalaryManagmentReport",
            name: "SalaryManagmentReport",
            component: resolve => require(['../components/SalaryManagmentReport.vue'], resolve)
        }]
    },
    //往来管理
    {
        path: "/IntercourseManagement",
        name: "IntercourseManagement",
        component: resolve => require(['../views/Home.vue'], resolve),
        //销售结款
        children: [{
            path: "SaleNoPay",
            name: "SaleNoPay",
            component: resolve => require(['../components/IntercourseManagementSalary.vue'], resolve)
        }, {
            path: "PurchasingNoPay",
            name: "PurchasingNoPay",
            component: resolve => require(['../components/IntercoursePurchasingNoPay.vue'], resolve)
        }, {
            path: "PurchasingReturn",
            name: "PurchasingReturn",
            component: resolve => require(['../components/IntercoursePurchasingReturn.vue'], resolve)
        }, {
            path: "PurchasingSend",
            name: "PurchasingSend",
            component: resolve => require(['../components/IntercoursePurchasingSend.vue'], resolve)
        }]
    },
    {
        path: "/BasicInformationManagement",
        name: "BasicInformationManagement",
        component: resolve => require(['../views/Home.vue'], resolve),
        children: [{
            path: "BasicInformationSupplierManagement",
            name: "BasicInformationSupplierManagement",
            component: resolve => require(['../components/BasicInformationSupplierManagement.vue'], resolve)
        }, {
            path: "BasicInformationCommodityManagement",
            name: "BasicInformationCommodityManagement",
            component: resolve => require(['../components/BasicInformationCommodityManagement.vue'], resolve)
        }, {
            path: "BasicInformationProductManagement",
            name: "BasicInformationProductManagement",
            component: resolve => require(['../components/BasicInformationProductManagement.vue'], resolve)
        }]
    },
    {
        path: "/RolesMenus",
        name: "RolesMenus",
        component: resolve => require(['../views/Home.vue'], resolve),
        children: [{
            path: "RolePermission",
            name: "RolePermission",
            component: resolve => require(['../components/RolePermission.vue'], resolve)
        }, {
            path: "UserRole",
            name: "UserRole",
            component: resolve => require(['../components/UserRole.vue'], resolve)
        }]
    },
    {
        path: "/User",
        name: "User",
        component: resolve => require(['../views/Home.vue'], resolve),
        children: [{
            path: "UserManageInfo",
            name: "UserManageInfo",
            component: resolve => require(['../components/UserManageInfo.vue'], resolve)
        }]
    },
    {
        path: "/Deparment",
        name: "Deparment",
        component: resolve => require(['../views/Home.vue'], resolve),
        children: [{
            path: "DeparmentManageInfo",
            name: "DeparmentManageInfo",
            component: resolve => require(['../components/DeparmentManageInfo.vue'], resolve)
        }]
    },
    {
        path: "/ProductInventory",
        name: "ProductInventory",
        component: resolve => require(['../views/Home.vue'], resolve),
        children: [{
            path: "ProductInventoryInfo",
            name: "ProductInventoryInfo",
            component: resolve => require(['../components/ProductInventoryInfo.vue'], resolve)
        }]

    },
    {
        path: "/ProductPutinStorage",
        name: "ProductPutinStorage",
        component: resolve => require(['../views/Home.vue'], resolve),
        children: [{
            path: "ProductPutinStorageList",
            name: "ProductPutinStorageList",
            component: resolve => require(['../components/ProductPutinStorageList.vue'], resolve)
        }]

    },
    {
        path: "/PutinStorageinfo",
        name: "PutinStorageinfo",
        component: resolve => require(['../views/Home.vue'], resolve),
        children: [{
            path: "PutInStorageManagement",
            name: "PutInStorageManagement",
            component: resolve => require(['../components/PutInStorageManagement.vue'], resolve)
        }]

    },
    {
        path: "/GetOutStorage",
        name: "GetOutStorage",
        component: resolve => require(['../views/Home.vue'], resolve),
        children: [{
            path: "GetOutStorageList",
            name: "GetOutStorageList",
            component: resolve => require(['../components/GetOutStorageList.vue'], resolve)
        }]

    },
    {
        path: "/GetOutStoragementInfo",
        name: "GetOutStoragementInfo",
        component: resolve => require(['../views/Home.vue'], resolve),
        children: [{
            path: "GetOutStorageManagement",
            name: "GetOutStorageManagement",
            component: resolve => require(['../components/GetOutStorageManagement.vue'], resolve)
        }]

    },
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