import axios from 'axios'
import store from "@/store";

const API = axios.create({
    baseURL: '/api',
    timeout: 2000000
})
API.interceptors.request.use(
    (config) => {

        if(store.state.session !== '') {
            config.headers['session'] = store.state.session// 让每个请求携带自定义token 请根据实际情况自行修改
        }

        // if(config.data){
        //     config.data = clearNull(config.data)
        // }
        return config;
    },
    (error) => {
        // 对请求错误做些什么
        return Promise.reject(error);
    },


)

function isObj(item:any): item is object{
    return Object.prototype.toString.call(item) === '[object Object]'
}
function clearNull(obj:any){
    Object.entries(obj).forEach(([key,value])=>{

            if(value == null){
                obj[key] = ''
            }else if(isObj(value)){
                clearNull(value)
            }
    })
    return obj
}
export default API