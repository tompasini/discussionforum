import { ProxyState } from "../AppState.js"
import Post from "../Models/Post.js"
import { postsApi } from "../Services/AxiosService.js"
import { api } from './AxiosService.js'

class PostService {
  constructor() {
    console.log("hello from post service")
  }

  async getPosts() {
    let res = await postsApi.get("")
    console.log(res.data)
    ProxyState.posts = res.data.map(p => new Post(p))
  }

  async create(data){
    let res = await api.post("/posts", data)
    console.log(res.data)
    ProxyState.posts = [...ProxyState.posts, new Post(res.data)]
  }
}

export const postService = new PostService()

export default postService;