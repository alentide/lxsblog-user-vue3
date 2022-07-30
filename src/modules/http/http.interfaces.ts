export interface ListResponseData<T>  {
    list: T[];
    hasMore: boolean;
    total: number;
}

export interface ProjectResponse<T> {
    code: number;
    data: T
    msg: string
}