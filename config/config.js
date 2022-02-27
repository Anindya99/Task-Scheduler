const dotenv = require("dotenv");
dotenv.config();
module.exports ={
    db_link:process.env.DB_LINK,
    jwtSecret:process.env.JWTSECRET,
    GOOGLE_CLIENTID:process.env.GOOGLE_CLIENTID,
    googleSecret:process.env.GOOGLE_SECRET,
    scheduler_email:process.env.SCHEDULER_EMAIL,
    scheduler_password:process.env.SCHEDULER_PASSWORD
};