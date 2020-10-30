import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Post = new Schema(
  {
    title: { type: String, required: true },
    question: { type: String, required: true },
    upVote: { type: Number, required: true, default: 0 },
    downVote: { type: Number, required: true, default: 0 },
    imgUrl: { type: String, required: false },
    creatorId: { type: String, required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

Post.virtual("creator", {
  localField: "creatorId",
  ref: "Profile",
  foreignField: "_id",
  justOne: true
});

export default Post;