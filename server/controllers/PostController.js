import express, { raw } from "express"
import BaseController from "../utils/BaseController"
import { postService } from "../services/PostService"
import { Auth0Provider } from "@bcwdev/auth0provider"


export class PostController extends BaseController {
  constructor() {
    super("api/posts")
    this.router
      .get('', this.getAll)
      .get('/:postId', this.getOne)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .put('/:postId', this.edit)
      .put('/:postId/upvote', this.upVote)
      .put('/:postId/downvote', this.downVote)
      .delete('/:postId', this.delete)
      .delete('/removevote/:voteId', this.deletePostVote)
  }
  async deletePostVote(req, res, next) {
    try {
      let currentUserLoggedIn = req.userInfo.id
      res.send(await postService.deleteVote(req.params.voteId, currentUserLoggedIn))
    } catch (error) {
      next(error)
    }
  }
  async getOne(req, res, next) {
    try {
      res.send(await postService.findById(req.params.postId))
    } catch (error) {
      next(error)
    }
  }
  async downVote(req, res, next) {
    try {
      let currentUserLoggedIn = req.userInfo.id
      res.send(await postService.downVote(req.params.postId, req.body, currentUserLoggedIn))
    } catch (error) {
      next(error)
    }
  }

  async upVote(req, res, next) {
    try {
      let currentUserLoggedIn = req.userInfo.id
      res.send(await postService.upVote(req.params.postId, req.body, currentUserLoggedIn))
    } catch (error) {
      next(error)
    }
  }


  async delete(req, res, next) {
    try {
      let currentUserLoggedIn = req.userInfo.id
      res.send(await postService.delete(req.params.postId, currentUserLoggedIn))
    } catch (error) {
      next(error)
    }
  }
  async edit(req, res, next) {
    try {
      let currentUserLoggedIn = req.userInfo.id
      res.send(await postService.edit(req.params.postId, req.body, currentUserLoggedIn))
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    //TODO Need to include username in post. Or just do this in front-end.
    try {
      req.body.creatorId = req.userInfo.id
      res.send(await postService.create(req.body))
    } catch (error) {
      next(error)
    }
  }
  async getAll(req, res, next) {
    try {
      res.send(await postService.getAll())
    } catch (error) {
      next(error)
    }
  }
}