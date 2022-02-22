import Post from "../models/post";
import Category from "../models/category";
import { authUser } from "../middlewares/auth";
import moment from "moment";
//get all post
const getAllPost = async (req, res) => {
  const posts = await Post.find({})
    .populate("authorId", "username")
    .populate("category", "name");

  return res.json(posts);
};

const getSinglePost = async (req, res) => {
  const postId = req.params.postId;
  const foundPost = await Post.findOne({ _id: postId })
    .populate("authorId", "username")
    .populate("category", "name");

  if (!foundPost) {
    return res.json({ msg: "No Post Found" });
  }
  return res.json(foundPost);
};

const allPostWithPagination = async (req, res) => {
  const perPage = 2;
  let page = parseInt(req.query.page) || 0;

  const countPost = await Post.count();

  const allPost = await Post.find()
    .limit(perPage)
    .skip(perPage * page)
    .sort("-createdAt")
    .populate("authorId", "username")
    .populate("category", "name");

  return res.status(200).json({
    posts: allPost,
    page: page,
    pages: Math.ceil(countPost / perPage),
  });
};

const getPostByCategory = async (req, res) => {
  let category = req.params.categoryId;

  const findCategory = await Category.findOne({ _id: category });
  // return res.status(200).json(findCategory)
  const searchData = await Post.find({
    category: findCategory._id,
  });

  const countSearchData = await Post.find({
    category: findCategory._id,
  }).count();

  return res.status(200).json({
    search_posts: searchData,
    total: countSearchData,
  });
};

const searchPost = async (req, res) => {
  let category = req.query.category;

  const start = new Date(req.query.start);
  const end = new Date(req.query.end);

  var isoStartDate = start.toISOString();
  const startDate = moment(isoStartDate)
    .format("YYYY-MM-DD h:mm:ss")
    .toString();
  var isoEndDate = end.toISOString();
  const endDate = moment(isoEndDate).format("YYYY-MM-DD h:mm:ss").toString();
  const findCategory = await Category.findOne({ name: category });

  const searchData = await Post.find({
    category: findCategory._id,
    createdAt: {
      $gt: startDate,
      $lt: endDate,
    },
  });

  return res.status(200).json({
    search_posts: searchData,
  });
};
//create post
const addPost = async (req, res) => {
  const data = req.body;
  const token = req.header("auth-token");
  let auth_user = await authUser(token);
  console.log("auth_user", auth_user);
  console.log("data", data);

  if (req.file) {
    console.log(req.file);
  }

  if (!req.file) {
    return res.status(404).json({ error: true, msg: "File not found." });
  }

  const file = req.file.filename;

  // create post
  const newPost = new Post({
    title: data.title,
    image: file,
    authorId: auth_user._id,
    category: data.category,
  });

  const post = await newPost.save();

  return res.status(201).json(post);
};

//update post by author
const updatePost = async (req, res) => {
  const data = req.body;
  const token = req.header("auth-token");
  let auth_user = await authUser(token);
  console.log("auth_user", auth_user._id);
  const postId = req.params.postId;

  //find post
  const foundPost = await Post.findOne({ _id: postId });

  if (!foundPost) {
    return res.json({ msg: "No Post Found" });
  }

  //find author
  const foundAuthorPost = await Post.findOne({ authorId: auth_user._id });

  if (!foundAuthorPost) {
    return res.json({ msg: "You do not have permission." });
  }

  const query = foundPost._id;
  if (req.file) {
    console.log(req.file);
  }

  if (!req.file) {
    return res.status(404).json({ error: true, msg: "File not found." });
  }

  const file = req.file.filename;

  const updateData = {
    title: file,
    image: data.image,
    category: data.category,
  };

  const options = { new: true, omitUndefined: true };
  const updatePost = await Post.findOneAndUpdate(query, updateData, options);
  return res.json({ msg: "Update Successfully", data: updatePost });
};

//delete post by author
const deletePost = async (req, res) => {
  const token = req.header("auth-token");
  let auth_user = await authUser(token);
  console.log("auth_user", auth_user._id);
  const postId = req.params.postId;

  const foundPost = await Post.findOne({ _id: postId });
  if (!foundPost) {
    return res.json({ msg: "No Post Found" });
  }

  //find author
  const foundAuthorPost = await Post.findOne({ authorId: auth_user._id });
  if (!foundAuthorPost) {
    return res.json({ msg: "You do not have permission." });
  }

  await Post.findByIdAndRemove({ _id: postId });

  return res.json({ msg: "Post Delete Successfuly" });
};

export default {
  getAllPost,
  addPost,
  updatePost,
  deletePost,
  allPostWithPagination,
  getSinglePost,
  searchPost,
  getPostByCategory,
};
