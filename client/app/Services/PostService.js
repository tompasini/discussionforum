import { ProxyState } from "../AppState.js"
import Post from "../Models/Post.js"
// import { api } from "../Services/AxiosService.js"
import { api } from "../Services/AxiosService.js"

class PostService {
  edit(id, editData) {
    let res = api.put("posts/" + id, editData)
    ProxyState.posts = ProxyState.posts
  }
  delete(id) {
    let res = api.delete("posts/" + id)
    ProxyState.posts = ProxyState.posts.filter(p => p.id != id)
  }
  constructor() {
    console.log("hello from post service")
  }

  async getPosts() {
    let res = await api.get("posts")
    console.log(res.data)
    ProxyState.posts = res.data.map(p => new Post(p))
  }

  async create(data){
    let res = await api.post("posts", data)
    console.log(res.data)
    ProxyState.posts = [...ProxyState.posts, new Post(res.data)]
  }
}

export const postService = new PostService()

export default postService;