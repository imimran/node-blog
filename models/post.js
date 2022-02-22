import mongoose, { Schema } from "mongoose";

//post model
const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    authorId: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "categories",
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("posts", PostSchema);

export default Post;
