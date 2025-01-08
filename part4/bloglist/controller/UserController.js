const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../model/User');
const middleware = require("../utils/middleware");

userRouter.get('/', async (req, res) => {
    const users = await User.find({})
        .populate('blogs')

    res.json(users);
})

userRouter.post('/', async (req, res) => {
    const {username, name, password} = req.body

    if (password.length < 3 || !password) {
        return res.status(400)
            .send({
                error: "Password must be at least 3 characters"
            })
    }

    const saltRounds = 10;
    const hash = bcrypt.hashSync(password, saltRounds)

    const user = new User({
        username,
        name,
        hash
    })

    const savedUser = await user.save()
    res.status(201).json(savedUser)
})

module.exports = userRouter