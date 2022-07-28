import { usePost } from './../http/index';
import { ref, type Ref } from "vue"
import { http } from "../http"
import useListLoader from "../listLoader/useListLoader"

export interface TimeLineItems {
    id: number,
    title: string,
    content: string,
    createTime: string,
    iconColor: string,
    createTimeDisplayed?:string,
}

export type CreateTimeLineItems = Pick<TimeLineItems, "title" | "content">;


export default () => {
    const addRequest = usePost('time-lines')
    async function add(createTimeLineItems: CreateTimeLineItems) {
        return addRequest.request(createTimeLineItems).then((res:{data:TimeLineItems}) =>res.data)
    }
    const  remove = async (id:number)=>{
        return await http.delete('time-lines',{id})
    }
    return {
        add,
        addLoading: addRequest.loading,
        remove,
    }
}