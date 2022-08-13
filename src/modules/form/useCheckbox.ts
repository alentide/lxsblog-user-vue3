import { ref, type Ref ,reactive} from "vue";


export function useCheckbox<T extends {id:number}>(emit: (eventName: 'change', ...args:any[]) => void) {
    const selectedList: Ref<T[]> = ref([]);
    const isSelect = (tag: T) => {
        return !!selectedList.value.find((m) => m.id === tag.id);
    };
    const select = (tag: T, selectValue: boolean) => {
        const index = selectedList.value.findIndex((m) => m.id === tag.id);

        if (selectValue) {
            if (index === -1) {
                selectedList.value.push(tag);
            }
        } else {
            if (index !== -1) {
                selectedList.value.splice(index, 1);
            }
        }
        emit(
            "change",
            selectedList.value.map((m) => m.id)
        );
    };

    return reactive({
        selectedList,
        isSelect,
        select
    })
}