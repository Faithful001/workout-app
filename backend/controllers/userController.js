const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
	return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

const loginUser = async (req, res) => {
	const { email, password } = req.body;
	try {
		const name = await User.findOne({ email });
		const user = await User.login(email, password);
		const token = createToken(user._id);
		res.status(200).json({ email, name: name.name, token });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

const signupUser = async (req, res) => {
	const { email, name, password } = req.body;
	try {
		const user = await User.signup(email, name, password);
		const token = createToken(user._id);
		res.status(200).json({ name, email, token });
	} catch (error) {
		res.status(401).json({ error: error.message });
	}
};

module.exports = { loginUser, signupUser };
