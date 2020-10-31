import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"

class PostService {


  async upVote(postId, body, currentUserLoggedIn) {
    let exists = await this.findById(postId)

    if (!exists) {
      throw new BadRequest("Not a valid id")
    }

    // @ts-ignore
    body = exists._doc

    let voteCheck = await dbContext.PostVotes.find({ user: currentUserLoggedIn, post: postId })

    let vote = { user: currentUserLoggedIn, post: postId }

    if (voteCheck.length > 0) {
      throw new BadRequest('You can only upvote a post once.')
    } else {
      await dbContext.PostVotes.create(vote)
    }


    let postUser = body.creatorId

    if (postUser == currentUserLoggedIn) {
      throw new BadRequest('You cannot upvote your own post!')
    }
    body.upVote++

    return await dbContext.Posts.findByIdAndUpdate(postId, body, { new: true })

  }

  async downVote(postId, body, currentUserLoggedIn) {
    let exists = await this.findById(postId)

    if (!exists) {
      throw new BadRequest("Not a valid id")
    }

    // @ts-ignore
    body = exists._doc

    let voteCheck = await dbContext.PostVotes.find({ user: currentUserLoggedIn, post: postId })

    let vote = { user: currentUserLoggedIn, post: postId }

    if (voteCheck.length > 0) {
      throw new BadRequest('You can only downvote a post once.')
    } else {
      await dbContext.PostVotes.create(vote)
    }

    let postUser = body.creatorId

    if (postUser == currentUserLoggedIn) {
      throw new BadRequest('You cannot downvote your own post!')
    }

    body.downVote++

    return await dbContext.Posts.findByIdAndUpdate(postId, body, { new: true })

  }



  async delete(postId, currentUserLoggedIn) {
    let exists = await this.findById(postId)

    if (!exists) {
      throw new BadRequest("Not a valid id")
    }

    let creatorId = exists._doc.creatorId

    if (creatorId != currentUserLoggedIn) {
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
}

export const postService = new PostService()