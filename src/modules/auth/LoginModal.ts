import { reactive, ref } from 'vue';
import { http } from '../http';
import type { User } from '../user';
export class LoginModal {
    form = ref({
        email: '',
        password: '',
    })
    visible = ref(false)
    loading = ref(false)
    async login(){
        this.loading.value = true
        try {
            const res = await http.post<{
                token: {
                    access_token:string,
                },
                user: User
            }>('auth/login',this.form.value)
            return res
        } finally {
            this.loading.value = false
        }
    }
    show(){
        this.visible.value=true
    }
    hide(){
        this.visible.value = false
    }
}