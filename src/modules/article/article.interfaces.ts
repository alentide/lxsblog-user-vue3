export interface CreateArticleDto {
    title: string;
    summary: string;
    content: string;
    coverImage: {
        id: number
        src: string
    } | null
}


export interface UpdateArticleDto {
    id: number
    title: string;
    summary: string;
    content: string;
    coverImage: {
        id: number
        src: string
    }|null
}

export interface ArticleDfe {
    id: number
    title: string;
    summary: string;
    content: string;
    coverImage: {
        id: number
        src: string
    }|null
    createTimeDisplayed: string;
}