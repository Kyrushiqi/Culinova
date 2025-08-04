const User = require('../models/user')

const test = (req, res) => {
    res.json('test is working');
}

const registerUser = async (req, res) => {
    try {
        const {username, email, password} = req.body;
        //Checks if username was entered
        if (!username) {
            return res.json({
                error: 'username is required'
            })
        };
        //Check if password is good
        if (!password || password < 6){
            return res.json({
                error: 'Password is required and should be at least 6 characters long'
            })
        };
        const exist = await User.findOne({email});
        if (exist) {
            return res.json({
                error: 'Email is taken already'
            })
        }
        const user = await User.create({
            username, email, password
        })

        return res.json(user)
    } catch (error) {
        console.log(error)
    }
};

module.exports = {
    test,
    registerUser
}