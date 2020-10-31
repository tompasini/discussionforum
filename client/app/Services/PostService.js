import { ProxyState } from "../AppState.js"
import Post from "../Models/Post.js"
import { postsApi } from "../Services/AxiosService.js"

class PostService {
  constructor() {
    console.log("hello from post service")
  }

  async getPosts() {
    let res = await postsApi.get("")
    console.log(res.data)
    ProxyState.posts = res.data.map(p => new Post(p))
  }
}

export const postService = new PostService()