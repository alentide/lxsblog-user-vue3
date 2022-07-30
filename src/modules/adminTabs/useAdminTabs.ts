import router from "@/router"
import { type Ref, ref ,computed, watch} from "vue"
import useAdminMenu from "../adminMenu/useAdminMenu"
import { useNav } from "../nav/useNav"

const {fetchMenu,menu,findMenu} = useAdminMenu()


interface Tab {
    title: string
    fullPath:string 
    closable:boolean
 }

 const tabs:Ref<Tab[]> = ref([
    {
        title: '首页',
        fullPath: '/admin',
        closable: false
    }
 ])

const current = ref('')

const currentIndex = computed(()=>{
    return tabs.value.findIndex(existsTab=>existsTab.fullPath===current.value)
})



const add = async (fullPath:string,title:string='')=>{
    current.value=fullPath
    if(!tabs.value.find(existsTab=>existsTab.fullPath===fullPath)) {
        tabs.value.push({
            title: (await findMenu(m=>m.key===fullPath))?.title || title,
            fullPath,
            closable:true
        })
    }
    
    
}
const remove = (fullPath:string)=>{
    console.log(fullPath);
    
    let i 
    if((i=tabs.value.findIndex(existsTab=>existsTab.fullPath===fullPath)) !==-1) {
        tabs.value.splice(i,1)
    }
    let lastFullPath = tabs.value.slice(-1)[0]?.fullPath
    
    router.push(lastFullPath)
}



const pop = ()=>{
    remove(current.value)
}

const go=(fullPath:string)=>{
    // console.log(fullPath);
    // current.value=fullPath
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
        currentIndex,
    }
}