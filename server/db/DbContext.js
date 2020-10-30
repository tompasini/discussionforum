import mongoose from "mongoose";
import ValueSchema from "../models/Value";
import ProfileSchema from "../models/Profile";
import PostSchema from "../models/Post"
import CommentSchema from "../models/Comment"

class DbContext {
  Values = mongoose.model("Value", ValueSchema);
  Profile = mongoose.model("Profiles", ProfileSchema);

  Posts = mongoose.model("Posts", PostSchema);

  Comments = mongoose.model("Comments", CommentSchema)
}

export const dbContext = new DbContext();
