import router from"@/router"
import store from "@/store";
import axios from "@/assets/axios";
import type {drawRequest} from "@/assets/api/type";



export class TalkHistory {
    content: string;
    selfSend: boolean;
    constructor(content : string, selfSend : boolean) {
        this.content = content
        this.selfSend = selfSend

    }
}
export class Message {
    id : number;
    content: string;
    type: 'error'|'info'|'success'|'warning';
    duration: number;
    constructor(id: number, content: string, type: 'error'|'info'|'success'|'warning', duration: number) {
        this.id = id
        this.content = content
        this.type = type
        this.duration = duration
    }
}

let messageId = 0

export const showMessage = (content: string, type: 'error'|'info'|'success'|'warning', duration = 2000) => {
    store.state.messageList.push(new Message(messageId++, content, type, duration))
}
export const changeTheme = (theme : string) => {
    window.document.documentElement.setAttribute("data-theme", theme);
}

export const goto = async (path : string)=>{
    router.push(path)
}
export const goDraw = ()=>{
    goto('/draw')
    store.state.curSelected = 'draw'
}
export const signOut = () =>{
    axios.post('/user/logout').then(res=>{
        console.log(res.data)
        if(res.data.code === 0){
            store.state.session = ''
            store.state.online = false
            goto('/')
        }
    })
}
export const signIn = (data:any) =>{

    axios.post('/user/login',data).then(res=>{
        if(res.data.code === 0){
            store.state.session = res.data.data.sessionId
            store.state.online=true
            store.state.email = res.data.data.email
            store.state.id = res.data.data.id
            goto('/main')
        }
        console.log('登录信息',res.data)
    })

}
export const signUp = (data:any) => {
    axios.post('/user/signUp',{},{
        params:{
            email:data.email,
            password:data.password
        }
    }).then(res=>{
        console.log(res.data)

    })
}
export const checkLog = () => {
    axios.get('/user/check').then(res=>{
        console.log('检查登录信息',res)
    })
}
export const getInfo = async () => {
    const info = await axios.post('/user/info', {}, {
        params: {
            id: store.state.id
        }
    })
    console.log('用户信息',info)
    return info.data
}
export const getIndividual = async () => {
    const info = await axios.get('/user/individual')
    console.log('用户信息',info)
    return info.data
}
export const updateInfo = (data : any) =>{
    axios.post('/user/update',data).then(res=>{
        console.log('更新用户信息',res.data)
        if(res.data.code===0){
            showMessage('更新个人信息成功！','success')
        }
    }).catch(e=>{
        showMessage('网络错误，请重试','error')
    })
}
export const uploadPortrait = async (formdata:FormData) => {
    console.log('上传的头像',formdata)
    const res = await axios.post('/user/uploadPortrait',formdata)
    console.log('检查res',res)
    return res.data
}
export const draw = async (data:drawRequest)=>{
    console.log('上传成功',data)
    const taskId = await axios.post('/image/draw',data)
    return taskId.data
}
export const checkGeneration = async (taskId:string):Promise<Object>=>{
    console.log('检查参数taskId',taskId)
    const res = await axios.post('/image/check',{},{
        params:{
            taskId:taskId
        }
    })
    //console.log('检查任务生成的res',res)
    return res.data.data
}
export const uploadImage = async (data:FormData)=>{
    const res = await axios.post('/image/upload',data)
    console.log('请求Img',res)

    return res.data
}
export const repaint = async (data:any)=>{
    console.log('重绘参数',data)
    const taskId = await axios.post('/image/repaint',data)
    console.log('重绘返回结果',taskId)
    return taskId.data
}
export const imgErase = async (data:any)=>{
    const taskId = await axios.post('/image/erase',data)
    console.log('检查擦除任务taskId',taskId)
    return taskId.data
}
export const checkErase = async (taskId:string):Promise<Object>=>{
    console.log('检查参数taskId',taskId)
    const res = await axios.post('/image/checkErase',{},{
        params:{
            taskId:taskId
        }
    })
    console.log('检查擦除任务生成的res',res)
    return res.data.data
}
export const getLastImg = async () => {
    const img = await axios.get('/image/get')
    console.log('获取上一张图片',img)
    return img.data
}
export const getBase64 = (file:File) =>{
    return new Promise(function (resolve, reject){
        const reader = new FileReader()
        let imgResult:string|ArrayBuffer|null
        reader.readAsDataURL(file)
        reader.onload=function (){
            imgResult = reader.result
        }
        reader.onerror = function (error   ){
            reject(error)
        }
        reader.onloadend = function (){
            resolve(imgResult)
        }
    })
}

export const shareImg =()=>{
    showMessage('分享功能还在开发中哦，请下次再来','warning')
}