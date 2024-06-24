const express = require("express");
const router = express.Router();
const LoginModel = require("../models/LoginModel");
const bodyParser = require("body-parser");

router.use(bodyParser.json());

// Sign Up
router.get("/register", (req, res) => {
    res.send(`Signup Form`);
});


router.post("/register", async (req, res) => {
    try {    
        const { name,email,password,confirmPassword} = req.body;

        // Check if username is null or empty
        if (!name) {
            return res.status(400).json({ error: 'Please fill in username' });
        }

        // Check if email is null or empty
        if (!email || email.trim() === '') {
            return res.status(400).json({ error: 'Please provide a valid email address' });
        }

         // Check if the email is from Gmail
        const gmailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gm;
        if (!gmailRegex.test(email)) {
            return res.status(400).json({ error: 'Please provide a valid email address' });
        }

        // Check if password is null or empty
        if (!password) {
            return res.status(400).json({ error: 'Please fill in password fields' });
        }

        // Check if confirmPassword is null or empty
        if (!confirmPassword) {
            return res.status(400).json({ error: 'Please fill in confirm password fields' });
        }

        // Check if password and confirm password match
        if (password !== confirmPassword) {
            return res.status(400).json({ error: 'Passwords do not match' }); 
        }



        // Check if the email is already in use
        const existingEmail = await UserModel.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        let counter = await CounterModel.findOneAndUpdate(
            { _id: 'UserId' },
            { $inc: { sequence_value: 1 } },
            { new: true, upsert: true }
        );

        // Create a new user
        const newUser = new LoginModel({ 
            id: counter.sequence_value, // Assigning the id here 
            email, 
            password
        });
        await newUser.save();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});



// POST route to add a user
router.post('/settings/users', async (req, res) => {
    try {
        let counter = await CounterModel.findOneAndUpdate(
            { _id: 'AddedUserId' },
            { $inc: { sequence_value: 1 } },
            { new: true, upsert: true }
          );
        // Extract data from the request body
        const { name, email, phone, admin, disabled, expiration } = req.body;


        // Create a new user document
        const newUser = new AddUserModel({
            id :counter.sequence_value,
            name,
            email,
            phone,
            admin,
            disabled,
            expiration
        });

        // Save the new user document to the database
        await newUser.save();


       // Send success response with JWT token
       res.status(201).json({ message: 'User added successfully', newUser });

    } catch (error) {
        // Handle errors
        console.error('Error adding user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

    


router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await UserModel.findOne({ email });

        // Check if user exists
        if (!user) {
            return res.status(404).json({ error: 'Please enter valid email' });
        }


        if (user.password !== password) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // If password matches, generate JWT token
        const accessToken = jwt.sign({ username: user.username, email: user.email }, 'Access_is_done', { expiresIn: '1hr' });

        const refreshToken = jwt.sign({ username: user.username, email: user.email }, 'Refresh_is_done', { expiresIn: '2hr' });

        return res.status(200).json({
            xn: {
                message: 'Login successful',
                success: true,
                 accessToken: accessToken, refreshToken: refreshToken 
            }
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});




router.get("/reset-password", (req, res) => {
    res.send(`Reset Password`);
});

// POST route to reset password
router.post('/reset-password', async (req, res) => {
    const { email } = req.body;
  
    // Check if the user exists
    try {
        const gmailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gm;
        if (!gmailRegex.test(email)) {
             console.log('Please provide a valid email address' );
        }
  
      // Send response indicating success
      res.status(200).json({ message: 'Check your email' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });



router.post("/logout", async (req, res) => {
    try {
        const { accessToken, refreshToken,companyToken  } = req.body;

        // Check if access token is provided
        if (!accessToken) {
            return res.status(400).json({ error: 'Access token is required' });
        }

        // Verify the access token
        const decodedAccessToken = jwt.verify(accessToken, 'Access_is_done');
        const email = decodedAccessToken.email;

        // Blacklist the access token
        blacklistedTokens.accessTokens.add(accessToken);

        // Logging to double-check
        // console.log("Access Token blacklisted:", accessToken);

        // Check if refresh token is provided
        if (refreshToken) {
            // Verify the refresh token
            const decodedRefreshToken = jwt.verify(refreshToken, 'Refresh_is_done');

            if (decodedRefreshToken.email !== email) {
                return res.status(401).json({ error: 'Invalid refresh token for this user' });
            }

            // Blacklist the refresh token
            blacklistedTokens.refreshTokens.add(refreshToken);
            // console.log("Refresh Token blacklisted:", refreshToken);
        }

        if (!companyToken) {
            return res.status(400).json({ error: 'Company token is required' });
        }
    
        // Verify the company token
        const decodedCompanyToken = jwt.verify(companyToken, 'add_user_key');
        const company_id = decodedCompanyToken.company_id;
    
        // Blacklist the company token
        blacklistedTokens.accessTokens.add(companyToken);


        console.log("Logout successful");
        console.log("Access Tokens:", blacklistedTokens.accessTokens);
        console.log("Refresh Tokens:", blacklistedTokens.refreshTokens);
        // console.log("Company Tokens:", blacklistedTokens.companyTokens);
    
        return res.status(200).json({ message: 'Logout successful' });
        
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});



const {isTokenBlacklisted } = require("../controllers/Helpers")
const { isAuthenticated } = require("../controllers/Helpers")

router.get("/",isTokenBlacklisted, isAuthenticated, (req, res) => {
console.log(Successful);
});

  
  
const { verifyRefresh } = require("../controllers/Helpers")
router.post("/refresh",isTokenBlacklisted, async (req, res) => {
        try {
            const { email, refreshToken } = req.body;
    
            // Verify refresh token
            const isValid = verifyRefresh(email, refreshToken);
    
            if (!isValid) {
                return res.status(401).json({ success: false, error: "Invalid token, try logging in again" });
            }
    
            // Fetch user information using userId
            const user = await UserModel.findOne({ email: email });// Assuming you're using Mongoose
    
            if (!user) {
                console.error(`User not found for email: ${email}`);
                return res.status(404).json({ success: false, error: "User not found" });
            }
            // Generate new access token
            const accessToken = jwt.sign({username:user.username,email: user.email}, 'Access_is_done', { expiresIn: '3m' });
            return res.status(200).json({ success: true, accessToken });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ success: false, error: "Internal Server Error" });
        }
    });






 module.exports = router;

