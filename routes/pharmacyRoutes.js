const express = require("express")
const router = express.Router()

const { signup, login,updatePharmacy,getPharmacyS,deletePharmacy, logout } = require("../controllers/pharmacyController")

//middlewares
const isLoggedIn = require("../middlewares/isLoggedIn")

router.route("/signup").post(signup)
router.route("/login").post(login)
router.route("update/:id").put( updatePharmacy)
router.route("/logout").get(logout)
router.route("/delete/:id").delete( deletePharmacy)
router.route("/getAll").get(getPharmacyS)


module.exports = router