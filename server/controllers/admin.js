const experss = require('express')
const adminroutes = experss.Router();
const jwt = require('jsonwebtoken');
const { Admin , User} = require('../dbconfig/userSchema');



adminroutes.post('/register', async (req, res) => {
    const { name, email, password } = req.body
    try {
        if ( !name && !email && !password) {
            res.send('Enter Your Credentials')
            return;
        }
        const adminExist = await Admin.findOne({ email });
        if (adminExist) {
            res.send('Admin already exist');
            return;
        }

        const newAdmin = new Admin({
            name: name,
            email: email,
            password: password
        })

        const saveAdmin = await newAdmin.save();
        res.status(200).send(saveAdmin);

    } catch (err) {
        console.log(err);
        res.status(400).send('enter email or password')
    }
})


adminroutes.post('/login', async (req, res) => {
    const { email , password } = req.body;
   
    try {
        if (!email && !password) {
            res.send("invalid Email")
            return;
        }
        const admin = await Admin.findOne({ email  , password})
        if (!admin) {
            res.status(404).json({ message: 'Email not found' });
            return;
        }
        if (admin) {
            const token = generateAccessToken({ email: email })
            res.status(200).send(token)
            return;     
        }
    } catch (error) {
        res.status(401).json(error ,{ message: 'Invalid Email & Password' })
    }

})


adminroutes.get('/allusers' , async(req, res) => {
    try {
        const getAllUsers = await User.find({})
        res.status(200).send(getAllUsers);
    } catch (error) {
        res.status(404).json({ message : 'No Users Found'})   
    }

})



function generateAccessToken(email) {
    return jwt.sign(email, process.env.TOKEN_SECRET, { expiresIn: '15m' })
}

module.exports = adminroutes;