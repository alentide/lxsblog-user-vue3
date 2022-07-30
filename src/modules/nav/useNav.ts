import router from "@/router"
import { ref } from "vue"
import type { RouteLocationRaw } from "vue-router"

const currentTitle = ref('')
export const useNav = ()=>{
    const go = (key:Parameters<typeof router.push>[0],title:string='')=>{
        currentTitle.value = title
        router.push(key)
    }
    return {
        go,
        currentTitle,
    }
}