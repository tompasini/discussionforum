import express, { raw } from "express"
import BaseController from "../utils/BaseController"
import { commentService } from "../services/CommentService"
import { Auth0Provider } from "@bcwdev/auth0provider"


export class CommentController extends BaseController {
  constructor() {
    super("api/comments")
    this.router
      .get('', this.getAll)
      .get('/:postId/comments', this.getAllCommentsOnPost)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .put('/:commentId', this.edit)
      .put('/:commentId/upvote', this.upVote)
      .put('/:commentId/downvote', this.downVote)
      .delete('/:commentId', this.delete)
  }
  async getAllCommentsOnPost(req, res, next) {
    try {
      res.send(await commentService.getAllCommentsOnPost(req.params.postId))
    } catch (error) {
      next(error)
    }
  }
  async downVote(req, res, next) {
    try {
      let currentUserLoggedIn = req.userInfo.id
      res.send(await commentService.downVote(req.params.commentId, req.body, currentUserLoggedIn))
    } catch (error) {
      next(error)
    }
  }

  async upVote(req, res, next) {
    try {
      let currentUserLoggedIn = req.userInfo.id
      res.send(await commentService.upVote(req.params.commentId, req.body, currentUserLoggedIn))
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    try {
      let currentUserLoggedIn = req.userInfo.id
      res.send(await commentService.delete(req.params.commentId, currentUserLoggedIn))
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      let currentUserLoggedIn = req.userInfo.id
      res.send(await commentService.edit(req.params.commentId, req.body, currentUserLoggedIn))
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      res.send(await commentService.create(req.body))
    } catch (error) {
      next(error)
    }
  }
  async getAll(req, res, next) {
    try {
      res.send(await commentService.getAll())
    } catch (error) {
      next(error)
    }
  }
}