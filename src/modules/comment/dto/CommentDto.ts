import type { User } from './../../user/index';
import type { ArticleDfe } from "@/modules/article/article.interfaces"

export class CommentDto {
    article!: ArticleDfe
    content!: string
    createTime!: string
    createTimeDisplayed!: string
    id!: number
    updateTime!: "2022-08-06 07:54:39"
    user!: User
}

