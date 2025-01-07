const Blog = require("../model/blog");

const bootstrapBlogs = [
    {
        "title": "Jutta di Torr",
        "author": "bob jutt",
        "url": "www.blog.com",
        "likes": 12
    },
    {
        "title": "Sultan Peer",
        "author": "pabba jutt",
        "url": "www.bablu.com",
        "likes": 24
    }
]

const nonExistingId = async () => {
    const blog = new Blog({"title": "TEST NOTE"})
    await blog.save()
    await blog.deleteOne()

    return blog._id.toString()
}

const blogInDatabase = async () => {
    const blogs = await Blog.find({})

    return blogs.map((blog) => blog.toJSON())
}

module.exports = {
    bootstrapBlogs, blogInDatabase, nonExistingId
}