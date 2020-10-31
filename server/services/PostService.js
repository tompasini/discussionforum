import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"

class PostService {


  async upVote(postId, body, currentUserLoggedIn) {
    let exists = await this.findById(postId)

    if (!exists) {
      throw new BadRequest("Not a valid id")
    }

    let upVote = body.upVote
    // @ts-ignore
    body = exists._doc

    if ((upVote - body.upVote) != 1) {
      throw new BadRequest('You can only upvote a post once.')
    }

    body.upVote = upVote

    let postUser = body.creatorId

    if (postUser == currentUserLoggedIn) {
      throw new BadRequest('You cannot upvote your own post!')
    }

    return await dbContext.Posts.findByIdAndUpdate(postId, body, { new: true })

  }

  async downVote(postId, body, currentUserLoggedIn) {
    let exists = await this.findById(postId)

    if (!exists) {
      throw new BadRequest("Not a valid id")
    }

    let downVote = body.downVote
    // @ts-ignore
    body = exists._doc

    if ((downVote - body.downVote) != 1) {
      throw new BadRequest('You can only downvote a post once.')
    }

    body.downVote = downVote

    let postUser = body.creatorId

    if (postUser == currentUserLoggedIn) {
      throw new BadRequest('You cannot downvote your own post!')
    }

    return await dbContext.Posts.findByIdAndUpdate(postId, body, { new: true })

  }



  async delete(postId, currentUserLoggedIn, postCreator) {
    let exists = await this.findById(postId)

    if (!exists) {
      throw new BadRequest("Not a valid id")
    }

    if (postCreator != currentUserLoggedIn) {
      throw new BadRequest('You are not the creator of this post.')
    }

    return await dbContext.Posts.findByIdAndDelete(postId)
  }
  async edit(postId, reqBody, currentUserLoggedIn) {
    let exists = await this.findById(postId)

    if (!exists) {
      throw new BadRequest("Not a valid id")
    }


    // @ts-ignore
    let oldReqBody = exists._doc

    let title = reqBody.title


    let question = reqBody.question

    reqBody = oldReqBody

    if (title) {
      reqBody.title = title
    }

    if (question) {
      reqBody.question = question
    }

    let postUser = reqBody.creatorId

    if (postUser != currentUserLoggedIn) {
      throw new BadRequest('You are not the creator of this post.')
    }

    return await dbContext.Posts.findByIdAndUpdate(postId, reqBody, { new: true })
  }


  async create(body) {
    return await dbContext.Posts.create(body)
  }
  async getAll(query = {}) {
    return await dbContext.Posts.find(query)
  }

  async findById(id) {
    return await dbContext.Posts.findById(id)
  }

  // async validateUser(currentUser)) {
  //   currentUser == 
  // }
}

export const postService = new PostService()