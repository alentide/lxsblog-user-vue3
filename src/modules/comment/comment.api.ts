import type { CommentDto } from './dto/CommentDto';
import { userHttp } from "../http"

export const URL_USER_POST_COMMENT = 'comments'
export const postCommentRequest =(id:number)=> (comment:string)=>userHttp.post<CommentDto>(URL_USER_POST_COMMENT,{content:comment,articleId:id})