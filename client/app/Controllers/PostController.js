import { ProxyState } from "../AppState.js"
import { postService } from "../Services/PostService.js"


function _draw() {
  let template = ''
  ProxyState.posts.forEach(p => template += p.Template)
  document.getElementById('posts').innerHTML = template
}

export default class PostController {
  constructor() {
    console.log("hello from post controller")
    this.getPosts()
    ProxyState.on("posts", _draw)
  }

  getPosts() {
    try {
      postService.getPosts()
    } catch (error) {
      console.error(error);
    }
  }
  
  create(e) {
    e.preventDefault()
    try {
      // debugger
      postService.create({title: e.target.postTitle.value, question: e.target.postQuestion.value})
    } catch (error) {
      console.error(error);
    }
  }

  delete(id) {
    try {
      postService.delete(id)
    } catch (error) {
      console.error(error);
    }
  }

  edit(id, editData) {
    try {
      postService.edit(id, editData)
    } catch (error) {
      console.error(error);
    }
  }

}
