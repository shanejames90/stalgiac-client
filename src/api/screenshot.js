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
        image: screenshot.image
      }
    }
  })
}
