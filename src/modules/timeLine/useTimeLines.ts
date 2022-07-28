import { usePost } from './../http/index';
import { ref, type Ref } from "vue"
import { http } from "../http"
import useListLoader from "../listLoader/useListLoader"
import type { TimeLineItems } from './useTimeLine';





export default () => {
    const timeLineItems: Ref<TimeLineItems[]> = ref([])
    async function refresh() {
        return { data: timeLineItems.value } = await http.get('/time-lines')
    }

    async function add(items: TimeLineItems) {
        timeLineItems.value.unshift(items)
        
    }
    const  remove = async (id:number)=>{
        const i = timeLineItems.value.findIndex(m=>m.id ===id)
        if(i===-1) return
        timeLineItems.value.splice(i,1)
    }
    return {
        refresh,
        timeLineItems,
        add,
        remove,
    }
}