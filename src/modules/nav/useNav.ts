import router from "@/router"
import { ref ,reactive} from "vue"
import type { RouteLocationRaw } from "vue-router"

const currentTitle = ref('')
const ZIndexDEFAULT = 1000
const ZIndex = ref(ZIndexDEFAULT)
const defaultZIndex = ()=>ZIndex.value = ZIndexDEFAULT
const zeroZIndex = ()=>ZIndex.value=0
export const useNav = ()=>{
    const go = (key:Parameters<typeof router.push>[0],title:string='')=>{
        currentTitle.value = title
        router.push(key)
    }
    return reactive({
        go,
        ZIndex,
        defaultZIndex,
        zeroZIndex,
        currentTitle,
    })
}