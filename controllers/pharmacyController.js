// bring in prisma and cookie

const prisma = require('../prisma/index')
const cookieToken = require('../utils/cookieToken')


// user signup
exports.signup = async(req, res, next) => {
    try {
        const {namePharmacy, email, password,nameOwner,gstin,address} =  req.body
        //check
        if (!namePharmacy || !email || !password || !nameOwner || !gstin || !address) {
            throw new Error('please provide all fields')
        }
        const checkMail = await prisma.pharmacy.findUnique({
            where: {
                email
            }
        })
        //when there is no user
        if (checkMail) {
            res.json({ error: `Pharmacy already exists `, success: false })
        }
        const user = await prisma.pharmacy.create({
            data:{
                namePharmacy,
                email,
                password,
                nameOwner,
                gstin,
                address
            }
        })

        //send user a token
        cookieToken(user, res)

    } catch (error) {
        throw new Error(error)
    }
}


//login pharmacy
exports.login = async (req, res, next) => {
    try {
        //take info from user
        const { email, password } = req.body
        
        if (!email || !password) {
            //throw new Error("Please provide email & password")
            res.json({error: `Please provide email & password`})
        }
        //find a user based on email
        const user = await prisma.pharmacy.findUnique({
            where: {
                email
            }
        })
        //when there is no user
        if (!user) {
            //throw new Error ("User not found")
            res.json({error: `User not found !`})
        }

        //password mismatch
        if (user.password !== password) {
            //throw new Error ("password is incorrect  ! ")
            res.json({error: `Password is incorrect  !`})
        }

        //User is there and validated
        cookieToken(user, res)

    } catch (error) {
        throw new Error(error)
    }
}

//update an existing pharmacy
exports.updatePharmacy = async (req, res, next) => {
    const { id } = req.params;
    const { namePharmacy, password,address } = req.body;

    try {
        const result = await prisma.pharmacy.update({
            where: { id: id },//first id is the one we are looking for in the database
            data: {             // 2nd id is the one extracted from url
                namePharmacy,
                password,
                address,
            }
        });
        res.json(result)
    } catch (error) {
        res.json({error: `Pharmacy with ${id} does not exists `})
    }
}

//delete a Pharmacy
exports.deletePharmacy = async (req, res, next) => {
    const { id } = req.params
    try {
        const result = await prisma.pharmacy.delete({
            where: { id: id }
        });
        res.json(`Pharmacy with ${id}  has been deleted `)
    } catch (error) {
        res.json({error: `Pharmacy with ${id} does not exists `})
    }
}


//logout pharmacy
exports.logout = async (req, res, next) => {
    try {
        res.clearCookie("token") //clear the cookie whose name is token,  from the brower
        res.json({
            success: true
        })
    } catch (error) {
        throw new Error(error)
    }
}

//get all pharmacy
exports.getPharmacyS = async (req, res, next) => {
    try {
        const result = await prisma.pharmacy.findMany()
        res.json(result)
    } catch (error) {
        res.json({errror: `No Pharmacy was found`})
    }
}

