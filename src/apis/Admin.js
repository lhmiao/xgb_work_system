import BaseApi from './BaseApi'

export default class Admain extends BaseApi {
  searchUser (parmas) {
    const url = `/admin/users`
    return this.get(url, parmas)
  }

  editUser (data) {
    const url = `/admin/editUser`
    return this.post(url, data)
  }

  addUser (data) {
    const url = `/admin/addUser`
    return this.post(url, data)
  }

  deleteUser (data) {
    const url = `/admin/deleteUser`
    return this.post(url, data)
  }

  searchDepartment (parmas) {
    const url = `/admin/aparts`
    return this.get(url, parmas)
  }

  editDepartment (data) {
    const url = `/admin/editApart`
    return this.post(url, data)
  }

  addDepartment (data) {
    const url = `/admin/addApart`
    return this.post(url, data)
  }

  deleteDepartment (data) {
    const url = `/admin/deleteApart`
    return this.post(url, data)
  }
}
