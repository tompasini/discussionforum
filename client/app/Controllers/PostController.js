import { ProxyState } from "../AppState.js"
import { postService } from "../Services/PostService.js"


function _draw() {
  debugger
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
}