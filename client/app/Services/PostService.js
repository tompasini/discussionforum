import { ProxyState } from "../AppState.js"
import Post from "../Models/Post.js"
import { api } from "../Services/AxiosService.js"

export default class PostService {
  constructor() {
    console.log("hello from post service")
  }
  async edit(id, editData) {
    // validate current user is creator
    let post = ProxyState.posts.find(p => p.id == id)
    let userId = ProxyState.profile._id
    if (userId != post.id) {
      throw 'You are not the creator of this post.'
    } else { 
      let res = await api.put("posts/" + id, editData)
      let postIndex = ProxyState.posts.findIndex(p => p.id == id)
      ProxyState.posts = ProxyState.posts
    }
  }
  async delete(id) {
    let post = ProxyState.posts.find(p => p.id == id)
    // validate current user is creator
    let userId = ProxyState.profile._id
    if (userId != post.id) {
      throw 'You are not the creator of this post.'
    } else { 
      let res = await api.delete("posts/" + id)
    }
    ProxyState.posts = ProxyState.posts.filter(p => p.id != id)
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
