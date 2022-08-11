import OSS from "ali-oss"
import { ref, type Ref } from "vue"
import { adminHttp } from "../http"
import { nanoid } from 'nanoid'

interface OSSToken {
    AccessKeyId: string
    AccessKeySecret: string
    // 从STS服务获取的安全令牌（SecurityToken）。
    SecurityToken: string
}

/**
 * 获取上传所需要的token
 * @returns 
 */
const getToken = async () => {
    const res = await adminHttp.get<OSSToken>('/images/token')
    return res.data
}

/**
 * 获得上传器
 */
const getUploader = (token: OSSToken) => {
    return new OSS({
        // yourRegion填写Bucket所在地域。以华东1（杭州）为例，Region填写为oss-cn-hangzhou。
        region: 'oss-cn-hangzhou',
        // 从STS服务获取的临时访问密钥（AccessKey ID和AccessKey Secret）。
        accessKeyId: token.AccessKeyId,
        accessKeySecret: token.AccessKeySecret,
        // 从STS服务获取的安全令牌（SecurityToken）。
        stsToken: token.SecurityToken,
        // refreshSTSToken: async () => {
        // // 向您搭建的STS服务获取临时访问凭证。
        //   const info = await fetch('your_sts_server');
        //   return {
        //     accessKeyId: info.accessKeyId,
        //     accessKeySecret: info.accessKeySecret,
        //     stsToken: info.stsToken
        //   }
        // },
        // 刷新临时访问凭证的时间间隔，单位为毫秒。
        // refreshSTSTokenInterval: 300000,
        // 填写Bucket名称。
        bucket: 'lxs-blog'
    });
}

const extname = (file: File) => '.' + file.name.split(".").slice(-1)[0]

const randomFileName = (file: File) => nanoid() + extname(file)

export interface ProjectImage {
    id: number;
    src: string;
    // createTime: string;
    // updateTime: string;
}
export const emptyImage: () => ProjectImage = () => ({
    id: 0,
    src: '',
    createTime: '',
    updateTime: '',
})

export const upload = async (file: File) => {
    const token = await getToken()
    const uploader = getUploader(token)
    const newFileName = randomFileName(file)
    const res = await uploader.put(newFileName, file);
    return await adminHttp.post<ProjectImage>('/images', {
        src: res.url
    })
}

function getBase64(img: Blob) {
    const reader = new FileReader();
    return new Promise((resolve: (url: string) => void, reject) => {
      reader.readAsDataURL(img);
      reader.addEventListener("load", () => resolve(reader.result as string));
    });
  }

  
export const useImageUploader = () => {
    const loading = ref(false)
    const image: Ref<ProjectImage | null> = ref(null)

    


    async function  compress(file: File): Promise<Blob> {
        const  img = new Image();
        img.src = await getBase64(file)

        const dom = document.createElement('canvas')
        
        const context = dom.getContext('2d') as CanvasRenderingContext2D
        const canvas = context.canvas
        const {width,height} = await getImageSize(img)
        context.drawImage(img, 0, 0, width, height);
        return new Promise((resolve,reject)=>{
            canvas.toBlob((blob)=>{
                resolve(blob as Blob)
            }, file.type,)
        })
    }

    const KB = 1024
    const MB = 1024 * KB
    const upload = async (file: File) => {
        if(file.size>2* MB){
            throw  {
                needTip: true,
                msg: '文件大小不能大于2Mb'
            }
        }
        // const blob = await compress(file)
        loading.value = true
        try {
            const token = await getToken()
            const uploader = getUploader(token)
            const newFileName = randomFileName(file)
            const res = await uploader.put(newFileName, file);
            ({ data: image.value } = await adminHttp.post<ProjectImage>('/images', {
                src: res.url
            }));
            return {
                name: newFileName,
                url: res.url
            }
        } finally {
            loading.value = false
        }

    }
    return {
        image,
        loading,
        upload,
        emptyImage,
    }
}



function getImageSize(img: HTMLImageElement): { width: any; height: any } | PromiseLike<{ width: any; height: any }> {
    return new Promise((resolve,reject)=>{
        img.onload=function(this:any){
            resolve({
                width: this.width,
                height: this.height,
            })
        }
    })
}

