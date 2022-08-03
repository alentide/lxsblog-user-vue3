import { useStorage, type RemovableRef } from '@vueuse/core';
import { LoginModal } from './LoginModal';

class UserDto {
    id!: number
    username!: string
    email!: string
}
class User {
    id!: number
    username!: string
    email!: string
    constructor(data:UserDto){
        Object.assign(this,data)
    }
    isEmpty(){
        return !!this.id
    }
}

class EmptyUser extends User {
    constructor(){
        super({
            id:0,
            username: '',
            email: ''
        })
    }
}


class AuthModal extends LoginModal {
    user:RemovableRef<User> =useStorage('user',new EmptyUser)
    token=useStorage('token','')
    async login(){
        return super.login().then(res=>{
            this.user.value = new User(res.data.user)
            this.token.value = 'Bearer '+res.data.token.access_token
            this.hide()
            return res
        })
    }
}

export const authModal = new AuthModal()
export const loginModal = authModal