import axios from 'axios';
import { ElMessage } from 'element-plus'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import type { AxiosError, AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios'
const service:AxiosInstance = axios.create({
    timeout: 5000
});

async function doService(promise:Promise<any>) {
    try {
        const data = await promise;
        NProgress.done();
        return data;
    } catch (err) {
        NProgress.done();
        return err;
    }
  }

service.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        return config;
    },
    (error: AxiosError) => {
        console.log(error);
        return Promise.reject();
    }
);

service.interceptors.response.use(
    (response: AxiosResponse) => {
        if (response.status === 200) {
            return response.data;
        } else {
            ElMessage.error('网络请求错误')
            return Promise.reject();
        }
    },
    (error: AxiosError) => {
        ElMessage.error(error.message)
        return Promise.reject();
    }
);

const request = async function (config:AxiosRequestConfig) {
    NProgress.start()
    return await doService(service(config))
  }
  // export default service
  export default request