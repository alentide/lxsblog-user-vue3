import { message } from 'ant-design-vue';


export default ()=>{
    const error = message.error
    const success = message.success
    return {
        error,
        success,
    }
}