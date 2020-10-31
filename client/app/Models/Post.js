export default class Post {
  constructor(data) {
    this.id = data._id
    this.title = data.title
    this.imgURL = data.imgURL
    this.question = data.question
    this.upVote = data.upVote
    this.downVote = data.downVote
  }

  get Template() {
    return /*html*/`
      <div class="row post-row">
        <!-- img avatar whatevs -->
        <div class="col-2 post-img">
          <img id="postImg" src="http://placehold.it/50" alt="">
        </div>
        <!-- title -->
        <div class="col-6 post-title">
          <h5 id="postTitle">${this.title}</h5>
        </div>
        <!-- up vote -->
        <div class="col-2 post-vote">
          <span id="postUpVote">${this.upVote}&plus;</span>
        </div>
        <!-- down vote -->
        <div class="col-2 post-vote">
          <span id="postDownVote">${this.downVote}&minus;</span>
        </div>
        <!-- down vote -->
        <div class="col-2 post-vote">
          <span onclick="app.postController.delete('${this.id}')">&times;</span>
        </div>
        <!-- down vote -->
        <div class="col-2 post-vote">
          <span onclick="app.postController.edit('${this.id}')">edit</span>
        </div>
      </div>
      `;
  }
}