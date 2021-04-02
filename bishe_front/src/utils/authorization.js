import axios from "axios";

async function authorization() {
  const storage = localStorage

  let hasLogin = false
  let username = storage.getItem('username.bishe')

  // 过期时间
  const expiredTime = Number(storage.getItem('expiredTime.bishe'))
  // 当前时间
  const current = (new Date()).getTime()
  // 刷新令牌
  const refreshToken = storage.getItem('refresh.bishe')

  if (expiredTime > current) {
    hasLogin = true
    console.log('authorization access')
  } else if (refreshToken != null) {
    try {
      let response = axios.post('http://127.0.0.1:8000/api/token/refresh/', {
        refresh: refreshToken
      })
      const nextExpiredTime = Date.parse(response.headers.date) + 86400000

      storage.setItem('access.bishe', response.data.access)
      storage.setItem('expiredTime.bishe', nextExpiredTime)
      storage.removeItem('refresh.bishe')

      hasLogin = true

      console.log('authorization refresh')
    } catch (error) {
      storage.clear();
      hasLogin = false;

      console.log('authorization error')
    }
  } else {
    storage.clear();
    hasLogin = false;
    console.log('authorization exp')
  }
  console.log('authorization done');

  return [hasLogin, username]
}

export default authorization
