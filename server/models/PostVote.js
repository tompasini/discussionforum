import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId

const PostVote = new Schema(
  {
    user: { type: String, required: true },
    post: { type: ObjectId, ref: "Post", required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

PostVote.virtual("creator", {
  localField: "user",
  ref: "Profile",
  foreignField: "_id",
  justOne: true
});

export default PostVote;