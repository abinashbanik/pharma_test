const getJwtToken = require("../helpers/getJwtToken")


const cookieToken = (user, res) => {
    const token = getJwtToken(user.id);
    const options = {
        expires: new Date(
            Date.now() + 3 * 24 * 60 * 60 * 1000 //cookie valid for 3 days
        ),
        httpOnly: true  //the cookie can only be manipulated by server, can't be by user
    }
    user.password = undefined;  //to prevent password from going to user as cookie
    res.status(200).cookie("token", token, options).json({  //json response 
        success: true,          // for frontend
        token,
        user
    })
}

module.exports = cookieToken;