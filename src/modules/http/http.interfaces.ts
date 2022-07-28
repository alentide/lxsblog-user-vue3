export interface ListResponseData<T>  {
    list: T[];
    hasMore: boolean;
}

export interface ProjectResponse<T> {
    code: number;
    data: T
    msg: string
}