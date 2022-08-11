import type { CategoryDto } from "@/modules/category/dto/CategoryDto"
import type { TagDto } from "@/modules/tag/dto/TagDto"

export interface UserListItemArticleDto {
    id: number
    title: string
    /**
     * 阅读量
     */
    viewNum: number
    /**
     * 评论数
     */
    commentNum: number
    /**
     * 当前用户评分，没有就是0
     */
    currentUserScore: number
     /**
     * 文章平均分，没有就是0
     */
    averageScore: number
    /**
     * 参与评分的用户数量
     */
    scoreUserNum: number
    summary: string
    tags: TagDto[]
    category: CategoryDto
    firstReleaseTime: string
    
}