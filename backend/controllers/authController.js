const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Description : to register a new user
// Route : POST/api/auth/register
exports.registerUser = async (req,res) => {
    try{
        const {username,password} = req.body;

        // once check if the user already by its username exists or not 
        const existingUser = await User.findOne({username});
        if(existingUser){
            return res.status(400).json({message:"sory but username already taken "})
        }

        // hash the password for security
        const hashedPassword = await bcrypt.hash(password,10);
        // now create the user with username and hashed password
        const user = await User.create({username, password: hashedPassword})
        // Return success (we’ll send token in login route)
        res.status(201).json({message : "user created successfully bro"})

    }catch(err){
        res.status(500).json({message:"server error bhai",error:err.message})
    }

}

    // Description : to login as user
    // Route : POST /api/auth/login
    exports.loginUser = async (req,res) => {
        try {
            const {username , password} = req.body;

            // check if the user exits by the recieved username
            const user = await User.findOne({username})
            if(!user){
               return res.status(400).json({message : "invalid username or password"});
            }

            // if user exits compare the password 
            const isMatch = await bcrypt.compare(password,user.password)
            if(!isMatch){
                return res.status(400).json({message : "invalid password or username"});
            }

            // sign the jwt token 
            const token = jwt.sign({id:user._id}, process.env.JWT_SECRET,{expiresIn:'5d'});
            res.status(200).json({ token, username: user.username });
            
        } catch (err) {
            res.status(500).json({message:"server error h kuch",error:err.message});
        }

    }

