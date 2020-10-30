import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId

const Comment = new Schema(
  {
    comment: { type: String, required: true },
    upVote: { type: Number, required: true, default: 0 },
    downVote: { type: Number, required: true, default: 0 },
    imgUrl: { type: String, required: false },
    post: { type: ObjectId, ref: "Post", required: true },
    creatorId: { type: String, required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

Comment.virtual("creator", {
  localField: "creatorId",
  ref: "Profile",
  foreignField: "_id",
  justOne: true
});

export default Comment;