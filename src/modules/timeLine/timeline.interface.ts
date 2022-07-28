export interface TimeLine {
    id: number,
    title: string,
    content: string,
    createTime: string,
    iconColor: string,
    createTimeDisplayed?:string,
}

export type CreateTimeLineDto = Pick<TimeLine, "title" | "content">;