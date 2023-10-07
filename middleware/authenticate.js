const isAuthenticated = (req, res, next) => {
    if (req.session.user === undefined) {
        return res.status(401).json({ message: "You are not authorized to make this change. Please log in!" });
    }
    next();
};

module.exports = {
    isAuthenticated
};