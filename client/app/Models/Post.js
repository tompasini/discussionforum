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
        <div class="border rounded shadow-lg">
        <h3>${this.title}</h3>
        <p>${this.question}</p>
        </div>
      `;
  }
}