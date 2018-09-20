import BaseApi from './BaseApi'

export default class File extends BaseApi {
  // fileType有两种workfile和download
  constructor (fileType = 'workfile') {
    super()
    this.fileType = fileType
  }

  search (parmas) {
    const url = `/${this.fileType}`
    return this.get(url, parmas)
  }

  download (data) {
    const url = `/${this.fileType}/${this.fileType}Download`
    return this.post(url, data)
  }

  delete (data) {
    const url = `/${this.fileType}/${this.fileType}Del`
    return this.post(url, data)
  }

  upload (data) {
    const url = `/${this.fileType}/${this.fileType}Upload`
    return this.post(url, data)
  }
}
