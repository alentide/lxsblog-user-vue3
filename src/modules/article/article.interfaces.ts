export interface CreateArticleDto {
    title: string;
    summary: string;
    content: string;
    coverImage: {
        id: number
        src: string
    } | null
    category: {
        id:number
        name: string
    }|null
}

export type UpdateArticleDto = CreateArticleDto & {
    id: number
}

export type  ArticleDfe = UpdateArticleDto & {
    createTimeDisplayed: string;
}