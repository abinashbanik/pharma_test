const prisma = require("../prisma/index")
const jwt = require("jsonwebtoken")

const isLoggedIn = async (req, res, next) => { //every middleware need to have "next"
    try {
        const token = req.cookies.token
        if (!token) {
            res.send("Please login")
            throw new Error("You are not logged in")//send a response & close next
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET) //gives value of true / false
        req.user = await prisma.user.findUnique({ //find if userExists
            where: {
                id: decoded.userId
            }
        })
        next()

    } catch (error) {
        throw new Error(error)
    }
}

module.exports = isLoggedIn