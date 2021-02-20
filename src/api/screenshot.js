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
    url: apiUrl + '/screenshots/' + id,
    method: 'GET',
    headers: {
      'Authorization': `Token ${user.token}`
    }
  })
}

export const updateScreenshot = (id, screenshot, user) => {
  return axios({
    url: apiUrl + '/screenshots/' + id + '/',
    method: 'PATCH',
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

export const deleteScreenshot = (id, user) => {
  return axios({
    url: apiUrl + '/screenshots/' + id,
    method: 'DELETE',
    // Add an authorization header
    headers: {
      // we need the user, so we have access to their token
      'Authorization': `Token ${user.token}`
    }
  })
}
