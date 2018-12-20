import axios from 'axios'

axios.defaults.baseURL = "https://cococo.org/commune-dev/"
export default {
  resolveGet(url) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url
      }).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },

  resolvePost(url, params) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: url,
        data: params,
        headers: {
          'Content-Type':'multipart/form-data; charset=utf-8',
        }
      }).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },

  requestGet(url, token) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        headers: {
          'Content-Type':'application/json',
          'token': token,
          'client_id': store.state.client_id
        },
        url
      }).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  requestPost(url, params, token) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: url,
        data: params,
        headers: {
          'Content-Type':'application/json',
          'token': token,
        }
      }).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },

}
