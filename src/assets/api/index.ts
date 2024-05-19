import router from"@/router"
import store from "@/store";
import axios from "@/assets/axios";
export const changeTheme = (theme : string) => {
    window.document.documentElement.setAttribute("data-theme", theme);
}

export const goto = async (path : string)=>{
    router.push(path)
}

export const signOut = () =>{

}
export const signIn = (data:any) =>{

    store.state.online=true
    goto('/main')
}
export const signUp = (data:any) => {

}