import router from"@/router"
import store from "@/store";
import axios from "@/assets/axios";
import type {drawRequest} from "@/assets/api/type";

export const changeTheme = (theme : string) => {
    window.document.documentElement.setAttribute("data-theme", theme);
}

export const goto = async (path : string)=>{
    router.push(path)
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
            goto('/main')
        }
        console.log(res.data)
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
export const draw = async (data:drawRequest)=>{
    console.log('上传成功',data)


    const taskId = await axios.post('/image/draw',data,{
        headers:{
            session:store.state.session
        }
    })
    return taskId.data
}
export const checkGeneration = async (taskId:string):Promise<Object>=>{
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