import TryCatch from "../utils/TryCatch";

export const register = TryCatch(async (req,res, next) => { 
    // const {}
    const { name, email, password, age } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, age, password: hashedPassword });
    const token = await generateToken(user._id);
    res.status(201).json({ user, token }); 
});
export default{
    register
}