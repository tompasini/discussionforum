import { ProxyState } from "../AppState.js"
import Post from "../Models/Post.js"
import Comment from "../Models/Comment.js"
import { api } from "./AxiosService.js"

export default class CommentService {
  constructor() {
  }

  async getAll() {
    let res = await api.get("comments")
    console.log(res.data)
    ProxyState.comments = res.data.map(c => new Comment(c))
  }

  async create(data){
    let res = await api.post("comments", data)
    console.log(res.data)
    ProxyState.comments = [...ProxyState.comments, new Comment(res.data)]
  }

  async edit(id, editData) {
    // validate current user is creator
    let comment = ProxyState.comments.find(c => c.id == id)
    let loggedInUserId = ProxyState.profile._id
    if (loggedInUserId != comment.creatorId) {
      throw 'You are not the creator of this post.'
    } else { 
      let res = await api.put("comments/" + id, editData)
      let commentIndex = ProxyState.comments.findIndex(c => c.id == id)
      ProxyState.comments[commentIndex] = editData
    }
  }

  async delete(id) {
    // validate current user is creator
    let post = ProxyState.comments.find(c => c.id == id)
    let loggedInUserId = ProxyState.profile._id
    if (loggedInUserId != comment.creatorId) {
      throw 'You are not the creator of this post.'
    } else { 
      let res = await api.delete("comments/" + id)
      ProxyState.comments = ProxyState.comments.filter(c => c.id != id)
    }
  }

}

export const commentService = new CommentService()
