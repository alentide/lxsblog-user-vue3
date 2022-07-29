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
    current.value=fullPath
    if(!tabs.value.find(existsTab=>existsTab.fullPath===fullPath)) {
        tabs.value.push({
            title: findMenu(m=>m.key===fullPath)?.title || '',
            fullPath,
        })
    }
    
    
}
const remove = (fullPath:string)=>{
    console.log(fullPath);
    
    let i 
    if((i=tabs.value.findIndex(existsTab=>existsTab.fullPath===fullPath)) !==-1) {
        tabs.value.splice(i,1)
    }

    router.push(tabs.value.slice(-1)[0]?.fullPath || '/admin')
}

const current = ref('')

const pop = ()=>{
    remove(current.value)
}

const go=(fullPath:string)=>{
    // console.log(fullPath);
    current.value=fullPath
    router.push(fullPath)
    
}

export default ()=>{

    return {
        current,
        tabs,
        add,
        remove,
        go,
        pop,
    }
}