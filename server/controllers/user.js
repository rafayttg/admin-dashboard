const experss = require('express')
const userroutes = experss.Router();
const jwt = require('jsonwebtoken');
const { User } = require('../dbconfig/userSchema');
const uTodo = require('./todo')


userroutes.post('/register', async (req, res) => {
    const { name, email, password } = req.body
    try {
        if ( !name && !email && !password) {
            res.status(401).send('Enter Your Credentials')
        }
        const userExist = await User.findOne({ email })
        if (userExist) {
            res.send('User already exist');
            return;
        }

        const newUser = new User({
            name: name,
            email: email,
            password: password
        })

        const saveUser = await newUser.save()
        res.status(200).send(saveUser);

    } catch (err) {
        console.log(err);
    }

})



userroutes.post('/login', async (req, res) => {
    const { email ,password } = req.body;
    try {
        const user = await User.findOne({ email ,password})
        if (!user) {
            res.status(404).json({ message: 'Email not found' });
            return;
        }
        if (user) {
            const token = generateAccessToken({ email: email })
            res.status(200).send(token)
            return;
        }
    } catch (error) {

        res.status(401).json({ message: 'Invalid Email & Password' })
    }

})

userroutes.use('/todo', uTodo);

function generateAccessToken(email) {
    return jwt.sign(email, process.env.TOKEN_SECRET, { expiresIn: '15m' })
}

module.exports = userroutes