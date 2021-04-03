import axios from "axios";
import {ElLoading} from 'element-plus';
import Loading from "element-plus/es/el-loading";

// const loading = ElLoading.service({
//   lock: true,
//   text: '加载中...',
//   background: 'rgba(0, 0, 0, 0.7)'
// })
let loadingInstance

export function request(config) {
  const instance = axios.create({
    baseURL: 'http://127.0.0.1:8000/',
    timeout: 3000,
  })

  instance.interceptors.request.use(config => {
    loadingInstance = Loading.service({
      lock: true,
      text: '加载中...',
      background: 'rgba(0, 0, 0, 0.7)'
    })
    return config
  })

  instance.interceptors.response.use(response => {
    loadingInstance.close()
    return response.data
  }, error => {
    loadingInstance.close()
    console.log(error)
  })

  return instance(config)
}
