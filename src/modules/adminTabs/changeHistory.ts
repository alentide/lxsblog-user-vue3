import {useEventBus} from '@vueuse/core'
const bus = useEventBus('news')
// const replaceState = history.replaceState
// history.replaceState = function (...args) {

//     bus.emit(args)
//     return replaceState.call(this,...args)
// }
export default bus