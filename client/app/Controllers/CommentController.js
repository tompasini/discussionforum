import { ProxyState } from "../AppState.js"
import { commentService } from "../Services/CommentService.js"


function _draw() {
  let template = /*html*/ `
  `;
  ProxyState.comments.forEach(c => template += c.Template)
  document.getElementById('comments').innerHTML = template
}

export default class CommentController {
  constructor() {
    this.getAll()
    ProxyState.on("comments", _draw)
  }

  getAll() {
    try {
      commentService.getAll()
    } catch (error) {
      console.error(error);
    }
  }
  
  create(e) {
    e.preventDefault()
    try {
      commentService.create({})
    } catch (error) {
      console.error(error);
    }
  }

  edit(id, editData) {
    try {
      commentService.edit(id, editData)
    } catch (error) {
      console.error(error);
    }
  }

  delete(id) {
    try {
      commentService.delete(id)
    } catch (error) {
      console.error(error);
    }
  }

}
