const { test, after, beforeEach, describe, afterEach } = require('node:test')
const assert = require('node:assert')
const {agent} = require('supertest')
const app = require('../app')
const bcrypt = require('bcryptjs')
const api = agent(app)

const mongoose = require('mongoose')
const bootstrap = require('../test/test_helper')
const Blog = require('../model/Blog')
const User = require('../model/User')


describe('when initial blogs saved', () => {
    beforeEach(async () => {
        await Blog.deleteMany({})
        await Blog.insertMany(bootstrap.blogs)
    })

    test('blogs returned as json', async () => {
        api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('all blogs are returned', async () => {
        const blogs = await api.get('/api/blogs')

        assert.strictEqual(blogs.body.length, bootstrap.blogs.length)
    })

    describe('when new blog is saved', () => {
        test('blog saved with validated data and id', async () => {
            const newBlog = {
                title: 'New Blog',
                author: 'Test Author',
                url: 'www.test.com',
                likes: 10,
            }

            await api
                .post('/api/blogs')
                .send(newBlog)
                .expect(201)
                .expect('Content-Type', /application\/json/)

            const blogAfterPersistence = await bootstrap.blogInDatabase()
            assert.strictEqual(blogAfterPersistence.length, bootstrap.blogs.length + 1)

            assert(blogAfterPersistence[0].id) // check if id is formatted correctly

            const blogs = blogAfterPersistence.map(blog => blog.author)
            assert(blogs.includes('Test Author'))
        })

        test('blog likes variable missing', async () => {
            const blogWithNoLikes = {
                title: 'New Blog',
                author: 'Mama',
                url: 'www.papa.com'
            }

            await api
                .post('/api/blogs')
                .send(blogWithNoLikes)
                .expect(201)
                .expect('Content-Type', /application\/json/)

            const blogAfterPersistence = await bootstrap.blogInDatabase()
            const blog = blogAfterPersistence[blogAfterPersistence.length-1]
            assert.strictEqual(blog.likes, 0)
        })

        test('blog url and title missing', async () => {
            const blogWithNoUrlAndTitle = {
                author: 'Test Author',
                likes: 10,
            }

            await api
                .post('/api/blogs')
                .send(blogWithNoUrlAndTitle)
                .expect(400)
        })

    });
    describe('when existing blog is updated', () => {
        test('blog updated', async () => {
            const blogs = await api.get('/api/blogs')

            const blog = blogs.body[0]
            const expectedLikes = 100

            const updated = {
                title: blog.title,
                author: blog.author,
                url: blog.url,
                likes: expectedLikes,
            }

            const updatedBlog = await api
                .put(`/api/blogs/${blog.id}`)
                .send(updated)
                .expect(200)

            assert.strictEqual(updatedBlog.body.likes, expectedLikes)
        })
    });

})
describe('when initial user is one', () => {
    beforeEach(async () => {
        await User.deleteMany({})
        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({
            username: 'root',
            passwordHash
        })

        await user.save()
    })

    test('all user fetched', async () => {
        const users = await api
            .get('/api/users')
            .expect('Content-Type', /application\/json/)

        assert.strictEqual(users.body.length, 1)
    })

    test('user fetched by username', async () => {
        const user = await User.findOne({username: 'root'})

        assert.strictEqual(user.username, "root")
    })

    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await bootstrap.userInDatabase()

        const newUser = {
            username: 'admin',
            name: 'test admin',
            password: 'password',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await bootstrap.userInDatabase()
        assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        assert(usernames.includes(newUser.username))
    })

    test('creation succeeds with no password', async () => {
        const newUser = {
            username: 'boundToFail',
            name: 'failed',
            password: ''
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
    })
})

after(async () => {
    await mongoose.connection.close()
})