export interface TimeLine {
    id: number,
    content: string,
    createTime: string,
    iconColor: string,
    createTimeDisplayed?:string,
}

export type CreateTimeLineDto = Pick<TimeLine, "content">;