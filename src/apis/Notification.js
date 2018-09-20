import BaseApi from './BaseApi'

export default class Notification extends BaseApi {
  search (params) {
    const url = '/announce'
    return this.get(url, params)
  }

  upload (data) {
    const url = '/announce/announcePost'
    return this.post(url, data)
  }

  delete (params) {
    const url = '/announce/announceDel'
    return this.get(url, params)
  }
}
