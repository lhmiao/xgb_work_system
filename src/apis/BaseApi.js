import axios from 'axios'
import qs from 'qs'

const clientConfig = {
  baseURL: '/api',
  timeout: 10000
}

export default class BaseApi {
  constructor () {
    this.client = this.getAxiosClient()
  }

  getAxiosClient () {
    let axiosClient = axios.create(clientConfig)
    axiosClient.interceptors.response.use(
      res => {
        if (res.data.errorCode !== 0) {
          const err = {
            errCode: res.data.errorCode,
            errMsg: res.data.errorMsg,
            toString () {
              return this.errMsg
            }
          }
          return Promise.reject(err)
        }
        return res.data
      },
      err => Promise.reject(err)
    )
    return axiosClient
  }

  request (option) {
    return this.client.request(option)
  }

  get (url, params = {}) {
    const option = {
      url,
      method: 'get',
      params
    }
    return this.request(option)
  }

  post (url, data = {}, type = 'form-data') {
    const option = {
      url,
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
    if (type === 'form-data') {
      let form = new FormData()
      let keys = Object.keys(data)
      for (let key of keys) {
        let value = data[key]
        form.append(key, value)
      }
      option.data = form
    } else if (type === 'json') {
      option.headers['Content-Type'] = 'application/json'
      option.data = data
    } else {
      option.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      option.data = qs.stringify(data)
    }
    return this.request(option)
  }

  put (url, data = {}, type = 'form-data') {
    const option = {
      url,
      method: 'put',
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
    if (type === 'form-data') {
      let form = new FormData()
      let keys = Object.keys(data)
      for (let key of keys) {
        let value = data[key]
        form.append(key, value)
      }
      option.data = form
    } else if (type === 'json') {
      option.headers['Content-Type'] = 'application/json'
      option.data = data
    } else {
      option.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      option.data = qs.stringify(data)
    }
    return this.request(option)
  }

  delete (url, data = {}) {
    const option = {
      url,
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      data
    }
    return this.request(option)
  }
}
