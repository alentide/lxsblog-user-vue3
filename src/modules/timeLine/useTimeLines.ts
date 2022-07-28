import { usePost } from './../http/index';
import { ref, type Ref } from "vue"
import { http } from "../http"
import useListLoader from "../listLoader/useListLoader"
import type { TimeLineItems } from './useTimeLine';
import timeLineRepo from './timeLineRepo';





export default () => {
    const timeLines: Ref<TimeLineItems[]> = ref([])
    async function refresh() {
        
    }

    async function add(items: TimeLineItems) {
        timeLines.value.unshift(items)
        
    }
    const  remove = async (id:number)=>{
        const i = timeLines.value.findIndex(m=>m.id ===id)
        if(i===-1) return
        timeLines.value.splice(i,1)
    }
    return {
        refresh,
        timeLines,
        add,
        remove,
    }
}