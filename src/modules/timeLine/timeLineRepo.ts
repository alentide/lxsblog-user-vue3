import { http } from "../http";
import type {  CreateTimeLineDto, TimeLine } from "./timeline.interface";

export async function add(createTimeLineItems: CreateTimeLineDto) {
    return http.post('/time-lines',createTimeLineItems).then((res: { data: TimeLine }) => res.data)
}

export async function remove(id:number) {
    return http.delete('/time-lines',{id}).then((res: { data: any }) => res.data)
}

export async function update(createTimeLineItems: CreateTimeLineDto) {
    return http.put('/time-lines',createTimeLineItems).then((res: { data: TimeLine }) => res.data)
}

export async function get(id:number) {
    return http.get('/time-lines',{id}).then((res: { data: TimeLine }) => res.data)
}

export default {
    add,
    remove,
    update,
    get,
}