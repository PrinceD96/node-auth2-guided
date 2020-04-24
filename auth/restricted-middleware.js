const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secrets = require("../config/secret");

// const Users = require("../users/users-model.js");

module.exports = (req, res, next) => {
	const token = req.headers.authorization.split(" ")[1];

	if (token) {
		jwt.verify(token, secrets.jwt_secret, (error, decodedToken) => {
			if (error) {
				res.status(401).json({ message: "Not authorized" });
			} else {
				req.decodedToken = decodedToken;
				next();
			}
		});
	} else {
		res.status(401).json({ message: "Not authorized" });
	}

	// const { username, password } = req.headers;

	// if (username && password) {
	// 	Users.findBy({ username })
	// 		.first()
	// 		.then(user => {
	// 			if (user && bcrypt.compareSync(password, user.password)) {
	// 				next();
	// 			} else {
	// 				res.status(401).json({ message: "Invalid Credentials" });
	// 			}
	// 		})
	// 		.catch(error => {
	// 			res.status(500).json({ message: "Ran into an unexpected error" });
	// 		});
	// } else {
	// 	res.status(400).json({ message: "No credentials provided" });
	// }
};
