const Blog = require("../model/Blog");
const User = require("../model/User");

const blogs = [
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

const userInDatabase = async () => {
    const users = await User.find({})

    return users.map((u) => u.toJSON())
}

module.exports = {
     blogs, blogInDatabase, nonExistingId, userInDatabase
}