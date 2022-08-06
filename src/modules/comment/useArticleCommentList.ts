import { userHttp } from "../http"
import { useList } from "../list"
import { useComment, type CommentDto } from "./useComment"


const URL_ARTICLE_COMMENT_LIST = 'comments/articles/'
export const useArticleCommentList = (articleId:number)=>{
    return useList<CommentDto,ReturnType<typeof useComment>>(URL_ARTICLE_COMMENT_LIST+articleId,{
        http: userHttp,
        transform: useComment
    })
}