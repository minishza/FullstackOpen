const blogRouter = require('express').Router()
const Blog = require('../model/Blog');
const User = require('../model/User');
const jwt = require('jsonwebtoken');
const middleware = require("../utils/middleware");

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
        .populate('user', {username: 1, name: 1})

    response.json(blogs)
})

blogRouter.post('/', middleware.extractToken,async (request, response) => {
    const body = request.body;
    const user = await User.findById(request.token)

    if(!body.title || !body.url) {
        response.status(400).send({})
    }

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id
    })

    const blogSaved = await blog.save()
    user.blogs = user.blogs.concat(blogSaved._id)
    await user.save()

    response.status(201).json(blogSaved)
})

blogRouter.put('/:id', middleware.extractToken,async (request, response) => {
    const body = request.body;

    if(!body.title || !body.url) {
        response.status(400).send({})
    }

    const updatedBlog = new Blog({
        _id: request.params.id,
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    })

    const updated = await Blog.findByIdAndUpdate(request.params.id, updatedBlog, { new: true })
    response.status(200).json(updated)
})

blogRouter.delete('/:id', middleware.extractToken,async (request, response) => {
    const blog = await Blog.findById(request.params.id)
})

module.exports = blogRouter;