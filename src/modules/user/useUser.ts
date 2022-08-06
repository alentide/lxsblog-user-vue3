import { useStorage } from '@vueuse/core';
import { ref,reactive } from "vue"


export interface User {
    id: number
    nickname: string
    avatar: string
}
export const useUser = ()=>{
    const user = useStorage('user',{})
    const avatar = ref(user.value.avatar)
    const nickname = ref(user.value.nickname)
    
    return reactive({
        avatar,
        nickname,
    })
}