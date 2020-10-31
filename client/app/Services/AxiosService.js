const base = window.location.host.includes('localhost') ? '//localhost:3000/' : '/'

export const api = axios.create({
  baseURL: base + 'api/',
  timeout: 10000,
  withCredentials: true
})

export const postsApi = axios.create({
  baseURL: base + 'api/posts',
  timeout: 10000,
  withCredentials: true
})