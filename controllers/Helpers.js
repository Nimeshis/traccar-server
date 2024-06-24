const jwt = require("jsonwebtoken");

function isAuthenticated(req, res, next) {
 try {
  let token = req.get("authorization");
  if (!token){
   return res.status(404).json({ success: false, msg: "Token not found" });
  }
 token = token.split(" ")[1];
 const decoded = jwt.verify(token, "Access_is_done");
 req.email = decoded.email;
 req.username = decoded.username;
 next();
} catch (error) {
return res.status(401).json({ success: false, msg: error.message });
// console.error(error);
}
}

// Function to verify if a refresh token is valid
function verifyRefresh(email, token) {
    try {
        // Add additional verification logic if needed
        return jwt.verify(token, "Refresh_is_done").email === email;
    } catch (error) {
        return false;
    }
}

   const blacklistedTokens = {
    accessTokens: new Set(),
    refreshTokens: new Set()
};

   function isTokenBlacklisted(req, res, next) {
    let token1,token2;
    
    // Check if the request contains an access token or a refresh token
    if (req.headers.authorization) {
        token1 = req.headers.authorization.split(" ")[1]; 
        // console.log(token1);
    } else if (req.body.refreshToken) {
        token2 = req.body.refreshToken; 
        // console.log(token2);
    } else {
        // No token found in the request
        console.log("No token found in the request");
        return res.status(401).json({ success: false, error: 'Token not found in the request' });
    }

    // console log blacklisted 
    // console.log("Access Tokens:", blacklistedTokens.accessTokens);
    // console.log("Refresh Tokens:", blacklistedTokens.refreshTokens);

    // Check if the token is blacklisted
    if (blacklistedTokens.accessTokens.has(token1) || blacklistedTokens.refreshTokens.has(token2)) {
        console.log("Token invalidated:", token1);
        console.log("Token invalidated:", token2);
        return res.status(401).json({ success: false, error: 'Token has been invalidated' });
    }
    next();
}

module.exports = { isAuthenticated, verifyRefresh, blacklistedTokens, isTokenBlacklisted};