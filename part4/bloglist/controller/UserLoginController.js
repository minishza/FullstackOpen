const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const loginRouter = require('express').Router()
const User = require('../model/User');

loginRouter.post('/', async (req, res) => {
    const {username, password} = req.body;

    console.log(username, password);

    const user = await User.findOne({username})

    const passwordMatch = user === null
        ? false
        : await bcrypt.compare(password, user.password)

    if (!(user && passwordMatch)) {
        return res.status(401).json({
            error: 'invalid username or password'
        })
    }

    const userForToken = {
        username: username,
        id: user._id,
    }

    const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: 60*60 })

    res
        .status(200)
        .send({
            token,
            username: user.username,
            name: user.name,
        })
})

module.exports = loginRouter