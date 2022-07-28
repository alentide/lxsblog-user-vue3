import timeLineRepo from './timeLineRepo';
import type { TimeLine } from './timeline.interface';
import { useList } from '../http/useList';





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
        try{
            await timeLineRepo.remove(id)
            const i = list.value.findIndex(m=>m.id ===id)
            if(i===-1) return
            list.value.splice(i,1)
        }catch(error){

        }

    }
    return {
        refresh,
        list,
        add,
        remove,
        nextPage,
    }
}