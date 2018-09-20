import BaseApi from './BaseApi'

export default class User extends BaseApi {
  login (data) {
    const url = '/user/login'
    return this.post(url, data)
  }

  logout () {
    const url = '/user/logout'
    return this.get(url)
  }

  resetPassword (data) {
    const url = '/user/changePwd'
    return this.post(url, data)
  }

  checkLogin () {
    const url = '/user/check'
    return this.get(url)
  }
}
