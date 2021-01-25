import axios from 'axios'
import router from '../router'
import {
    Loading,
    Message
} from 'element-ui'

axios.interceptors.request.use(config => {
    //处理config
    config.headers.Authorization = "Bearer " +
        sessionStorage.getItem("token");
    // console.log(config);
    return config
})

axios.interceptors.response.use(
    res => {

        if (res.data.loginState == "no") {
            router.replace('/login');
        }

        return res
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    // 返回 401 清除token信息并跳转到登录页面
                    Message.error('token过期，将返回登录界面')
                    sessionStorage.clear();
                    router.replace('/Login');
            }
        }
    }

)

// http://localhost:56567 Kestra
axios.defaults.baseURL = "http://localhost:9999/api";
axios.defaults.withCredentials = true;
axios.defaults.headers["Content-Type"] = "application/json";
axios.defaults.headers["Accept"] = "application/json";
export default axios