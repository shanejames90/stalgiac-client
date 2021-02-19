import apiUrl from '../apiConfig'
import axios from 'axios'

export const postScreenshot = (user, screenshot) => {
  return axios({
    method: 'POST',
    url: apiUrl + '/screenshots/',
    headers: {
      'Authorization': `Token ${user.token}`
    },
    data: {
      screenshot: {
        title: screenshot.title,
        description: screenshot.description,
        imagefile: screenshot.imagefile
      }
    }
  })
}

export const indexScreenshots = (user, screenshot) => {
  return axios({
    url: apiUrl + '/screenshots/',
    method: 'GET',
    headers: {
      'Authorization': `Token ${user.token}`
    }
  })
}

export const showScreenshot = (id, user) => {
  return axios({
    url: apiUrl + '/purchases/' + id,
    method: 'GET',
    headers: {
      'Authorization': `Token ${user.token}`
    }
  })
}
