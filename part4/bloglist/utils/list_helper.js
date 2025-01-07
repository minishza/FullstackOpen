const _ = require('lodash')

const dummy = (blogs) => {

    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item.likes
    }

    return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    const highest = blogs.map(blog => blog.likes).toSorted((a, b) => a - b).reverse()[0]
    return blogs.filter(blog => blog.likes === highest)[0]
}

const mostBlogs = (blogList) => {
    const authors = _.countBy(blogList, blog => blog.author)
    const author = _.findLastKey(authors)
    const blogs = authors[author]

    return {author, blogs}
}

const mostLikes = (blogList) => {
    const authors = [..._.reduce(blogList,(result, author) =>
            result.set(author.author, ((result.get(author.author) + author.likes) || author.likes)), new Map()).entries()]
        .sort((a, b) => b[1] - a[1]);

    const highest = authors[0];
    return {
        author: highest[0],
        likes: highest[1],
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}