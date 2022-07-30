import { useRoute } from 'vue-router';
import { http } from "@/modules/http";
import { onMounted, ref } from "vue";
import { useLoadingHoc } from '../utils/useLoadingHoc';
import { andThen, pipe } from 'ramda';
import useAdminTabs from '../adminTabs/useAdminTabs';

export const useTagEditForm = () => {
    const route = useRoute()
    const form = ref({
        id: route.params.id,
        name: "",
    });
    const adminTabs = useAdminTabs()
    const { loading, show, hide, loadingHoc } = useLoadingHoc()
    const save = async () => {
        loading.value = true;
        try {
            const res = await http.patch("/tags/" + form.value.id, form.value);
            adminTabs.pop()
            return res;
        } finally {
            loading.value = false;
        }
    };
    const setForm = (res: any) => {
        form.value = res.data
        return res
    }

    const fetch = loadingHoc(pipe(
        () => http.get("/tags/" + form.value.id),
        andThen(res=>{
            if(!res.data){
                adminTabs.pop()
                throw '该内容不存在。'
            }
            return res
            
        }),
        andThen(setForm),
        
    ))
    
    onMounted(fetch)
    return {
        form, loading, save
    }
}