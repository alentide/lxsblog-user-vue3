import router from "@/router"
import { type Ref, ref } from "vue"
import useAdminMenu from "../adminMenu/useAdminMenu"

const {fetchMenu,menu,findMenu} = useAdminMenu()


interface Tab {
    title: string
    fullPath:string 
 }
const tabs:Ref<Tab[]> = ref([])


const add = (fullPath:string)=>{
    if(!tabs.value.find(existsTab=>existsTab.fullPath===fullPath)) {
        tabs.value.push({
            title: findMenu(m=>m.key===fullPath)?.title || '',
            fullPath,
        })
    }
    current.value=fullPath
    
}
const remove = (fullPath:string)=>{
    console.log(fullPath);
    
    let i 
    if((i=tabs.value.findIndex(existsTab=>existsTab.fullPath===fullPath)) !==-1) {
        tabs.value.splice(i,1)
    }
}
const current = ref('')

const go=(fullPath:string)=>{
    // console.log(fullPath);
    router.push(fullPath)
    
}

export default ()=>{

    return {
        current,
        tabs,
        add,
        remove,
        go,
    }
}