import { userHttp } from './../http/index';
import { postCommentRequest } from './comment.api';
import { useCommentForm, type CommentFormOption } from './useCommentForm';

export * from './useCommentForm'
export * from './useArticleCommentList'
export * from './dto/CommentDto'

export const useUserCommentForm = (id:number,afterSubmit?: CommentFormOption['afterSubmit']) => useCommentForm({
    submitRequest: postCommentRequest(id),
    afterSubmit,
})