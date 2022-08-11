import { reactive, ref, type Ref } from "vue"
import type { CommentDto } from "./dto/CommentDto"


export * from './dto/CommentDto'


export interface CommentUser {
    nickname: string
    avatar: string
}


export const useComment = (commentDto:CommentDto)=>{
    const id = ref(commentDto.id)
    const content = ref(commentDto.content)
    const createTime = ref(commentDto.createTime)
    const user:Ref<CommentUser> = ref( commentDto.user)

    
    return reactive({
        id,
        content,
        user,
        createTime
    })
}