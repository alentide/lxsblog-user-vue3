import { adminHttp } from "@/modules/http";
import { ref } from "vue";
import useAdminTabs from "../adminTabs/useAdminTabs";

export const useTagNewForm = () => {
    const form = ref({
        name: "",
    });

    const adminTabs = useAdminTabs()
    const loading = ref(false);
    const save = async () => {
        loading.value = true;
        try {
            const res = await adminHttp.post("/tags", form.value);
            adminTabs.pop()
            return res;
        } finally {
            loading.value = false;
        }
    };
    return {
        form,loading,save
    }
}