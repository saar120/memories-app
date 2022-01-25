import e from "express";
import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();
    res.status(200).json(postMessages);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const createPost = async (req, res) => {
  try {
    const post = req.body;
    const newPost = new PostMessage(post);
    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

export const updatePost = async (req, res) => {
  try {
    const { id: _id } = req.params;
    const post = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      throw new Error({ message: "Invalid Id", code: 404 });
    }
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, { new: true, runValidators: true });
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(err.code || 500).json({ message: err.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { id: _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      throw new Error({ message: "Invalid Id", code: 404 });
    }
    await PostMessage.findByIdAndRemove(_id);
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(err.code || 500).json({ message: err.message });
  }
};

export const likePost = async (req, res) => {
  try {
    const { id } = req.params;

    if (!req.userId) {
      throw new Error({ message: "Unauthenticated", code: 403 });
    }

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      throw new Error({ message: "Invalid Id", code: 404 });
    }
    const post = await PostMessage.findById(id);

    const index = post.likes.findIndex((id) => id === String(req.userId));

    if (index === -1) {
      // if user didnt like it yet - add his like to the likes array
      post.likes.push(req.userId);
    } else {
      // if user did like - remove his like
      post.likes.filter((id) => id !== String(req.userId));
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true, runValidators: true });
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(error.code || 500).json({ message: error.message });
  }
};
