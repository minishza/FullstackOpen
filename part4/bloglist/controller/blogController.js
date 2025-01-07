const blogController = require('express').Router()
const Blog = require('../model/blog');

blogController.get('/', (request, response) => {
    Blog.find({})
        .then(blogs => {
            response
                .json(blogs)
        })
})

blogController.post('/', (request, response) => {
    const blog = new Blog(request.body)
    blog.save()
        .then(result => {
            response.status(201)
                .json(result)
        })
})

module.exports = blogController;