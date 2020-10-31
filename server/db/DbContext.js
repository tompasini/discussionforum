import mongoose from "mongoose";
import ValueSchema from "../models/Value";
import ProfileSchema from "../models/Profile";
import PostSchema from "../models/Post"
import CommentSchema from "../models/Comment"
import PostVoteSchema from "../models/PostVote"

class DbContext {
  Profile = mongoose.model("Profiles", ProfileSchema);

  Posts = mongoose.model("Posts", PostSchema);

  Comments = mongoose.model("Comments", CommentSchema)

  PostVotes = mongoose.model("PostVotes", PostVoteSchema)
}

export const dbContext = new DbContext();
