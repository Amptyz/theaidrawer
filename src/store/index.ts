
import { createStore } from 'vuex'
import type {Message} from "@/assets/api";
import {TalkHistory} from "@/assets/api";

export default createStore({
    state:{
        online: false,
        sidebar_fold: false,
        nick_name: "NickName",
        email: "3336970253@qq.com",
        isAdmin:false,
        avatar_url:new URL("./assets/avatar.jpg",import.meta.url),
        session: '',
        talkHistories: new Array<TalkHistory>(),
        messageList: new Array<Message>(),
        isRedraw: false,
        curSelected:'home'
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