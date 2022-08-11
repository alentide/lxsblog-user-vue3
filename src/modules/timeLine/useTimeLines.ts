import timeLineRepo from './timeLineRepo';
import type { TimeLine } from './timeline.interface';
import { useList } from '../list';






export default () => {
    const {list,refresh,nextPage} = useList<TimeLine,any>('/time-lines')
    async function add(item: TimeLine) {

        /**
         * 如果是空的，直接刷新，因为要重置好些状态，刷新更方便
         */
        if(!list.value.length){
            return await refresh()
        }
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