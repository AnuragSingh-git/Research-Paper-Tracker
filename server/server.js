import dotenv from "dotenv";

dotenv.config();

import app from "./src/app.js";

import connectDB from "./src/config/db.js";

const PORT = process.env.PORT || 5000;

connectDB();

app.listen(PORT, () => {

    console.log(`Server Running on Port ${PORT}`);

});