const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body

    const saltRounds = 11
    const passwordHash = await bcrypt.hash(password, saltRounds)

    if (!username || username.length < 3) {
        return response.status(400).json({ error: "Username missing or shorter than 3 symbols" })
    } else if (!password || password.length < 3) {
        return response.status(400).json({ error: "Password missing or shorter than 3 symbols" })
    }

    const user = new User({
        username,
        name,
        passwordHash
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)
})

usersRouter.get('/', async (request, response) => {
    const users = await User.find({})
    if (users) {
        response.status(200).json(users)
    } else {
        response.status(500)
    }
})

module.exports = usersRouter