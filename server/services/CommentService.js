import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"
import Comment from "../models/Comment"


class CommentService {

  async findById(id) {
    return await dbContext.Comments.findById(id)
  }
  
  async getAll(query = {}) {
    return await dbContext.Comments.find(query).populate("post")
  }

  async getAllCommentsOnPost(postId) {
    return await dbContext.Comments.find({ post: postId }).populate("post")
  }

  async create(body) {
    return await dbContext.Comments.create(body)
  }
  
  async edit(commentId, reqBody, currentUserLoggedIn) {
    let exists = await this.findById(commentId)
    if (!exists) { throw new BadRequest("Not a valid id") }
    
    // @ts-ignore
    let oldReqBody = exists._doc
    let comment = reqBody.comment
    reqBody = oldReqBody
    if (comment) { reqBody.comment = comment }

    let commentUser = reqBody.creatorId
    if (commentUser != currentUserLoggedIn) {
      throw new BadRequest('You are not the creator of this comment.')
    }
    return await dbContext.Comments.findByIdAndUpdate(commentId, reqBody, { new: true })
  }

  async upVote(commentId, body, currentUserLoggedIn) {
    let exists = await this.findById(commentId)
    if (!exists) { throw new BadRequest("Not a valid id") }

    let upVote = body.upVote
    // @ts-ignore
    body = exists._doc

    if ((upVote - body.upVote) != 1) {
      throw new BadRequest('You can only upvote a comment once.')
    }

    // REVIEW does this body.upVote not need to be assigned until after validating the user is not the creator?
    body.upVote = upVote
    let commentUser = body.creatorId
    if (commentUser == currentUserLoggedIn) {
      throw new BadRequest('You cannot upvote your own comment!')
    }
    return await dbContext.Comments.findByIdAndUpdate(commentId, body, { new: true })
  }

  async downVote(commentId, body, currentUserLoggedIn) {
    let exists = await this.findById(commentId)
    if (!exists) { throw new BadRequest("Not a valid id") }

    let downVote = body.downVote
    // @ts-ignore
    body = exists._doc

    if ((downVote - body.downVote) != 1) {
      throw new BadRequest('You can only downvote a comment once.')
    }
    
    // REVIEW does this body.downVote not need to be assigned until after validating the user is not the creator?
    body.downVote = downVote
    let commentUser = body.creatorId
    if (commentUser == currentUserLoggedIn) {
      throw new BadRequest('You cannot downvote your own comment!')
    }
    return await dbContext.Comments.findByIdAndUpdate(commentId, body, { new: true })
  }

  async delete(commentId, currentUserLoggedIn) {
    let exists = await this.findById(commentId)
    if (!exists) { throw new BadRequest("Not a valid id") }

    // @ts-ignore
    let creatorId = exists._doc.creatorId
    if (creatorId != currentUserLoggedIn) {
      throw new BadRequest('You are not the creator of this comment.')
    }
    return await dbContext.Comments.findByIdAndDelete(commentId)
  }
  

}


export const commentService = new CommentService()