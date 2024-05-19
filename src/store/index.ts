
import { createStore } from 'vuex'

export default createStore({
    state:{
        online: false,
        sidebar_fold: false,
        nick_name: "NickName",
        email: "3336970253@qq.com",
        isAdmin:false,
        avatar_url:new URL("./assets/avatar.jpg",import.meta.url)
    },
    getters:{

    },
    mutations:{

    },
    actions:{

    },
    modules:{

    }
})