import axios from 'axios'
import router from '@/router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
NProgress.configure({ showSpinner: false }) // NProgress Configuration

const redirectTo = (path) => {
  router.replace({
    path: path,
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}

// 默认配置
const config = {
  withCredentials: true,
  // 请求的完整路径就是baseURL中的
  baseURL: process.env.NODE_ENV === 'production' ? 'https://console.abeille.top/api' : 'http://localhost'
}

const instance = axios.create(config)

// 请求拦截
instance.interceptors.request.use(
  config => {
    NProgress.start()
    return config
  },
  error => {
    NProgress.done()
    return Promise.reject(error)
  }
)

// 响应拦截
instance.interceptors.response.use(
  res => {
    NProgress.done()
    return res
  },
  error => {
    NProgress.done()
    const { response } = error
    if (response) {
      // 状态码判断
      switch (response.status) {
        // 204：用户未注册，跳转注册页
        case 204:
          setTimeout(() => { redirectTo('/signup') }, 300)
          break
        // 401: 未登录状态，跳转登录页
        case 401:
          setTimeout(() => { redirectTo('/signin') }, 300)
          break
        // 403：验证失败，仍然登录页
        case 403:
          // store.commit('loginSuccess', null);
          setTimeout(() => { redirectTo('/signin') }, 300)
          break
        // 404请求不存在
        case 404:
          response.statusText = '服务可能罢工了，再试一下。'
          break
        default:
          response.statusText = '请求可能跑丢了，再试一下。'
      }
      return Promise.reject(response)
    } else {
    // 处理断网的情况
    // eg:请求超时或断网时，更新state的network状态
    // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
    // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
    // store.commit('changeNetwork', false)
    }
    return Promise.reject(error)
  }
)

export default instance
