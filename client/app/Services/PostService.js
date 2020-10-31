import { ProxyState } from "../AppState.js"
import Post from "../Models/Post.js"
import { api } from "../Services/AxiosService.js"

export default class PostService {
  constructor() {
  }

  async getAll() {
    let res = await api.get("posts")
    console.log(res.data)
    ProxyState.posts = res.data.map(p => new Post(p))
  }

  async create(data){
    let res = await api.post("posts", data)
    console.log(res.data)
    ProxyState.posts = [...ProxyState.posts, new Post(res.data)]
  }

  async edit(id, editData) {
    // validate current user is creator
    let post = ProxyState.posts.find(p => p.id == id)
    let loggedInUserId = ProxyState.profile._id
    if (loggedInUserId != post.creatorId) {
      throw 'You are not the creator of this post.'
    } else { 
      let res = await api.put("posts/" + id, editData)
      let postIndex = ProxyState.posts.findIndex(p => p.id == id)
      ProxyState.posts[postIndex] = editData
    }
  }

  async delete(id) {
    // validate current user is creator
    let post = ProxyState.posts.find(p => p.id == id)
    let loggedInUserId = ProxyState.profile._id
    if (loggedInUserId != post.creatorId) {
      throw 'You are not the creator of this post.'
    } else { 
      let res = await api.delete("posts/" + id)
      ProxyState.posts = ProxyState.posts.filter(p => p.id != id)
    }
  }

}

export const postService = new PostService()
