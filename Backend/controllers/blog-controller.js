const Blog = require('../models/Blog');
const User = require('../models/User');
const mongoose = require('mongoose');

module.exports.getAllBlogs = async(req, res, next) => {
    let blogs;
    try{
        blogs = await Blog.find();
    }catch(err) {
        console.log(err);
    }
    if(!blogs) {
        return res.status(404).json({message: 'No blogs found!'});
    }
    return res.status(200).json({blogs: blogs});
}

module.exports.postBlog = async(req, res, next)=> {
    const {title, description, image, user} = req.body;
    let existingUser;
    try{
        existingUser = await User.findById(user);
    }catch(err) {
        return console.log(err);
    }
    if(!existingUser) {
        return res.status(400).json('User with given id does not exist!');
    }
    const blog = new Blog({
        title: title,
        description: description,
        image: image,
        user: user
    })

    try{
        await blog.save();
        existingUser.blogs.push(blog);
        await existingUser.save();
    }catch(err) {
        console.log(err);
        return res.status(500).json({message: 'Could not create blog!'});
    }

    return res.status(201).json({message: 'New blog created!', blog: blog});

}

module.exports.updateBlog = async(req, res, next)=> {
    const {title, description} = req.body;
    const blogId = req.params.id;

    let blog;
    try{
        blog = await Blog.findByIdAndUpdate(blogId, {
            title: title,
            description: description
        })
    }catch(err) {
        return console.log(err);
    }
    if(!blog) {
        return res.status(500).json({message: 'Could not update blog'});
    }

    return res.status(200).json({message: 'Blog updated successfully'});

}

module.exports.getById = async(req, res, next) => {
    const blogId = req.params.id;
    let blog;
    try{
        blog = await Blog.findById(blogId);
    }catch(err) {
        return console.log(err);
    }
    if(!blog) {
        return res.status(404).json({message: 'Blog with given id does not exist'});
    }
    return res.status(200).json({blog: blog});
}

module.exports.deleteBlog = async(req, res, next) => {
    const blogId = req.params.id;
    let blog;
    try {
        blog = await Blog.findByIdAndDelete(blogId).populate('user');
        if(!blog) {
            return res.status(404).json({message: 'Blog with given id does not exist'});
        }
        await blog.user.blogs.pull(blog);
        await blog.user.save();
    }catch(err) {
        return console.log(err);
    }
    if(!blog) {
        return res.status(500).json({message: 'Could not delete blog'});
    }
    return res.status(200).json({message: 'Blog deleted successfully!'});
}