import { ref,reactive } from "vue";

export function useRadio<T extends {id:number}>(emit: (eventName: 'change', ...args:any[]) => void) {
    const selected = ref(0);
    const isSelect = (dto: T) => {
        return selected.value === dto.id;
    };
    const select = (dto: T, selectValue: boolean) => {
        if (selectValue) {
            selected.value = dto.id;
        } else {
            selected.value = 0;
        }
        emit("change", selected.value);
    };

    return reactive({
        selected,
        isSelect,
        select,
    })
}