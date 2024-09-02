const User = require('../models/User');
const bcrypt = require('bcryptjs');

module.exports.getAllUsers = async(req, res, next) => {
    let users;
    try{
        users = await User.find();
    }catch(err) {
        console.log(err);
    }

    if(!users) {
        return res.status(404).json({message: "No users found!"});
    }
    return res.status(200).json({users:users});
}

module.exports.postSignup = async(req, res, next) => {
    const {username, email, password} = req.body;
    let existingUser;
    try{
        existingUser = await User.findOne({email});
    }catch(err) {
        console.log(err);
    }

    if(existingUser) {
        return res.status(400).json({message: 'User already exists'});
    }
    const hashedPassword = bcrypt.hashSync(password);
    const user = new User({
        username: username,
        email: email,
        password: hashedPassword,
        blogs: []
    })
    user.save()
    .then(() => {
        return res.status(201).json({message: 'User signed in!', user: user});
    })
}

module.exports.postLogin = async(req, res, next) => {
    const {email, password} = req.body;
    let existingUser;
    try{
        existingUser = await User.findOne({email});
    }catch(err) {
        console.log(err);
    }

    if(!existingUser) {
        return res.status(404).json({message: 'User does not exist'});
    }
    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
    if(!isPasswordCorrect) {
        return res.status(400).json({message: 'Incorrect Password!'});
    }
    return res.status(200).json({message: 'Login Successful'});
    
}