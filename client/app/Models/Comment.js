export default class Comment {
  constructor(data) {
    this.id = data._id
    this.comment = data.comment
    this.post = data.post
    this.upVote = data.upVote
    this.downVote = data.downVote
    this.creatorId = data.creatorId
  }

  get Template() {
    return /*html*/`
      `;
  }
}
