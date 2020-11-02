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
    let form = e.target
    let postQuestion = form.postQuestion
    let postTitle = form.postTitle
    console.log(postQuestion.value)
    let data = {}
    data.title = postTitle.value
    data.question = postQuestion.value
    try {
      postService.create(data)
    } catch (error) {
      console.error(error);
    }
  }
}
