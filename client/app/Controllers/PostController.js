import { ProxyState } from "../AppState.js"
import { postService } from "../Services/PostService.js"


function _draw() {
  let template = /*html*/ `
    <!-- form to create new posts -->
    <div id="postHeader" class="row post-header">
        <form class="col-4" onsubmit="app.postController.create(event)">
            <input class="form-control input" id="postTitle" type="text" name="postTitle" placeholder="Create new post..." required>
            <input class="form-control input" id="postQuestion" type="text" name="postQuestion" placeholder="Add question..." required>
            <button class="btn btn-outline-success btn-lg btn-block" type="submit">Create Post</button>
        </form>
    </div>
  `;
  ProxyState.posts.forEach(p => template += p.Template)
  document.getElementById('posts').innerHTML = template
}

export default class PostController {
  constructor() {
    this.getAll()
    ProxyState.on("posts", _draw)
  }

  getAll() {
    try {
      postService.getAll()
    } catch (error) {
      console.error(error);
    }
  }
  
  create(e) {
    e.preventDefault()
    try {
      postService.create({
        title: e.target.postTitle.value, 
        question: e.target.postQuestion.value
      })
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

  delete(id) {
    try {
      postService.delete(id)
    } catch (error) {
      console.error(error);
    }
  }

}
