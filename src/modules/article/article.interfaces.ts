import type { TagDto } from "../tag/dto/TagDto";

export interface CreateArticleDto {
    title: string;
    summary: string;
    content: string;
    coverImage?: {
        id: number
        src: string
    }
    category?: {
        id:number
        name: string
    }
    tags: TagDto[]
}

export type UpdateArticleDto = CreateArticleDto & {
    id: number
}

export type  ArticleDfe = UpdateArticleDto & {
    createTimeDisplayed: string;
}