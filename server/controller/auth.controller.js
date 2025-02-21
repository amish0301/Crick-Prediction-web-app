const TryCatch = require("../utils/TryCatch");

const register = TryCatch(async (req, res, next) => {
    return res.status(200).json({message:"account created",success:true})
});
const login = TryCatch(async (req,res,next) => {
    return res.status(200).json({message:"logged in",success:true})
})

// module.exports = {login}
module.exports = { register,login };
