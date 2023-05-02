const jwt = require("jsonwebtoken");

exports.validateToken = (req, res, next) => {
    // retrieve the token from the Authorization header

    if(!req.headers['authorization']) res.status(403).json({message: "Need Authentication !"})

    const token = req.headers['authorization'].split(' ')[1];

    // check whether the token exists or not
    if (!token) {
        return res.status(401).json({ message: "Token not found" });
    }

    try {
        // token verified
        const decoded = jwt.verify(token, process.env.APP_JWT_KEY);

        // set user data from token into req.user
        req.user = decoded;

        // continue to API
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
};

exports.validateScope = (role) => (req, res, next) => {
    // get role information from req.user
    const userRole = req.user.role;

    // ccheck if the user role matches the allowed roles
    if (!role.includes(userRole)) {
        return res.status(403).json({ message: "Unauthorized" });
    }

    // continue to API
    next();
};
