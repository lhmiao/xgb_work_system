import BaseApi from './BaseApi'

export default class User extends BaseApi {
  login (data) {
    const url = ''
    return this.post(url, data)
  }

  logout () {
    const url = ''
    return this.get(url)
  }
}
