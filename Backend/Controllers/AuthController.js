// Importing necessary modules and models
const User = require("../model/UserModel");
const { check, validationResult } = require("express-validator");
const jwtToken = require('jsonwebtoken');
const { expressjwt: jwt } = require("express-jwt");

// SIGNUP: Registering a new user
exports.signup = (req, res) => {
    // Validate user input using express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg,
        });
    }
    // Creating a new user instance and saving it to the database
    const user = new User(req.body);
    user.save()
        .then(user => {
            res.json({
                id: user._id,
                name: user.name,
                email: user.email,
            });
        })
        .catch(err => {
            let errorMessage = 'Something went wrong.';
            if (err.code === 11000) {
                errorMessage = 'User already exists, please signin'; 
            }
            return res.status(500).json({ error: errorMessage });
        });
};
// SIGNIN: Authenticating existing user
exports.signin = async (req, res) => {
    // Validate user input using express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg,
        });
    }
    // Checking user credentials and generating JWT token for authentication
    const { email, password } = req.body;
    await User.findOne({ email: `${email}` })
        .then(user => {
            if (!user) {
                return res.status(400).json({
                    error: "User not found"
                });
            }
            if (!user.authenticate(password)) {
                return res.status(401).json({
                    error: "Email or Password does not exist"
                });
            }
            // Setting JWT token as a cookie in the browser
            const token = jwtToken.sign({ _id: user._id }, 'shhhhh');
            res.cookie("token", token, { expire: new Date() + 9999 });
            const { _id, name, email } = user;
            return res.json({ token, user: { _id, name, email } });
        });
};
// SIGNOUT: Clearing user token
exports.signout = (req, res) => {
    res.clearCookie("token");
    res.json({
        message: "User has signed out"
    });
};
// Protected Routes
exports.isSignedIn = jwt({
    secret: 'shhhhh',
    userProperty: "auth",
    algorithms: ['HS256']
});
exports.isAuthenticated = (req, res, next) => {
    let checker = req.profile && req.auth && req.profile._id == req.auth._id;
    if (!checker) {
        return res.status(403).json({
            error: "ACCESS DENIED"
        });
    }
    next();
};