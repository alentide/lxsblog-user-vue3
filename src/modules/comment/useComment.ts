import { reactive, ref, type Ref } from "vue"


export interface CommentDto {
    id: number
    content: string
    user: CommentUser
}


export interface CommentUser {
    nickname: string
    avatar: string
}


export const useComment = (commentDto:CommentDto)=>{
    const id = ref(commentDto.id)
    const content = ref(commentDto.content)
    const user:Ref<CommentUser> = ref( commentDto.user)

    
    return reactive({
        id,
        content,
        user,

    })
}