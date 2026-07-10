import { body } from "express-validator";

export const registerValidator = [

body("name")
.notEmpty()
.withMessage("Name is required"),

body("email")
.isEmail()
.withMessage("Invalid Email"),

body("password")
.isLength({
min:6
})
.withMessage("Password should be minimum 6 characters")

];

export const loginValidator=[

body("email")
.isEmail(),

body("password")
.notEmpty()

];