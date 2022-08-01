import { adminHttp } from "../http";
import type {  CreateTimeLineDto, TimeLine } from "./timeline.interface";

export async function add(createTimeLineItems: CreateTimeLineDto) {
    return adminHttp.post<TimeLine>('/time-lines',createTimeLineItems).then((res: { data: TimeLine }) => res.data)
}

export async function remove(id:number) {
    return adminHttp.delete('/time-lines',{id}).then((res: { data: any }) => res.data)
}

export async function update(createTimeLineItems: CreateTimeLineDto) {
    return adminHttp.put('/time-lines',createTimeLineItems).then((res: { data: TimeLine }) => res.data)
}

export async function get(id:number) {
    return adminHttp.get('/time-lines',{id}).then((res: { data: TimeLine }) => res.data)
}

export default {
    add,
    remove,
    update,
    get,
}