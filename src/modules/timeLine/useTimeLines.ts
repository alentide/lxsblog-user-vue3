import { useList, usePost } from './../http/index';
import { ref, type Ref } from "vue"
import { http } from "../http"
import useListLoader from "../listLoader/useListLoader"

import timeLineRepo from './timeLineRepo';
import type { TimeLine } from './timeline.interface';





export default () => {
    const {list,refresh,nextPage} = useList<TimeLine>('/time-lines')
    async function add(item: TimeLine) {
        const i = list.value.findIndex(m=>item.id ===m.id)
        if(i===-1) {
            list.value.unshift(item)
            return
        }
        list.value.splice(i,1,item)
    }
    const  remove = async (id:number)=>{
        const i = list.value.findIndex(m=>m.id ===id)
        if(i===-1) return
        list.value.splice(i,1)
    }
    return {
        refresh,
        list,
        add,
        remove,
        nextPage,
    }
}