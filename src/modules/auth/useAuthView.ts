import { reactive } from 'vue';
//好像没能自动加入notification的css，所以需要手动加载这个css
import 'ant-design-vue/lib/notification/style/css'
import { notification } from "ant-design-vue";
import type { useAuth } from "./useAuth";
import { toRefs } from 'vue';

export const useAuthView = (auth: ReturnType<typeof useAuth>) => {
    async function prepareTouristAccount() {
        await auth.prepareTouristAccount()
        notifyUsingTouristAccount()
    }
    /**
     * 警告正在使用游客账户
     */
    function notifyUsingTouristAccount() {
        notification.warning({
            message: '警告！',
            description:
                '您正在使用游客账号。您可以点赞，评论。如果不转为正式账号，一旦清空缓存，无法找回。',
            duration: 0,
        });
    }
    return reactive({
        ...toRefs(auth),
        prepareTouristAccount,
        notifyUsingTouristAccount,
    })
}