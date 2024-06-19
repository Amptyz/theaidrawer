
import { createStore } from 'vuex'
import type {Message} from "@/assets/api";
import {TalkHistory} from "@/assets/api";


export default createStore({
    state:{
        online: false,
        sidebar_fold: false,
        nick_name: "NickName",
        email: "3336970253@qq.com",
        id:0,
        avatar_url:'/src/assets/avatar.jpg',
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